"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { Container } from "@/components/ui/Container";

interface CtaBandProps {
  /** true = deep green bg (default). false = inverted warm white bg */
  inverted?: boolean;
}

export function CtaBand({ inverted = false }: CtaBandProps) {
  const { openModal } = useConsultModal();
  const prefersReducedMotion = useReducedMotion();

  const bg = inverted ? "var(--bg-pure)" : "var(--rich-deep)";
  const headingColor = inverted ? "var(--rich-deep)" : "var(--bg-pure)";
  const bodyColor = inverted ? "var(--ink-muted)" : "rgba(252,251,247,0.8)";
  const btnBg = inverted ? "var(--near-black)" : "var(--rich-warm)";
  const btnColor = "var(--bg-pure)";

  return (
    <section
      style={{ background: bg, borderTop: inverted ? "1px solid var(--rich-sand)" : "none" }}
      className="py-20 md:py-28"
    >
      <Container>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div className="max-w-xl">
            <h2 className="text-h2" style={{ color: headingColor }}>
              {inverted
                ? "Ready to transform your outdoor space?"
                : "See it in your space."}
            </h2>
            <p className="mt-3 text-lg" style={{ color: bodyColor }}>
              {inverted
                ? "Our team is ready to design a custom solution for your home."
                : "Free in-home consultations across North Florida, the Nature Coast, and the Panhandle."}
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center justify-center rounded-none px-8 py-4 font-medium text-base transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: btnBg,
                color: btnColor,
                focusRingColor: btnBg,
              } as React.CSSProperties}
            >
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
