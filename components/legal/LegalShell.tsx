import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

/**
 * Shared chrome for long-form prose pages (Privacy, Terms). Renders the standard
 * header/footer plus a centered, readable measure. Content is passed as children
 * and styled by the `.legal-prose` rules in globals.css.
 */
export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main id="main-content" style={{ background: "var(--bg-pure)" }}>
        <section className="pt-32 md:pt-40 pb-16 md:pb-20" style={{ borderBottom: "1px solid var(--rich-sand)" }}>
          <Container>
            <div style={{ maxWidth: "70ch" }}>
              <p className="text-eyebrow mb-4">{eyebrow}</p>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 500,
                  color: "var(--ink-primary)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.05,
                }}
              >
                {title}
              </h1>
              <p
                className="mt-5 text-sm"
                style={{ color: "var(--ink-muted)", letterSpacing: "0.04em" }}
              >
                Last updated: {updated}
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container>
            <div className="legal-prose" style={{ maxWidth: "70ch" }}>
              {children}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
