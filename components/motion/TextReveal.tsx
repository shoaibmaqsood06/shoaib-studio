"use client";

import { motion, useInView } from "framer-motion";
import { CSSProperties, useRef } from "react";
import { ease } from "@/lib/animations";

interface LineRevealProps {
  children: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Reveals text word-by-word with overflow:hidden line clip.
 * Use for section headings and body sentences.
 */
export function LineReveal({
  children,
  className,
  style,
  delay = 0,
  duration = 0.9,
  once = true,
  as: Tag = "div",
}: LineRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const words = children.split(" ");

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };

  const word = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration, ease: ease.expo },
    },
  };

  return (
    <Tag className={className} style={style} aria-label={children}>
      <motion.span
        ref={ref}
        className="inline-flex flex-wrap"
        style={{ gap: "0 0.27em" }}
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {words.map((w, i) => (
          <span
            key={i}
            className="overflow-hidden inline-block"
            style={{ paddingBottom: "0.06em" }}
          >
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

interface CharRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Reveals text character-by-character.
 * Reserved for hero display text where maximum drama is needed.
 */
export function CharReveal({
  children,
  className,
  delay = 0,
  stagger = 0.035,
  once = true,
}: CharRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const char = {
    hidden: { y: "105%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: ease.expo },
    },
  };

  return (
    <span className={className} aria-label={children}>
      <motion.span
        ref={ref}
        className="inline-flex"
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {children.split("").map((c, i) => (
          <span
            key={i}
            className="overflow-hidden inline-block"
            style={{ paddingBottom: "0.04em" }}
          >
            <motion.span
              className="inline-block"
              variants={char}
              style={c === " " ? { whiteSpace: "pre" } : undefined}
            >
              {c === " " ? " " : c}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
