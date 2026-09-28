'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Flag,
  Shield,
  Trophy,
  Zap,
  Terminal,
  Lock,
  CalendarClock,
} from 'lucide-react';

import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

/* =========================================================
   EVENT DETAILS
   ---------------------------------------------------------
   No CTF has run yet, so this section is an honest
   "coming soon" state rather than a simulated live
   leaderboard. Update EVENT_NAME / EVENT_DATE when the
   first event is scheduled.
========================================================= */

const EVENT_NAME = 'Operation Monsoon';
const EVENT_SLUG = 'nexfortech / ctf-01-monsoon';
const EVENT_DATE = new Date('2026-11-15T09:00:00+05:30'); // update to real launch date

const stats = [
  {
    icon: <Trophy className="h-4 w-4" />,
    value: 'TBA',
    label: 'Prize pool',
  },
  {
    icon: <Shield className="h-4 w-4" />,
    value: 'Open',
    label: 'Registration',
  },
  {
    icon: <Zap className="h-4 w-4" />,
    value: '#1',
    label: 'First event',
  },
];

/* =========================================================
   COUNTDOWN
========================================================= */

function useCountdown(target: Date) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, target.getTime() - Date.now()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, target.getTime() - Date.now()));
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isLive: remaining <= 0 };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center',
        'rounded-lg border border-line',
        'bg-soft/50 px-3 py-2.5',
        'dark:border-white/[0.08] dark:bg-white/[0.03]',
      )}
    >
      <span className="font-mono text-lg font-bold tabular-nums text-fg sm:text-xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-0.5 font-mono text-[8px] uppercase tracking-widest text-dim">
        {label}
      </span>
    </div>
  );
}

export default function CTFInteractivePreview() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

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
              badge="flag{coming.soon}"
              title="The CTF Arena launches soon."
              description="Our first capture-the-flag event is in the works — timed, audited, anti-cheat enforced infrastructure, with every solve building a verified skill record. Register your interest to get notified the moment the gates open."
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
                Notify Me

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
                      bg-accent
                      opacity-50
                    "
                  />

                  <span
                    className="
                      relative
                      h-2
                      w-2
                      rounded-full
                      bg-accent
                    "
                  />
                </span>

                ARENA LAUNCHING SOON
              </span>
            </div>
          </div>

          {/* =================================================
              CONSOLE — COMING SOON STATE
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
                  {EVENT_SLUG}
                </span>

                <span
                  className="
                    ml-auto
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-line
                    bg-soft
                    px-2
                    py-1
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-widest
                    text-dim

                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                  "
                >
                  <Lock className="h-2.5 w-2.5" />
                  LOCKED
                </span>
              </div>

              {/* =================================================
                  EVENT NAME
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-line
                  px-4
                  py-4

                  dark:border-white/[0.06]
                "
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-dim">
                    First event
                  </p>
                  <p className="mt-1 text-base font-bold tracking-tight text-fg sm:text-lg">
                    {EVENT_NAME}
                  </p>
                </div>

                <Flag className="h-5 w-5 flex-none text-accent" />
              </div>

              {/* =================================================
                  COUNTDOWN
              ================================================= */}

              <div className="px-4 py-6 sm:px-6">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarClock className="h-3.5 w-3.5 text-accent" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                    Doors open in
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  <CountdownUnit value={days} label="Days" />
                  <CountdownUnit value={hours} label="Hrs" />
                  <CountdownUnit value={minutes} label="Min" />
                  <CountdownUnit value={seconds} label="Sec" />
                </div>
              </div>

              {/* =================================================
                  FOOTER NOTE
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
                <p className="flex items-center gap-2 font-mono text-[9px] text-muted sm:text-xs">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-dim" />
                  Scoreboard, categories & registration open closer to launch.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}