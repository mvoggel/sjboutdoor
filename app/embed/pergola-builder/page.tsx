import type { Metadata } from "next";
import PergolaEmbed from "./PergolaEmbed";

// Chrome-free, iframe-embeddable build of the configurator.
// The root layout's ChatWidget is gated off for /embed routes.
export const metadata: Metadata = {
  title: "Pergola Builder",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PergolaEmbed />;
}
