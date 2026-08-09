import { NextResponse } from "next/server";

// iOS Universal Links — Apple fetches this as JSON, with no redirect and no
// file extension. Served at /.well-known/apple-app-site-association via the
// rewrite in next.config.ts.
//
// APPLE_APP_ID_PREFIX = the Apple Team ID. Defaults to the real ConvoTrack team
// (not secret — it ships in every build); overridable via env if it ever changes.
export const dynamic = "force-static";

const APPLE_APP_ID_PREFIX = process.env.APPLE_APP_ID_PREFIX ?? "NJ5P2B5WZJ";
const IOS_APP_ID = `${APPLE_APP_ID_PREFIX}.danglingmind.convotrack`;

export function GET() {
  return NextResponse.json(
    {
      applinks: {
        details: [
          {
            appIDs: [IOS_APP_ID],
            components: [{ "/": "/join/*", comment: "Ride invite links" }],
          },
        ],
      },
    },
    { headers: { "content-type": "application/json" } },
  );
}
