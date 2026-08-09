import type { Metadata } from "next";

// Fallback landing shown only when the app is NOT installed. A verified
// install opens the app straight into the join screen and this never renders.
// Canonical invite link shape: https://convotrack.in/join/CODE

export const metadata: Metadata = {
  title: "Join a ride",
  description: "You've been invited to a ConvoTrack ride.",
};

const ANDROID_PACKAGE =
  process.env.ANDROID_PACKAGE ?? "com.danglingmind.convotrack";
const APP_STORE_URL =
  process.env.APP_STORE_URL ?? "https://apps.apple.com/app/convotrack";
const PLAY_STORE_URL =
  process.env.PLAY_STORE_URL ??
  `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

function sanitizeCode(raw: string): string {
  return (raw || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
}

export default async function JoinRide({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: rawCode } = await params;
  const code = sanitizeCode(rawCode);
  const scheme = `convotrack://join/${code}`;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-outline-variant/60 bg-surface-low p-8 text-center">
        <p className="label-caps text-lime">ConvoTrack</p>
        <h1 className="display mt-2 text-2xl text-on-surface">
          You&rsquo;re invited to a ride
        </h1>

        {code && (
          <div className="mt-6 rounded-2xl border border-lime bg-on-lime px-4 py-4 font-mono text-3xl font-bold tracking-[0.4em] text-lime">
            {code}
          </div>
        )}

        <a
          href={scheme}
          className="mt-6 block rounded-2xl bg-lime px-6 py-4 text-base font-bold text-on-lime transition-opacity hover:opacity-90"
        >
          Open in ConvoTrack
        </a>
        <a
          href={APP_STORE_URL}
          className="mt-3 block rounded-2xl border border-outline-variant/60 bg-surface-container px-6 py-4 text-base font-semibold text-on-surface transition-colors hover:border-lime/40"
        >
          Get it on the App Store
        </a>
        <a
          href={PLAY_STORE_URL}
          className="mt-3 block rounded-2xl border border-outline-variant/60 bg-surface-container px-6 py-4 text-base font-semibold text-on-surface transition-colors hover:border-lime/40"
        >
          Get it on Google Play
        </a>

        <p className="mt-6 text-sm text-on-surface-variant">
          Have the app? Tap “Open in ConvoTrack”. New here? Install it, then
          enter code <b className="text-on-surface">{code || "——————"}</b> to
          join.
        </p>
      </div>
    </main>
  );
}
