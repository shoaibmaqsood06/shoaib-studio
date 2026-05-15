"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LineReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { skillCategories } from "@/content/siteData";
import { ease } from "@/lib/animations";

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-[clamp(7rem,14vw,14rem)] bg-[#0d0d0d] overflow-hidden"
    >
      {/* Section marker */}
      <div className="absolute top-10 right-6 md:right-10 text-micro text-muted-2" aria-hidden="true">
        005 — Skills
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header */}
        <FadeIn direction="none" className="mb-4">
          <p className="text-micro text-muted-2">Skills &amp; Tools</p>
        </FadeIn>
        <div className="mb-6">
          <LineReveal
            as="h2"
            delay={0.1}
            className="font-sans font-black tracking-tightest text-fg"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 1 } as React.CSSProperties}
          >
            Technical Arsenal
          </LineReveal>
        </div>

        {/* Rule */}
        <motion.div
          className="h-[1px] bg-border origin-left mb-20"
          style={{ scaleX: lineScale }}
        />

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border rounded-2xl overflow-hidden">
          {skillCategories.map((category, catIndex) => (
            <SkillColumn
              key={category.label}
              category={category}
              catIndex={catIndex}
            />
          ))}
        </div>

        {/* All skills marquee */}
        <div className="mt-20 overflow-hidden">
          <SkillsMarquee />
        </div>
      </div>
    </section>
  );
}

function SkillColumn({
  category,
  catIndex,
}: {
  category: (typeof skillCategories)[number];
  catIndex: number;
}) {
  return (
    <motion.div
      className="p-7 md:p-8 bg-surface hover:bg-surface-2 transition-colors duration-500"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: catIndex * 0.08, duration: 0.7, ease: ease.premium }}
    >
      {/* Category label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        <p className="text-micro text-muted">{category.label}</p>
      </div>

      {/* Skills list */}
      <ul className="space-y-3">
        {category.skills.map((skill, skillIndex) => (
          <motion.li
            key={skill}
            className="flex items-center gap-3 group"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: catIndex * 0.06 + skillIndex * 0.06,
              duration: 0.5,
              ease: ease.premium,
            }}
          >
            <motion.span
              className="w-1 h-1 rounded-full bg-muted-2 group-hover:bg-accent transition-colors duration-300"
              whileHover={{ scale: 1.5 }}
            />
            <span className="text-[14px] md:text-[15px] text-muted group-hover:text-fg transition-colors duration-300 font-light">
              {skill}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function SkillsMarquee() {
  const allSkills = skillCategories.flatMap((c) => c.skills);
  const doubled = [...allSkills, ...allSkills];

  return (
    <div className="flex gap-6 overflow-hidden">
      <motion.div
        className="flex gap-6 shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="font-sans font-bold text-[1.8rem] md:text-[2.5rem] tracking-tightest text-white/[0.04] whitespace-nowrap select-none"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
