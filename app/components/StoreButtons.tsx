import { APP_STORE_URL, PLAY_LIVE, PLAY_STORE_URL } from "@/lib/site";

type Tone = "paper" | "night";

export function AppStoreButton({
  tone = "paper",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener"
      className={`btn ${tone === "night" ? "btn-lime" : "btn-primary"} ${className}`}
      data-cta="app-store"
    >
      <AppleIcon />
      <span>Download on the App Store</span>
    </a>
  );
}

export function PlayButton({
  tone = "paper",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const cls = `btn ${tone === "night" ? "btn-night" : "btn-secondary"} ${className}`;
  if (!PLAY_LIVE) {
    return (
      <span className={cls} aria-disabled="true">
        <PlayIcon />
        <span>
          Android <span className={tone === "night" ? "text-night-muted" : "text-muted"}>· coming soon</span>
        </span>
      </span>
    );
  }
  return (
    <a href={PLAY_STORE_URL} target="_blank" rel="noopener" className={cls} data-cta="google-play">
      <PlayIcon />
      <span>Get it on Google Play</span>
    </a>
  );
}

export function StoreButtons({ tone = "paper", className = "" }: { tone?: Tone; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <AppStoreButton tone={tone} />
      <PlayButton tone={tone} />
    </div>
  );
}

export function AppleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 3 2.3 1.2 0 1.6-.8 3.1-.8s1.8.8 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.8ZM14.1 5.2c.7-.8 1.1-2 1-3.2-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.5 2.9-1.3Z" />
    </svg>
  );
}

export function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.191l11.04 10.985zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}
