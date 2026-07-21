"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Bonjour, je suis Maya — l'assistante du Groupe ACERFI. Sur ce site je peux vous présenter les services Créativ, donner des fourchettes de prix, et créer une tâche pour qu'un humain ou un agent IA vous reprenne. Par quoi commence-t-on ?",
};

const STORAGE_KEY = "acerfi-creativ:chat-messages:maya-v1";
const MAX_STORED = 20;

function loadStoredMessages(): Msg[] {
  if (typeof window === "undefined") return [INITIAL_GREETING];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [INITIAL_GREETING];
    const parsed = JSON.parse(raw) as Msg[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [INITIAL_GREETING];
  } catch {
    return [INITIAL_GREETING];
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(loadStoredMessages);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Persist conversation
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const tail = messages.slice(-MAX_STORED);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tail));
    } catch {
      // quota exceeded — ignore
    }
  }, [messages]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || pending) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          pageUrl:
            typeof window !== "undefined" ? window.location.href : undefined,
          locale: "fr",
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.error ?? `HTTP ${res.status}`);
      }

      const data = (await res.json()) as { reply: string };
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "…" },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setError(msg);
    } finally {
      setPending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        type="button"
        aria-label="Ouvrir le chat avec Maya"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-[1200] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shadow-[0_8px_30px_rgba(245,180,0,0.45)] transition-shadow hover:shadow-[0_12px_40px_rgba(245,180,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        data-cursor="pointer"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            role="dialog"
            aria-label="Maya — Assistante du Groupe ACERFI"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed bottom-24 right-6 z-[1200] flex w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-primary/20 bg-card/95 shadow-[0_24px_60px_-16px_rgba(245,180,0,0.28),0_8px_16px_-8px_rgba(0,0,0,0.32)] backdrop-blur-xl",
              "h-[min(580px,calc(100vh-7rem))]",
            )}
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b border-primary/15 bg-gradient-to-r from-card to-card/40 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-sm font-bold text-foreground">
                    Maya
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Assistante · Groupe ACERFI
                  </p>
                </div>
              </div>
              <Logo size={26} withWordmark={false} priority={false} />
            </header>

            {/* Scroller */}
            <div
              ref={scrollerRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} content={m.content} />
              ))}
              {pending && <TypingDots />}
              {error && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}
            </div>

            {/* Footer / composer */}
            <footer className="border-t border-primary/15 bg-card/60 p-3">
              <div className="flex items-end gap-2 rounded-xl border border-primary/20 bg-background/60 px-3 py-2 transition-colors focus-within:border-primary/50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  rows={1}
                  placeholder="Écrivez votre message…"
                  disabled={pending}
                  className="max-h-32 flex-1 resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={pending || !input.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Envoyer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground/70">
                Maya peut faire des erreurs. Vérifiez les infos importantes.
              </p>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content }: Msg) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm border border-primary/15 bg-muted/60 text-foreground",
        )}
      >
        {content}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
