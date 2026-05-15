"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "click" | "text";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  // Outer ring — slower spring
  const ringX = useSpring(0, { stiffness: 180, damping: 28 });
  const ringY = useSpring(0, { stiffness: 180, damping: 28 });

  // Inner dot — snappy spring
  const dotX = useSpring(0, { stiffness: 600, damping: 40 });
  const dotY = useSpring(0, { stiffness: 600, damping: 40 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ringX.set(e.clientX - 18);
      ringY.set(e.clientY - 18);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setState("click");
    const onUp = () => setState("default");

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest(
        "a, button, [data-cursor], [data-cursor-text]"
      ) as HTMLElement | null;
      if (el) {
        setState("hover");
        setLabel(el.dataset.cursorText ?? "");
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element).closest(
        "a, button, [data-cursor], [data-cursor-text]"
      );
      if (el) {
        setState("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [ringX, ringY, dotX, dotY]);

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: isClick ? 0.65 : isHover ? 2.4 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            border: `1px solid ${isHover ? "rgba(77,163,255,0.7)" : "rgba(255,255,255,0.3)"}`,
            backgroundColor: isHover ? "rgba(77,163,255,0.06)" : "transparent",
          }}
        >
          {label && (
            <span className="text-[7px] tracking-[0.2em] text-white/70 uppercase font-medium">
              {label}
            </span>
          )}
        </div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: isHover ? "#4DA3FF" : "#ffffff" }}
          animate={{ scale: isClick ? 0.4 : isHover ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
