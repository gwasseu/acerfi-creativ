import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Build a minimal Request-like object with json() so the route handler can read it.
function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/chat", () => {
  const ORIGINAL_KEY = process.env.GEMINI_API_KEY;

  beforeEach(() => {
    delete process.env.GEMINI_API_KEY;
    vi.resetModules();
  });

  afterEach(() => {
    if (ORIGINAL_KEY) process.env.GEMINI_API_KEY = ORIGINAL_KEY;
  });

  it("returns 503 when GEMINI_API_KEY is missing", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "Bonjour" }] }),
    );
    expect(res.status).toBe(503);
    const json = (await res.json()) as { error?: string };
    expect(json.error).toMatch(/GEMINI_API_KEY/);
  });
});
