"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Wrench, Shield, MapPin, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

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
    body: "South Jersey Blinds has been a family business for over 20 years. Florida is our newest chapter.",
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
                  <p className="text-base leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                    {prop.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
