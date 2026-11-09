// One place for the facts every page and the structured data repeat.

export const SITE_URL = "https://convotrack.in";
export const SITE_NAME = "ConvoTrack";

export const TAGLINE = "The group ride app that keeps everyone together";
export const DESCRIPTION =
  "ConvoTrack is a group ride tracking app for motorcycle rides, road trips and convoys. Every rider on one live map, turn-by-turn voice navigation, one-tap regroups, SOS alerts and a ride summary when you arrive.";

export const APP_STORE_URL =
  process.env.APP_STORE_URL ?? "https://apps.apple.com/in/app/convotrack/id6788236830";

export const ANDROID_PACKAGE = process.env.ANDROID_PACKAGE ?? "com.danglingmind.convotrack";
export const PLAY_STORE_URL =
  process.env.PLAY_STORE_URL ??
  `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

/** Flip to true once the Play listing is public; until then the Android button reads "coming soon". */
export const PLAY_LIVE = process.env.NEXT_PUBLIC_PLAY_LIVE === "true";

export const CONTACT_EMAIL = "hello@convotrack.in";
export const PRIVACY_EMAIL = "privacy@convotrack.in";
