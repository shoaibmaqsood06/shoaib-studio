import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        display: "-0.02em",
        wide: "0.08em",
        widest: "0.25em",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "30%": { transform: "translate(2%, -5%)" },
          "50%": { transform: "translate(-3%, 4%)" },
          "70%": { transform: "translate(3%, 0%)" },
          "90%": { transform: "translate(-2%, 2%)" },
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
