import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE = "https://vynl.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "ConvoTrack — Ride together. Never lose the pack.",
    template: "%s · ConvoTrack",
  },
  description:
    "ConvoTrack is live group-ride tracking for riders. See every rider on one map in real time, hold formation, regroup in a tap, and get a full ride report when you arrive.",
  keywords: [
    "group ride tracking",
    "motorcycle convoy app",
    "live rider tracking",
    "ride together",
    "ConvoTrack",
  ],
  applicationName: "ConvoTrack",
  openGraph: {
    title: "ConvoTrack — Ride together. Never lose the pack.",
    description:
      "Live group-ride tracking for riders. One map, every rider, in real time.",
    url: SITE,
    siteName: "ConvoTrack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConvoTrack — Ride together. Never lose the pack.",
    description: "Live group-ride tracking for riders. One map, every rider.",
  },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/appicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-lowest text-on-surface">
        {children}
      </body>
    </html>
  );
}
