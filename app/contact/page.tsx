import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { GhlContactForm } from "@/components/contact/GhlContactForm";
import { Mail, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_E164, EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to a real person about your outdoor living project — phone, email, or live chat. SJB Outdoor Living serves homeowners across Florida.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main id="main-content" style={{ background: "var(--bg-pure)" }}>
        {/* ── Hero: copy + chat panel ─────────────────────────────── */}
        <section
          className="pt-32 md:pt-40 pb-20 md:pb-28 relative overflow-hidden"
          style={{ borderBottom: "1px solid var(--rich-sand)" }}
        >
          {/* Subtle background flourish */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 60% at 80% 0%, rgba(184,146,74,0.07) 0%, transparent 60%)",
            }}
          />

          <Container className="relative">
            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
              {/* Left: heading + contact methods */}
              <div>
                <p className="text-eyebrow mb-4">Get in touch</p>
                <h1
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(2rem, 5vw, 3.75rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.05,
                    maxWidth: "20ch",
                  }}
                >
                  A real person, on the other end of every message.
                </h1>
                <p
                  className="mt-5 text-base"
                  style={{ color: "var(--ink-muted)", maxWidth: "52ch", lineHeight: 1.7 }}
                >
                  When you&apos;re picking out the thing that will frame your view
                  for the next decade, talking to a human matters. Call, email,
                  or start a chat — whichever feels easiest.
                </p>

                {/* Contact tiles */}
                <ul className="mt-10 grid sm:grid-cols-2 gap-4 max-w-xl">
                  <ContactTile
                    icon={<Phone size={18} strokeWidth={1.6} />}
                    label="Call us"
                    primary={PHONE_DISPLAY}
                    sub="Weekdays, 9 AM – 6 PM ET"
                    href={`tel:${PHONE_E164}`}
                  />
                  <ContactTile
                    icon={<Mail size={18} strokeWidth={1.6} />}
                    label="Email us"
                    primary={EMAIL}
                    sub="We reply within one business day"
                    href={`mailto:${EMAIL}`}
                    breakWord
                  />
                </ul>
              </div>

              {/* Right: chat panel */}
              <div className="lg:pt-2 min-w-0">
                <GhlContactForm />
                <p
                  className="mt-4 text-center"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                  }}
                >
                  Sent straight to our team in Florida
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── What happens next ───────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-2xl mb-12">
              <p className="text-eyebrow mb-3">What happens next</p>
              <h2 className="text-h2" style={{ color: "var(--ink-primary)" }}>
                From hello to install — in a straight line.
              </h2>
            </div>

            <ol className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  n: "01",
                  t: "We listen",
                  b: "Your style, your light, your privacy, your budget. We start with the room — not the product.",
                },
                {
                  n: "02",
                  t: "We measure",
                  b: "Free in-home visit from one of our specialists. Exact measurements, real swatches, honest pricing.",
                },
                {
                  n: "03",
                  t: "We install",
                  b: "Our own crew, in our own trucks. Clean install, careful walk-through, lifetime warranty.",
                },
              ].map((s) => (
                <li key={s.n} className="relative pl-0">
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "3rem",
                      fontWeight: 450,
                      color: "var(--rich-warm)",
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                      opacity: 0.5,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    aria-hidden="true"
                    style={{
                      width: "2rem",
                      height: 1,
                      background: "var(--rich-warm)",
                      margin: "1rem 0 1.25rem",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.4rem",
                      fontWeight: 550,
                      color: "var(--ink-primary)",
                      letterSpacing: "0.01em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {s.t}
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}
                  >
                    {s.b}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ContactTile({
  icon,
  label,
  primary,
  sub,
  href,
  breakWord,
}: {
  icon: React.ReactNode;
  label: string;
  primary: React.ReactNode;
  sub: string;
  /** When set, the entire tile becomes a clickable link (e.g. tel: / mailto:). */
  href?: string;
  breakWord?: boolean;
}) {
  const inner = (
    <>
      <div className="flex items-center gap-2.5 mb-2">
        <span
          className="flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            borderRadius: "6px",
            background: "rgba(184,146,74,0.12)",
            color: "var(--rich-warm)",
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--rich-warm)",
            fontFamily: "var(--font-cormorant), serif",
          }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-[color:var(--ink-primary)] transition-colors group-hover:text-[var(--rich-warm)]"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.05rem",
          fontWeight: 550,
          lineHeight: 1.35,
          ...(breakWord ? { wordBreak: "break-word" } : null),
        }}
      >
        {primary}
      </p>
      <p className="mt-1 text-xs" style={{ color: "var(--ink-muted)" }}>
        {sub}
      </p>
    </>
  );

  // Border/background live in classes (not inline styles) so the hover
  // variants can actually override them.
  const tileClass =
    "block h-full p-4 rounded-[10px] border border-[var(--rich-sand)] bg-white/50";

  return (
    <li>
      {href ? (
        <a
          href={href}
          className={`group ${tileClass} transition-colors hover:border-[var(--rich-warm)] hover:bg-[rgba(184,146,74,0.06)]`}
        >
          {inner}
        </a>
      ) : (
        <div className={tileClass}>{inner}</div>
      )}
    </li>
  );
}
