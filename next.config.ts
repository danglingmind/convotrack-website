import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Universal Link / App Link verification files must be reachable at their
  // canonical /.well-known/* paths. Next's App Router won't route a folder
  // literally named ".well-known", so we serve them from plain route handlers
  // (app/aasa, app/assetlinks) and rewrite the well-known paths onto them.
  async rewrites() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/aasa",
      },
      {
        source: "/.well-known/assetlinks.json",
        destination: "/assetlinks",
      },
    ];
  },
};

export default nextConfig;
