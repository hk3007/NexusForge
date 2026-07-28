'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock,
  Flag,
  Search,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import NeonButton from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';
import type { Developer, SkillFilter } from '@/types';

const filters: SkillFilter[] = ['All', 'Cybersecurity', 'React/Next.js', 'Node.js', 'AI/ML'];

const developers: Developer[] = [
  { id: 'd1', name: 'Aarav Pawar', initials: 'AP', role: 'Security Engineer', skills: ['Cybersecurity'], stack: ['Burp Suite', 'Splunk', 'Python'], ctfRank: 3, solves: 214, experience: 'Cohort 9 · 2 yrs client work', availability: 'Available now', verified: true },
  { id: 'd2', name: 'Ishita Kale', initials: 'IK', role: 'Full-Stack Developer', skills: ['React/Next.js', 'Node.js'], stack: ['Next.js', 'TypeScript', 'Postgres'], ctfRank: 11, solves: 168, experience: 'Cohort 10 · 1.5 yrs client work', availability: 'Available now', verified: true },
  { id: 'd3', name: 'Vikram Shinde', initials: 'VS', role: 'Backend Engineer', skills: ['Node.js'], stack: ['Node', 'Redis', 'AWS'], ctfRank: 7, solves: 190, experience: 'Cohort 8 · 3 yrs client work', availability: '2 weeks notice', verified: true },
  { id: 'd4', name: 'Neha Joshi', initials: 'NJ', role: 'ML Engineer', skills: ['AI/ML'], stack: ['PyTorch', 'FastAPI', 'GCP'], ctfRank: 19, solves: 122, experience: 'Cohort 10 · 1 yr client work', availability: 'Available now', verified: true },
  { id: 'd5', name: 'Rahul Deshmukh', initials: 'RD', role: 'SOC Analyst', skills: ['Cybersecurity'], stack: ['Splunk', 'Sigma', 'Wireshark'], ctfRank: 14, solves: 151, experience: 'Cohort 11 · placement-ready', availability: 'Available now', verified: true },
  { id: 'd6', name: 'Sanya Iyer', initials: 'SI', role: 'Frontend Engineer', skills: ['React/Next.js'], stack: ['React', 'Framer Motion', 'Tailwind'], ctfRank: 26, solves: 98, experience: 'Cohort 11 · 1 yr client work', availability: '1 month notice', verified: true },
  { id: 'd7', name: 'Kabir Nair', initials: 'KN', role: 'Platform Engineer', skills: ['Node.js', 'Cybersecurity'], stack: ['Docker', 'Terraform', 'Node'], ctfRank: 9, solves: 176, experience: 'Cohort 9 · 2 yrs client work', availability: 'Available now', verified: true },
  { id: 'd8', name: 'Meera Patil', initials: 'MP', role: 'AI Engineer', skills: ['AI/ML', 'Node.js'], stack: ['LangChain', 'Node', 'Postgres'], ctfRank: 22, solves: 110, experience: 'Cohort 11 · placement-ready', availability: 'Available now', verified: true },
  { id: 'd9', name: 'Arjun Bhosale', initials: 'AB', role: 'Full-Stack Developer', skills: ['React/Next.js', 'Node.js'], stack: ['Next.js', 'tRPC', 'MySQL'], ctfRank: 17, solves: 139, experience: 'Cohort 10 · 1.5 yrs client work', availability: '2 weeks notice', verified: true },
];

function HireModal({ dev, onClose }: { dev: Developer; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Request interview with ${dev.name}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.2, 0.7, 0.3, 1] }}
        className="glass-panel max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl p-7 shadow-elevated md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent font-mono text-sm font-bold text-inverse">
              {dev.initials}
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-fg">
                {dev.name}
                <BadgeCheck className="h-4 w-4 text-fg" />
              </p>
              <p className="font-mono text-xs text-dim">{dev.role} · Rank #{dev.ctfRank}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-line bg-soft p-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <Check className="h-6 w-6 text-inverse" />
            </span>
            <p className="mt-4 text-base font-bold text-fg">Interview request sent.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We reply within one business day with the candidate&apos;s full skill report and available
              interview slots. Median time to shortlist: 6 days.
            </p>
          </div>
        ) : (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {[
              { label: 'Your name', type: 'text', placeholder: 'Priya Deshpande' },
              { label: 'Work email', type: 'email', placeholder: 'priya@company.in' },
              { label: 'Company', type: 'text', placeholder: 'OpenLedger' },
            ].map((f) => (
              <label key={f.label} className="block">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-dim">
                  {f.label}
                </span>
                <input
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  className="w-full rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
                />
              </label>
            ))}
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-dim">
                Engagement type
              </span>
              <select
                className="w-full rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
                defaultValue="Permanent"
              >
                <option>Permanent</option>
                <option>Contract</option>
                <option>Contract-to-hire</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-dim">
                Role brief (optional)
              </span>
              <textarea
                rows={3}
                placeholder="The role, the stack, and what a great first 90 days looks like."
                className="w-full resize-y rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
              />
            </label>
            <NeonButton type="submit" className="w-full">
              Request Interview
            </NeonButton>
            <p className="font-mono text-[11px] leading-relaxed text-dim">
              90-day replacement guarantee, written in. Exports to Greenhouse, Lever, Zoho Recruit.
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function HireDevelopersPage() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('All');
  const [query, setQuery] = useState('');
  const [hiring, setHiring] = useState<Developer | null>(null);

  const filtered = useMemo(() => {
    return developers.filter((d) => {
      const matchesFilter = activeFilter === 'All' || d.skills.includes(activeFilter);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        d.name.toLowerCase().includes(q) ||
        d.role.toLowerCase().includes(q) ||
        d.stack.some((s) => s.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

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
              <Users className="h-3.5 w-3.5 text-fg" />
              S-05 · HIRE DEVELOPERS & TALENT HUB
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-5xl">
              Hire from people you&apos;ve <span className="text-gradient-white">already seen work.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Every intern and competitor on the platform leaves behind evidence: solved challenges,
              timed submissions, mentor notes, shipped tickets. You shortlist from that record instead
              of from a CV.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="#matrix">
                Browse the Talent Matrix
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>
              <NeonButton href="/contact" variant="outline">
                Open a Hiring Brief
              </NeonButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-overlay/[0.08] pt-6 font-mono text-xs text-dim">
              <span>Verified profiles · <b className="font-medium text-fg">1,204</b></span>
              <span>Median time to shortlist · <b className="font-medium text-fg">6 days</b></span>
              <span>Replacement guarantee · <b className="font-medium text-fg">90 days</b></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Talent matrix */}
      <section className="py-20 md:py-28" id="matrix">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{talent.matrix}"
            title="The Talent Matrix"
            description="Filter by verified skill, search by stack. Every badge is backed by a signed skill report."
          />

          {/* Filters */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  aria-pressed={activeFilter === f}
                  className={cn(
                    'rounded-lg border px-4 py-2 font-mono text-xs tracking-wide transition-all duration-200',
                    activeFilter === f
                      ? 'border-accent bg-accent font-bold text-inverse'
                      : 'border-line bg-soft text-muted hover:border-line-strong hover:text-fg',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dim" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, role or stack…"
                className="w-full rounded-lg border border-line bg-soft py-2.5 pl-9 pr-3.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((dev) => (
                <motion.div
                  key={dev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.2, 0.7, 0.3, 1] }}
                  className="flex flex-col rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-accent/60"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent font-mono text-sm font-bold text-inverse">
                      {dev.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 truncate text-base font-bold tracking-tight text-fg">
                        {dev.name}
                        {dev.verified && <BadgeCheck className="h-4 w-4 flex-none text-fg" />}
                      </p>
                      <p className="truncate text-sm text-dim">{dev.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {dev.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-line bg-soft px-2 py-1 font-mono text-[10px] tracking-wide text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-overlay/[0.06] pt-4 font-mono text-[11px] text-dim">
                    <span className="flex items-center gap-1.5">
                      <Trophy className="h-3.5 w-3.5" /> #{dev.ctfRank}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flag className="h-3.5 w-3.5" /> {dev.solves}
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <Clock className="h-3.5 w-3.5 flex-none" /> {dev.availability}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-dim">{dev.experience}</p>

                  <div className="mt-5">
                    <NeonButton onClick={() => setHiring(dev)} variant="outline" className="w-full">
                      Request Interview
                    </NeonButton>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-line bg-soft p-12 text-center">
              <p className="font-mono text-sm text-muted">No matches. Try a different skill or clear the search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>{hiring && <HireModal dev={hiring} onClose={() => setHiring(null)} />}</AnimatePresence>
    </>
  );
}
