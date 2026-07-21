import { GoogleGenAI, Type, type Content, type FunctionDeclaration } from "@google/genai";
import { NextResponse } from "next/server";
import { z } from "zod";

import { buildKnowledgeBase, BOT_SYSTEM_PROMPT } from "@/lib/bot-knowledge";
import { escalateToMaya, type EscalationPayload } from "@/lib/maya-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(8000),
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
  pageUrl: z.string().url().optional(),
  locale: z.enum(["fr", "en"]).optional(),
});

const escalationDeclaration: FunctionDeclaration = {
  name: "escalate_to_maya",
  description:
    "Crée une tâche dans MAYA Enterprise (l'ERP du Groupe ACERFI) pour qu'un membre de l'équipe ou un agent IA autonome reprenne la conversation. À utiliser dès que le visiteur fournit son contact pour être recontacté, ou pour toute demande qui nécessite un humain (devis sur mesure, démo, brief projet, urgence).",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description:
          "Titre court (max 80 caractères) résumant la demande. Ex: 'Devis FlipBook Pro pour restaurant Yaoundé'",
      },
      summary: {
        type: Type.STRING,
        description:
          "Résumé complet de la conversation et du besoin. Inclus tout contexte utile pour que la personne qui prend en charge n'ait pas à redemander.",
      },
      contact_name: {
        type: Type.STRING,
        description: "Nom du visiteur si fourni",
      },
      contact_email: {
        type: Type.STRING,
        description: "Email du visiteur (REQUIS pour pouvoir le rappeler)",
      },
      contact_phone: {
        type: Type.STRING,
        description: "Téléphone si fourni (préférable WhatsApp pour le Cameroun)",
      },
      contact_company: {
        type: Type.STRING,
        description: "Nom de l'entreprise / projet si fourni",
      },
      type: {
        type: Type.STRING,
        enum: ["lead", "quote", "demo", "support", "other"],
        description: "Catégorie de la demande",
      },
      priority: {
        type: Type.STRING,
        enum: ["low", "normal", "high", "urgent"],
        description:
          "Priorité estimée. 'urgent' uniquement si le visiteur exprime explicitement une urgence ou un projet imminent.",
      },
      service_slug: {
        type: Type.STRING,
        description:
          "Slug du service principal concerné si identifié (ex: 'flipbook-pro', 'agent-ia-personnalise')",
      },
      sector_slug: {
        type: Type.STRING,
        description:
          "Slug du secteur concerné si identifié (ex: 'restauration')",
      },
    },
    required: ["title", "summary", "contact_email", "type"],
  },
};

type ToolInput = {
  title: string;
  summary: string;
  contact_name?: string;
  contact_email: string;
  contact_phone?: string;
  contact_company?: string;
  type: "lead" | "quote" | "demo" | "support" | "other";
  priority?: "low" | "normal" | "high" | "urgent";
  service_slug?: string;
  sector_slug?: string;
};

async function executeEscalation(
  input: ToolInput,
  pageUrl: string | undefined,
  locale: string | undefined,
): Promise<Record<string, unknown>> {
  const payload: EscalationPayload = {
    title: input.title,
    description: input.summary,
    type: input.type,
    priority: input.priority ?? "normal",
    contact: {
      name: input.contact_name,
      email: input.contact_email,
      phone: input.contact_phone,
      company: input.contact_company,
    },
    context: {
      serviceSlug: input.service_slug,
      sectorSlug: input.sector_slug,
      pageUrl,
      locale,
    },
  };

  const result = await escalateToMaya(payload);

  if (result.ok) {
    return {
      success: true,
      taskId: String(result.taskId),
      message:
        "Demande transmise à l'équipe via MAYA Enterprise. Un membre de l'équipe ou un agent IA reprend contact sous 24h ouvrées.",
    };
  }

  return {
    success: false,
    reason: result.reason,
    fallback:
      "MAYA Enterprise indisponible — proposer au visiteur de joindre directement l'équipe via WhatsApp +237 695 08 08 08 ou email contact@acerfi.net.",
  };
}

export async function POST(req: Request) {
  if (!ai) {
    return NextResponse.json(
      {
        error:
          "Le chatbot n'est pas configuré sur ce serveur (GEMINI_API_KEY manquante).",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { messages, pageUrl, locale } = parsed.data;

  // Gemini wants role: "user" | "model" (not "assistant"). Translate.
  const contents: Content[] = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const systemInstruction =
    `${BOT_SYSTEM_PROMPT}\n\n# Knowledge ACERFI Créativ\n\n${buildKnowledgeBase()}`;

  const tools = [{ functionDeclarations: [escalationDeclaration] }];

  const escalations: Array<{ name: string; input: unknown }> = [];
  let totalInputTokens = 0;
  let totalOutputTokens = 0;

  try {
    // Agentic loop — typically 1 round (no tool) or 2 rounds (tool → final reply).
    for (let safetyCounter = 0; safetyCounter < 4; safetyCounter++) {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents,
        config: {
          systemInstruction,
          tools,
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      });

      totalInputTokens += response.usageMetadata?.promptTokenCount ?? 0;
      totalOutputTokens += response.usageMetadata?.candidatesTokenCount ?? 0;

      const fnCalls = response.functionCalls ?? [];

      if (fnCalls.length === 0) {
        const text = (response.text ?? "").trim();
        return NextResponse.json({
          reply: text || "…",
          escalations,
          usage: {
            input_tokens: totalInputTokens,
            output_tokens: totalOutputTokens,
          },
        });
      }

      // Append the model's tool-use turn (replicate the function-call parts back
      // into the contents array so Gemini knows what it requested).
      contents.push({
        role: "model",
        parts: fnCalls.map((fc) => ({
          functionCall: { name: fc.name ?? "", args: fc.args ?? {} },
        })),
      });

      // Execute each tool call and feed responses back as a single user turn.
      const responseParts = await Promise.all(
        fnCalls.map(async (fc) => {
          const name = fc.name ?? "unknown";
          if (name !== escalationDeclaration.name) {
            return {
              functionResponse: {
                name,
                response: { error: "Outil inconnu" },
              },
            };
          }
          escalations.push({ name, input: fc.args });
          const result = await executeEscalation(
            fc.args as unknown as ToolInput,
            pageUrl,
            locale,
          );
          return {
            functionResponse: {
              name,
              response: result,
            },
          };
        }),
      );

      contents.push({ role: "user", parts: responseParts });
    }

    // Safety counter exhausted — model kept calling tools without finalizing.
    return NextResponse.json(
      {
        reply:
          "Je n'ai pas réussi à finaliser ma réponse. Vous pouvez me réécrire ou joindre directement l'équipe via WhatsApp +237 695 08 08 08.",
        escalations,
        degraded: true,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        reply: degradedReply(err),
        escalations,
        degraded: true,
      },
      { status: 200 },
    );
  }
}

function degradedReply(err: unknown): string {
  const status = extractStatus(err);
  console.error("[/api/chat] Gemini error", { status, err });

  // 503 / 429 / 5xx — provider saturé ou en panne.
  if (status === 503 || status === 429 || (status >= 500 && status < 600)) {
    return "Je suis momentanément surchargée côté IA. Réessayez dans une minute, ou écrivez directement à l'équipe sur WhatsApp +237 695 08 08 08.";
  }
  // Auth / quota — config serveur.
  if (status === 401 || status === 403) {
    return "Le service de chat est temporairement indisponible. Joignez l'équipe sur WhatsApp +237 695 08 08 08 ou par email contact@acerfi.net.";
  }
  return "Désolée, je rencontre un petit souci technique. Pouvez-vous me joindre directement via WhatsApp +237 695 08 08 08 ?";
}

function extractStatus(err: unknown): number {
  if (typeof err !== "object" || err === null) return 0;
  const e = err as { status?: unknown; code?: unknown };
  if (typeof e.status === "number") return e.status;
  if (typeof e.code === "number") return e.code;
  return 0;
}
