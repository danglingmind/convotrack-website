import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Search engines and AI assistants (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) are all
// welcome on the public pages. Invite and shared-route links are private, one-off fallbacks.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/join/", "/route/", "/aasa", "/assetlinks"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
