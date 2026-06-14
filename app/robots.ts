import type { MetadataRoute } from "next";
import { SITE_URL, IS_STAGING } from "@/lib/site";

export const dynamic = "force-static";

/**
 * robots.txt
 *
 * Explicitly welcomes the major AI / answer-engine crawlers in addition to
 * standard search bots — being crawlable is what makes the site *eligible* to be
 * cited as a recommended answer in ChatGPT, Perplexity, Google AI, etc.
 *
 * On the GitHub Pages staging host everything is disallowed so the dev URL isn't
 * indexed as duplicate content against the apex domain. This flips automatically
 * once NEXT_PUBLIC_SITE_URL points at the production domain.
 *
 * Note: robots.txt and the sitemap are only discoverable at a domain root, so
 * they take effect at the apex domain — not under the github.io/sjboutdoor path.
 */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  if (IS_STAGING) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
