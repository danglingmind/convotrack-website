import Link from "next/link";
import { Logo } from "./Brand";
import { APP_STORE_URL, CONTACT_EMAIL } from "@/lib/site";

const COLS = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#use-cases", label: "Who it's for" },
      { href: "/#faq", label: "FAQ" },
      { href: APP_STORE_URL, label: "App Store", external: true },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/support", label: "Support" },
      { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
      { href: "/delete-account", label: "Delete account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Group ride tracking for motorcycle rides, road trips and convoys.
              Everyone on one live map, from the first junction to the last.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <h2 className="text-sm font-medium text-ink">{c.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      {"external" in l ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener"
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} ConvoTrack</p>
          <p>Ride together. Arrive together.</p>
        </div>
      </div>
    </footer>
  );
}
