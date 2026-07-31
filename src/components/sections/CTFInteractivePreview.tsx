'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flag, Shield, Trophy, Zap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import type { LeaderboardEntry } from '@/types';
import { cn } from '@/lib/utils';

const baseBoard: LeaderboardEntry[] = [
  { rank: 1, team: 'nullbyte_ninjas', solves: 14, points: 4820, lastSolve: 'web/ssti-bakery' },
  { rank: 2, team: 'deccan_daemons', solves: 13, points: 4510, lastSolve: 'rev/nullbyte' },
  { rank: 3, team: 'p0int_break', solves: 12, points: 4180, lastSolve: 'cloud/leaky-bucket' },
  { rank: 4, team: 'shellsmiths', solves: 11, points: 3960, lastSolve: 'crypto/lattice-lane' },
  { rank: 5, team: 'zero_cool_v2', solves: 10, points: 3640, lastSolve: 'pwn/heap-of-trouble' },
];

const feedEvents: [string, string][] = [
  ['solved', 'web/ssti-bakery · nullbyte_ninjas'],
  ['first blood', 'rev/nullbyte · deccan_daemons'],
  ['solved', 'cloud/leaky-bucket · p0int_break'],
  ['verified', 'skill report · A. Pawar'],
  ['solved', 'crypto/lattice-lane · shellsmiths'],
];

export default function CTFInteractivePreview() {
  const [board, setBoard] = useState(baseBoard);
  const [feedIdx, setFeedIdx] = useState(0);

  // Simulate live score drift + rotating activity feed
  useEffect(() => {
    const id = setInterval(() => {
      setBoard((prev) =>
        [...prev]
          .map((e) => ({ ...e, points: e.points + Math.floor(Math.random() * 40) }))
          .sort((a, b) => b.points - a.points)
          .map((e, i) => ({ ...e, rank: i + 1 })),
      );
      setFeedIdx((i) => (i + 1) % feedEvents.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative border-t border-overlay/[0.08] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              badge="flag{live.arena}"
              title="The CTF Arena is always on."
              description="Weekly ladders and 24-hour capture-the-flag events on isolated infrastructure. Timed, audited, anti-cheat enforced — and every solve builds a verified skill record."
              className="mb-8"
            />
            <div className="mb-8 grid grid-cols-3 gap-4">
              {[
                { icon: <Trophy className="h-4 w-4" />, value: '96', label: 'Events run' },
                { icon: <Shield className="h-4 w-4" />, value: '2,400', label: 'Concurrent teams tested' },
                { icon: <Zap className="h-4 w-4" />, value: '1,204', label: 'Verified reports' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-line bg-soft p-4">
                  <span className="text-muted">{s.icon}</span>
                  <p className="mt-2 text-xl font-extrabold tracking-tight text-fg">{s.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/platform/ctf-events"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-inverse shadow-glow-soft transition-all hover:bg-accent-hover hover:shadow-glow-white"
            >
              Enter the Arena
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Simulated live leaderboard */}
          <GlassCard className="overflow-hidden" hover={false}>
            <div className="flex items-center gap-2.5 border-b border-overlay/[0.08] bg-shade/30 px-5 py-3.5">
              <span className="h-2 w-2 rounded-full bg-live animate-pulse-dot" />
              <span className="font-mono text-xs text-muted">nexusforge / ctf-04-monsoon / scoreboard</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-dim">live</span>
            </div>
            <div className="px-5 py-2">
              {board.map((entry) => (
                <motion.div
                  key={entry.team}
                  layout
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
                  className="flex items-center gap-4 border-b border-overlay/[0.04] py-3.5 last:border-0"
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 flex-none items-center justify-center rounded-lg border font-mono text-xs font-bold',
                      entry.rank === 1
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
            <div className="border-t border-overlay/[0.08] bg-shade/30 px-5 py-3">
              <p className="flex items-center gap-2 truncate font-mono text-xs text-muted">
                <Flag className="h-3.5 w-3.5 flex-none text-fg" />
                <b className="font-medium text-fg">{feedEvents[feedIdx][0]}</b>
                <span className="truncate">{feedEvents[feedIdx][1]}</span>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
