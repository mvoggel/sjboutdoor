import type { Metadata, Viewport } from "next";
import { Cormorant } from "next/font/google";
import "./globals.css";
import { ConsultModalProvider } from "@/components/ui/ConsultModalProvider";
import { ChatWidgetGate } from "@/components/ui/ChatWidgetGate";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  IS_STAGING,
  BRAND_NAME,
  PHONE_E164,
  EMAIL,
  OPENING_HOURS,
  PRICE_RANGE,
  SAME_AS,
  DEFAULT_OG_IMAGE,
  LOGO_PATH,
  absUrl,
  PARENT_ORG,
  OWNER,
  KNOWS_ABOUT,
  CREDENTIALS,
  AGGREGATE_RATING,
} from "@/lib/site";
import { SERVICE_CITIES } from "@/lib/service-areas";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const TITLE_DEFAULT = `${BRAND_NAME} | Luxury Outdoor Living — Florida`;
const DESCRIPTION =
  "Custom exterior shades, retractable awnings, louvered pergolas, and exterior shutters for Florida homeowners. Free in-home consultations across 15 Florida cities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: `%s | ${BRAND_NAME}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  // Keep staging (GitHub Pages) out of the index so it doesn't compete with the
  // apex domain as duplicate content. Flips automatically at cutover.
  ...(IS_STAGING ? { robots: { index: false, follow: false } } : {}),
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  openGraph: {
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: "/",
    siteName: BRAND_NAME,
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: BRAND_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

// ── Sitewide entity schema — the canonical record Google's Knowledge Graph and
// AI answer engines anchor to. NAP values come from lib/site.ts (must match GBP).
// Service Area Business configuration (Mader Marketing AEO package, July 2026):
// no street address in the markup — `areaServed` defines the territory, and
// `parentOrganization` ties the entity to South Jersey Blinds & Beyond.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: BRAND_NAME,
  url: SITE_URL,
  logo: absUrl(LOGO_PATH),
  image: absUrl(DEFAULT_OG_IMAGE),
  description: DESCRIPTION,
  telephone: PHONE_E164,
  email: EMAIL,
  priceRange: PRICE_RANGE,
  parentOrganization: PARENT_ORG,
  openingHoursSpecification: OPENING_HOURS,
  areaServed: SERVICE_CITIES.map((c) => ({
    "@type": "City",
    name: `${c.name}, FL`,
  })),
  founder: { "@type": "Person", name: OWNER.name },
  employee: { "@type": "Person", name: OWNER.name, jobTitle: OWNER.jobTitle },
  knowsAbout: KNOWS_ABOUT,
  hasCredential: CREDENTIALS,
  aggregateRating: AGGREGATE_RATING,
  ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cormorant.variable}
    >
      <body>
        {/* Google Tag Manager — runs ALONGSIDE the direct GA4 gtag below. GTM is
            the container for Google Ads conversions + future marketing tags.
            IMPORTANT: do NOT add a GA4 config tag inside this GTM container —
            GA4 already fires directly (GA_ID block) and duplicating it here
            would double-count every pageview. Placed as high in <body> as the
            App Router allows, with the <noscript> fallback first, per Google's
            install guide. Env-gated so it stays dormant until NEXT_PUBLIC_GTM_ID
            is set (locally + in Cloudflare Pages env). */}
        {GTM_ID && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
          </>
        )}
        <JsonLd data={orgJsonLd} />
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
              }}
            />
          </>
        )}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
<ConsultModalProvider>{children}</ConsultModalProvider>
        <ChatWidgetGate />
      </body>
    </html>
  );
}
