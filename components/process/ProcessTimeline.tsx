"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, Play, Volume2, VolumeX, X } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { mediaSrc } from "@/lib/media-src";

export type ProcessStep = {
  n: string;
  title: string;
  body: string;
  videoSrc: string;
};

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

// ─── Public component: renders both variants, CSS hides one per breakpoint ──
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <>
      <div className="block md:hidden">
        <MobileTimeline steps={steps} />
      </div>
      <div className="hidden md:block">
        <DesktopTimeline steps={steps} />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
//  MOBILE — vertical timeline, swipe-to-reveal "thought bubble" video
// ─────────────────────────────────────────────────────────────────────────

function MobileTimeline({ steps }: ProcessTimelineProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Connecting vertical line behind the nodes */}
      <span
        aria-hidden="true"
        className="absolute left-[27px] top-3 bottom-3 w-px"
        style={{ background: "rgba(184,146,74,0.35)" }}
      />

      <ol className="relative flex flex-col gap-6">
        {steps.map((step, i) => (
          <MobileStepCard
            key={step.n}
            step={step}
            index={i}
            onOpen={() => setOpenIndex(i)}
            prefersReducedMotion={!!prefersReducedMotion}
          />
        ))}
      </ol>

      <AnimatePresence>
        {openIndex !== null && (
          <ThoughtBubbleModal
            step={steps[openIndex]}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileStepCard({
  step,
  index,
  onOpen,
  prefersReducedMotion,
}: {
  step: ProcessStep;
  index: number;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  // Swipe-to-open: track horizontal drag, fire onOpen when threshold exceeded
  const startX = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const SWIPE_THRESHOLD = 60;

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
  }
  function handleTouchMove(e: React.TouchEvent) {
    if (startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    if (dx < 0) setDragX(Math.max(dx, -120)); // left-swipe only
  }
  function handleTouchEnd() {
    if (dragX <= -SWIPE_THRESHOLD) {
      onOpen();
    }
    startX.current = null;
    setDragX(0);
  }

  return (
    <motion.li
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="flex items-stretch gap-4">
        {/* Node — sits on the vertical line */}
        <div
          aria-hidden="true"
          className="relative flex-shrink-0 flex items-center justify-center"
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: "var(--near-black)",
            border: "1px solid rgba(184,146,74,0.45)",
            boxShadow: "0 0 0 4px var(--bg-pure)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "rgba(184,146,74,0.95)",
            }}
          >
            {step.n}
          </span>
        </div>

        {/* Card — swipe target */}
        <button
          type="button"
          onClick={onOpen}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex-1 text-left relative overflow-hidden"
          style={{
            background: "var(--bg-pure)",
            border: "1px solid var(--rich-sand)",
            padding: "1rem 1.1rem",
            transform: `translateX(${dragX}px)`,
            transition: dragX === 0 ? "transform 0.25s ease" : "none",
            cursor: "pointer",
          }}
          aria-label={`Open ${step.title} video`}
        >
          <h3
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.15rem",
              fontWeight: 500,
              color: "var(--ink-primary)",
              marginBottom: "0.3rem",
              letterSpacing: "0.005em",
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontSize: "0.86rem",
              lineHeight: 1.55,
              color: "var(--ink-muted)",
              marginBottom: "0.65rem",
            }}
          >
            {step.body}
          </p>

          {/* Swipe hint — arrow points left (the swipe-to-open direction) */}
          <div
            className="flex items-center justify-between pt-2"
            style={{ borderTop: "1px dashed rgba(184,146,74,0.4)" }}
          >
            <motion.span
              aria-hidden="true"
              animate={prefersReducedMotion ? {} : { x: [0, -6, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center"
              style={{ color: "var(--rich-warm)" }}
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </motion.span>
            <span
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--rich-warm)",
                fontFamily: "var(--font-cormorant), Georgia, serif",
                textAlign: "right",
              }}
            >
              Swipe to watch
            </span>
          </div>
        </button>
      </div>
    </motion.li>
  );
}

function ThoughtBubbleModal({
  step,
  onClose,
}: {
  step: ProcessStep;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  // Autoplay must start muted; unmuting from this tap counts as a user gesture.
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !soundOn;
    v.muted = !next;
    setSoundOn(next);
    if (next) void v.play().catch(() => {});
  };

  // Lock scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(13,13,13,0.78)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${step.title} — video`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 30 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative"
        style={{
          width: "min(86vw, 360px)",
          aspectRatio: "9 / 16",
          background: "var(--near-black)",
          border: "1px solid rgba(184,146,74,0.45)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        {/* Thought-bubble "tail" — small notch on the lower-left */}
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            left: "-9px",
            bottom: "32px",
            width: "16px",
            height: "16px",
            background: "var(--near-black)",
            border: "1px solid rgba(184,146,74,0.45)",
            borderTop: "none",
            borderRight: "none",
            transform: "rotate(45deg)",
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute z-10 top-3 right-3 p-2 rounded-full"
          style={{
            background: "rgba(13,13,13,0.6)",
            border: "1px solid rgba(184,146,74,0.4)",
          }}
          aria-label="Close video"
        >
          <X size={16} style={{ color: "rgba(252,251,247,0.9)" }} />
        </button>

        {/* Step label header */}
        <div
          className="absolute z-10 top-3 left-3 flex items-center gap-2 px-3 py-1.5"
          style={{
            background: "rgba(13,13,13,0.55)",
            border: "1px solid rgba(184,146,74,0.35)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              color: "rgba(184,146,74,0.95)",
            }}
          >
            {step.n}
          </span>
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.85rem",
              color: "rgba(252,251,247,0.92)",
              letterSpacing: "0.04em",
            }}
          >
            {step.title}
          </span>
        </div>

        {/* Sound toggle — autoplay starts muted, tap to enable audio */}
        <button
          onClick={toggleSound}
          className="absolute z-10 bottom-3 right-3 p-2 rounded-full"
          style={{
            background: "rgba(13,13,13,0.6)",
            border: "1px solid rgba(184,146,74,0.4)",
          }}
          aria-label={soundOn ? "Mute video" : "Unmute video"}
        >
          {soundOn ? (
            <Volume2 size={16} style={{ color: "rgba(252,251,247,0.9)" }} />
          ) : (
            <VolumeX size={16} style={{ color: "rgba(252,251,247,0.9)" }} />
          )}
        </button>

        <video
          ref={videoRef}
          src={mediaSrc(step.videoSrc)}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
//  DESKTOP — snaking timeline w/ expandable video reveal
// ─────────────────────────────────────────────────────────────────────────

function DesktopTimeline({ steps }: ProcessTimelineProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <ol className="flex flex-col">
        {steps.map((step, i) => {
          const isRight = i % 2 === 1;
          const isOpen = openIndex === i;
          const isLast = i === steps.length - 1;
          return (
            <motion.li
              key={step.n}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid"
              style={{
                gridTemplateColumns: "1fr 100px 1fr",
                alignItems: "stretch",
              }}
            >
              {/* LEFT slot */}
              <div className="flex justify-end items-stretch">
                {!isRight && (
                  <StepCard
                    step={step}
                    side="left"
                    isOpen={isOpen}
                    onToggle={() => setOpenIndex(isOpen ? null : i)}
                  />
                )}
              </div>

              {/* CENTER — spine + node */}
              <div className="relative flex flex-col items-center">
                {/* Vertical spine segment */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 w-px"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: isLast
                      ? "linear-gradient(to bottom, rgba(184,146,74,0.45) 0%, rgba(184,146,74,0.45) 50%, transparent 100%)"
                      : "rgba(184,146,74,0.45)",
                  }}
                />

                {/* Snake connector — horizontal curve from spine into the card side */}
                <SnakeConnector side={isRight ? "right" : "left"} />

                {/* Node circle */}
                <div
                  className="relative z-10 flex items-center justify-center"
                  style={{
                    marginTop: "2.5rem",
                    width: "62px",
                    height: "62px",
                    borderRadius: "50%",
                    background: "var(--bg-pure)",
                    border: "1px solid rgba(184,146,74,0.5)",
                    boxShadow:
                      "0 0 0 6px var(--bg-pure), 0 6px 18px rgba(14,26,31,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.05rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      color: "var(--rich-warm)",
                    }}
                  >
                    {step.n}
                  </span>
                </div>
              </div>

              {/* RIGHT slot */}
              <div className="flex justify-start items-stretch">
                {isRight && (
                  <StepCard
                    step={step}
                    side="right"
                    isOpen={isOpen}
                    onToggle={() => setOpenIndex(isOpen ? null : i)}
                  />
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function SnakeConnector({ side }: { side: "left" | "right" }) {
  // Decorative curve from the vertical spine into the side card
  return (
    <svg
      aria-hidden="true"
      width="100"
      height="80"
      viewBox="0 0 100 80"
      className="absolute"
      style={{
        top: "2.5rem",
        left: "50%",
        transform: `translateX(-50%) ${side === "left" ? "scaleX(-1)" : ""}`,
        pointerEvents: "none",
      }}
    >
      <path
        d="M 50 30 Q 50 30, 70 30 T 100 30"
        fill="none"
        stroke="rgba(184,146,74,0.4)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

function StepCard({
  step,
  side,
  isOpen,
  onToggle,
}: {
  step: ProcessStep;
  side: "left" | "right";
  isOpen: boolean;
  onToggle: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  // Autoplay must start muted; unmuting from this tap counts as a user gesture.
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !soundOn;
    v.muted = !next;
    setSoundOn(next);
    if (next) void v.play().catch(() => {});
  };

  return (
    <div
      className="flex"
      style={{
        width: "100%",
        maxWidth: "440px",
        padding: "2rem 0 2.5rem",
        justifyContent: side === "left" ? "flex-end" : "flex-start",
      }}
    >
      <motion.div
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
        style={{
          background: "var(--bg-pure)",
          border: "1px solid var(--rich-sand)",
          width: "100%",
          boxShadow: isOpen
            ? "0 16px 40px rgba(14,26,31,0.12)"
            : "0 1px 0 rgba(14,26,31,0.03)",
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-left p-6 flex items-start gap-4 transition-colors"
          style={{
            background: "transparent",
            cursor: "pointer",
          }}
          aria-expanded={isOpen}
        >
          <div className="flex-1">
            <h3
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.35rem",
                fontWeight: 500,
                color: "var(--ink-primary)",
                letterSpacing: "0.005em",
                marginBottom: "0.4rem",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: "0.92rem",
                lineHeight: 1.65,
                color: "var(--ink-muted)",
              }}
            >
              {step.body}
            </p>
          </div>

          {/* Play / collapse pill */}
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: isOpen ? "var(--ink-primary)" : "transparent",
              border: "1px solid var(--ink-primary)",
              color: isOpen ? "var(--bg-pure)" : "var(--ink-primary)",
              transition: "background 0.25s, color 0.25s",
            }}
          >
            <Play size={14} strokeWidth={1.5} style={{ marginLeft: "2px" }} fill="currentColor" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="video"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="mx-6 mb-6 relative"
                style={{
                  aspectRatio: "9 / 16",
                  maxHeight: "440px",
                  background: "var(--near-black)",
                  border: "1px solid rgba(184,146,74,0.35)",
                  overflow: "hidden",
                }}
              >
                <video
                  ref={videoRef}
                  src={mediaSrc(step.videoSrc)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Sound toggle — autoplay starts muted, click to enable audio */}
                <button
                  onClick={toggleSound}
                  className="absolute z-10 bottom-3 right-3 p-2 rounded-full"
                  style={{
                    background: "rgba(13,13,13,0.6)",
                    border: "1px solid rgba(184,146,74,0.4)",
                  }}
                  aria-label={soundOn ? "Mute video" : "Unmute video"}
                >
                  {soundOn ? (
                    <Volume2 size={16} style={{ color: "rgba(252,251,247,0.9)" }} />
                  ) : (
                    <VolumeX size={16} style={{ color: "rgba(252,251,247,0.9)" }} />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
