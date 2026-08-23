'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Flag,
  Shield,
  Trophy,
  Zap,
  Activity,
  Terminal,
} from 'lucide-react';

import SectionHeader from '@/components/ui/SectionHeader';
import type { LeaderboardEntry } from '@/types';
import { cn } from '@/lib/utils';

const baseBoard: LeaderboardEntry[] = [
  {
    rank: 1,
    team: 'nullbyte_ninjas',
    solves: 14,
    points: 4820,
    lastSolve: 'web/ssti-bakery',
  },
  {
    rank: 2,
    team: 'deccan_daemons',
    solves: 13,
    points: 4510,
    lastSolve: 'rev/nullbyte',
  },
  {
    rank: 3,
    team: 'p0int_break',
    solves: 12,
    points: 4180,
    lastSolve: 'cloud/leaky-bucket',
  },
  {
    rank: 4,
    team: 'shellsmiths',
    solves: 11,
    points: 3960,
    lastSolve: 'crypto/lattice-lane',
  },
  {
    rank: 5,
    team: 'zero_cool_v2',
    solves: 10,
    points: 3640,
    lastSolve: 'pwn/heap-of-trouble',
  },
];

const feedEvents: [string, string][] = [
  ['solved', 'web/ssti-bakery · nullbyte_ninjas'],
  ['first blood', 'rev/nullbyte · deccan_daemons'],
  ['solved', 'cloud/leaky-bucket · p0int_break'],
  ['verified', 'skill report · A. Pawar'],
  ['solved', 'crypto/lattice-lane · shellsmiths'],
];

const stats = [
  {
    icon: <Trophy className="h-4 w-4" />,
    value: '96',
    label: 'Events run',
  },
  {
    icon: <Shield className="h-4 w-4" />,
    value: '2,400',
    label: 'Concurrent teams',
  },
  {
    icon: <Zap className="h-4 w-4" />,
    value: '1,204',
    label: 'Verified reports',
  },
];

export default function CTFInteractivePreview() {
  const [board, setBoard] =
    useState<LeaderboardEntry[]>(baseBoard);

  const [feedIdx, setFeedIdx] =
    useState(0);

  const [lastUpdate, setLastUpdate] =
    useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBoard((previous) =>
        [...previous]
          .map((entry) => ({
            ...entry,
            points:
              entry.points +
              Math.floor(Math.random() * 40),
          }))
          .sort(
            (a, b) =>
              b.points - a.points,
          )
          .map((entry, index) => ({
            ...entry,
            rank: index + 1,
          })),
      );

      setFeedIdx(
        (index) =>
          (index + 1) %
          feedEvents.length,
      );

      setLastUpdate(
        (value) => value + 1,
      );
    }, 2400);

    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="arena"
      className="
        relative
        overflow-hidden
        border-t
        border-overlay/[0.08]
        py-20
        md:py-28
        lg:py-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[450px]
            w-[650px]
            -translate-x-1/2
            rounded-full
            bg-accent/[0.025]
            blur-[140px]
            dark:bg-accent/[0.04]
          "
        />

        <div
          className="
            absolute
            right-[-150px]
            top-1/2
            h-[300px]
            w-[300px]
            rounded-full
            bg-accent/[0.015]
            blur-[120px]
            dark:bg-accent/[0.025]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.018]
            dark:opacity-[0.025]
          "
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize:
              '48px 48px',
          }}
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          md:px-8
        "
      >
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div>
            <SectionHeader
              badge="flag{live.arena}"
              title="The CTF Arena is always on."
              description="Weekly ladders and 24-hour capture-the-flag events on isolated infrastructure. Timed, audited, anti-cheat enforced — and every solve builds a verified skill record."
              className="mb-8"
            />

            {/* =================================================
                STATS
            ================================================= */}

            <div
              className="
                mb-8
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
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
                  transition={{
                    delay:
                      index * 0.08,
                    duration: 0.4,
                  }}
                  className="
                    group
                    rounded-xl
                    border
                    border-line
                    bg-surface
                    p-4
                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:border-accent/25

                    dark:border-white/[0.08]
                    dark:bg-[#101010]
                    dark:hover:border-white/[0.16]
                    dark:hover:bg-[#141414]
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-line
                      bg-soft
                      text-muted
                      transition-all
                      duration-300

                      group-hover:border-accent/30
                      group-hover:bg-accent/[0.06]
                      group-hover:text-accent

                      dark:border-white/[0.08]
                      dark:bg-white/[0.035]
                    "
                  >
                    {stat.icon}
                  </div>

                  <p
                    className="
                      mt-3
                      text-xl
                      font-extrabold
                      tracking-tight
                      text-fg
                    "
                  >
                    {stat.value}
                  </p>

                  <p
                    className="
                      mt-1
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.12em]
                      text-dim
                    "
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* =================================================
                CTA
            ================================================= */}

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/platform/ctf-events"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-accent
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-inverse
                  transition-all
                  duration-300
                  hover:bg-accent-hover
                "
              >
                Enter the Arena

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <span
                className="
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[10px]
                  tracking-wider
                  text-dim
                "
              >
                <span
                  className="
                    relative
                    flex
                    h-2
                    w-2
                  "
                >
                  <span
                    className="
                      absolute
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-live
                      opacity-50
                    "
                  />

                  <span
                    className="
                      relative
                      h-2
                      w-2
                      rounded-full
                      bg-live
                    "
                  />
                </span>

                ARENA ONLINE
              </span>
            </div>
          </div>

          {/* =================================================
              LIVE CONSOLE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: '-60px',
            }}
            transition={{
              duration: 0.65,
              ease: [0.2, 0.7, 0.3, 1],
            }}
            className="relative"
          >
            {/* Console glow */}
            <div
              className="
                pointer-events-none
                absolute
                inset-8
                rounded-[2rem]
                bg-accent/[0.025]
                blur-3xl
                dark:bg-accent/[0.04]
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-line
                bg-surface
                shadow-[0_20px_60px_rgba(0,0,0,0.06)]

                dark:border-white/[0.09]
                dark:bg-[#0d0d0d]
                dark:shadow-[0_25px_70px_rgba(0,0,0,0.45)]
              "
            >
              {/* =================================================
                  TERMINAL HEADER
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-line
                  bg-soft/40
                  px-4
                  py-3

                  dark:border-white/[0.07]
                  dark:bg-white/[0.025]
                "
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  <span className="h-2 w-2 rounded-full bg-green-400/70" />
                </div>

                <div className="mx-1 h-4 w-px bg-line" />

                <Terminal className="h-3.5 w-3.5 text-dim" />

                <span className="truncate font-mono text-[10px] text-muted sm:text-xs">
                  nexfortech / ctf-04-monsoon
                </span>

                <span
                  className="
                    ml-auto
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-live/20
                    bg-live/[0.05]
                    px-2
                    py-1
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-widest
                    text-live
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-live" />
                  LIVE
                </span>
              </div>

              {/* =================================================
                  CONSOLE META
              ================================================= */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-line
                  px-4
                  py-3

                  dark:border-white/[0.06]
                "
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-accent" />

                  <span className="font-mono text-[9px] tracking-wider text-muted">
                    SCOREBOARD
                  </span>
                </div>

                <span className="font-mono text-[9px] text-dim">
                  UPDATE #{lastUpdate}
                </span>
              </div>

              {/* =================================================
                  LEADERBOARD
              ================================================= */}

              <div className="px-3 py-2 sm:px-4">
                <div
                  className="
                    grid
                    grid-cols-[36px_1fr_auto]
                    gap-3
                    px-2
                    py-2
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-widest
                    text-dim
                  "
                >
                  <span>#</span>
                  <span>Team</span>
                  <span>Score</span>
                </div>

                <div>
                  {board.map(
                    (entry) => (
                      <motion.div
                        key={entry.team}
                        layout
                        transition={{
                          duration: 0.45,
                          ease: [
                            0.2,
                            0.7,
                            0.3,
                            1,
                          ],
                        }}
                        className="
                          group
                          grid
                          grid-cols-[36px_1fr_auto]
                          items-center
                          gap-3
                          rounded-xl
                          border
                          border-transparent
                          px-2
                          py-3
                          transition-colors
                          duration-200

                          hover:border-line
                          hover:bg-soft/50

                          dark:hover:border-white/[0.06]
                          dark:hover:bg-white/[0.025]
                        "
                      >
                        {/* Rank */}
                        <span
                          className={cn(
                            `
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            border
                            font-mono
                            text-xs
                            font-bold
                            `,
                            entry.rank === 1
                              ? `
                                border-accent
                                bg-accent
                                text-inverse
                                `
                              : `
                                border-line
                                bg-soft
                                text-muted
                                dark:border-white/[0.08]
                                dark:bg-white/[0.035]
                                `,
                          )}
                        >
                          {entry.rank}
                        </span>

                        {/* Team */}
                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              font-mono
                              text-[11px]
                              font-medium
                              text-fg
                              sm:text-sm
                            "
                          >
                            {entry.team}
                          </p>

                          <p
                            className="
                              mt-0.5
                              truncate
                              font-mono
                              text-[8px]
                              text-dim
                              sm:text-[10px]
                            "
                          >
                            last: {entry.lastSolve}
                          </p>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                          <p
                            className="
                              font-mono
                              text-xs
                              font-bold
                              text-fg
                              sm:text-sm
                            "
                          >
                            {entry.points.toLocaleString()}
                          </p>

                          <p
                            className="
                              mt-0.5
                              font-mono
                              text-[8px]
                              text-dim
                              sm:text-[10px]
                            "
                          >
                            {entry.solves} solves
                          </p>
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>

              {/* =================================================
                  LIVE ACTIVITY
              ================================================= */}

              <div
                className="
                  border-t
                  border-line
                  bg-soft/30
                  px-4
                  py-3

                  dark:border-white/[0.07]
                  dark:bg-white/[0.02]
                "
              >
                <div className="flex items-center gap-2">
                  <Flag className="h-3.5 w-3.5 flex-none text-accent" />

                  <AnimatePresence
                    mode="wait"
                  >
                    <motion.p
                      key={feedIdx}
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="
                        truncate
                        font-mono
                        text-[9px]
                        text-muted
                        sm:text-xs
                      "
                    >
                      <b className="font-medium text-fg">
                        {feedEvents[
                          feedIdx
                        ][0]}
                      </b>

                      <span className="mx-1.5 text-dim">
                        /
                      </span>

                      {feedEvents[
                        feedIdx
                      ][1]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}