"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send, Linkedin, Instagram, Mail } from "lucide-react";
import { LineReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { contact, brand } from "@/content/siteData";
import { ease } from "@/lib/animations";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", projectType: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const socials = [
    {
      label: "LinkedIn",
      href: brand.social.linkedin,
      icon: Linkedin,
    },
    {
      label: "Instagram",
      href: brand.social.instagram,
      icon: Instagram,
    },
    {
      label: brand.email,
      href: brand.social.email,
      icon: Mail,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-[clamp(7rem,14vw,14rem)] bg-bg overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-accent/4 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header */}
        <FadeIn direction="none" className="mb-4">
          <p className="text-[13px] font-bold tracking-widest uppercase text-fg">
            {contact.eyebrow}
          </p>
        </FadeIn>
        <div className="mb-6">
          <LineReveal
            as="h2"
            delay={0.1}
            className="font-sans font-black tracking-tightest text-fg"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1.05 } as React.CSSProperties}
          >
            {contact.heading}
          </LineReveal>
        </div>
        <FadeIn delay={0.2} className="mb-20">
          <p className="text-body max-w-md">{contact.subtext}</p>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ── Left — info ─────────────────────────────────────────── */}
          <div className="flex flex-col justify-between gap-12">
            {/* Contact links */}
            <FadeIn delay={0.15} direction="up">
              <div className="space-y-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between py-4 border-b border-border group hover:border-accent/40 transition-colors duration-300"
                  >
                    <>
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-all duration-300">
                          <s.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[14px] text-muted group-hover:text-fg transition-colors duration-300">
                          {s.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-2 group-hover:text-accent transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  </a>
                ))}
              </div>
            </FadeIn>

            {/* Availability notice */}
            <FadeIn delay={0.3}>
              <div className="p-6 border border-border rounded-2xl bg-surface">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span className="text-micro text-emerald-400/80">Currently available</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">
                  Open to new ERP implementation projects, dashboard development, and engineering design work.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ── Right — form ─────────────────────────────────────────── */}
          <FadeIn delay={0.2} direction="up">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label={contact.form.fields.name.label}
                  name="name"
                  type="text"
                  placeholder={contact.form.fields.name.placeholder}
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                />
                <FormField
                  label={contact.form.fields.email.label}
                  name="email"
                  type="email"
                  placeholder={contact.form.fields.email.placeholder}
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  required
                />
              </div>

              {/* Project type */}
              <div>
                <label className="block text-micro text-muted mb-2">
                  {contact.form.fields.projectType.label}
                </label>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
                  required
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-[14px] text-fg focus:border-accent/60 focus:outline-none transition-colors duration-200 appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" disabled>
                    {contact.form.fields.projectType.placeholder}
                  </option>
                  {contact.form.fields.projectType.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-micro text-muted mb-2">
                  {contact.form.fields.message.label}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder={contact.form.fields.message.placeholder}
                  required
                  rows={5}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-[14px] text-fg placeholder:text-muted-2 focus:border-accent/60 focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <MagneticButton className="w-full">
                <motion.button
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full flex items-center justify-center gap-3 bg-fg text-bg hover:bg-accent py-4 rounded-xl text-[14px] font-semibold tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: status === "idle" ? 1.01 : 1 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {status === "sending" ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    />
                  ) : status === "sent" ? (
                    "Message Sent!"
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {contact.form.submitLabel}
                    </>
                  )}
                </motion.button>
              </MagneticButton>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

function FormField({ label, name, type, placeholder, value, onChange, required }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-micro text-muted mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-[14px] text-fg placeholder:text-muted-2 focus:border-accent/60 focus:outline-none transition-colors duration-200"
      />
    </div>
  );
}