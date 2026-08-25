"use client";

/**
 * ContactChatPanel — a stylized, always-open chat panel that mirrors our
 * brand language and pushes the visitor toward either a live rep or AI chat.
 * The actual messaging is wired up later via GHL; this component is the
 * presentational shell + the two CTAs.
 */

import { motion, useReducedMotion } from "framer-motion";
import { Phone, MessageSquare, RotateCcw } from "lucide-react";

interface Props {
  /** Live rep CTA (phone link works on mobile, click-to-call on desktop) */
  onTalkToRep?: () => void;
  /** Optional handler for "Chat with us" — replace with GHL trigger */
  onStartChat?: () => void;
}

export function ContactChatPanel({ onTalkToRep, onStartChat }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
      style={{
        background: "var(--near-black)",
        borderRadius: "14px",
        border: "1px solid rgba(184,146,74,0.30)",
        boxShadow: "0 24px 60px rgba(14,26,31,0.25)",
        overflow: "hidden",
      }}
    >
      {/* ── Header bar ────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="relative">
          <div
            className="flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, var(--rich-warm), #6b4f23)",
              fontFamily: "var(--font-cormorant), serif",
              color: "var(--bg-pure)",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              fontWeight: 550,
            }}
            aria-hidden="true"
          >
            SJB
          </div>
          {/* Online dot */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 1,
              right: 1,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#4ade80",
              border: "2px solid var(--near-black)",
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 550,
              fontSize: "1rem",
              color: "var(--bg-pure)",
              letterSpacing: "0.02em",
            }}
          >
            SJB Outdoor Living Concierge
          </p>
          <p
            style={{
              fontSize: "0.72rem",
              color: "rgba(252,251,247,0.55)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span style={{ color: "#4ade80" }}>●</span>
            We&apos;re online · usually replies in minutes
          </p>
        </div>

        <button
          type="button"
          aria-label="Restart chat"
          className="p-2 rounded-full transition-colors hover:bg-white/5"
          style={{ color: "rgba(252,251,247,0.6)" }}
        >
          <RotateCcw size={16} strokeWidth={1.6} />
        </button>
      </div>

      {/* ── Message stream ───────────────────────────────────── */}
      <div className="px-5 py-7 space-y-4" style={{ minHeight: 320 }}>
        <Bubble delay={0.15}>
          Hey there <span aria-hidden="true">👋</span> — this is the SJB Outdoor Living team.
        </Bubble>
        <Bubble delay={0.4}>
          You&apos;ve got two ways to talk to us. Pick whatever feels right —
          there&apos;s a real person on the other end of both.
        </Bubble>
        <Bubble delay={0.7}>What would you like to do?</Bubble>

        {/* Choice cards */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
        >
          <ChoiceCard
            icon={<Phone size={18} strokeWidth={1.6} />}
            label="Talk to a rep"
            sub="Live human · weekdays 9–6"
            onClick={onTalkToRep}
            href="tel:+13526425839"
          />
          <ChoiceCard
            icon={<MessageSquare size={18} strokeWidth={1.6} />}
            label="Chat with us"
            sub="AI concierge · answers instantly"
            onClick={onStartChat}
            primary
          />
        </motion.div>
      </div>

      {/* ── Composer (decorative — real input wired up by GHL) ── */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="flex-1 px-4 py-3 rounded-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(252,251,247,0.4)",
            fontSize: "0.85rem",
            fontFamily: "var(--font-cormorant), serif",
          }}
        >
          Type a message…
        </div>
        <button
          type="button"
          aria-label="Send message"
          className="flex items-center justify-center rounded-full transition-opacity hover:opacity-90"
          style={{
            width: 40,
            height: 40,
            background: "var(--bg-pure)",
            color: "var(--ink-primary)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function Bubble({ children, delay }: { children: React.ReactNode; delay: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[85%] px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.045)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "14px 14px 14px 4px",
        color: "rgba(252,251,247,0.88)",
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "0.95rem",
        lineHeight: 1.55,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </motion.div>
  );
}

function ChoiceCard({
  icon,
  label,
  sub,
  onClick,
  href,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
}) {
  const Tag: React.ElementType = href ? "a" : "button";
  return (
    <Tag
      onClick={onClick}
      href={href}
      className="group flex items-center gap-3 px-4 py-3 text-left transition-all hover:translate-y-[-1px]"
      style={{
        background: primary ? "var(--rich-warm)" : "transparent",
        border: `1px solid ${primary ? "var(--rich-warm)" : "rgba(184,146,74,0.35)"}`,
        borderRadius: "10px",
        color: primary ? "var(--bg-pure)" : "rgba(252,251,247,0.92)",
      }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 34,
          height: 34,
          borderRadius: "8px",
          background: primary ? "rgba(252,251,247,0.15)" : "rgba(184,146,74,0.12)",
          color: primary ? "var(--bg-pure)" : "var(--rich-warm)",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span className="flex flex-col min-w-0">
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.98rem",
            fontWeight: 550,
            letterSpacing: "0.02em",
            lineHeight: 1.15,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "0.72rem",
            opacity: 0.75,
            marginTop: 2,
          }}
        >
          {sub}
        </span>
      </span>
    </Tag>
  );
}
