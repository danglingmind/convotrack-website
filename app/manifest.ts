import type { MetadataRoute } from "next";
import { DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ConvoTrack",
    short_name: "ConvoTrack",
    description: DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#080a0b",
    theme_color: "#080a0b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
