"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { brand, footer } from "@/content/siteData";
import { ease } from "@/lib/animations";

export function Footer() {
  return (
    <footer className="relative bg-bg border-t border-border overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 py-24">
        {/* Main Footer Content - Now Centered */}
        <div className="pb-20 border-b border-border flex flex-col items-center text-center">
          <FadeIn direction="up">
            {/* Logo - Made bigger (text-4xl) */}
            <p className="font-sans font-black text-4xl md:text-5xl tracking-tightest text-fg mb-4">
              <span className="text-accent">S</span>hoaib.studio
            </p>
            
            {/* Tagline - Made bigger (text-lg) and wider spacing */}
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-2xl tracking-tight">
              {brand.tagline}
            </p>
            
            {/* Availability Marker - Centered */}
            <div className="flex items-center justify-center gap-3 bg-surface/50 px-5 py-2 rounded-full border border-border w-fit mx-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] text-fg font-medium tracking-widest uppercase">
                {brand.availability}
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          <p className="text-micro text-muted-2 order-2 md:order-1">{footer.copyright}</p>
          
          {/* Back to top - Centered on mobile */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-[11px] text-muted hover:text-fg transition-colors group order-1 md:order-2"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            data-cursor-text="Top"
          >
            <span className="text-micro">Back to top</span>
            <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors">
              <svg viewBox="0 0 10 10" width="10" height="10" fill="none">
                <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>

          <p className="text-micro text-muted-2 uppercase tracking-widest order-3">{footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}