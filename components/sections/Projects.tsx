"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { LineReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { projects, type ProjectItem } from "@/content/siteData";
import { ease } from "@/lib/animations";

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectItem;
  index: number;
  onOpen: (p: ProjectItem) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="relative group cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.1, duration: 0.85, ease: ease.premium }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpen(project)}
    >
      {/* ── Visual area ──────────────────────────────────────────────── */}
      <div className="relative h-[280px] md:h-[380px] overflow-hidden bg-[#141414]">
        {/* Project Image Background */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ 
            scale: hovered ? 1.05 : 1,
            opacity: hovered ? 0.5 : 0.8 
          }}
          transition={{ duration: 0.8, ease: ease.premium }}
        />

        {/* Premium Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            background: `linear-gradient(to bottom, transparent 0%, rgba(20,20,20,0.6) 100%), radial-gradient(circle at 50% 50%, ${project.accentColor}15 0%, transparent 100%)`
          }}
        />

        {/* Index number */}
        <div className="absolute top-5 left-6 font-sans font-black text-5xl md:text-7xl text-white/[0.08] select-none">
          {project.index}
        </div>

        {/* Year badge */}
        <div className="absolute top-5 right-5 z-10">
          <span className="text-micro text-white bg-bg/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
            {project.year}
          </span>
        </div>
      </div>

      {/* ── Info area ─────────────────────────────────────────────────── */}
      <div className="p-6 md:p-8 border-t border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[11px] text-muted-2">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-sans font-black text-xl md:text-2xl text-fg tracking-tightest mb-1">
              {project.title}
            </h3>
            <p className="text-[13px] text-muted">{project.subtitle}</p>
          </div>

          <motion.div
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted flex-shrink-0 mt-1 group-hover:border-accent group-hover:text-accent transition-all duration-300"
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3, ease: ease.premium }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>

        <p className="text-[13px] text-muted mt-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-end md:items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5, ease: ease.premium }}
      >
        <div className="relative h-64 md:h-80 overflow-hidden bg-[#141414]">
          <img 
            src={project.image} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="font-sans font-black text-9xl"
              style={{ color: project.accentColor + "20" }}
            >
              {project.index}
            </span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/80 backdrop-blur border border-border flex items-center justify-center text-muted hover:text-fg transition-colors z-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-[11px] border border-border rounded-full text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-sans font-black text-2xl md:text-3xl text-fg tracking-tightest mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted mb-6">{project.subtitle} · {project.year}</p>
          <p className="text-body text-[14px] md:text-[15px]">
            {project.longDescription}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────

export function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <section id="projects" className="relative py-[clamp(7rem,14vw,14rem)] bg-bg overflow-hidden">
        <div className="absolute top-10 right-6 md:right-10 text-micro text-muted-2" aria-hidden="true">
          004 — Work
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <FadeIn direction="none" className="mb-4">
            <p className="text-micro text-muted-2">Selected Work</p>
          </FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <LineReveal
              as="h2"
              delay={0.1}
              className="font-sans font-black tracking-tightest text-fg"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 1 } as React.CSSProperties}
            >
              Selected Work
            </LineReveal>
            <FadeIn direction="none" delay={0.2}>
              <p className="text-[13px] text-muted">
                {projects.length} projects
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setActiveProject}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}