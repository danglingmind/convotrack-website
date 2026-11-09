import Link from "next/link";

/** The road mark + wordmark. `tone="night"` for use on dark bands. */
export function Logo({
  tone = "paper",
  className = "",
}: {
  tone?: "paper" | "night";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="ConvoTrack home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG */}
      <img src="/brand/mark.svg" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
      <span
        className={`text-[1.05rem] font-semibold tracking-[-0.03em] ${
          tone === "night" ? "text-white" : "text-ink"
        }`}
      >
        ConvoTrack
      </span>
    </Link>
  );
}
