import type { Metadata } from "next";
import { decodePolyline, type LatLng } from "@/lib/polyline";

// Fallback landing for a shared ride route, shown only when the app is NOT installed
// (a verified install opens the app's route preview and this never renders).
// Canonical shape: https://convotrack.in/route/<10-char token>
// Data comes from the backend's public GET /shared-routes/:token, which already withholds the
// start of the route, rider identities and the invite code.

const API_BASE = process.env.API_BASE_URL ?? "https://api.convotrack.in";
const ANDROID_PACKAGE =
  process.env.ANDROID_PACKAGE ?? "com.danglingmind.convotrack";
const APP_STORE_URL =
  process.env.APP_STORE_URL ?? "https://apps.apple.com/app/convotrack";
const PLAY_STORE_URL =
  process.env.PLAY_STORE_URL ??
  `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

const TOKEN_PATTERN = /^[A-HJKMNP-Z2-9]{10}$/;

interface SharedRoute {
  title: string;
  plannedRoutePolyline: string | null;
  actualRoutePolyline: string | null;
  distanceMeters: number;
  durationSeconds: number | null;
  destinationName: string;
  leaderStops: { id: string; type: string; lat: number; lng: number }[];
  riderCount: number;
  sharedBy: { firstName: string } | null;
}

async function load(token: string): Promise<SharedRoute | null> {
  if (!TOKEN_PATTERN.test(token)) return null;
  try {
    const res = await fetch(`${API_BASE}/shared-routes/${token}`, {
      next: { revalidate: 300 },
    });
    return res.ok ? ((await res.json()) as SharedRoute) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const route = await load(token);
  if (!route) return { title: "Shared ride", robots: { index: false } };
  const km = (route.distanceMeters / 1000).toFixed(0);
  return {
    title: route.title,
    description: `${km} km to ${route.destinationName}. Ride this route with ConvoTrack.`,
    // A private link: never indexed.
    robots: { index: false, follow: false },
  };
}

const W = 320;
const H = 200;
const PAD = 16;

/** The route as a simple SVG sketch, so the page needs no map key. */
function RouteSketch({ route }: { route: SharedRoute }) {
  const ridden = route.actualRoutePolyline
    ? decodePolyline(route.actualRoutePolyline)
    : [];
  const planned = route.plannedRoutePolyline
    ? decodePolyline(route.plannedRoutePolyline)
    : [];
  const main = ridden.length ? ridden : planned;
  if (main.length < 2) return null;

  const stops: LatLng[] = route.leaderStops.map((s) => ({ lat: s.lat, lng: s.lng }));
  const all = [...main, ...(ridden.length ? planned : []), ...stops];
  const lats = all.map((p) => p.lat);
  const lngs = all.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  // Equirectangular: shrink longitude by cos(lat) so the shape isn't stretched.
  const k = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180);
  const spanX = Math.max((maxLng - minLng) * k, 1e-6);
  const spanY = Math.max(maxLat - minLat, 1e-6);
  const scale = Math.min((W - 2 * PAD) / spanX, (H - 2 * PAD) / spanY);
  const offX = (W - spanX * scale) / 2;
  const offY = (H - spanY * scale) / 2;
  const x = (p: LatLng) => offX + (p.lng - minLng) * k * scale;
  const y = (p: LatLng) => H - (offY + (p.lat - minLat) * scale);
  const path = (pts: LatLng[]) =>
    pts.map((p, i) => `${i ? "L" : "M"}${x(p).toFixed(1)} ${y(p).toFixed(1)}`).join(" ");
  const end = main[main.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Route to ${route.destinationName}`}
      className="mt-6 w-full rounded-2xl border border-outline-variant/60 bg-surface-container"
    >
      {ridden.length > 0 && planned.length > 1 && (
        <path d={path(planned)} fill="none" stroke="#caf300" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      )}
      <path d={path(main)} fill="none" stroke="#caf300" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {stops.map((s, i) => (
        <circle key={i} cx={x(s)} cy={y(s)} r="5" fill="#131313" stroke="#62ff96" strokeWidth="2.5" />
      ))}
      <circle cx={x(end)} cy={y(end)} r="6" fill="#caf300" />
    </svg>
  );
}

function duration(seconds: number | null): string | null {
  if (!seconds || seconds <= 0) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h}h ${m}m` : `${m}m`;
}

export default async function SharedRoutePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const route = await load(token);
  const scheme = `convotrack://route/${TOKEN_PATTERN.test(token) ? token : ""}`;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-outline-variant/60 bg-surface-low p-8 text-center">
        <p className="label-caps text-lime">ConvoTrack</p>
        {route ? (
          <>
            <h1 className="display mt-2 text-2xl text-on-surface">{route.title}</h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              {route.sharedBy ? `Shared by ${route.sharedBy.firstName} · ` : ""}
              to {route.destinationName}
            </p>
            <RouteSketch route={route} />
            <p className="mt-4 text-sm text-on-surface">
              {(route.distanceMeters / 1000).toFixed(0)} km
              {duration(route.durationSeconds) ? ` · ${duration(route.durationSeconds)}` : ""}
              {route.leaderStops.length
                ? ` · ${route.leaderStops.length} regroup stop${route.leaderStops.length === 1 ? "" : "s"}`
                : ""}
            </p>
          </>
        ) : (
          <>
            <h1 className="display mt-2 text-2xl text-on-surface">
              This route isn&rsquo;t available
            </h1>
            <p className="mt-3 text-sm text-on-surface-variant">
              The link may have been turned off by the rider who shared it.
            </p>
          </>
        )}

        {route && (
          <a
            href={scheme}
            className="mt-6 block rounded-2xl bg-lime px-6 py-4 text-base font-bold text-on-lime transition-opacity hover:opacity-90"
          >
            Open in ConvoTrack
          </a>
        )}
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
        {route && (
          <p className="mt-6 text-sm text-on-surface-variant">
            Install ConvoTrack, then open this link again to ride this route with
            your own group.
          </p>
        )}
      </div>
    </main>
  );
}
