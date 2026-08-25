"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Wrench, Shield, MapPin, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { assetPath } from "@/lib/asset-path";

const VALUE_PROPS = [
  {
    icon: Wrench,
    title: "Custom Fabricated",
    body: "Every product is built to your exact specifications — no off-the-shelf compromises.",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    body: "We stand behind our work with a comprehensive lifetime warranty on materials and installation.",
  },
  {
    icon: MapPin,
    title: "FL-Licensed Installers",
    body: "Our crews are fully licensed, insured, and trained on Florida building codes.",
  },
  {
    icon: Heart,
    title: "Family Owned",
    body: "South Jersey Blinds has been a family business for over three decades. Florida is our newest chapter.",
  },
];

export function WhyUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="pt-10 pb-24 md:pt-14 md:pb-36"
      style={{ background: "var(--rich-sand)" }}
    >
      <Container>
        <SectionHeading
          eyebrow="Why SJB"
          heading="The SJB difference."
          subheading="We're not a box-store brand. We're craftspeople who take pride in every installation."
          center
        />

        {/* Value props grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_PROPS.map((prop, i) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: prefersReducedMotion ? 0 : i * 0.08,
                }}
                className="flex flex-col gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--bg-pure)" }}
                >
                  <Icon
                    size={22}
                    style={{ color: "var(--rich-deep)" }}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3
                    className="font-medium text-base mb-1.5"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      color: "var(--ink-primary)",
                    }}
                  >
                    {prop.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {prop.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Family story band — connected visually to the "Family Owned" card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: prefersReducedMotion ? 0 : 0.32,
          }}
          className="mt-12 md:mt-16"
        >
          {/* Connector line — aligns under the 4th card (Family Owned) on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:flex justify-end"
            style={{ marginBottom: "-1px" }}
          >
            <div
              style={{
                width: "calc(25% - 1rem)",
                height: "28px",
                borderLeft: "1px solid rgba(184,146,74,0.3)",
                borderRight: "1px solid rgba(184,146,74,0.3)",
                borderTop: "1px solid rgba(184,146,74,0.3)",
                borderRadius: "6px 6px 0 0",
              }}
            />
          </div>

          {/* Quote + photo panel */}
          <div
            className="grid md:grid-cols-2 overflow-hidden"
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(184,146,74,0.28)",
              boxShadow: "0 4px 32px rgba(14,26,31,0.08)",
            }}
          >
            {/* Quote side */}
            <div
              className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14"
              style={{ background: "var(--near-black)" }}
            >
              <p
                style={{
                  fontSize: "0.63rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                  marginBottom: "1.25rem",
                }}
              >
                Our Story
              </p>
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.25rem, 2.1vw, 1.7rem)",
                  fontWeight: 550,
                  color: "rgba(252,251,247,0.93)",
                  lineHeight: 1.45,
                  letterSpacing: "0.01em",
                  marginBottom: "1.5rem",
                }}
              >
                &ldquo;Three decades later, every job still feels personal &mdash; because it is.&rdquo;
              </blockquote>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(252,251,247,0.5)",
                  lineHeight: 1.75,
                  maxWidth: "44ch",
                }}
              >
                South Jersey Blinds &amp; Beyond was built on the belief that your
                home deserves craftspeople who care. Florida is our newest
                chapter &mdash; same family, same standards.
              </p>
            </div>

            {/* Photo side */}
            <div className="relative min-h-[260px] md:min-h-0">
              <Image
                src={assetPath("/img/products/family.jpg")}
                alt="The SJB family"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle left-edge gradient to blend with the dark quote panel */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(14,26,31,0.25) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
