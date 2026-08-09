import { NextResponse } from "next/server";

// Android App Links — served at /.well-known/assetlinks.json via the rewrite
// in next.config.ts. autoVerify on the app's intent-filter fetches this.
//
// ANDROID_SHA256_FINGERPRINTS = comma-separated SHA-256 fingerprints (colon-
// separated hex) of the release + upload signing certs. Get them with:
//   keytool -list -v -keystore <release.keystore> -alias <alias>
// Set in the Vercel project env and redeploy — until set, App Link
// verification fails (link stays tappable and lands on the /join page).
export const dynamic = "force-static";

const ANDROID_PACKAGE =
  process.env.ANDROID_PACKAGE ?? "com.danglingmind.convotrack";
const ANDROID_SHA256_FINGERPRINTS = (
  process.env.ANDROID_SHA256_FINGERPRINTS ?? ""
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export function GET() {
  return NextResponse.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: ANDROID_PACKAGE,
        sha256_cert_fingerprints: ANDROID_SHA256_FINGERPRINTS,
      },
    },
  ]);
}
