'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Flag, Trophy } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const preview = [
  { initials: 'AP', name: 'Aarav Pawar', role: 'Security Engineer', skill: 'Cybersecurity', rank: 3, solves: 214 },
  { initials: 'IK', name: 'Ishita Kale', role: 'Full-Stack Developer', skill: 'React/Next.js', rank: 11, solves: 168 },
  { initials: 'VS', name: 'Vikram Shinde', role: 'Backend Engineer', skill: 'Node.js', rank: 7, solves: 190 },
  { initials: 'NJ', name: 'Neha Joshi', role: 'ML Engineer', skill: 'AI/ML', rank: 19, solves: 122 },
];

export default function TalentMatrixPreview() {
  return (
    <section className="relative border-t border-overlay/[0.08] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            badge="flag{proof.of.skill}"
            title="Hire from people you've already seen work."
            description="Every profile is backed by solve records, timed submissions and mentor notes. You shortlist from evidence, not from a CV."
            className="mb-10"
          />
          <Link
            href="/platform/hire-developers"
            className="mb-10 hidden items-center gap-2 rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent md:inline-flex"
          >
            Browse Talent Matrix
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((dev, i) => (
            <motion.div
              key={dev.initials}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <Link
                href="/platform/hire-developers"
                className="group block rounded-2xl border border-line bg-surface/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent font-mono text-sm font-bold text-inverse">
                    {dev.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate text-sm font-bold text-fg">
                      {dev.name}
                      <BadgeCheck className="h-4 w-4 flex-none text-fg" />
                    </p>
                    <p className="truncate text-xs text-dim">{dev.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-md border border-line bg-soft px-2 py-1 font-mono text-[10px] tracking-wide text-muted">
                    {dev.skill}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-overlay/[0.06] pt-3.5 font-mono text-[11px] text-dim">
                  <span className="flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5" /> Rank #{dev.rank}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flag className="h-3.5 w-3.5" /> {dev.solves} solves
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/platform/hire-developers"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent md:hidden"
        >
          Browse Talent Matrix
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
