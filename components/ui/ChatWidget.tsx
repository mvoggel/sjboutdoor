"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Hardcoded Q&A pairs ──────────────────────────────────────────────────────
// REPLACE: swap simulateResponse() with a real API call to GPT-4o mini / Claude.
// Endpoint: POST /api/chat — body: { message: string } — response: { reply: string }
const QA_PAIRS: Record<string, string> = {
  "What services do you offer?":
    "SJBB Outdoors specializes in custom exterior shades, motorized retractable awnings, louvered pergolas, and Phantom Screen systems — all custom-fabricated for Florida architecture. Every product is designed to disappear when you don't need it, and perform flawlessly when you do.",
  "How do I book?":
    "Booking starts with a complimentary in-home consultation. One of our design specialists will visit your property, assess your space, and provide a detailed proposal — no pressure, no obligation. You can schedule directly through our website or call us at (239) 555-0182.",
  "What's included?":
    "Every SJBB installation includes a full site assessment, custom fabrication to your exact dimensions, professional installation by certified technicians, and our five-year workmanship guarantee. We also provide a walkthrough of your new system and ongoing maintenance support.",
  "Book a consult":
    "We'd love to meet you. Our consultations are complimentary and typically take 45–60 minutes at your home. We serve Naples, Bonita Springs, Marco Island, and surrounding communities. Click 'Schedule Your Consultation' on any page, or reach us at (239) 555-0182.",
};

const FALLBACK_RESPONSE =
  "That's a great question — I'd love to connect you with one of our specialists for a more detailed answer. Would you like to schedule a complimentary consultation, or is there something more specific I can help clarify?";

const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "How do I book?",
  "What's included?",
  "Book a consult",
];

interface Message {
  role: "user" | "assistant";
  text: string;
}

// Simulates typing delay then returns a hardcoded response.
// REPLACE: call real AI API here instead.
async function simulateResponse(userMessage: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 1100 + Math.random() * 700));
  return QA_PAIRS[userMessage] ?? FALLBACK_RESPONSE;
}

// ─── Sparkle icon ─────────────────────────────────────────────────────────────
function SparkleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill="#B8924A"
        fillOpacity="0.95"
      />
      <path
        d="M19 17L19.8 20L22 20.8L19.8 21.5L19 24L18.2 21.5L16 20.8L18.2 20L19 17Z"
        fill="#B8924A"
        fillOpacity="0.5"
      />
    </svg>
  );
}

// ─── Typing dots ──────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
      <AvatarBubble />
      <div
        style={{
          background: "rgba(252,251,247,0.05)",
          border: "1px solid rgba(184,146,74,0.12)",
          padding: "0.75rem 1rem",
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        {[0, 0.22, 0.44].map((delay) => (
          <span
            key={delay}
            style={{
              display: "inline-block",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(184,146,74,0.7)",
              animation: `typingBounce 1.3s infinite ${delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Avatar bubble ────────────────────────────────────────────────────────────
function AvatarBubble() {
  return (
    <div
      style={{
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "rgba(184,146,74,0.1)",
        border: "1px solid rgba(184,146,74,0.2)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2px",
      }}
    >
      <SparkleIcon size={10} />
    </div>
  );
}

// ─── Chat Widget ──────────────────────────────────────────────────────────────
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [pastFold, setPastFold] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // On mobile, hide the FAB until the user scrolls past the hero fold
  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) { setPastFold(true); return; }
      setPastFold(window.scrollY > window.innerHeight * 0.85);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;

      setMessages((prev) => [...prev, { role: "user", text }]);
      setInputValue("");
      setIsTyping(true);

      // REPLACE: call real AI API here instead of simulateResponse
      const reply = await simulateResponse(text);

      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    },
    [isTyping]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(inputValue);
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* ── Chat Panel ──────────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="SJBB AI Assistant"
          aria-modal="true"
          style={{
            position: "fixed",
            bottom: "5.75rem",
            right: "1.5rem",
            width: "min(420px, calc(100vw - 3rem))",
            height: "min(580px, calc(100vh - 8.5rem))",
            background: "#0A1619",
            border: "1px solid rgba(184,146,74,0.18)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,146,74,0.06)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9000,
            animation: "chatSlideIn 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid rgba(184,146,74,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              background: "rgba(184,146,74,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(184,146,74,0.12)",
                  border: "1px solid rgba(184,146,74,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  animation: "aiPulse 3s ease-in-out infinite",
                }}
              >
                <SparkleIcon size={14} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "rgba(252,251,247,0.95)",
                    lineHeight: 1.2,
                    letterSpacing: "0.02em",
                  }}
                >
                  Ask SJBB AI
                </p>
                <p
                  style={{
                    fontSize: "0.67rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(184,146,74,0.65)",
                    lineHeight: 1,
                    marginTop: "2px",
                  }}
                >
                  Outdoor living specialist
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(252,251,247,0.35)",
                padding: "6px",
                display: "flex",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(252,251,247,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(252,251,247,0.35)")
              }
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2L14 14M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Welcome message */}
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
              <AvatarBubble />
              <p
                style={{
                  background: "rgba(252,251,247,0.04)",
                  border: "1px solid rgba(184,146,74,0.1)",
                  padding: "0.8rem 1rem",
                  fontSize: "0.835rem",
                  lineHeight: 1.7,
                  color: "rgba(252,251,247,0.78)",
                  fontFamily: "var(--font-cormorant, Georgia, serif)",
                  maxWidth: "86%",
                }}
              >
                Hello — I&apos;m the SJBB Outdoors assistant. Ask me anything
                about our products, pricing, or how to get started.
              </p>
            </div>

            {/* Suggested prompts */}
            {!hasMessages && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  paddingLeft: "1.85rem",
                }}
              >
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(184,146,74,0.28)",
                      color: "rgba(184,146,74,0.8)",
                      padding: "0.4rem 0.85rem",
                      fontSize: "0.72rem",
                      letterSpacing: "0.04em",
                      cursor: "pointer",
                      fontFamily: "var(--font-cormorant, Georgia, serif)",
                      transition: "all 0.2s",
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = "rgba(184,146,74,0.1)";
                      el.style.borderColor = "rgba(184,146,74,0.5)";
                      el.style.color = "rgba(184,146,74,1)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = "transparent";
                      el.style.borderColor = "rgba(184,146,74,0.28)";
                      el.style.color = "rgba(184,146,74,0.8)";
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Conversation thread */}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  gap: "0.6rem",
                  alignItems: "flex-start",
                }}
              >
                {msg.role === "assistant" && <AvatarBubble />}
                <p
                  style={{
                    padding: "0.8rem 1rem",
                    fontSize: "0.835rem",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                    maxWidth: "82%",
                    ...(msg.role === "user"
                      ? {
                          background: "rgba(184,146,74,0.1)",
                          color: "rgba(252,251,247,0.88)",
                          border: "1px solid rgba(184,146,74,0.18)",
                        }
                      : {
                          background: "rgba(252,251,247,0.04)",
                          color: "rgba(252,251,247,0.78)",
                          border: "1px solid rgba(184,146,74,0.1)",
                        }),
                  }}
                >
                  {msg.text}
                </p>
              </div>
            ))}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: "0.875rem 1.25rem",
              borderTop: "1px solid rgba(184,146,74,0.1)",
              display: "flex",
              gap: "0.5rem",
              flexShrink: 0,
              background: "rgba(184,146,74,0.02)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask a question…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              aria-label="Your message"
              style={{
                flex: 1,
                background: "rgba(252,251,247,0.04)",
                border: "1px solid rgba(184,146,74,0.2)",
                color: "rgba(252,251,247,0.85)",
                padding: "0.625rem 0.875rem",
                fontSize: "0.835rem",
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                ((e.currentTarget as HTMLInputElement).style.borderColor =
                  "rgba(184,146,74,0.45)")
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLInputElement).style.borderColor =
                  "rgba(184,146,74,0.2)")
              }
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              style={{
                background: "rgba(184,146,74,0.12)",
                border: "1px solid rgba(184,146,74,0.28)",
                color: "#B8924A",
                padding: "0 1rem",
                cursor: !inputValue.trim() || isTyping ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                opacity: !inputValue.trim() || isTyping ? 0.35 : 1,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!inputValue.trim() || isTyping) return;
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(184,146,74,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(184,146,74,0.12)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Trigger Button — hidden on mobile until past the hero fold ── */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9001,
          opacity: pastFold ? 1 : 0,
          pointerEvents: pastFold ? "auto" : "none",
          transition: "opacity 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close AI chat" : "Open AI chat"}
          aria-expanded={open}
          style={{
            width: "62px",
            height: "62px",
            borderRadius: "50%",
            background: open ? "#0E1A1F" : "#0B3D2E",
            border: "1.5px solid rgba(184,146,74,0.35)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow =
              "0 12px 40px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.2)";
            el.style.borderColor = "rgba(184,146,74,0.6)";
            el.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow =
              "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)";
            el.style.borderColor = "rgba(184,146,74,0.35)";
            el.style.transform = "scale(1)";
          }}
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#B8924A"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <SparkleIcon size={20} />
          )}
        </button>
      </div>
    </>
  );
}
