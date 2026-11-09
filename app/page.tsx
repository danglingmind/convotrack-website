import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Phone from "./components/Phone";
import AutoVideo from "./components/AutoVideo";
import JsonLd from "./components/JsonLd";
import { StoreButtons } from "./components/StoreButtons";
import { FAQ } from "@/lib/faq";
import { APP_STORE_URL, DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Facts />
        <Problem />
        <Film />
        <Showcase />
        <MoreFeatures />
        <HowItWorks />
        <UseCases />
        <Privacy />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pb-24 lg:pt-16">
        <div>
          <p className="rise rise-1 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-[0.8rem] text-ink-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2fb344]" aria-hidden />
            Group ride tracking app for iPhone
          </p>

          <h1 className="h-display rise rise-2 mt-6 text-[clamp(2.6rem,6.4vw,4.75rem)]">
            The group ride app that keeps every rider on{" "}
            <span className="mark">one&nbsp;map</span>.
          </h1>

          <p className="lede rise rise-3 mt-6 max-w-xl text-[1.125rem] leading-relaxed text-muted">
            ConvoTrack shows your whole group live, guides everyone with
            turn-by-turn voice navigation, and lets anyone call a regroup or an
            SOS in one tap. Built for motorcycle rides, road trips and convoys.
          </p>

          <div className="rise rise-4 mt-9">
            <StoreButtons />
            <p className="mt-5 text-sm text-faint">
              Free to download · Sign in with Apple or Google · Friends join
              with a link
            </p>
          </div>
        </div>

        <div className="rise rise-3 relative mx-auto w-full max-w-[440px] lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-[12%] rounded-full bg-lime/[0.07] blur-3xl"
          />
          <AutoVideo
            src="/video/walkthrough.mp4"
            poster="/video/walkthrough-poster.webp"
            label="ConvoTrack walkthrough: planning a ride to Nandi Hills, creating it, and starting navigation"
            className="video-blend relative aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Facts */
function Facts() {
  const facts = [
    { k: "Live", v: "Every rider's position on one map" },
    { k: "Voice", v: "Turn-by-turn navigation for the group" },
    { k: "1 tap", v: "Regroup or SOS, sent to everyone" },
    { k: "Link", v: "Invite by link, QR or 6-letter code" },
  ];
  return (
    <section aria-label="At a glance" className="border-y border-line">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={f.k}
            className={`py-7 pr-4 ${i % 2 ? "pl-5 sm:pl-8" : ""} ${
              i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""
            } ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <dt className="text-[1.35rem] font-semibold tracking-[-0.03em]">{f.k}</dt>
            <dd className="mt-1 text-sm leading-snug text-muted">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* --------------------------------------------------------------- Problem */
function Problem() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32">
      <p className="h-section text-[clamp(1.6rem,3.6vw,2.6rem)] text-ink">
        Group rides fall apart at the first junction.{" "}
        <span className="text-faint">
          Someone misses the exit, someone stops for fuel, and the rest of the
          day is phone calls at the side of the road. ConvoTrack keeps the
          whole group in view, so you spend the ride riding.
        </span>
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ Film */
function Film() {
  return (
    <section aria-labelledby="film-title" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <h2 id="film-title" className="h-section text-[clamp(1.5rem,3vw,2rem)]">
          What the group sees on the road.
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Every rider, the gap between you, and a regroup call, all on one
          live map.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line sm:rounded-3xl">
        <AutoVideo
          lazy
          src="/video/ride-film.mp4"
          smallSrc="/video/ride-film-sm.mp4"
          poster="/video/ride-film-poster.webp"
          label="Four riders on a winding road on the ConvoTrack live map, with distances between them and a regroup call"
          className="block aspect-[21/9] w-full object-cover"
        />
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Showcase */
const SHOWCASE = [
  {
    id: "live-map",
    label: "Live group map",
    title: "See every rider, live, on one map.",
    body: "Each rider appears on the map with their name and distance from you. Nobody has to pull over to count heads or guess which exit the lead bike took.",
    points: [
      "Distance to every rider, updated live",
      "Riders who drift off screen stay pinned to the edge",
      "An alert when the group stretches too far apart",
    ],
    src: "/screens/live-map-edge.webp",
    alt: "ConvoTrack live map with riders ahead of the screen pinned to its edge",
  },
  {
    id: "regroup",
    label: "Regroup",
    title: "Call a stop in one tap.",
    body: "Pick fuel, food or a scenic stop and everyone gets the call with a pin on their map. No hand signals, no shouting over engines.",
    points: [
      "Set the meet point: here, 100 m or 500 m away",
      "A banner and map pin for every rider",
      "Riders mark themselves arrived",
    ],
    src: "/screens/regroup.webp",
    alt: "ConvoTrack regroup sheet with fuel stop, food stop, scenic stop and emergency options",
  },
  {
    id: "emergency",
    label: "Emergency alerts",
    title: "When something goes wrong, everyone knows.",
    body: "The emergency button sends an urgent alert to the whole group with your position on the map, so they know who needs help and where to head.",
    points: [
      "One tap from the navigation screen",
      "Shows who raised it and where they are",
      "Separate from regroup, so it never gets missed",
    ],
    src: "/screens/emergency.webp",
    alt: "ConvoTrack emergency alert telling the group a rider needs help and where they are",
  },
  {
    id: "ride-summary",
    label: "Ride summary",
    title: "A ride report the moment you park.",
    body: "Distance, duration, average speed and how far the group ever split, plus the final order everyone arrived in. Share it as a card with the group.",
    points: [
      "Total distance, time and average speed",
      "Max group split for the whole ride",
      "A summary card made for sharing",
    ],
    src: "/screens/ride-summary.webp",
    alt: "ConvoTrack ride summary showing distance, duration, average speed and max group split",
  },
];

function Showcase() {
  return (
    <section id="features" className="on-night scroll-mt-16 border-y border-line bg-night text-ink">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow text-lime">Features</p>
          <h2 className="h-section mt-4 text-[clamp(2rem,4.6vw,3.25rem)]">
            Everything the group needs, on one screen.
          </h2>
          <p className="lede mt-5 text-lg leading-relaxed text-night-muted">
            Designed to be read at a glance from a handlebar mount: big numbers,
            clear alerts, nothing you have to dig for.
          </p>
        </div>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {SHOWCASE.map((f, i) => (
            <article
              key={f.id}
              id={f.id}
              className="grid scroll-mt-24 items-center gap-12 md:grid-cols-2 md:gap-16"
            >
              <div className={`mx-auto w-full max-w-[240px] md:max-w-[290px] ${i % 2 ? "md:order-2" : ""}`}>
                <Phone src={f.src} alt={f.alt} sizes="290px" className="!bg-night-3" />
              </div>
              <div className={i % 2 ? "md:order-1" : ""}>
                <p className="eyebrow text-night-muted">
                  <span className="text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2 opacity-40">/</span>
                  {f.label}
                </p>
                <h3 className="h-section mt-4 text-[clamp(1.6rem,3vw,2.25rem)]">
                  {f.title}
                </h3>
                <p className="lede mt-4 max-w-md leading-relaxed text-night-muted">{f.body}</p>
                <ul className="mt-8 max-w-md divide-y divide-night-line border-y border-night-line">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 py-3.5 text-[0.95rem]">
                      <CheckIcon className="shrink-0 text-lime" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- More features */
function MoreFeatures() {
  const items = [
    {
      icon: <IconNav />,
      title: "Turn-by-turn voice navigation",
      body: "Spoken directions to the destination for every rider, so the leader isn't the only one who knows the way.",
    },
    {
      icon: <IconRoute />,
      title: "Plan the route and stops",
      body: "Search a destination, compare routes and add stops before anyone rolls out.",
    },
    {
      icon: <IconUsers />,
      title: "Rider roles",
      body: "Ride Leader, Pace Keeper, Trail Guardian and Formation Riders, so everyone knows their place in the group.",
    },
    {
      icon: <IconLink />,
      title: "Invite by link, QR or code",
      body: "Share a link in the group chat, show a QR code, or read out a 6-letter code. Joining takes seconds.",
    },
    {
      icon: <IconCheck />,
      title: "Ready check in the lobby",
      body: "See who has joined and who is ready before the ride starts. No more waiting on the one rider still getting fuel.",
    },
    {
      icon: <IconShare />,
      title: "Share a route",
      body: "Send a route you've ridden to another group, so they can ride the same roads with ConvoTrack.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-muted">And the rest</p>
          <h2 className="h-section mt-4 text-[clamp(1.9rem,4vw,2.75rem)]">
            Small things that make a big ride easier.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="bg-card p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper text-lime ring-1 ring-inset ring-line">
                {it.icon}
              </div>
              <h3 className="mt-5 text-[1.05rem] font-semibold tracking-[-0.02em]">{it.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- How it works */
function HowItWorks() {
  const steps = [
    {
      title: "Plan the ride",
      body: "Set the destination, choose a route and add any stops along the way.",
    },
    {
      title: "Invite the group",
      body: "Share the link or code. Riders join the lobby and mark themselves ready.",
    },
    {
      title: "Ride as one",
      body: "Start the ride. Everyone navigates, sees the group live and can regroup in a tap.",
    },
  ];
  return (
    <section id="how-it-works" className="scroll-mt-16 border-y border-line bg-night">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow text-muted">How it works</p>
          <h2 className="h-section mt-4 text-[clamp(1.9rem,4vw,2.75rem)]">
            From the group chat to the open road in minutes.
          </h2>
          <ol className="mt-12 space-y-0">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] border-t border-line py-6 last:border-b">
                <span className="tabular pt-0.5 font-mono text-sm text-faint">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mx-auto w-full max-w-[240px] md:max-w-[280px]">
          <Phone
            src="/screens/lobby.webp"
            alt="ConvoTrack ride lobby with four riders marked ready and the invite code"
            sizes="280px"
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Use cases */
function UseCases() {
  const cases = [
    {
      title: "Motorcycle group rides",
      body: "Weekend loops, breakfast runs and long tours. Keep the pack together through traffic, ghats and highway exits.",
    },
    {
      title: "Road trips and car convoys",
      body: "Several cars, one destination. Everyone follows the same route and sees where the others are without calling.",
    },
    {
      title: "Riding clubs and tours",
      body: "Give the lead, sweep and pace riders clear roles, and get a full report of how the group rode.",
    },
  ];
  return (
    <section id="use-cases" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 sm:py-32">
      <p className="eyebrow text-muted">Who it&apos;s for</p>
      <h2 className="h-section mt-4 max-w-2xl text-[clamp(1.9rem,4vw,2.75rem)]">
        Built for any group that travels together.
      </h2>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {cases.map((c, i) => (
          <article
            key={c.title}
            className="rounded-2xl border border-line bg-card p-7 transition-colors hover:border-line-strong"
          >
            <span className="tabular font-mono text-sm text-faint">0{i + 1}</span>
            <h3 className="mt-10 text-xl font-semibold tracking-[-0.025em]">{c.title}</h3>
            <p className="mt-2.5 leading-relaxed text-muted">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Privacy */
function Privacy() {
  const points = [
    "Location is shared only while a ride is live",
    "Only the riders in your ride can see you",
    "Leave a ride and sharing stops immediately",
    "We never sell location data or use it for ads",
  ];
  return (
    <section id="privacy" className="scroll-mt-16 px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl border border-lime/15 bg-lime-soft px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow text-olive">Privacy</p>
          <h2 className="h-section mt-4 text-[clamp(1.9rem,4vw,2.75rem)]">
            Your location, only on the ride.
          </h2>
          <p className="lede mt-5 max-w-md leading-relaxed text-ink-2">
            A tracking app has to earn trust. ConvoTrack shares where you are
            with the people you chose to ride with, for as long as you ride
            with them, and nothing more.
          </p>
          <Link
            href="/privacy"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
          >
            Read the privacy policy <ArrowIcon />
          </Link>
        </div>
        <ul className="self-center divide-y divide-ink/10 border-y border-ink/10">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3.5 py-4 text-[1.02rem] text-ink">
              <CheckIcon className="shrink-0 text-olive" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- FAQ */
function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <p className="eyebrow text-muted">FAQ</p>
          <h2 className="h-section mt-4 text-[clamp(1.9rem,4vw,2.75rem)]">
            Questions riders ask.
          </h2>
          <p className="mt-5 text-muted">
            Something else?{" "}
            <Link href="/support" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              Visit support
            </Link>
            .
          </p>
        </div>
        <div className="border-t border-line">
          {FAQ.map((f, i) => (
            <details key={f.q} className="qa border-b border-line" open={i === 0}>
              <summary className="flex items-start justify-between gap-6 py-5 text-[1.05rem] font-medium tracking-[-0.015em]">
                <h3>{f.q}</h3>
                <PlusIcon className="qa-icon mt-1 shrink-0 text-faint" />
              </summary>
              <p className="-mt-1 max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Final CTA */
function FinalCta() {
  return (
    <section id="download" className="scroll-mt-16 px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="on-night relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-night px-6 py-16 text-ink sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime/[0.08] blur-3xl"
        />
        <div className="relative z-10 max-w-xl">
          <h2 className="h-section text-[clamp(2rem,4.8vw,3.25rem)]">
            Your next group ride, without the roadside phone calls.
          </h2>
          <p className="lede mt-5 text-lg leading-relaxed text-night-muted">
            Download ConvoTrack, create a ride and send the link to your group.
          </p>
          <StoreButtons tone="night" className="mt-9" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG */}
        <img
          src="/brand/mark.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 hidden w-[26rem] rotate-[-8deg] opacity-[0.07] md:block"
        />
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Structured data */
function StructuredData() {
  const app = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE_NAME,
    alternateName: "ConvoTrack: Group Ride Tracker",
    url: SITE_URL,
    description: DESCRIPTION,
    applicationCategory: "TravelApplication",
    applicationSubCategory: "Group ride tracking",
    operatingSystem: "iOS",
    downloadUrl: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    image: `${SITE_URL}/icon-512.png`,
    screenshot: SHOWCASE.map((s) => `${SITE_URL}${s.src}`),
    featureList: [
      "Live group map with every rider's position",
      "Turn-by-turn voice navigation",
      "One-tap regroup to fuel, food or scenic stops",
      "Emergency alerts to the whole group",
      "Group split alerts",
      "Invite by link, QR code or 6-character code",
      "Rider roles: Ride Leader, Pace Keeper, Trail Guardian, Formation Rider",
      "Ride summary with distance, duration, average speed and max group split",
      "Shareable routes",
    ],
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const video = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "ConvoTrack walkthrough: plan a group ride and start navigation",
    description:
      "A 20-second walkthrough of ConvoTrack: search a destination, compare routes, create a group ride and start turn-by-turn navigation.",
    thumbnailUrl: `${SITE_URL}/video/walkthrough-poster.webp`,
    contentUrl: `${SITE_URL}/video/walkthrough.mp4`,
    uploadDate: "2026-11-02",
    duration: "PT20S",
  };
  return (
    <>
      <JsonLd data={app} />
      <JsonLd data={faq} />
      <JsonLd data={video} />
    </>
  );
}

/* ------------------------------------------------------------------ Icons */
const ic = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...ic} width={18} height={18} strokeWidth={2} className={className}>
      <path d="m5 12.5 4.2 4L19 7" />
    </svg>
  );
}
function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...ic} width={18} height={18} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg {...ic} width={14} height={14} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconNav() {
  return (
    <svg {...ic}>
      <path d="M3 11 21 3l-8 18-2-8-8-2Z" />
    </svg>
  );
}
function IconRoute() {
  return (
    <svg {...ic}>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg {...ic}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c.6-3.4 3-5.2 6-5.2s5.4 1.8 6 5.2" />
      <path d="M16 4.8a3.2 3.2 0 0 1 0 6.4M18 14.9c1.6.6 2.7 2.3 3 5.1" />
    </svg>
  );
}
function IconLink() {
  return (
    <svg {...ic}>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg {...ic}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="m8 12.3 2.8 2.7L16 9.5" />
    </svg>
  );
}
function IconShare() {
  return (
    <svg {...ic}>
      <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
      <path d="M5 13v5a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-5" />
    </svg>
  );
}
