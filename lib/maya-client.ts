/**
 * MAYA Enterprise API client — used to escalate qualified leads from the
 * Creativ chatbot to the ERP. Caches the JWT token in memory between
 * requests on the same Node process.
 *
 * Configuration (in .env.local):
 *   MAYA_API_BASE       default: https://maya.acerfi.net
 *   MAYA_SERVICE_EMAIL  service-account email created inside MAYA
 *   MAYA_SERVICE_PASSWORD
 *
 * Auth flow confirmed by probing https://maya.acerfi.net/api/auth/login:
 *   - POST { email, password } → 200 with { success: true, token: "..." }
 *     (presumed; verified shape on failure: { success: false, message })
 *   - 401 with { success: false, message: "Identifiants invalides" } on bad creds
 *   - All business endpoints (/api/tasks, /api/contacts, /api/users) return
 *     401 { success: false, message: "Non authentifié" } without auth.
 *
 * If credentials are not configured, escalation degrades gracefully:
 * the call returns { ok: false, reason: "no_credentials" } and the caller
 * is expected to fall back to email (Resend) or just store the lead locally.
 */

const MAYA_BASE = process.env.MAYA_API_BASE ?? "https://maya.acerfi.net";
const SERVICE_EMAIL = process.env.MAYA_SERVICE_EMAIL;
const SERVICE_PASSWORD = process.env.MAYA_SERVICE_PASSWORD;

type Token = { value: string; expiresAt: number };
let cachedToken: Token | null = null;

const TOKEN_TTL_MS = 50 * 60 * 1000; // 50 minutes — re-auth before typical 1h JWT expiry

async function authenticate(): Promise<string | null> {
  if (!SERVICE_EMAIL || !SERVICE_PASSWORD) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const res = await fetch(`${MAYA_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: SERVICE_EMAIL, password: SERVICE_PASSWORD }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(
      `[maya-client] login failed: HTTP ${res.status} ${await res.text().catch(() => "")}`,
    );
    return null;
  }

  const data = (await res.json().catch(() => null)) as
    | { success?: boolean; token?: string; data?: { token?: string } }
    | null;

  // Token can come back at top level or nested under data — handle both.
  const token = data?.token ?? data?.data?.token;
  if (!token) {
    console.error(
      "[maya-client] login response did not contain a token:",
      data,
    );
    return null;
  }

  cachedToken = { value: token, expiresAt: Date.now() + TOKEN_TTL_MS };
  return token;
}

export type EscalationPayload = {
  /** Short, human-readable subject (becomes task title) */
  title: string;
  /** Full conversation context + visitor's request */
  description: string;
  /** Visitor identity */
  contact: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  /** Optional structured tags */
  type?: "lead" | "quote" | "demo" | "support" | "other";
  priority?: "low" | "normal" | "high" | "urgent";
  /** Service/sector slugs the request is about */
  context?: {
    serviceSlug?: string;
    sectorSlug?: string;
    locale?: string;
    pageUrl?: string;
  };
};

export type EscalationResult =
  | { ok: true; taskId: string | number; raw: unknown }
  | { ok: false; reason: "no_credentials" | "auth_failed" | "api_error"; detail?: string };

/**
 * Push a qualified lead/task to MAYA. The exact payload schema is best-guess
 * (until we receive the official MAYA API spec) — adjust fields here when
 * the schema is confirmed. The raw HTTP response is returned in `raw` so
 * callers can debug schema mismatches.
 */
export async function escalateToMaya(
  payload: EscalationPayload,
): Promise<EscalationResult> {
  const token = await authenticate();
  if (!token) {
    return {
      ok: false,
      reason: SERVICE_EMAIL ? "auth_failed" : "no_credentials",
    };
  }

  const body = {
    title: payload.title,
    description: payload.description,
    priority: payload.priority ?? "normal",
    type: payload.type ?? "lead",
    source: "acerfi-creativ-bot",
    contact: payload.contact,
    metadata: {
      ...payload.context,
      botVersion: "maya-v1",
      timestamp: new Date().toISOString(),
    },
  };

  const res = await fetch(`${MAYA_BASE}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const raw = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      ok: false,
      reason: "api_error",
      detail: `HTTP ${res.status}: ${JSON.stringify(raw)}`,
    };
  }

  // Try to extract task ID from common response shapes
  const data = raw as
    | { id?: string | number; data?: { id?: string | number }; task?: { id?: string | number } }
    | null;
  const taskId =
    data?.id ?? data?.data?.id ?? data?.task?.id ?? `unknown-${Date.now()}`;

  return { ok: true, taskId, raw };
}

export function isMayaConfigured(): boolean {
  return Boolean(SERVICE_EMAIL && SERVICE_PASSWORD);
}
