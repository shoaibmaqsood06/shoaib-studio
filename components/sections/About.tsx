"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LineReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { about, brand } from "@/content/siteData";
import { ease } from "@/lib/animations";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-[clamp(7rem,14vw,14rem)] bg-bg overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-8 mb-20">
          <FadeIn direction="none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-micro text-muted">{brand.availability}</span>
            </div>
          </FadeIn>
        </div>

        {/* Large heading — word-by-word reveal */}
        <div className="mb-24">
          <LineReveal
            as="h2"
            delay={0.15}
            duration={1.0}
            className="font-sans font-black tracking-tightest text-fg"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1.05 } as React.CSSProperties}
          >
            {about.heading}
          </LineReveal>
        </div>

        {/* Animated rule */}
        <motion.div
          className="h-[1px] bg-accent/50 origin-left mb-20"
          style={{ scaleX: lineScale }}
        />

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — body text */}
          <div className="space-y-8">
            {about.paragraphs.map((para, i) => (
              <FadeIn key={i} delay={i * 0.12} direction="up">
                <p className="text-body">{para}</p>
              </FadeIn>
            ))}

            {/* Sign-off */}
            {((about as any).signoff) && (
              <FadeIn delay={0.3} direction="up">
                <p className="text-[13px] text-muted-2 font-light italic mt-6">
                  {(about as any).signoff}
                </p>
              </FadeIn>
            )}
          </div>

          {/* Right — profile card + decorative number */}
          <div>
            {/* Big decorative number */}
            <FadeIn direction="left" delay={0.1}>
              <div
                className="font-sans font-black text-border select-none mb-8 leading-none"
                style={{ fontSize: "clamp(6rem, 16vw, 16rem)" }}
                aria-hidden="true"
              >
                SM
              </div>
            </FadeIn>

            {/* Identity card */}
            <motion.div
              className="relative p-6 md:p-8 border border-border bg-surface rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.2, duration: 0.8, ease: ease.premium }}
              whileHover={{ borderColor: "rgba(77,163,255,0.3)" }}
            >
              {/* Card glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-violet-500/20 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-sans font-black text-lg text-accent">S</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-fg text-[15px]">
                    {brand.name}
                  </div>
                  <div className="text-[12px] text-muted">ERP &amp; HRM Specialist</div>
                </div>
              </div>

              <div className="h-[1px] bg-border mb-5" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {["ERP", "HRM", "Dashboards", "2D/3D", "Automation"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] text-muted border border-border rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-border">
                <p className="text-[11px] text-muted-2 font-mono">{brand.email}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}