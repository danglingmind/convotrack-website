import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of ConvoTrack.",
};

export default function Terms() {
  return (
    <PageShell
      kicker="Legal"
      title="Terms of Service"
      intro="Last updated August 8, 2026. By using ConvoTrack you agree to these terms. Please read them — especially the part about riding safely."
    >
      <h2>1. The service</h2>
      <p>
        ConvoTrack is a group-ride tracking app that lets riders share live
        location, coordinate as a group, and review ride summaries. We provide
        the service &ldquo;as is&rdquo; and may update or change features over
        time.
      </p>

      <h2>2. Ride safely — this is important</h2>
      <p>
        ConvoTrack is an aid, not a substitute for safe riding. <strong>Do not
        interact with the app while operating a vehicle.</strong> Always obey
        traffic laws, wear appropriate safety gear, and keep your attention on
        the road. You are solely responsible for your own safety and riding
        decisions. GPS and network conditions can cause delays or inaccuracies —
        never rely on the app for critical navigation or emergency response.
      </p>

      <h2>3. Your account</h2>
      <ul>
        <li>You must provide accurate sign-in information.</li>
        <li>You are responsible for activity that happens under your account.</li>
        <li>You must be old enough to legally operate your vehicle in your region.</li>
      </ul>

      <h2>4. Acceptable use</h2>
      <ul>
        <li>Don&rsquo;t use ConvoTrack to track anyone without their consent.</li>
        <li>Don&rsquo;t abuse, harass, or endanger other riders.</li>
        <li>Don&rsquo;t attempt to disrupt, reverse-engineer, or overload the service.</li>
      </ul>

      <h2>5. Content and routes</h2>
      <p>
        You keep ownership of the ride and route data you create. You grant us
        the limited rights needed to operate the service — storing and
        transmitting that data to the riders in your rides.
      </p>

      <h2>6. Disclaimers and liability</h2>
      <p>
        To the maximum extent permitted by law, ConvoTrack and vynl.in are not
        liable for any injury, loss, or damage arising from your use of the
        service, including reliance on location data, route information, or group
        alerts. The service is provided without warranties of any kind.
      </p>

      <h2>7. Changes and termination</h2>
      <p>
        We may modify these terms or discontinue the service. Continued use after
        changes means you accept the updated terms. You may stop using the
        service at any time.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:hello@vynl.in">hello@vynl.in</a>.
      </p>
    </PageShell>
  );
}
