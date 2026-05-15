/**
 * Shared animation variants and easing presets.
 * Import these into any component for consistent motion language.
 */

// ─── EASING PRESETS ───────────────────────────────────────────────────────────

export const ease = {
  expo: [0.19, 1, 0.22, 1] as [number, number, number, number],
  premium: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inQuart: [0.76, 0, 0.24, 1] as [number, number, number, number],
  outCubic: [0.33, 1, 0.68, 1] as [number, number, number, number],
} as const;

// ─── FRAMER MOTION VARIANTS ───────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: ease.premium, delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: ease.premium, delay },
  }),
};

export const slideUp = {
  hidden: { y: "110%", opacity: 0 },
  visible: (delay = 0) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: ease.expo, delay },
  }),
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: (delay = 0) => ({
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: ease.expo, delay },
  }),
};

export const scaleIn = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: ease.premium, delay },
  }),
};

// ─── GSAP DEFAULTS ────────────────────────────────────────────────────────────

export const gsapDefaults = {
  duration: 1,
  ease: "power3.out",
} as const;

export const gsapFast = {
  duration: 0.6,
  ease: "power2.out",
} as const;
