import { NextResponse } from "next/server";

// Android App Links — served at /.well-known/assetlinks.json via the rewrite
// in next.config.ts. autoVerify on the app's intent-filter fetches this.
//
// ANDROID_SHA256_FINGERPRINTS = comma-separated SHA-256 fingerprints (colon-
// separated hex) of the app signing + upload certs. With Play App Signing the
// one that matters is under Play Console -> Setup -> App signing, NOT the local
// keystore: Play re-signs the bundle, so a fingerprint taken from the upload key
// alone verifies sideloaded builds and nothing that came from the Play Store.
// Include both and installs from either source verify.
//
// Read at BUILD time (force-static), so setting the Vercel env var only takes
// effect on the next deploy.
//
// Two things have to be true for verification to succeed, and both have bitten
// this file:
//   1. This array is non-empty and correct. An unset env produces a file that is
//      valid JSON and can never match anything — which is why the build warns.
//   2. The apex serves it directly. Android does not follow redirects here, and
//      convotrack.in has been 308-ing to www at the Vercel domain level, so the
//      verifier never reached this handler at all. The apex must be the domain
//      that serves, since the apex is the host in the app's intent-filter.
export const dynamic = "force-static";

const ANDROID_PACKAGE =
  process.env.ANDROID_PACKAGE ?? "com.danglingmind.convotrack";
const ANDROID_SHA256_FINGERPRINTS = (
  process.env.ANDROID_SHA256_FINGERPRINTS ?? ""
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (ANDROID_SHA256_FINGERPRINTS.length === 0) {
  // A build that ships an empty fingerprint list produces a well-formed
  // assetlinks.json that no app can ever match, and nothing downstream fails
  // loudly enough to notice — the App Link simply, quietly, opens a browser.
  console.warn(
    "[assetlinks] ANDROID_SHA256_FINGERPRINTS is not set. " +
      "/.well-known/assetlinks.json will be served with an empty " +
      "sha256_cert_fingerprints array and Android App Link verification " +
      "WILL FAIL. Set it in the Vercel project env and redeploy.",
  );
}

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
