import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "How to delete your ConvoTrack account and every piece of data attached to it, from inside the app or by email.",
};

// Google Play requires this page to be reachable without signing in, and to be linked
// directly rather than buried behind a menu — a rider who has already uninstalled the app
// still has to be able to find it. It is also the URL entered in the Play Console's Data
// Safety form, so what it says about what is deleted has to match what the server actually
// does in DELETE /users/me.
export default function DeleteAccount() {
  return (
    <PageShell
      kicker="Account deletion"
      title="Delete your account."
      intro="You can erase your ConvoTrack account and everything attached to it at any time — from inside the app, or by email if you no longer have it installed."
    >
      <h2>From the app</h2>
      <p>The fastest route, and it takes effect immediately.</p>
      <ol>
        <li>Open ConvoTrack and go to the <strong>Profile</strong> tab.</li>
        <li>Scroll to the bottom of the settings list and tap <strong>Delete Account</strong>.</li>
        <li>Read the confirmation, then tap <strong>Delete</strong>.</li>
      </ol>
      <p>
        You are signed out as soon as it completes. There is no grace period and no way to undo
        it — we delete the data rather than deactivating the account, so there is nothing left to
        restore.
      </p>

      <h2>By email</h2>
      <p>
        If you have already uninstalled the app, email{" "}
        <a href="mailto:privacy@convotrack.in">privacy@convotrack.in</a> from the address on your
        account with the subject <strong>Delete my account</strong>. Tell us the name you ride
        under so we can find you.
      </p>
      <p>
        We will confirm your identity, delete the account, and reply to confirm — within 30 days,
        and usually much sooner.
      </p>

      <h2>What gets deleted</h2>
      <p>All of it, in one go:</p>
      <ul>
        <li>
          <strong>Your profile</strong> — name, photo, username, and any phone number or contact
          email you added.
        </li>
        <li>
          <strong>Your ride history</strong> — every ride you joined, and the summaries and
          statistics built from them.
        </li>
        <li>
          <strong>Rides you lead</strong> — deleted outright, including their routes, waypoints
          and reports. See below.
        </li>
        <li>
          <strong>Your activity in other riders&rsquo; rides</strong> — your participation
          records, and any regroups or emergency alerts you raised.
        </li>
        <li>
          <strong>Your membership record</strong> — the plan attached to your account.
        </li>
        <li>
          <strong>Your sign-in</strong> — the identity held by our authentication provider is
          revoked, so the account can no longer be signed into.
        </li>
      </ul>

      <h2>Rides you lead go too</h2>
      <p>
        Deleting your account deletes every ride you created, and it removes them for{" "}
        <strong>everyone who was in them</strong> — a ride with no leader cannot be started,
        ended or edited by anybody, so leaving it behind would strand the group with something
        broken. Rides you merely joined are not affected; they carry on without you.
      </p>
      <p>
        If a ride you lead matters to the people in it, let them know before you delete.
      </p>

      <h2>What we keep, and for how long</h2>
      <p>
        Nothing identifiable stays in the live service once deletion completes. Two things
        outlive it, and neither is under our control in the moment:
      </p>
      <ul>
        <li>
          <strong>Encrypted database backups</strong> may still contain your record until they
          age out of their rotation, within 30 days. They are never used to restore an individual
          account.
        </li>
        <li>
          <strong>Purchase records</strong> for any subscription are held by Google Play or the
          Apple App Store under their own policies and the tax law they answer to. We cannot
          delete those, and neither can you.
        </li>
      </ul>

      <h2>Your subscription is separate</h2>
      <p>
        A ConvoTrack Pro subscription is billed by Google Play or the App Store, not by us, and
        deleting your account <strong>does not cancel it</strong>. Cancel it yourself before or
        after deleting, in your{" "}
        <a
          href="https://play.google.com/store/account/subscriptions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Play subscriptions
        </a>{" "}
        or your Apple ID subscription settings. Otherwise you will keep paying for a plan
        attached to an account that no longer exists.
      </p>

      <hr />
      <p>
        Questions before you go? Email{" "}
        <a href="mailto:privacy@convotrack.in">privacy@convotrack.in</a>, or read the{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </PageShell>
  );
}
