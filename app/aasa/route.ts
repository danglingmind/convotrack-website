import { NextResponse } from "next/server";

// iOS Universal Links — Apple fetches this as JSON, with no redirect and no
// file extension. Served at /.well-known/apple-app-site-association via the
// rewrite in next.config.ts.
//
// APPLE_APP_ID_PREFIX = your Apple Team ID (e.g. "AB12CD34EF"). Set it in the
// Vercel project env and redeploy — until it's set, domain verification fails
// (the link is still tappable and lands on the /join page).
export const dynamic = "force-static";

const APPLE_APP_ID_PREFIX = process.env.APPLE_APP_ID_PREFIX ?? "TEAMID";
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
