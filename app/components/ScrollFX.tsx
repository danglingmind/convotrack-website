"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single mounted controller for all scroll-driven motion:
 *  - .reveal          → fade + rise into view (batched, staggered)
 *  - [data-fx=split]  → word-by-word headline reveal
 *  - [data-count]     → count-up numbers when scrolled into view
 *  - [data-parallax]  → subtle vertical parallax
 * Respects prefers-reduced-motion (shows everything, no motion).
 */
export default function ScrollFX() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((el) => (el.style.opacity = "1"));
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = el.dataset.count ?? el.textContent;
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Split-headline word reveals
      document.querySelectorAll<HTMLElement>("[data-fx='split']").forEach((el) => {
        const words = (el.textContent ?? "").split(/(\s+)/);
        el.textContent = "";
        const spans: HTMLElement[] = [];
        words.forEach((w) => {
          if (w.trim() === "") {
            el.appendChild(document.createTextNode(w));
            return;
          }
          const outer = document.createElement("span");
          outer.style.display = "inline-block";
          outer.style.overflow = "hidden";
          outer.style.verticalAlign = "top";
          // Expand the clip window so descenders (g, p, y) aren't cropped,
          // then pull the layout back so spacing is unchanged.
          outer.style.paddingBottom = "0.16em";
          outer.style.marginBottom = "-0.16em";
          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.textContent = w;
          outer.appendChild(inner);
          el.appendChild(outer);
          spans.push(inner);
        });
        gsap.set(el, { opacity: 1 });
        gsap.from(spans, {
          yPercent: 115,
          duration: 1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Generic reveals
      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.09,
            overwrite: true,
          }),
      });
      gsap.set(".reveal", { y: 26 });

      // Count-up numbers
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count ?? "0");
        const decimals = (el.dataset.decimals && parseInt(el.dataset.decimals)) || 0;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = obj.v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          },
        });
      });

      // Parallax
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax ?? "40");
        gsap.to(el, {
          yPercent: amt,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    // Fonts can shift layout; recalc once they're ready
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return null;
}
