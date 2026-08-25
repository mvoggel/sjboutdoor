"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Wind,
  Radio,
  ArrowDownToLine,
  Columns3,
  Smartphone,
  ToggleRight,
  Anchor,
  Home,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Accessory = {
  Icon: LucideIcon;
  title: string;
  body: string;
};

const ACCESSORIES: Accessory[] = [
  {
    Icon: Wind,
    title: "Wireless Wind Sensor",
    body: "Automatically retracts your awning when gusts pick up — protecting the fabric and arms even when you're away from home.",
  },
  {
    Icon: Radio,
    title: "Multi-Channel Remote",
    body: "Drive several awnings — or awnings and screens — independently or together from a single handheld remote.",
  },
  {
    Icon: ArrowDownToLine,
    title: "Front Drop Screen",
    body: "A drop-down solar screen on the front bar blocks low-angle sun and adds privacy. Innovative meshes cut up to 97% of heat and glare while you keep the view.",
  },
  {
    Icon: Columns3,
    title: "Wind Poles",
    body: "Removable support poles anchor the front bar for extra stability in open, breezy, or coastal locations.",
  },
  {
    Icon: Smartphone,
    title: "Bond Bridge / Bond Bridge Pro",
    body: "Bring your awning onto Wi-Fi so you can open, close, and schedule it from your phone — and link it into your smart home.",
  },
  {
    Icon: ToggleRight,
    title: "Somfy TaHoma Switch",
    body: "A smart-home hub that ties your awning to app control, automations, and voice assistants like Alexa and Google Home.",
  },
  {
    Icon: Anchor,
    title: "Bay Mount Brackets",
    body: "Purpose-built brackets to mount cleanly across bay windows and irregular wall geometry.",
  },
  {
    Icon: Home,
    title: "Roof Mount Brackets",
    body: "Lift the awning up to the roofline or soffit when wall mounting isn't ideal for your home's structure.",
  },
];

export function AwningAccessories() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      style={{
        background: "var(--bg-pure)",
        borderTop: "1px solid var(--rich-sand)",
        padding: "5rem 0 5.5rem",
      }}
    >
      <Container>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: "2.5rem", maxWidth: "52rem" }}
        >
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--rich-warm)",
              marginBottom: "1rem",
            }}
          >
            Optional Accessories
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              fontWeight: 550,
              color: "var(--ink-primary)",
              lineHeight: 1.15,
              letterSpacing: "0.005em",
              marginBottom: "0.85rem",
            }}
          >
            Make it smarter, steadier, and more yours.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--ink-muted)",
              maxWidth: "60ch",
            }}
          >
            Add only what fits the way you live outdoors — from automatic wind protection to
            full smart-home control. Hover or tap any option to learn more.
          </p>
        </motion.div>

        <div className="accGrid">
          {ACCESSORIES.map((a, i) => (
            <motion.article
              key={a.title}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: EASE }}
              className="accCard"
            >
              <span aria-hidden="true" className="accIcon">
                <a.Icon size={22} strokeWidth={1.4} />
              </span>
              <h3 className="accTitle">{a.title}</h3>
              <p className="accBody">{a.body}</p>
            </motion.article>
          ))}
        </div>
      </Container>

      <style jsx>{`
        .accGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--rich-sand);
          border: 1px solid var(--rich-sand);
        }
        @media (min-width: 768px) {
          .accGrid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .accCard {
          position: relative;
          background: var(--bg-pure);
          padding: 1.75rem 1.4rem 1.6rem;
          overflow: hidden;
          transition: background 0.25s ease;
        }
        .accCard::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--rich-warm);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s ease;
        }
        .accCard:hover {
          background: rgba(184, 146, 74, 0.04);
        }
        .accCard:hover::before {
          transform: scaleY(1);
        }
        .accIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          border: 1px solid rgba(184, 146, 74, 0.3);
          color: var(--rich-warm);
          margin-bottom: 1.1rem;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .accCard:hover .accIcon {
          background: rgba(184, 146, 74, 0.1);
          transform: translateY(-2px);
        }
        .accTitle {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--ink-primary);
          line-height: 1.2;
          margin-bottom: 0.55rem;
        }
        .accBody {
          font-size: 0.88rem;
          line-height: 1.65;
          color: var(--ink-muted);
        }
      `}</style>
    </section>
  );
}

export default AwningAccessories;
