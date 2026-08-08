import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ConvoTrack collects, uses, and protects your data.",
};

export default function Privacy() {
  return (
    <PageShell
      kicker="Legal"
      title="Privacy Policy"
      intro="Last updated August 8, 2026. This policy explains what ConvoTrack collects and why. Because a live-tracking app runs on location, we keep this plain."
    >
      <p>
        ConvoTrack (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a group-ride tracking
        app. This policy covers the ConvoTrack mobile apps for iOS and Android
        and this website.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account details</strong> — your name, profile photo, and the
          identity from your sign-in provider (Google or Apple), used to show
          you to other riders in a ride.
        </li>
        <li>
          <strong>Location data</strong> — your device&rsquo;s GPS position while
          a ride is active, so the group can see one another on the live map.
          Location is shared only with riders in the same ride, and only while
          that ride is running.
        </li>
        <li>
          <strong>Ride data</strong> — routes you create, invite codes, ride
          participants, and the stats used to build your end-of-ride report.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To place every rider on a shared live map during a ride.</li>
        <li>To send regroup and emergency alerts to the group.</li>
        <li>To compute your ride summary — distance, duration, and group split.</li>
        <li>To keep the service secure and working correctly.</li>
      </ul>

      <h2>Location, specifically</h2>
      <p>
        Location tracking is <strong>only active while you are in a live ride</strong>.
        When a ride ends, live sharing stops. We do not sell location data, and
        we do not use it for advertising. Your position during a ride is visible
        to the other riders you chose to ride with.
      </p>

      <h2>Sharing</h2>
      <p>
        We share data only with the infrastructure providers needed to run the
        service (hosting, authentication, push notifications). We do not sell
        your personal data. We may disclose information if required by law.
      </p>

      <h2>Retention</h2>
      <p>
        Ride history and summaries are kept so you can review past rides. You can
        request deletion of your account and associated data at any time by
        contacting us.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Revoke location permission at any time in your device settings.</li>
        <li>Leave a ride to stop sharing your position immediately.</li>
        <li>Request access to, or deletion of, your data by emailing us.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Email{" "}
        <a href="mailto:privacy@convotrack.in">privacy@convotrack.in</a>.
      </p>
    </PageShell>
  );
}
