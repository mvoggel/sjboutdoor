import type { MetadataRoute } from "next";
import { BRAND_NAME, DESCRIPTION_SHORT } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} — Luxury Outdoor Living`,
    short_name: BRAND_NAME,
    description: DESCRIPTION_SHORT,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfbf7",
    theme_color: "#0e1a1f",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
