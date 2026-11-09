import type { Metadata } from "next";
import LinkFallback from "../../components/LinkFallback";

// Fallback landing shown only when the app is NOT installed. A verified
// install opens the app straight into the join screen and this never renders.
// Canonical invite link shape: https://convotrack.in/join/CODE

export const metadata: Metadata = {
  title: "You're invited to a ride",
  description: "You've been invited to a group ride on ConvoTrack. Install the app and join with your code.",
  robots: { index: false, follow: false },
};

function sanitizeCode(raw: string): string {
  return (raw || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
}

export default async function JoinRide({ params }: PageProps<"/join/[code]">) {
  const { code: rawCode } = await params;
  const code = sanitizeCode(rawCode);

  return (
    <LinkFallback
      openHref={`convotrack://join/${code}`}
      footnote={
        <>
          New to ConvoTrack? Install it, then enter code{" "}
          <b className="font-mono font-medium text-ink">{code || "––––––"}</b> to join.
        </>
      }
    >
      <p className="text-center text-sm text-muted">Group ride invite</p>
      <h1 className="h-section mt-2 text-center text-[1.75rem]">You&rsquo;re invited to a ride</h1>
      {code && (
        <div className="mt-6 rounded-2xl border border-line bg-paper py-5 text-center">
          <span className="block text-xs text-muted">Invite code</span>
          <span className="mt-1 block font-mono text-[2rem] font-medium tracking-[0.3em] text-ink">
            {code}
          </span>
        </div>
      )}
    </LinkFallback>
  );
}
