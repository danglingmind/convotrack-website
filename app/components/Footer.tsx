import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-outline-variant/40 bg-surface-lowest">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/brand/logo.png"
                alt="ConvoTrack"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full ring-1 ring-lime/40"
              />
              <span className="display text-2xl text-lime">ConvoTrack</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
              Live group-ride tracking for riders. Keep the whole pack on one
              map, hold formation, and never lose a rider on the road.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Product"
              links={[
                { href: "/#features", label: "Features" },
                { href: "/#how", label: "How it works" },
                { href: "/#roles", label: "Rider roles" },
                { href: "/#download", label: "Download" },
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                { href: "/support", label: "Support" },
                { href: "mailto:hello@vynl.in", label: "Contact" },
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-outline-variant/40 pt-6 sm:flex-row sm:items-center">
          <p className="label-caps text-on-surface-variant/70">
            © {new Date().getFullYear()} ConvoTrack · vynl.in
          </p>
          <p className="data-mono text-xs text-on-surface-variant/60">
            Built for the road.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="label-caps text-lime/80">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
