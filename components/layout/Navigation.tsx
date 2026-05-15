"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/animations";
import { brand, nav } from "@/content/siteData";

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 80));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.9, ease: ease.expo }}
      >
        {/* Blur bg on scroll */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-700",
            scrolled
              ? "bg-bg/85 backdrop-blur-2xl border-b border-border"
              : "bg-transparent"
          )}
        />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-label text-fg hover:text-accent transition-colors duration-300"
          >
            <span className="text-accent">S</span>
            {brand.studio.slice(1)}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {nav.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="relative text-[13px] text-muted hover:text-fg transition-colors duration-300 group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.0 + i * 0.07, duration: 0.5, ease: ease.premium }}
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-400" />
              </motion.button>
            ))}
          </nav>

          {/* Availability badge + hamburger */}
          <div className="flex items-center gap-5">
            <motion.a
              href={brand.social.email}
              className="hidden md:flex items-center gap-2 text-[11px] tracking-wide text-muted hover:text-accent transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              {brand.availability}
            </motion.a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-7 h-5 flex flex-col justify-between"
              aria-label="Menu"
            >
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[1.5px] bg-fg origin-center"
                  animate={
                    menuOpen
                      ? i === 0
                        ? { rotate: 45, y: 9 }
                        : { rotate: -45, y: -9 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.35, ease: ease.premium }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-bg flex flex-col justify-between px-8 py-20"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: ease.inQuart }}
          >
            <nav className="flex flex-col gap-1 mt-8">
              {nav.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => { scrollTo(item.href); setMenuOpen(false); }}
                  className="text-left py-3 border-b border-border group flex items-center justify-between"
                  initial={{ x: -32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: ease.expo }}
                >
                  <span className="font-sans font-bold text-[2.2rem] text-fg group-hover:text-accent transition-colors tracking-tightest">
                    {item.label}
                  </span>
                  <span className="text-micro text-muted-2">0{i + 1}</span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {[
                { label: "LinkedIn", href: brand.social.linkedin },
                { label: "Instagram", href: brand.social.instagram },
                { label: "Email", href: brand.social.email },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-label text-muted hover:text-fg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
