import { NextResponse } from "next/server";
import { z } from "zod";
import { ACERFI } from "@/lib/acerfi";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().default(""),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
});

const RESEND_API = "https://api.resend.com/emails";

async function postToN8n(payload: Record<string, unknown>): Promise<
  | { sent: true }
  | { sent: false; reason: string }
> {
  const url = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!url) return { sent: false, reason: "not_configured" };
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!resp.ok) {
      console.error("n8n webhook error:", resp.status);
      return { sent: false, reason: `http_${resp.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("n8n webhook exception:", err);
    return { sent: false, reason: "network_failure" };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress =
    process.env.RESEND_FROM ?? "ACERFI Créativ <noreply@acerfi-creativ.com>";
  const toAddress = ACERFI.contact.emails.primary;

  const n8nPayload = {
    name,
    email,
    phone,
    subject,
    message,
    source: "creativ.acerfi.net/contact",
    receivedAt: new Date().toISOString(),
  };
  const n8nPromise = postToN8n(n8nPayload);

  // Pas de Resend : on s'appuie sur n8n. Si n8n a capté → ok. Sinon mailto.
  if (!apiKey) {
    const n8n = await n8nPromise;
    if (n8n.sent) {
      return NextResponse.json({ ok: true, captured: "n8n" });
    }
    return NextResponse.json(
      {
        ok: false,
        fallback: "mailto",
        mailto: `mailto:${toAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `Nom : ${name}\nEmail : ${email}\nTéléphone : ${phone}\n\n${message}`,
        )}`,
      },
      { status: 200 },
    );
  }

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #fafaf9;">
      <h1 style="font-size: 20px; color: #c9a84c;">Nouvelle demande — ACERFI Créativ</h1>
      <p style="margin: 16px 0;"><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
      <hr style="border: none; border-top: 1px solid rgba(245, 180, 0,0.2); margin: 16px 0;" />
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}" style="color: #c9a84c;">${escapeHtml(email)}</a></p>
      ${phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>` : ""}
      <hr style="border: none; border-top: 1px solid rgba(245, 180, 0,0.2); margin: 16px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>`;

  const text = `Nouvelle demande — ACERFI Créativ\n\nSujet : ${subject}\n\nNom : ${name}\nEmail : ${email}\n${phone ? `Téléphone : ${phone}\n` : ""}\n${message}`;

  const resendPromise = fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toAddress],
      reply_to: email,
      subject: `[creativ.acerfi.net] ${subject}`,
      html,
      text,
    }),
  })
    .then((r) => ({ ok: r.ok, status: r.status, body: r }))
    .catch((err) => {
      console.error("Resend exception:", err);
      return { ok: false, status: 0, body: null as Response | null };
    });

  const [n8n, resend] = await Promise.all([n8nPromise, resendPromise]);

  if (!resend.ok) {
    if (resend.body) {
      const errBody = await resend.body.text().catch(() => "");
      console.error("Resend error:", resend.status, errBody);
    }
    if (n8n.sent) {
      return NextResponse.json({
        ok: true,
        captured: "n8n",
        warning: "email_failed",
      });
    }
    return NextResponse.json(
      { ok: false, error: "resend_failed", status: resend.status },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    captured: n8n.sent ? "n8n+email" : "email",
  });
}

// Refus poli des autres méthodes (pas de GET / OPTIONS)
export async function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
