"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import GrainOverlay from "@/components/effects/GrainOverlay";
import ScrollProgress from "@/components/effects/ScrollProgress";

// Client-only components to prevent SSR issues with Browser APIs (window, document)
const SpaceCanvas = dynamic(() => import("@/components/effects/SpaceCanvas"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/effects/CustomCursor"), { ssr: false });

/**
 * Shoaib Studio — Main Entry Point
 * Modular implementation utilizing Tailwind CSS and Framer Motion.
 * Optimized for "Modern Minimalist" (Black/Blue) aesthetic.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg selection:bg-accent/30 selection:text-fg antialiased">
      {/* Visual Effects Layer */}
      <LoadingScreen />
      <GrainOverlay />
      <SpaceCanvas />
      <CustomCursor />
      <ScrollProgress />

      {/* Main UI */}
      <Navigation />
      
      <div className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Services />
        <Skills />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
