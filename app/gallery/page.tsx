import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Gallery | SJB Outdoors",
  description:
    "Browse completed outdoor living installations — exterior shades, shutters, awnings, and louvered pergolas across Southwest Florida.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        style={{ background: "var(--bg-pure)", minHeight: "80vh" }}
      >
        {/* Page header */}
        <section
          className="pt-32 pb-16 md:pt-40 md:pb-20"
          style={{ borderBottom: "1px solid var(--rich-sand)" }}
        >
          <Container>
            <p className="text-eyebrow mb-4">Our Work</p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 500,
                color: "var(--ink-primary)",
                letterSpacing: "0.01em",
                lineHeight: 1.1,
                maxWidth: "18ch",
              }}
            >
              Every installation, crafted to last.
            </h1>
            <p
              className="mt-4 text-base"
              style={{ color: "var(--ink-muted)", maxWidth: "52ch", lineHeight: 1.7 }}
            >
              Browse completed projects across Southwest Florida — from motorized
              patio screens to louvered pergolas and Bahama shutters.
            </p>
          </Container>
        </section>

        {/* Coming soon placeholder */}
        <section className="py-24">
          <Container>
            <div
              className="flex flex-col items-center justify-center text-center py-16"
              style={{
                border: "1px solid var(--rich-sand)",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                  marginBottom: "1rem",
                }}
              >
                Coming Soon
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  fontWeight: 500,
                  color: "var(--ink-primary)",
                  letterSpacing: "0.01em",
                }}
              >
                Gallery is being curated.
              </p>
              <p
                className="mt-3 text-sm"
                style={{ color: "var(--ink-muted)", maxWidth: "40ch", lineHeight: 1.65 }}
              >
                We&rsquo;re photographing our latest installations. A full gallery of
                Southwest Florida projects will be live shortly.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
