'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Flag, MapPin, Ticket, Timer, Users } from 'lucide-react';
import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';
import type { CTFEvent, LeaderboardEntry } from '@/types';

const events: CTFEvent[] = [
  {
    id: 'ctf04',
    day: '08',
    month: 'AUG',
    title: 'Nexus Forge CTF 04 — Monsoon',
    description: '24 hours, jeopardy format. Web, crypto, reversing, cloud misconfiguration. Teams of up to four.',
    format: 'Jeopardy · 24h',
    location: 'Online',
    entry: 'Free entry',
    seats: '1,120 registered',
    startsAt: '2026-08-08T09:00:00+05:30',
    status: 'live',
  },
  {
    id: 'cohort12',
    day: '18',
    month: 'AUG',
    title: 'Cohort 12 begins — Offensive Security',
    description: 'Sixteen weeks, part-time, mentored. Applications close 5 August; 40 seats.',
    format: 'Internship cohort',
    location: 'Pune + remote',
    entry: 'Paid internship',
    seats: '40 seats',
    startsAt: '2026-08-18T10:00:00+05:30',
    status: 'upcoming',
  },
  {
    id: 'shipit',
    day: '05',
    month: 'SEP',
    title: 'Ship It — Next.js build sprint',
    description: 'One weekend, one brief, working deploys only. Judged on performance budgets and accessibility, not slides.',
    format: 'Hackathon · weekend',
    location: 'Kharadi, Pune',
    entry: 'Free entry',
    seats: '120 seats',
    startsAt: '2026-09-05T09:00:00+05:30',
    status: 'upcoming',
  },
  {
    id: 'blueteam',
    day: '27',
    month: 'SEP',
    title: 'Blue Team Day — SOC triage clinic',
    description: 'Live incident replays with real log sets. Bring a laptop; we bring the alerts and the noise.',
    format: 'Workshop · 1 day',
    location: 'Online',
    entry: '₹499',
    seats: '200 seats',
    startsAt: '2026-09-27T10:00:00+05:30',
    status: 'upcoming',
  },
];

const baseBoard: LeaderboardEntry[] = [
  { rank: 1, team: 'nullbyte_ninjas', solves: 14, points: 4820, lastSolve: 'web/ssti-bakery' },
  { rank: 2, team: 'deccan_daemons', solves: 13, points: 4510, lastSolve: 'rev/nullbyte' },
  { rank: 3, team: 'p0int_break', solves: 12, points: 4180, lastSolve: 'cloud/leaky-bucket' },
  { rank: 4, team: 'shellsmiths', solves: 11, points: 3960, lastSolve: 'crypto/lattice-lane' },
  { rank: 5, team: 'zero_cool_v2', solves: 10, points: 3640, lastSolve: 'pwn/heap-of-trouble' },
  { rank: 6, team: 'kernel_panic_club', solves: 9, points: 3320, lastSolve: 'web/jwt-jugaad' },
  { rank: 7, team: 'monsoon_mavericks', solves: 9, points: 3180, lastSolve: 'forensics/wet-logs' },
];

const challenges = [
  { code: 'web/ssti-bakery', points: 400, solves: 42, difficulty: 'medium' },
  { code: 'rev/nullbyte', points: 500, solves: 11, difficulty: 'hard' },
  { code: 'cloud/leaky-bucket', points: 300, solves: 78, difficulty: 'easy' },
  { code: 'crypto/lattice-lane', points: 450, solves: 19, difficulty: 'hard' },
  { code: 'pwn/heap-of-trouble', points: 500, solves: 8, difficulty: 'insane' },
  { code: 'forensics/wet-logs', points: 250, solves: 96, difficulty: 'easy' },
];

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
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Render placeholders until mounted to keep static export hydration clean
  const r = now === null ? null : getRemaining(target, now);

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs" aria-label="Countdown to event start">
      <Timer className="h-3.5 w-3.5 text-dim" />
      {r === null ? (
        <span className="text-dim">--d --h --m --s</span>
      ) : r.done ? (
        <span className="font-bold text-fg">IN PROGRESS</span>
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
  const [board, setBoard] = useState(baseBoard);

  useEffect(() => {
    const id = setInterval(() => {
      setBoard((prev) =>
        [...prev]
          .map((e) => ({ ...e, points: e.points + Math.floor(Math.random() * 35) }))
          .sort((a, b) => b.points - a.points)
          .map((e, i) => ({ ...e, rank: i + 1 })),
      );
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const liveEvent = useMemo(() => events.find((e) => e.status === 'live'), []);

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
              We host the competition. <span className="text-gradient-white">You watch the talent surface.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Capture-the-flag events and developer contests end to end: isolated challenge
              infrastructure, live scoreboard, anti-cheat, and a write-up archive afterwards. Run it as
              a public event or a private hiring round.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/contact">
                Run a Private Event
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>
              <NeonButton href="#events" variant="outline">
                Browse Competitions
              </NeonButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-overlay/[0.08] pt-6 font-mono text-xs text-dim">
              <span>Scale tested to · <b className="font-medium text-fg">2,400 concurrent teams</b></span>
              <span>Events run · <b className="font-medium text-fg">96</b></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live leaderboard + challenge arena mockup */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{live.now}"
            title={liveEvent ? liveEvent.title : 'Arena'}
            description="Scores drift as teams submit flags. First-blood alerts, freeze window and full submission audit trail included in every event."
          />
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Leaderboard */}
            <GlassCard hover={false} className="overflow-hidden">
              <div className="flex items-center gap-2.5 border-b border-overlay/[0.08] bg-shade/30 px-5 py-3.5">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
                <span className="font-mono text-xs text-muted">scoreboard · live</span>
                {liveEvent && (
                  <span className="ml-auto">
                    <Countdown target={liveEvent.startsAt} />
                  </span>
                )}
              </div>
              <div className="px-5 py-1">
                {board.map((entry) => (
                  <motion.div
                    key={entry.team}
                    layout
                    transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
                    className="flex items-center gap-4 border-b border-overlay/[0.04] py-3 last:border-0"
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 flex-none items-center justify-center rounded-lg border font-mono text-xs font-bold',
                        entry.rank <= 3
                          ? 'border-accent bg-accent text-inverse'
                          : 'border-line bg-shade/25 text-muted',
                      )}
                    >
                      {entry.rank}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-mono text-sm text-fg">{entry.team}</p>
                      <p className="truncate font-mono text-[10px] text-dim">last: {entry.lastSolve}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="font-mono text-sm font-bold text-fg">{entry.points.toLocaleString()}</p>
                      <p className="font-mono text-[10px] text-dim">{entry.solves} solves</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Challenge arena */}
            <GlassCard hover={false} className="overflow-hidden">
              <div className="flex items-center gap-2.5 border-b border-overlay/[0.08] bg-shade/30 px-5 py-3.5">
                <Flag className="h-3.5 w-3.5 text-fg" />
                <span className="font-mono text-xs text-muted">challenge arena · 6 of 24 shown</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 p-4 sm:grid-cols-2">
                {challenges.map((c) => (
                  <div
                    key={c.code}
                    className="group cursor-pointer rounded-xl border border-line bg-soft p-4 transition-colors hover:border-accent/60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                        {c.difficulty}
                      </span>
                      <span className="font-mono text-xs font-bold text-fg">{c.points} pts</span>
                    </div>
                    <p className="mt-2.5 truncate font-mono text-[13px] text-fg">{c.code}</p>
                    <p className="mt-1.5 font-mono text-[10px] text-dim">{c.solves} solves</p>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full bg-accent/70"
                        style={{ width: `${Math.min(100, c.solves)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-overlay/[0.08] bg-shade/30 px-5 py-3">
                <p className="font-mono text-[11px] text-dim">
                  Per-team containerised instances · flag-sharing detection · submission audit trail
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Active & upcoming */}
      <section className="border-t border-overlay/[0.08] py-20 md:py-28" id="events">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{on.the.calendar}"
            title="Active & upcoming competitions"
            description="Open to anyone. Free to enter unless marked otherwise, and every event ships public write-ups afterwards."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((ev, i) => (
              <GlassCard key={ev.id} delay={i * 0.06} className="p-6">
                <div className="flex gap-5">
                  <div className="flex-none border-r border-overlay/[0.08] pr-5 text-center">
                    <p className="text-3xl font-extrabold tracking-tight text-fg">{ev.day}</p>
                    <p className="font-mono text-[10px] tracking-widest text-dim">{ev.month}</p>
                    <span
                      className={cn(
                        'mt-3 inline-block rounded-md border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest',
                        ev.status === 'live'
                          ? 'border-accent bg-accent text-inverse'
                          : 'border-line text-dim',
                      )}
                    >
                      {ev.status}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold tracking-tight text-fg">{ev.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{ev.description}</p>
                    <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-dim">
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3" />{ev.format}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{ev.location}</span>
                      <span className="flex items-center gap-1.5"><Ticket className="h-3 w-3" />{ev.entry}</span>
                      <span className="flex items-center gap-1.5"><Users className="h-3 w-3" />{ev.seats}</span>
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
