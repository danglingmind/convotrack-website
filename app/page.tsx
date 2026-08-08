import Image from "next/image";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import RouteScene from "./components/RouteScene";
import ScrollFX from "./components/ScrollFX";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollFX />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Stats />
        <Features />
        <HowItWorks />
        <Roles />
        <Download />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */
function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <RouteScene />
      {/* Legibility gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-lowest/40 via-transparent to-surface-lowest" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-lowest to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-outline-variant/50 bg-surface-low/60 px-3.5 py-1.5 backdrop-blur">
          <span className="live-dot h-2 w-2 rounded-full bg-green" />
          <span className="label-caps text-on-surface-variant">
            Live group-ride tracking
          </span>
        </div>

        <h1 className="display mt-6 max-w-4xl text-[clamp(3rem,9vw,7.5rem)] text-on-surface">
          Ride together.
          <br />
          <span className="text-lime">Never lose the&nbsp;pack.</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-on-surface-variant text-balance">
          ConvoTrack puts every rider on one live map. Roll out as a group,
          hold formation, regroup in a single tap, and get a full ride report
          the moment you arrive.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#download" className="btn-lime">
            Get the app
          </a>
          <a href="#how" className="btn-ghost">
            See how it works
          </a>
        </div>

        {/* Floating telemetry, mirrors the app's FloatingStatPill */}
        <div className="mt-16 flex flex-wrap gap-3">
          <StatPill label="Pack" value="6" unit="riders" dot="lime" />
          <StatPill label="Lead progress" value="42.8" unit="km" />
          <StatPill label="Group split" value="120" unit="m" dot="green" />
          <StatPill label="Status" value="LIVE" dot="green" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="label-caps animate-pulse text-on-surface-variant/60">
          Scroll ↓
        </span>
      </div>
    </section>
  );
}

function StatPill({
  label,
  value,
  unit,
  dot,
}: {
  label: string;
  value: string;
  unit?: string;
  dot?: "lime" | "green";
}) {
  return (
    <div className="glass rounded-xl px-4 py-3">
      <div className="label-caps text-on-surface-variant/80">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        {dot && (
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              dot === "lime" ? "bg-lime" : "bg-green"
            }`}
          />
        )}
        <span
          className={`data-mono text-base font-bold ${
            dot === "green" ? "text-green" : "text-on-surface"
          }`}
        >
          {value}
        </span>
        {unit && (
          <span className="text-[11px] text-on-surface-variant">{unit}</span>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Marquee */
function Marquee() {
  const items = [
    "LIVE MAP",
    "◆",
    "HOLD FORMATION",
    "◆",
    "REGROUP",
    "◆",
    "EMERGENCY ALERTS",
    "◆",
    "INVITE BY LINK",
    "◆",
    "RIDE REPORT",
    "◆",
    "TURN-BY-TURN",
    "◆",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-outline-variant/40 bg-lime py-4">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-on-lime"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Stats */
function Stats() {
  const stats = [
    { end: "0", count: "0", label: "Riders left behind", suffix: "" },
    { end: "1", count: "1", label: "Map, every rider", suffix: "" },
    { end: "6", count: "6", label: "Char invite codes", suffix: "" },
    { end: "100", count: "100", label: "Live updates", suffix: "%" },
  ];
  return (
    <section className="relative border-b border-outline-variant/40 bg-surface-lowest py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="reveal">
            <div className="display flex items-baseline text-6xl text-lime sm:text-7xl">
              <span data-count={s.count}>0</span>
              <span>{s.suffix}</span>
            </div>
            <div className="mt-3 max-w-[10rem] text-sm text-on-surface-variant">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Features */
function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 py-28">
      <div className="absolute inset-0 grid-lines opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          kicker="What it does"
          title="Everything the pack needs, on one screen."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          {/* Big feature — live map */}
          <FeatureCard
            className="md:col-span-4 md:row-span-2"
            big
            icon={<IconMap />}
            title="Live map, every rider"
            body="See the whole convoy move in real time — each rider as a pin with their photo, role, and live position. No more pulling over to count heads."
          >
            <div className="mt-8 grid grid-cols-3 gap-3">
              <MiniStat label="Pack" value="6" />
              <MiniStat label="Split" value="120 m" tone="green" />
              <MiniStat label="Lead" value="42.8 km" />
            </div>
          </FeatureCard>

          <FeatureCard
            className="md:col-span-2"
            icon={<IconRegroup />}
            title="Regroup in a tap"
            body="Fuel, food, or a photo stop — ping everyone to pull in at once."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={<IconAlert />}
            title="Emergency alerts"
            body="One button broadcasts trouble to the entire group instantly."
            tone="error"
          />
          <FeatureCard
            className="md:col-span-3"
            icon={<IconLink />}
            title="Invite by link"
            body="Share a tappable link or 6-char code. Riders join in seconds — no accounts to hunt for."
          />
          <FeatureCard
            className="md:col-span-3"
            icon={<IconReport />}
            title="Ride report"
            body="Distance, duration, and how far the group ever stretched — a full summary the moment you park."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  className = "",
  big = false,
  tone,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
  big?: boolean;
  tone?: "error" | "green";
  children?: React.ReactNode;
}) {
  const accent =
    tone === "error"
      ? "text-error"
      : tone === "green"
        ? "text-green"
        : "text-lime";
  return (
    <div
      className={`reveal group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-low/60 p-7 transition-colors hover:border-lime/40 ${className}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container ${accent} ring-1 ring-inset ring-outline-variant/60 transition-colors group-hover:ring-lime/50`}
      >
        {icon}
      </div>
      <h3
        className={`display mt-6 text-on-surface ${big ? "text-3xl sm:text-4xl" : "text-2xl"}`}
      >
        {title}
      </h3>
      <p
        className={`mt-3 leading-relaxed text-on-surface-variant ${big ? "max-w-md text-base" : "text-sm"}`}
      >
        {body}
      </p>
      {children}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lime/5 blur-3xl transition-opacity group-hover:bg-lime/10" />
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green";
}) {
  return (
    <div className="rounded-xl border border-outline-variant/50 bg-surface-container/60 px-4 py-3">
      <div className="label-caps text-on-surface-variant/70">{label}</div>
      <div
        className={`data-mono mt-1 text-lg font-bold ${
          tone === "green" ? "text-green" : "text-on-surface"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- How it works */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Create a ride",
      body: "Drop a destination, pick your route from live alternatives, and set the pack rolling.",
    },
    {
      n: "02",
      title: "Share the link",
      body: "Send a tappable invite. Riders join the lobby and mark ready — you see them light up.",
    },
    {
      n: "03",
      title: "Roll out",
      body: "Everyone tracks everyone. Regroup, reroute, or call it — then read the report at the end.",
    },
  ];
  return (
    <section id="how" className="relative scroll-mt-20 border-y border-outline-variant/40 bg-surface-lowest py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader kicker="How it works" title="From solo to convoy in three steps." />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-outline-variant/50 bg-outline-variant/40 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="reveal group relative flex flex-col bg-surface-low p-8 transition-colors hover:bg-surface-container sm:p-10"
            >
              <span className="data-mono text-sm text-lime">{s.n}</span>
              <div className="mt-8 h-px w-full bg-outline-variant/40" />
              <h3 className="display mt-8 text-3xl text-on-surface">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Roles */
function Roles() {
  const roles = [
    {
      title: "Ride Leader",
      body: "Sets the route and pace. The pack's progress is measured against the leader.",
    },
    {
      title: "Pace Keeper",
      body: "Holds the rhythm mid-pack so the group never stretches too thin.",
    },
    {
      title: "Trail Guardian",
      body: "Rides sweep at the back — the last set of eyes, nobody left behind.",
    },
    {
      title: "Formation Rider",
      body: "The core of the convoy, tracked live and ready to regroup on call.",
    },
  ];
  return (
    <section id="roles" className="relative scroll-mt-20 py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal">
            <SectionHeader
              kicker="Roles"
              title="Every rider has a place in the pack."
              align="left"
            />
            <p className="mt-6 max-w-md text-on-surface-variant leading-relaxed">
              ConvoTrack gives the group structure without the shouting. Assign
              roles, and the map reflects who's leading, holding pace, and
              sweeping the tail.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {roles.map((r, i) => (
              <div
                key={r.title}
                className="reveal rounded-2xl border border-outline-variant/50 bg-surface-low/60 p-6 transition-colors hover:border-lime/40"
              >
                <div className="flex items-center gap-3">
                  <span className="data-mono text-xs text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-outline-variant/40" />
                </div>
                <h3 className="display mt-5 text-2xl text-lime">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Download */
function Download() {
  return (
    <section id="download" className="relative scroll-mt-20 overflow-hidden py-32">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/10 blur-[120px]"
        data-parallax="-20"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Image
          src="/brand/logo.png"
          alt="ConvoTrack"
          width={80}
          height={80}
          className="reveal mx-auto h-20 w-20 rounded-full ring-1 ring-lime/40"
        />
        <h2
          data-fx="split"
          className="display mt-8 text-[clamp(2.5rem,7vw,5.5rem)] text-on-surface"
        >
          Bring the whole pack.
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg text-on-surface-variant text-balance">
          Download ConvoTrack and turn your next group ride into a convoy that
          moves as one.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#" className="btn-store">
            <IconApple />
            App Store
          </a>
          <a href="#" className="btn-store">
            <IconPlay />
            Google Play
          </a>
        </div>
        <p className="reveal label-caps mt-8 text-on-surface-variant/60">
          iOS &amp; Android · Free to ride
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Shared header */
function SectionHeader({
  kicker,
  title,
  align = "center",
}: {
  kicker: string;
  title: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <div
        className={`inline-flex items-center gap-2 ${align === "center" ? "" : ""}`}
      >
        <span className="h-px w-8 bg-lime" />
        <span className="label-caps text-lime">{kicker}</span>
      </div>
      <h2
        data-fx="split"
        className={`display mt-5 text-4xl text-on-surface sm:text-5xl ${
          align === "center" ? "" : ""
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

/* ----------------------------------------------------------------- Icons */
function IconMap() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}
function IconRegroup() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
function IconAlert() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}
function IconLink() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
    </svg>
  );
}
function IconReport() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}
function IconApple() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 3 2.3 1.2 0 1.6-.8 3.1-.8s1.8.8 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.8ZM14.1 5.2c.7-.8 1.1-2 1-3.2-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.5 2.9-1.3Z" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.191l11.04 10.985zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}
