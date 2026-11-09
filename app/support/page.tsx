import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import JsonLd from "../components/JsonLd";
import { FAQ } from "@/lib/faq";
import { CONTACT_EMAIL, PRIVACY_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with ConvoTrack: inviting riders, location sharing, regroup and emergency alerts, rider roles and ride summaries. Contact the team.",
  alternates: { canonical: "/support" },
};

// Support-only questions; the general product questions come from the shared FAQ.
const MORE = [
  {
    q: "How do I invite riders to a ride?",
    a: "Create a ride, then share the invite link, show the QR code, or read out the 6-character code from the lobby. Tapping the link opens ConvoTrack straight into the join screen.",
  },
  {
    q: "What do the rider roles mean?",
    a: "Ride Leader sets the route and pace, Pace Keeper holds the rhythm mid-pack, Trail Guardian rides sweep at the back, and Formation Riders make up the core of the group.",
  },
  {
    q: "What's the difference between Regroup and Emergency?",
    a: "Regroup calls the group to pull in for fuel, food or a scenic stop. Emergency is a separate, urgent broadcast that tells everyone a rider needs help and where they are.",
  },
  {
    q: "What's in the ride summary?",
    a: "When a ride ends you get the total distance, duration, average speed, the largest the group ever split apart, and the order riders arrived in.",
  },
  {
    q: "Does the app work in the background?",
    a: "Yes. ConvoTrack keeps you on the live map while the ride is active, even with your phone in a pocket or mounted for navigation.",
  },
];

const ALL = [...MORE, ...FAQ.filter((f) => !MORE.some((m) => m.q === f.q))];

export default function Support() {
  return (
    <PageShell
      kicker="Support"
      title="How can we help?"
      intro="Answers to the questions riders ask most, and a direct line to the team when you need a person."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ALL.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="not-prose mb-14 grid gap-3 sm:grid-cols-2">
        <ContactCard
          href={`mailto:${CONTACT_EMAIL}`}
          label="General help"
          email={CONTACT_EMAIL}
          body="Questions, feedback and account help."
        />
        <ContactCard
          href={`mailto:${PRIVACY_EMAIL}`}
          label="Privacy and data"
          email={PRIVACY_EMAIL}
          body="Data access and deletion requests."
        />
      </div>

      <h2>Frequently asked questions</h2>
      {ALL.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <hr />
      <p>
        Still stuck? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we&rsquo;ll
        get back to you.
      </p>
    </PageShell>
  );
}

function ContactCard({
  href,
  label,
  email,
  body,
}: {
  href: string;
  label: string;
  email: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-line bg-card p-6 transition-colors hover:border-faint"
    >
      <span className="text-sm text-muted">{label}</span>
      <span className="mt-2 block text-lg font-semibold tracking-[-0.02em] text-ink">{email}</span>
      <span className="mt-1 block text-sm text-muted">{body}</span>
    </a>
  );
}
