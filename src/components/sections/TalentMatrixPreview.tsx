'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  Flag,
  Trophy,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import SectionHeader from '@/components/ui/SectionHeader';

const preview = [
  {
    initials: 'AP',
    name: 'Aarav Pawar',
    role: 'Security Engineer',
    skill: 'Cybersecurity',
    rank: 3,
    solves: 214,
  },
  {
    initials: 'IK',
    name: 'Ishita Kale',
    role: 'Full-Stack Developer',
    skill: 'React / Next.js',
    rank: 11,
    solves: 168,
  },
  {
    initials: 'VS',
    name: 'Vikram Shinde',
    role: 'Backend Engineer',
    skill: 'Node.js',
    rank: 7,
    solves: 190,
  },
  {
    initials: 'NJ',
    name: 'Neha Joshi',
    role: 'ML Engineer',
    skill: 'AI / ML',
    rank: 19,
    solves: 122,
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
        {/* Main subtle glow */}
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

        {/* Bottom glow */}
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

        {/* Technical grid */}
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
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-wrap
            items-end
            justify-between
            gap-6
          "
        >
          <SectionHeader
            badge="flag{proof.of.skill}"
            title="Hire from people you've already seen work."
            description="Every profile is backed by solve records, timed submissions and mentor notes. You shortlist from evidence, not from a CV."
            className="mb-10"
          />

          {/* Desktop CTA */}
          <Link
            href="/platform/hire-developers"
            className="
              group
              mb-10
              hidden
              items-center
              gap-2
              rounded-xl
              border
              border-line
              bg-surface
              px-5
              py-2.5
              text-sm
              font-semibold
              text-fg
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:border-accent/30
              hover:bg-soft

              dark:border-white/[0.09]
              dark:bg-[#101010]
              dark:hover:border-white/[0.16]
              dark:hover:bg-[#151515]

              md:inline-flex
            "
          >
            Browse Talent Matrix

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
        </div>

        {/* =================================================
            TALENT GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {preview.map((dev, i) => (
            <motion.div
              key={dev.initials}
              initial={{
                opacity: 0,
                y: 24,
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
            >
              <Link
                href="/platform/hire-developers"
                className="
                  group
                  relative
                  block
                  h-full
                  overflow-hidden
                  rounded-2xl
                  border
                  border-line
                  bg-surface
                  p-5
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-accent/30
                  hover:bg-soft

                  dark:border-white/[0.08]
                  dark:bg-[#101010]
                  dark:hover:border-white/[0.16]
                  dark:hover:bg-[#141414]
                "
              >
                {/* =================================================
                    CARD HOVER ACCENT
                ================================================= */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-accent/0
                    to-transparent
                    transition-all
                    duration-500

                    group-hover:via-accent/50
                  "
                />

                {/* =================================================
                    PROFILE HEADER
                ================================================= */}

                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <span
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-accent/20
                        bg-accent
                        font-mono
                        text-sm
                        font-bold
                        text-inverse
                        transition-all
                        duration-300

                        group-hover:border-accent/40
                        group-hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]
                      "
                    >
                      {dev.initials}
                    </span>

                    {/* Online indicator */}
                    <span
                      className="
                        absolute
                        -bottom-0.5
                        -right-0.5
                        flex
                        h-3.5
                        w-3.5
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-surface
                        bg-live

                        dark:border-[#101010]
                      "
                    >
                      <span className="h-1 w-1 rounded-full bg-white" />
                    </span>
                  </div>

                  {/* Name */}
                  <div className="min-w-0">
                    <p
                      className="
                        flex
                        items-center
                        gap-1.5
                        truncate
                        text-sm
                        font-bold
                        tracking-tight
                        text-fg
                      "
                    >
                      {dev.name}

                      <BadgeCheck
                        className="
                          h-4
                          w-4
                          flex-none
                          text-accent
                        "
                      />
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-xs
                        text-dim
                      "
                    >
                      {dev.role}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    VERIFIED BADGE
                ================================================= */}

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-md
                      border
                      border-line
                      bg-soft
                      px-2
                      py-1
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-wider
                      text-muted

                      dark:border-white/[0.08]
                      dark:bg-white/[0.035]
                    "
                  >
                    <ShieldCheck className="h-3 w-3 text-live" />
                    Verified Skill
                  </span>

                  <Sparkles
                    className="
                      h-3.5
                      w-3.5
                      text-dim
                      transition-colors
                      duration-300
                      group-hover:text-accent
                    "
                  />
                </div>

                {/* =================================================
                    SKILL
                ================================================= */}

                <div className="mt-3">
                  <span
                    className="
                      inline-flex
                      rounded-md
                      border
                      border-line
                      bg-transparent
                      px-2
                      py-1
                      font-mono
                      text-[10px]
                      tracking-wide
                      text-muted
                      transition-colors
                      duration-300

                      group-hover:border-accent/20
                      group-hover:text-fg

                      dark:border-white/[0.07]
                    "
                  >
                    {dev.skill}
                  </span>
                </div>

                {/* =================================================
                    STATS
                ================================================= */}

                <div
                  className="
                    mt-5
                    grid
                    grid-cols-2
                    divide-x
                    divide-line
                    border-t
                    border-line
                    pt-4

                    dark:divide-white/[0.07]
                    dark:border-white/[0.07]
                  "
                >
                  {/* Rank */}
                  <div className="pr-3">
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-wider
                        text-dim
                      "
                    >
                      <Trophy className="h-3.5 w-3.5" />

                      Rank
                    </div>

                    <p
                      className="
                        mt-1
                        font-mono
                        text-sm
                        font-bold
                        text-fg
                      "
                    >
                      #{dev.rank}
                    </p>
                  </div>

                  {/* Solves */}
                  <div className="pl-3">
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-wider
                        text-dim
                      "
                    >
                      <Flag className="h-3.5 w-3.5" />

                      Solves
                    </div>

                    <p
                      className="
                        mt-1
                        font-mono
                        text-sm
                        font-bold
                        text-fg
                      "
                    >
                      {dev.solves}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    BOTTOM ACTION
                ================================================= */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-transparent
                    bg-transparent
                    px-2
                    py-1.5
                    transition-all
                    duration-300

                    group-hover:border-line
                    group-hover:bg-surface

                    dark:group-hover:border-white/[0.06]
                    dark:group-hover:bg-white/[0.025]
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.12em]
                      text-dim
                    "
                  >
                    View profile
                  </span>

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      text-dim
                      transition-all
                      duration-300

                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-accent
                    "
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* =================================================
            MOBILE CTA
        ================================================= */}

        <Link
          href="/platform/hire-developers"
          className="
            group
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-line
            bg-surface
            px-5
            py-2.5
            text-sm
            font-semibold
            text-fg
            transition-all
            duration-300

            hover:border-accent/30
            hover:bg-soft

            dark:border-white/[0.09]
            dark:bg-[#101010]
            dark:hover:border-white/[0.16]
            dark:hover:bg-[#151515]

            md:hidden
          "
        >
          Browse Talent Matrix

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
      </div>
    </section>
  );
}