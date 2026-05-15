"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { ease } from "@/lib/animations";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 40,
  className,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: ease.premium }}
    >
      {children}
    </motion.div>
  );
}
