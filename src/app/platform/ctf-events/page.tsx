'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  CalendarDays,
  Flag,
  Lock,
  MapPin,
  Ticket,
  Timer,
} from 'lucide-react';
import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { cn } from '@/lib/utils';
import { monsoonPricingTiers, getMonsoonPrice, MONSOON_START } from '@/lib/pricing';

/* =========================================================
   PLANNED EVENTS
========================================================= */

interface PlannedEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  description: string;
  format: string;
  location: string;
  entry: string;
  startsAt: string;
}

const plannedEvents: PlannedEvent[] = [
  {
    id: 'ctf01',
    day: '20',
    month: 'OCT',
    title: 'Operation Monsoon — our first CTF',
    description:
      '24 hours, jeopardy format. Web, crypto, reversing, cloud misconfiguration. Teams of up to four.',
    format: 'Jeopardy · 24h',
    location: 'Online',
    entry: 'Paid — tiered pricing',
    startsAt: MONSOON_START,
  },
  {
    id: 'cohort01',
    day: 'TBA',
    month: '',
    title: 'Cohort 01 — Offensive Security internship',
    description:
      'Sixteen weeks, part-time, mentored. Dates and application window to be announced.',
    format: 'Internship cohort',
    location: 'Online',
    entry: 'Paid internship',
    startsAt: '',
  },
  {
    id: 'shipit',
    day: 'TBA',
    month: '',
    title: 'Ship It — Next.js build sprint',
    description:
      'One weekend, one brief, working deploys only. Judged on performance budgets and accessibility, not slides.',
    format: 'Hackathon · weekend',
    location: 'Online',
    entry: 'Free entry',
    startsAt: '',
  },
];

/* =========================================================
   COUNTDOWN
========================================================= */

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getRemaining(target: string, now: number): Remaining {
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!target) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target) {
    return (
      <div className="flex items-center gap-1.5 font-mono text-xs text-dim" aria-label="Date to be announced">
        <Timer className="h-3.5 w-3.5" />
        <span>Date to be announced</span>
      </div>
    );
  }

  const r = now === null ? null : getRemaining(target, now);

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs" aria-label="Countdown to event start">
      <Timer className="h-3.5 w-3.5 text-dim" />
      {r === null ? (
        <span className="text-dim">--d --h --m --s</span>
      ) : r.done ? (
        <span className="font-bold text-fg">STARTING</span>
      ) : (
        <span className="text-muted">
          <b className="text-fg">{r.days}d</b> {String(r.hours).padStart(2, '0')}h{' '}
          {String(r.minutes).padStart(2, '0')}m {String(r.seconds).padStart(2, '0')}s
        </span>
      )}
    </div>
  );
}

export default function CTFEventsPage() {
  const firstEvent = plannedEvents[0];
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const currentPrice = getMonsoonPrice(now);

  const partnerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: partnerProgress } = useScroll({
    target: partnerRef,
    offset: ['start end', 'end start'],
  });
  const logoScale = useTransform(partnerProgress, [0, 0.5, 1], [0.82, 1, 0.88]);
  const logoOpacity = useTransform(partnerProgress, [0, 0.2, 0.8, 1], [0.25, 1, 1, 0.35]);
  const ringRotate = useTransform(partnerProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(partnerProgress, [0, 0.5, 1], [0.15, 0.5, 0.15]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-overlay/[0.08]">
        <HeroGlow />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-line bg-overlay/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-widest text-muted">
              <Flag className="h-3.5 w-3.5 text-fg" />
              S-04 · CTF & DEVELOPER EVENTS PLATFORM
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-5xl">
              We're building the arena. <span className="text-gradient-white">First competition coming soon.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Capture-the-flag events and developer contests, end to end: isolated challenge
              infrastructure, live scoreboard, anti-cheat, and a write-up archive afterwards. Our
              first public event is in the works — here's what's planned so far.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/contact">
                Run a Private Event
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>
              <NeonButton href="#events" variant="outline">
                See What's Planned
              </NeonButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-overlay/[0.08] pt-6 font-mono text-xs text-dim">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3 w-3" />
                No events run yet — first one launching soon
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership banner */}
      <section ref={partnerRef} className="relative overflow-hidden border-b border-overlay/[0.08] py-24 md:py-32">
        <HeroGlow />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center md:px-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-md border border-line bg-overlay/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-widest text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse-dot" />
            STRATEGIC PARTNER
          </motion.span>

          <motion.div
            style={{ scale: logoScale, opacity: logoOpacity }}
            className="relative mt-10 flex items-center justify-center py-6"
          >
            <motion.span
              aria-hidden="true"
              style={{ rotate: ringRotate }}
              className="absolute h-[240px] w-[240px] rounded-full border border-dashed border-line/80 sm:h-[300px] sm:w-[300px] md:h-[380px] md:w-[380px]"
            />
            <motion.span
              aria-hidden="true"
              style={{ rotate: ringRotate }}
              className="absolute h-[190px] w-[190px] rounded-full border border-line/50 sm:h-[240px] sm:w-[240px] md:h-[300px] md:w-[300px]"
            />
            <motion.span
              aria-hidden="true"
              style={{ opacity: glowOpacity }}
              className="absolute h-[200px] w-[200px] rounded-full bg-accent/25 blur-[80px] sm:h-[260px] sm:w-[260px] md:h-[340px] md:w-[340px]"
            />
            <Image
              src="/athena-logo.png"
              alt="Athena"
              width={560}
              height={128}
              priority
              className="relative h-16 w-auto dark:invert sm:h-24 md:h-32 lg:h-36"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.7, 0.3, 1] }}
            className="mt-10 max-w-xl font-mono text-[11px] tracking-widest text-dim"
          >
            CHALLENGE INFRASTRUCTURE &amp; ANTI-CHEAT · CO-ENGINEERED WITH ATHENA
          </motion.p>
        </div>
      </section>

      {/* Coming soon — first event spotlight */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{coming.soon}"
            title={firstEvent.title}
            description="This is our first event. There's no live scoreboard or challenge arena yet — both go live the moment the event opens. Here's what to expect."
          />

          <GlassCard hover={false} className="overflow-hidden">
            <div className="flex flex-wrap items-center gap-2.5 border-b border-overlay/[0.08] bg-shade/30 px-5 py-3.5">
              <Lock className="h-3.5 w-3.5 text-dim" />
              <span className="font-mono text-xs text-muted">arena · locked until launch</span>
              <span className="ml-auto">
                <Countdown target={firstEvent.startsAt} />
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Format</p>
                <p className="mt-1.5 text-sm text-fg">{firstEvent.format}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Location</p>
                <p className="mt-1.5 text-sm text-fg">{firstEvent.location}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Current price</p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-fg">
                  <span className="font-bold">{currentPrice.price}</span>
                  <span className="rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
                    {currentPrice.label}
                  </span>
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Categories</p>
                <p className="mt-1.5 text-sm text-fg">Web, crypto, reversing, cloud misconfiguration</p>
              </div>
            </div>

            {/* Pricing tiers */}
            <div className="grid grid-cols-1 gap-3 border-t border-overlay/[0.08] p-6 sm:grid-cols-3">
              {monsoonPricingTiers.map((tier) => {
                const isActive = tier.label === currentPrice.label;
                return (
                  <div
                    key={tier.label}
                    className={cn(
                      'rounded-xl border px-4 py-3 text-center transition-colors',
                      isActive
                        ? 'border-accent bg-accent/[0.06]'
                        : 'border-line bg-shade/20',
                    )}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-widest text-dim">
                      {tier.label}
                    </p>
                    <p className={cn('mt-1 text-lg font-extrabold tracking-tight', isActive ? 'text-accent' : 'text-fg')}>
                      {tier.price}
                    </p>
                    {isActive && (
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
                        Current
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Registration form */}
            <div className="border-t border-overlay/[0.08] p-6">
              <RegisterForm eventId={firstEvent.id} />
            </div>

            <div className="border-t border-overlay/[0.08] bg-shade/30 px-5 py-3">
              <p className="font-mono text-[11px] text-dim">
                Per-team containerised instances · flag-sharing detection · submission audit trail — all active from event start.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Planned events */}
      <section className="border-t border-overlay/[0.08] py-20 md:py-28" id="events">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{on.the.roadmap}"
            title="What's planned"
            description="Nothing below has run yet — this is the roadmap, not a history. Dates will firm up as each event is confirmed."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {plannedEvents.map((ev, i) => (
              <GlassCard key={ev.id} delay={i * 0.06} className="p-6">
                <div className="flex gap-5">
                  <div className="flex-none border-r border-overlay/[0.08] pr-5 text-center">
                    <p className="text-3xl font-extrabold tracking-tight text-fg">{ev.day}</p>
                    <p className="font-mono text-[10px] tracking-widest text-dim">{ev.month || '—'}</p>
                    <span className="mt-3 inline-block rounded-md border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-dim">
                      planned
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold tracking-tight text-fg">{ev.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{ev.description}</p>
                    <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-dim">
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3" />{ev.format}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{ev.location}</span>
                      <span className="flex items-center gap-1.5">
                        <Ticket className="h-3 w-3" />
                        {ev.id === 'ctf01' ? `${currentPrice.price} (${currentPrice.label})` : ev.entry}
                      </span>
                    </div>
                    <div className="mt-4 border-t border-overlay/[0.06] pt-3.5">
                      <Countdown target={ev.startsAt} />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}