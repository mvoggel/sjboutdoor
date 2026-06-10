import type { Metadata } from "next";
import AwningEmbed from "./AwningEmbed";

// Chrome-free, iframe-embeddable build of the configurator.
// The root layout's ChatWidget is gated off for /embed routes.
export const metadata: Metadata = {
  title: "Awning Builder",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AwningEmbed />;
}
