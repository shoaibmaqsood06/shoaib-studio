"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  once = true,
  direction = "up",
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, ...directionOffset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
