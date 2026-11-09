import { Logo } from "./Brand";
import { AppStoreButton, PlayButton } from "./StoreButtons";

/**
 * Shared layout for deep-link fallbacks (/join, /route): what someone sees when they tap a
 * ConvoTrack link without the app installed. One job — get them into the app.
 */
export default function LinkFallback({
  openHref,
  children,
  footnote,
}: {
  openHref?: string;
  children: React.ReactNode;
  footnote?: React.ReactNode;
}) {
  return (
    <main className="flex min-h-[100svh] flex-col items-center px-4 py-10 sm:justify-center">
      <Logo />
      <div className="mt-10 w-full max-w-sm rounded-3xl border border-line bg-card p-6 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] sm:p-8">
        {children}
        <div className="mt-7 flex flex-col gap-2.5">
          {openHref && (
            <a href={openHref} className="btn btn-secondary w-full">
              Open in ConvoTrack
            </a>
          )}
          <AppStoreButton className="w-full" />
          <PlayButton className="w-full" />
        </div>
        {footnote && <p className="mt-6 text-center text-sm leading-relaxed text-muted">{footnote}</p>}
      </div>
    </main>
  );
}
