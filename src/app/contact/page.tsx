'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Clock, Headset, Mail, MapPin, Phone } from 'lucide-react';
import HeroGlow from '@/components/ui/HeroGlow';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <HeroGlow />
      <div className="relative mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-overlay/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-widest text-muted">
            <Headset className="h-3.5 w-3.5 text-fg" />
            flag{'{'}start.here{'}'}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-5xl">
            Get in <span className="text-gradient-white">touch.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Tell us what you need. We reply within one business day.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <GlassCard hover={false} className="p-7 md:p-9">
            {submitted ? (
              <div className="rounded-xl border border-line bg-soft p-8 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <Check className="h-6 w-6 text-inverse" />
                </span>
                <p className="mt-4 text-base font-bold text-fg">Message received.</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  We reply within one business day. No sequences, no sales calls you didn&apos;t ask
                  for.
                </p>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-dim">
                      Your name
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Priya Deshpande"
                      className="w-full rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-dim">
                      Work email
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="priya@company.com"
                      className="w-full rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-dim">
                    Message
                  </span>
                  <textarea
                    rows={6}
                    required
                    placeholder="What do you need help with?"
                    className="w-full resize-y rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
                  />
                </label>

                <NeonButton type="submit" className="w-full">
                  Send Message
                  <ArrowUpRight className="h-4 w-4" />
                </NeonButton>
              </form>
            )}
          </GlassCard>

          <GlassCard hover={false} className="p-7 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-widest text-dim">Support desk</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3 text-muted">
                <Mail className="h-4 w-4 flex-none text-fg" />
                hello@nexusforge.in
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone className="h-4 w-4 flex-none text-fg" />
                +91 20 4956 1180
              </li>
              <li className="flex items-center gap-3 text-muted">
                <MapPin className="h-4 w-4 flex-none text-fg" />
                Marisoft III, Kalyani Nagar, Pune 411014
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Clock className="h-4 w-4 flex-none text-fg" />
                IST business hours · 24/7 on-call for outages
              </li>
            </ul>
            <div className="mt-6 border-t border-overlay/[0.08] pt-5 font-mono text-[11px] leading-relaxed text-dim">
              Reply within · <b className="font-medium text-fg">one business day</b>
              <br />
              Reviews held over · <b className="font-medium text-fg">Google Meet</b>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
