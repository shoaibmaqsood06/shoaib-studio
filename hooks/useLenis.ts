"use client";

import { useEffect } from "react";

/**
 * Initializes Lenis smooth scrolling.
 * Call once at the root page level.
 */
export function useLenis() {
  useEffect(() => {
    let raf: number;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    const init = async () => {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      // Make lenis available globally for GSAP ScrollTrigger integration
      (window as unknown as Record<string, unknown>).lenisInstance = lenis;

      function tick(time: number) {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      }

      raf = requestAnimationFrame(tick);
    };

    init();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
}
