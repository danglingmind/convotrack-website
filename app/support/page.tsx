import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Support",
  description: "Help, FAQs, and how to reach the ConvoTrack team.",
};

const FAQ = [
  {
    q: "How do I invite riders to a ride?",
    a: "Create a ride, then share the invite link or the 6-character code from the lobby. Tapping the link opens ConvoTrack straight into the join screen — no account hunting required.",
  },
  {
    q: "When is my location shared?",
    a: "Only while a ride is live, and only with the riders in that same ride. When the ride ends, live location sharing stops. You can leave a ride at any time to stop sharing immediately.",
  },
  {
    q: "What do the rider roles mean?",
    a: "Roles give the group structure: Ride Leader sets route and pace, Pace Keeper holds the rhythm mid-pack, Trail Guardian sweeps the back, and Formation Riders make up the core of the convoy.",
  },
  {
    q: "What's the difference between Regroup and Emergency?",
    a: "Regroup pings the group to pull in for fuel, food, or a scenic stop. Emergency is a separate, urgent broadcast that alerts everyone something is wrong.",
  },
  {
    q: "What's in the ride report?",
    a: "When a ride ends you get a summary: actual duration, distance covered, and the largest the group ever split apart during the ride.",
  },
  {
    q: "Does the app work in the background?",
    a: "Yes — ConvoTrack keeps you on the live map while the ride is active, even when your phone is in your pocket or mounted for navigation.",
  },
];

export default function Support() {
  return (
    <PageShell
      kicker="Support"
      title="We've got your back."
      intro="Answers to the most common questions, and a direct line to the team when you need a human."
    >
      <div className="not-prose mb-14 grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:hello@vynl.in"
          className="group rounded-2xl border border-outline-variant/50 bg-surface-low/60 p-6 transition-colors hover:border-lime/40"
        >
          <div className="label-caps text-lime">Email us</div>
          <div className="display mt-3 text-2xl text-on-surface">hello@vynl.in</div>
          <p className="mt-2 text-sm text-on-surface-variant">
            General questions, feedback, and account help.
          </p>
        </a>
        <a
          href="mailto:privacy@vynl.in"
          className="group rounded-2xl border border-outline-variant/50 bg-surface-low/60 p-6 transition-colors hover:border-lime/40"
        >
          <div className="label-caps text-lime">Privacy &amp; data</div>
          <div className="display mt-3 text-2xl text-on-surface">privacy@vynl.in</div>
          <p className="mt-2 text-sm text-on-surface-variant">
            Data access and deletion requests.
          </p>
        </a>
      </div>

      <h2>Frequently asked</h2>
      {FAQ.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <hr />
      <p>
        Still stuck? Email{" "}
        <a href="mailto:hello@vynl.in">hello@vynl.in</a> and we&rsquo;ll get back
        to you.
      </p>
    </PageShell>
  );
}
