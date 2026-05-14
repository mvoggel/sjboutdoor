import type { Metadata } from "next";
import { Cormorant } from "next/font/google";
import "./globals.css";
import { ConsultModalProvider } from "@/components/ui/ConsultModalProvider";
import { ChatWidget } from "@/components/ui/ChatWidget";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SJBB Outdoors | Luxury Outdoor Living — Florida",
  description:
    "Custom exterior shades, retractable awnings, and louvered pergolas for discerning Florida homeowners. Free in-home consultations across Naples, Bonita Springs, and Marco Island.",
  openGraph: {
    title: "SJBB Outdoors | Luxury Outdoor Living — Florida",
    description:
      "Custom exterior shades, retractable awnings, and louvered pergolas for discerning Florida homeowners.",
    type: "website",
  },
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
<ConsultModalProvider>{children}</ConsultModalProvider>
        <ChatWidget />
      </body>
    </html>
  );
}
