"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LineReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { services } from "@/content/siteData";
import { ease } from "@/lib/animations";

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-[clamp(7rem,14vw,14rem)] bg-bg overflow-hidden"
    >
      {/* Section marker */}
      <div className="absolute top-10 right-6 md:right-10 text-micro text-muted-2" aria-hidden="true">
        003 — Capabilities
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-4">
          <FadeIn direction="none">
            <p className="text-micro text-muted-2">Capabilities</p>
          </FadeIn>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
          <LineReveal
            as="h2"
            delay={0.1}
            className="font-sans font-black tracking-tightest text-fg"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 1 } as React.CSSProperties}
          >
            Capabilities
          </LineReveal>
          <FadeIn direction="none" delay={0.15}>
            <p className="text-[13px] text-muted max-w-xs text-right hidden md:block">
              End-to-end enterprise systems, automation, and engineering design.
            </p>
          </FadeIn>
        </div>

        {/* Animated rule */}
        <motion.div
          className="h-[1px] bg-border origin-left mb-20"
          style={{ scaleX: lineScale }}
        />

        {/* Service list — editorial rows */}
        <div className="divide-y divide-border">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceRowProps {
  service: (typeof services)[number];
  index: number;
}

function ServiceRow({ service, index }: ServiceRowProps) {
  return (
    <motion.div
      className="group flex items-start md:items-center justify-between gap-6 py-8 cursor-default"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.7, ease: ease.premium }}
      whileHover={{ x: 6 }}
    >
      {/* Left — index + title */}
      <div className="flex items-start md:items-center gap-6 md:gap-10 flex-1">
        <span className="text-micro text-muted-2 pt-1 md:pt-0 w-6 shrink-0">
          {service.index}
        </span>
        <h3 className="font-sans font-bold text-[1.4rem] md:text-[1.8rem] text-fg tracking-tightest leading-tight group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
      </div>

      {/* Centre — description (hidden on mobile) */}
      <p className="hidden md:block text-[13px] text-muted max-w-xs leading-relaxed">
        {service.description}
      </p>

      {/* Right — tags + arrow */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden lg:flex gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-muted-2 border border-border rounded-full px-2.5 py-0.5 group-hover:border-accent/30 group-hover:text-muted transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <motion.div
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-all duration-300"
          animate={{ rotate: 0 }}
          whileHover={{ rotate: 45 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.div>
      </div>
    </motion.div>
  );
}
