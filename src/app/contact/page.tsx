'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Clock,
  Headset,
  Mail,
  Phone,
} from 'lucide-react';

import HeroGlow from '@/components/ui/HeroGlow';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <HeroGlow />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 md:px-8 md:py-24">
        {/* =====================================================
            HERO / HEADER
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.2, 0.7, 0.3, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-overlay/[0.04] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-muted sm:text-[11px]">
            <Headset className="h-3.5 w-3.5 text-fg" />
            flag{'{'}start.here{'}'}
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
            Let&apos;s build something{' '}
            <span className="text-gradient-white">
              that grows.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base md:text-lg">
            Tell NexForTech about your business, project or growth
            requirements. We&apos;ll review your requirements and get back to
            you within one business day.
          </p>
        </motion.div>

        {/* =====================================================
            CONTACT CONTENT
        ===================================================== */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* ===================================================
              CONTACT FORM
          =================================================== */}
          <GlassCard
            hover={false}
            className="p-6 sm:p-7 md:p-9"
          >
            {submitted ? (
              /* ===============================================
                 SUCCESS STATE
              =============================================== */
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-line bg-soft p-8 text-center"
              >
                {/* Success Icon */}
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-glow-soft">
                  <Check className="h-7 w-7 text-inverse" />
                </span>

                <h2 className="mt-5 text-xl font-bold text-fg sm:text-2xl">
                  Message received.
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  Thank you for contacting NexForTech. Our team will review
                  your requirements and get back to you within one business
                  day.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 font-mono text-[10px] uppercase tracking-[0.15em] text-fg underline-offset-4 transition-opacity hover:opacity-70 hover:underline sm:text-[11px]"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              /* ===============================================
                 FORM
              =============================================== */
              <form
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                {/* -----------------------------------------------
                    NAME + EMAIL
                ------------------------------------------------ */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-dim sm:text-[11px]">
                      Your name
                    </span>

                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full rounded-lg border border-line bg-base px-3.5 py-3 text-sm text-fg outline-none transition-all placeholder:text-dim focus:border-accent focus:ring-1 focus:ring-accent/20"
                    />
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-dim sm:text-[11px]">
                      Work email
                    </span>

                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-line bg-base px-3.5 py-3 text-sm text-fg outline-none transition-all placeholder:text-dim focus:border-accent focus:ring-1 focus:ring-accent/20"
                    />
                  </label>
                </div>

                {/* -----------------------------------------------
                    COMPANY + PHONE
                ------------------------------------------------ */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Company */}
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-dim sm:text-[11px]">
                      Company
                    </span>

                    <input
                      type="text"
                      name="company"
                      autoComplete="organization"
                      placeholder="Company name"
                      className="w-full rounded-lg border border-line bg-base px-3.5 py-3 text-sm text-fg outline-none transition-all placeholder:text-dim focus:border-accent focus:ring-1 focus:ring-accent/20"
                    />
                  </label>

                  {/* Phone */}
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-dim sm:text-[11px]">
                      Phone
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-lg border border-line bg-base px-3.5 py-3 text-sm text-fg outline-none transition-all placeholder:text-dim focus:border-accent focus:ring-1 focus:ring-accent/20"
                    />
                  </label>
                </div>

                {/* -----------------------------------------------
                    REQUIREMENT
                ------------------------------------------------ */}
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-dim sm:text-[11px]">
                    What can we help with?
                  </span>

                  <textarea
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us about your project, website, social media, SEO, advertising, software or digital growth requirements..."
                    className="w-full resize-y rounded-lg border border-line bg-base px-3.5 py-3 text-sm leading-relaxed text-fg outline-none transition-all placeholder:text-dim focus:border-accent focus:ring-1 focus:ring-accent/20"
                  />
                </label>

                {/* -----------------------------------------------
                    SUBMIT
                ------------------------------------------------ */}
                <div className="pt-1">
                  <NeonButton
                    type="submit"
                    className="w-full justify-center"
                  >
                    Send Message
                    <ArrowUpRight className="h-4 w-4" />
                  </NeonButton>
                </div>

                {/* Privacy Note */}
                <p className="text-center font-mono text-[10px] leading-relaxed text-dim">
                  Your information will only be used to respond to your
                  enquiry.
                </p>
              </form>
            )}
          </GlassCard>

          {/* ===================================================
              RIGHT SIDE
          =================================================== */}
          <div className="flex flex-col gap-6">
            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}
            <GlassCard
              hover={false}
              className="p-6 sm:p-7 md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim sm:text-[11px]">
                Contact NexForTech
              </p>

              <h2 className="mt-3 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                Start a conversation.
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                Looking for a website, social media management, SEO, paid
                advertising or a complete digital growth solution? Tell us
                what you&apos;re working on.
              </p>

              {/* Contact Links */}
              <div className="mt-7 space-y-4">
                {/* Email */}
                <a
                  href="mailto:hello@nexfortech.in"
                  aria-label="Email NexForTech"
                  className="group flex items-center gap-3 rounded-xl border border-line bg-soft p-4 transition-all duration-300 hover:border-accent/50 hover:bg-surface"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-line bg-base">
                    <Mail className="h-4 w-4 text-fg" />
                  </span>

                  <span className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-dim">
                      Email
                    </span>

                    <span className="mt-1 block truncate text-sm font-medium text-fg">
                      hello@nexfortech.in
                    </span>
                  </span>

                  <ArrowUpRight className="ml-auto h-4 w-4 flex-none text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>

                {/* Phone */}
                <a
                  href="tel:+912049561180"
                  aria-label="Call NexForTech"
                  className="group flex items-center gap-3 rounded-xl border border-line bg-soft p-4 transition-all duration-300 hover:border-accent/50 hover:bg-surface"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-line bg-base">
                    <Phone className="h-4 w-4 text-fg" />
                  </span>

                  <span className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-dim">
                      Phone
                    </span>

                    <span className="mt-1 block text-sm font-medium text-fg">
                      +91 20 4956 1180
                    </span>
                  </span>

                  <ArrowUpRight className="ml-auto h-4 w-4 flex-none text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>
              </div>
            </GlassCard>

            {/* =================================================
                RESPONSE TIME
            ================================================= */}
            <GlassCard
              hover={false}
              className="p-6 sm:p-7 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line bg-soft">
                  <Clock className="h-5 w-5 text-fg" />
                </span>

                <div>
                  <p className="font-semibold text-fg">
                    Quick response
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    We typically respond within one business day.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-overlay/[0.08] pt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                    Response time
                  </span>

                  <span className="rounded-full border border-line bg-soft px-3 py-1 font-mono text-[10px] font-medium text-fg">
                    Within 1 business day
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* =================================================
                PROJECT CTA
            ================================================= */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="rounded-2xl border border-line bg-soft p-6 sm:p-7"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />

                <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                  Open for projects
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold tracking-tight text-fg">
                Have a project in mind?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                Share your requirements with NexForTech and let&apos;s figure
                out the right digital solution for your business.
              </p>
            </motion.div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM TRUST STRIP
        ===================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-50px',
          }}
          transition={{
            duration: 0.5,
          }}
          className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-overlay/[0.08] pt-7 text-center sm:flex-row sm:gap-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
            NexForTech
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-dim sm:block" />

          <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
            Digital solutions
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-dim sm:block" />

          <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
            Growth &amp; technology
          </span>
        </motion.div>
      </div>
    </section>
  );
}