"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { hero, brand } from "@/content/siteData";
import { ease } from "@/lib/animations";

// ─── HERO HEADING — character reveal ─────────────────────────────────────────

function HeroLine({ text, delay }: { text: string; delay: number }) {
  const chars = text.split("");
  return (
    <span className="block overflow-hidden" style={{ lineHeight: 0.86 }}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: ease.expo }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + i * 0.025, duration: 0.5 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

// ─── ROTATING WORDS ───────────────────────────────────────────────────────────

function RotatingWord({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2200
    );
    return () => clearInterval(id);
  }, [words]);

  return (
    <span className="inline-block overflow-hidden align-middle" style={{ minWidth: "12ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block text-accent"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: ease.expo }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-bg"
    >
      {/* ── Parallax background layer ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(77,163,255,0.07) 0%, transparent 65%)",
          }}
          animate={{ scale: [1, 1.08, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 70%, rgba(129,140,248,0.05) 0%, transparent 65%)",
          }}
          animate={{ scale: [1, 1.12, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <div className="absolute inset-0 flex items-center justify-center select-none" aria-hidden="true">
          <span
            className="font-sans font-black text-[clamp(6rem,22vw,22rem)] text-white/[0.012] tracking-tightest leading-none"
            style={{ whiteSpace: "nowrap" }}
          >
            {brand.studio.toUpperCase()}
          </span>
        </div>

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </motion.div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-10 pt-24 pb-20"
        style={{ y: contentY, opacity }}
      >
        {/* EYEBROW REMOVED FOR CLEANER LOOK */}

        {/* Display headline */}
        <h1
          className="font-sans font-black tracking-tightest mb-10 md:mb-14"
          style={{ fontSize: "clamp(5.5rem, 14vw, 14rem)" }}
          aria-label={brand.name}
        >
          <HeroLine text={hero.headlineLines[0]} delay={0.2} />
          <HeroLine text={hero.headlineLines[1]} delay={0.35} />
        </h1>

        {/* Divider line */}
        <motion.div
          className="h-[1px] bg-border mb-8 origin-left"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: ease.expo }}
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: ease.premium }}
          >
            <p className="text-[1.05rem] md:text-lg text-muted font-light leading-relaxed mb-2">
              <RotatingWord words={hero.rotatingWords} />
              {" "}and more —
            </p>
            <p className="text-[0.95rem] text-muted-2 leading-relaxed max-w-sm">
              {hero.tagline}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: ease.premium }}
          >
            <div className="flex gap-8 md:justify-end">
              {hero.stats.map((stat, i) => (
                <div key={i} className="text-right">
                  <div className="font-sans font-black text-2xl md:text-3xl text-fg tracking-tightest">
                    {stat.value}
                  </div>
                  <div className="text-micro text-muted-2 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton>
                <a
                  href={hero.cta.primary.href}
                  className="group relative inline-flex items-center gap-2.5 bg-fg text-bg px-7 py-3.5 rounded-full text-[13px] font-semibold tracking-wide overflow-hidden transition-all duration-300 hover:bg-accent"
                >
                  <span className="relative z-10">{hero.cta.primary.label}</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={hero.cta.secondary.href}
                  className="inline-flex items-center gap-2.5 border border-border hover:border-accent text-muted hover:text-accent px-7 py-3.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300"
                >
                  {hero.cta.secondary.label}
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-transparent to-muted-2"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          style={{ originY: "top" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-micro text-muted-2">{hero.scrollHint}</span>
      </motion.div>
    </section>
  );
}