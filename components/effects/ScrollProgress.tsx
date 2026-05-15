"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1px] z-[200] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #4DA3FF 0%, #818cf8 60%, transparent 100%)",
      }}
    />
  );
}
