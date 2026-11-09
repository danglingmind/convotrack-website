"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping product video that only plays while on screen, and never for visitors who
 * prefer reduced motion (they get the poster frame). With `lazy`, nothing downloads until the
 * video is close to the viewport, so below-the-fold film doesn't compete with the hero.
 */
export default function AutoVideo({
  src,
  smallSrc,
  poster,
  label,
  lazy = false,
  className = "",
}: {
  src: string;
  /** Lighter file for narrow screens. */
  smallSrc?: string;
  poster: string;
  label: string;
  lazy?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (lazy && v.preload === "none") {
            v.preload = "auto";
            v.load();
          }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [lazy]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!lazy}
      preload={lazy ? "none" : "auto"}
      aria-label={label}
    >
      {smallSrc && <source src={smallSrc} type="video/mp4" media="(max-width: 767px)" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
