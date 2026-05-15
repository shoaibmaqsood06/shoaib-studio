"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "@/content/siteData";
import { ease } from "@/lib/animations";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const total = 2200; // ms
    const step = 18;
    const steps = total / step;
    let current = 0;

    const id = setInterval(() => {
      current++;
      // Ease-out curve so it slows down at the end
      const progress = 1 - Math.pow(1 - current / steps, 3);
      setCount(Math.min(Math.round(progress * 100), 100));

      if (current >= steps) {
        clearInterval(id);
        setTimeout(() => setLoading(false), 400);
      }
    }, step);

    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] bg-bg flex flex-col justify-between p-6 md:p-10"
          exit={{
            clipPath: "inset(100% 0 0 0)",
            transition: {
              duration: 1.0,
              ease: ease.inQuart,
              delay: 0.05,
            },
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <motion.span
              className="text-micro text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {brand.studio}
            </motion.span>
            <motion.span
              className="text-micro text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Portfolio 2026
            </motion.span>
          </div>

          {/* Centre — studio name */}
          <div className="flex flex-col gap-3">
            {/* Studio label */}
            <motion.p
              className="text-label text-muted-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: ease.premium }}
            >
              {brand.domain}
            </motion.p>

            {/* Name lines */}
            {brand.name.split(" ").map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  className="font-sans font-black leading-none tracking-tightest text-[clamp(3rem,10vw,8rem)] text-fg"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.3 + i * 0.12,
                    duration: 1,
                    ease: ease.expo,
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Bottom — counter + bar */}
          <div className="flex items-end justify-between">
            <motion.p
              className="font-sans text-[10px] text-muted-2 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              ERP · HRM · Automation
            </motion.p>

            <div className="flex flex-col items-end gap-3">
              {/* Percentage */}
              <motion.span
                className="font-sans font-black text-4xl text-fg tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {count.toString().padStart(2, "0")}
              </motion.span>

              {/* Bar */}
              <div className="w-32 h-[1px] bg-border overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  style={{ width: `${count}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
