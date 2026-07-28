'use client';

import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Clock,
  FileUp,
  Headset,
  Mail,
  MapPin,
  Paperclip,
  Phone,
  X,
} from 'lucide-react';
import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { cn, formatINR } from '@/lib/utils';
import type { QuoteService } from '@/types';

const services: QuoteService[] = [
  { id: 'web-mgmt', label: 'Website Management', basePrice: 38000 },
  { id: 'social', label: 'Social Media & Growth', basePrice: 32000 },
  { id: 'seo', label: 'Technical SEO Sprint', basePrice: 24000 },
  { id: 'ctf', label: 'Private CTF / Hiring Round', basePrice: 90000 },
  { id: 'hiring', label: 'Talent Shortlist', basePrice: 60000 },
  { id: 'redesign', label: 'Redesign / New Build', basePrice: 150000 },
];

/* Budget acts as a scope multiplier: bigger budgets unlock deeper scope. */
function scopeMultiplier(budget: number): number {
  if (budget >= 400000) return 1.35;
  if (budget >= 200000) return 1.15;
  return 1;
}

export default function ContactPage() {
  const [selected, setSelected] = useState<string[]>(['web-mgmt']);
  const [budget, setBudget] = useState(150000);
  const [files, setFiles] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quote = useMemo(() => {
    const base = services
      .filter((s) => selected.includes(s.id))
      .reduce((sum, s) => sum + s.basePrice, 0);
    // Bundle discount: 5% for 2 services, 10% for 3+
    const discount = selected.length >= 3 ? 0.1 : selected.length === 2 ? 0.05 : 0;
    const estimate = Math.round(base * scopeMultiplier(budget) * (1 - discount));
    return { base, discount, estimate };
  }, [selected, budget]);

  const toggleService = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list).map((f) => f.name)].slice(0, 5));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-overlay/[0.08]">
        <HeroGlow />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
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
              Build your quote. <span className="text-gradient-white">Book your review.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Pick what you need and get an instant ballpark. Then we hold a forty-five minute systems
              review — no charge, no deck — and tell you the three things we&apos;d fix first. You keep
              the notes either way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote builder */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Builder */}
            <GlassCard hover={false} className="p-7 md:p-9">
              <h2 className="text-xl font-bold tracking-tight text-fg">Interactive Project Estimator</h2>
              <p className="mt-2 text-sm text-muted">
                Select services, set a monthly budget, attach anything we should read first.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-xl border border-line bg-soft p-8 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <Check className="h-6 w-6 text-inverse" />
                  </span>
                  <p className="mt-4 text-base font-bold text-fg">Request received.</p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    We reply within one business day with a confirmed quote and review slots. No
                    sequences, no sales calls you didn&apos;t ask for.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-8 space-y-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  {/* Service chips */}
                  <fieldset>
                    <legend className="mb-3 font-mono text-[11px] uppercase tracking-widest text-dim">
                      1 · What do you need? (multi-select)
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => {
                        const active = selected.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleService(s.id)}
                            aria-pressed={active}
                            className={cn(
                              'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200',
                              active
                                ? 'border-accent bg-accent text-inverse'
                                : 'border-line bg-soft text-muted hover:border-line-strong hover:text-fg',
                            )}
                          >
                            {active && <Check className="h-3.5 w-3.5" />}
                            {s.label}
                            <span className={cn('font-mono text-[10px]', active ? 'text-inverse/70' : 'text-dim')}>
                              {formatINR(s.basePrice)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Budget slider */}
                  <div>
                    <div className="mb-3 flex items-baseline justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-dim">
                        2 · Monthly budget
                      </span>
                      <span className="text-xl font-extrabold tracking-tight text-fg">{formatINR(budget)}</span>
                    </div>
                    <input
                      type="range"
                      min={25000}
                      max={600000}
                      step={25000}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      aria-label="Monthly budget"
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-[rgb(var(--c-accent))]
                        [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
                        [&::-webkit-slider-thumb]:shadow-glow-white"
                    />
                    <div className="mt-2 flex justify-between font-mono text-[10px] text-dim">
                      <span>₹25K</span>
                      <span>₹6L</span>
                    </div>
                  </div>

                  {/* File upload zone */}
                  <div>
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-widest text-dim">
                      3 · Anything we should read first (optional, max 5 files)
                    </span>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        addFiles(e.dataTransfer.files);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                      className={cn(
                        'flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-8 text-center transition-colors',
                        dragging
                          ? 'border-accent bg-overlay/[0.06]'
                          : 'border-line bg-soft hover:border-line-strong',
                      )}
                    >
                      <FileUp className="h-6 w-6 text-dim" />
                      <p className="mt-3 text-sm font-medium text-fg">
                        Drop files here or click to browse
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-dim">
                        Briefs, audits, screenshots — PDF, DOC, PNG up to 10MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => addFiles(e.target.files)}
                      />
                    </div>
                    {files.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {files.map((name, i) => (
                          <li
                            key={`${name}-${i}`}
                            className="flex items-center gap-2.5 rounded-lg border border-line bg-soft px-3.5 py-2.5 font-mono text-xs text-muted"
                          >
                            <Paperclip className="h-3.5 w-3.5 flex-none text-dim" />
                            <span className="truncate">{name}</span>
                            <button
                              type="button"
                              aria-label={`Remove ${name}`}
                              onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                              className="ml-auto text-dim transition-colors hover:text-accent"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Contact fields */}
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
                        placeholder="priya@company.in"
                        className="w-full rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-dim">
                      Notes
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Site URL, current stack, or the role you're hiring for."
                      className="w-full resize-y rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
                    />
                  </label>

                  <NeonButton type="submit" className="w-full" disabled={selected.length === 0}>
                    Request the Review
                    <ArrowUpRight className="h-4 w-4" />
                  </NeonButton>
                </form>
              )}
            </GlassCard>

            {/* Instant quote + support desk */}
            <div className="space-y-5">
              <GlassCard hover={false} className="p-7 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-dim">Instant estimate</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-fg">
                  {selected.length > 0 ? formatINR(quote.estimate) : '—'}
                  <span className="ml-1 font-mono text-sm font-normal text-dim">/month*</span>
                </p>
                <div className="mt-6 space-y-3 border-t border-overlay/[0.08] pt-5 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Selected services ({selected.length})</span>
                    <span className="font-mono">{formatINR(quote.base)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Scope multiplier</span>
                    <span className="font-mono">×{scopeMultiplier(budget).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Bundle discount</span>
                    <span className="font-mono">−{(quote.discount * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <p className="mt-5 font-mono text-[11px] leading-relaxed text-dim">
                  *Ballpark only. The confirmed quote follows the free systems review and a written
                  scope. Retainers are monthly with thirty days&apos; notice — no lock-in.
                </p>
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
        </div>
      </section>

      {/* FAQ strip */}
      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader badge="flag{before.you.ask}" title="Fair questions" />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: 'Can you take over a site someone else built?',
                a: 'Yes — most of our accounts start that way. We run a two-week audit first: stack, dependencies, backups, security posture and performance. You get the findings whether or not you sign.',
              },
              {
                q: 'How does billing work?',
                a: "Management and social retainers are monthly, thirty days' notice, no lock-in. Project work and events are fixed-price against a written scope. Placements are a one-time fee with a 90-day replacement guarantee.",
              },
              {
                q: 'Do you work with clients outside Pune?',
                a: 'Most of our accounts are remote, across India and a handful in the UAE and Singapore. Support runs on IST business hours with 24/7 on-call for anything that takes a site down.',
              },
              {
                q: 'Can we run a CTF on our own branding?',
                a: 'Yes. White-label events run on your domain with your logo. We handle challenge authoring, infrastructure, anti-cheat and the scoreboard; you own all participant data.',
              },
            ].map((f, i) => (
              <GlassCard key={f.q} delay={i * 0.05} className="p-6 md:p-7">
                <h3 className="text-base font-bold tracking-tight text-fg">{f.q}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
