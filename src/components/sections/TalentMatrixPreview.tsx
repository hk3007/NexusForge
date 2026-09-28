'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Flag,
  ShieldCheck,
  Timer,
  UserCheck,
  Sparkles,
} from 'lucide-react';

import SectionHeader from '@/components/ui/SectionHeader';

/* =========================================================
   HOW IT WORKS
   ---------------------------------------------------------
   NexForTech has no verified developer profiles yet, so
   instead of showing empty/placeholder cards, this section
   simply explains — in plain language — what the Talent
   Matrix is and how a profile gets built. No fabricated
   people, stats, or ranks anywhere.
========================================================= */

const pillars = [
  {
    icon: <Flag className="h-5 w-5" />,
    title: 'Solve, don\u2019t just apply',
    description:
      'Developers prove ability through timed CTF challenges and real coding tasks — not a resume claim.',
  },
  {
    icon: <UserCheck className="h-5 w-5" />,
    title: 'Mentor-reviewed',
    description:
      'Submissions are checked by mentors, so what shows up on a profile reflects genuine, verified skill.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Verified, not self-reported',
    description:
      'Every badge and skill tag on a profile is earned through the platform, never self-declared.',
  },
  {
    icon: <Timer className="h-5 w-5" />,
    title: 'Built over time',
    description:
      'Profiles grow with every event and challenge completed, giving employers a running track record.',
  },
];

export default function TalentMatrixPreview() {
  return (
    <section
      id="talent"
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
            top-[-180px]
            h-[420px]
            w-[620px]
            -translate-x-1/2
            rounded-full
            bg-accent/[0.018]
            blur-[140px]
            dark:bg-accent/[0.035]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            left-[20%]
            h-[350px]
            w-[350px]
            rounded-full
            bg-accent/[0.012]
            blur-[120px]
            dark:bg-accent/[0.025]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.015]
            dark:opacity-[0.025]
          "
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

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
            items-start
            gap-12
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-16
          "
        >
          {/* =================================================
              LEFT — SUMMARY
          ================================================= */}

          <div>
            <SectionHeader
              badge="flag{proof.of.skill}"
              title="Hiring, backed by proof — not a PDF."
              description="The Talent Matrix connects proven tech talent with the right opportunities. Developers showcase their skills through real-world challenges and mentor-reviewed projects, while employers discover capable professionals based on demonstrated expertise—not just a CV."
              className="mb-8"
            />

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/platform/hire-developers"
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
                Join Early Access

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
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                First cohort forming
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT — HOW IT WORKS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: '-40px',
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.2, 0.7, 0.3, 1],
                }}
                className="
                  rounded-2xl
                  border
                  border-line
                  bg-surface
                  p-5
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-accent/25

                  dark:border-white/[0.08]
                  dark:bg-[#101010]
                  dark:hover:border-white/[0.16]
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-line
                    bg-soft
                    text-accent

                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                  "
                >
                  {pillar.icon}
                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    font-bold
                    tracking-tight
                    text-fg
                  "
                >
                  {pillar.title}
                </p>

                <p
                  className="
                    mt-1.5
                    text-xs
                    leading-relaxed
                    text-dim
                  "
                >
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}