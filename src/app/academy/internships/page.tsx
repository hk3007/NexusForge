'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  GraduationCap,
  Shield,
  X,
} from 'lucide-react';
import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import NeonButton from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';
import type { InternshipTrack } from '@/types';

const tracks: InternshipTrack[] = [
  {
    id: 'cyber',
    name: 'Cybersecurity',
    duration: '16 weeks · part-time',
    seats: 40,
    stipend: '$150/mo stipend',
    summary:
      'Offensive and defensive security, mentored by the engineers who run client estates. Live tickets from week four; weekly CTF ladders throughout.',
    icon: Shield,
    curriculum: [
      { week: 'Weeks 1–2', title: 'Foundations & Lab Setup', topics: ['Linux, networking & HTTP internals', 'Burp Suite, Wireshark, tmux workflow', 'Threat models & the OWASP Top 10'] },
      { week: 'Weeks 3–5', title: 'Web Exploitation', topics: ['Injection: SQLi, SSTI, command injection', 'Auth flaws, IDOR, session attacks', 'First live CTF ladder entry'] },
      { week: 'Weeks 6–8', title: 'Network & Cloud Offense', topics: ['Recon, enumeration & pivoting', 'Cloud misconfigurations: S3, IAM, metadata', 'Live client tickets begin (supervised)'] },
      { week: 'Weeks 9–12', title: 'Blue Team & IR', topics: ['SOC triage & log analysis with Splunk', 'Incident replays with real log sets', 'Detection writing & alert tuning'] },
      { week: 'Weeks 13–16', title: 'Capstone & Verification', topics: ['24-hour assessed CTF', 'Signed skill report compiled', 'Interview prep & hiring-pool entry'] },
    ],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Software Development',
    duration: '16 weeks · part-time',
    seats: 48,
    stipend: '$150/mo stipend',
    summary:
      'Next.js, Node and Postgres — shipped, not slideware. You work on the same codebases our client work runs on, with one mentor per six interns.',
    icon: Code2,
    curriculum: [
      { week: 'Weeks 1–2', title: 'Tooling & Fundamentals', topics: ['Git workflow, code review etiquette', 'TypeScript from zero to strict', 'HTTP, REST & the browser runtime'] },
      { week: 'Weeks 3–5', title: 'Frontend Engineering', topics: ['React & Next.js App Router', 'Tailwind, accessibility & performance budgets', 'State, forms & data fetching patterns'] },
      { week: 'Weeks 6–9', title: 'Backend & Data', topics: ['Node APIs, validation & auth', 'Postgres schema design & migrations', 'Live client tickets begin (supervised)'] },
      { week: 'Weeks 10–13', title: 'Production Engineering', topics: ['Testing: unit, integration, e2e', 'CI/CD, Docker & deployment', 'Monitoring, logging & on-call basics'] },
      { week: 'Weeks 14–16', title: 'Capstone & Verification', topics: ['Ship a production feature end-to-end', 'Signed skill report compiled', 'Interview prep & hiring-pool entry'] },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps / Cloud & Dev Tools',
    duration: '12 weeks · part-time',
    seats: 32,
    stipend: '$120/mo stipend',
    summary:
      'The specialized toolchain track: Docker, AWS, CI/CD, Splunk and the glue that keeps 40+ production estates online. Shorter, sharper, tool-first.',
    icon: Cloud,
    curriculum: [
      { week: 'Weeks 1–2', title: 'Linux & Shell Mastery', topics: ['Bash, systemd & process management', 'SSH, users, permissions, hardening', 'Scripting real maintenance jobs'] },
      { week: 'Weeks 3–5', title: 'Containers & Cloud', topics: ['Docker images, compose & registries', 'AWS: EC2, S3, IAM, VPC essentials', 'Infrastructure as code with Terraform'] },
      { week: 'Weeks 6–8', title: 'CI/CD & Automation', topics: ['GitHub Actions pipelines', 'Zero-downtime deploy strategies', 'Live client estate work begins (supervised)'] },
      { week: 'Weeks 9–12', title: 'Observability & Capstone', topics: ['Monitoring, alerting & Splunk dashboards', 'Incident response drills', 'Signed skill report & hiring-pool entry'] },
    ],
  },
];

function ApplicationModal({ track, onClose }: { track: InternshipTrack; onClose: () => void }) {
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
      aria-label={`Apply to ${track.name}`}
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
          <div>
            <p className="font-mono text-[11px] tracking-widest text-dim">STUDENT APPLICATION</p>
            <h3 className="mt-1.5 text-xl font-bold tracking-tight text-fg">{track.name}</h3>
            <p className="mt-1 font-mono text-xs text-muted">
              Cohort 12 · begins 18 Aug 2026 · applications close 5 Aug
            </p>
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
            <p className="mt-4 text-base font-bold text-fg">Application received.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We reply within one business day with a short screening challenge. No CV required — the
              challenge is the CV.
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
              { label: 'Full name', type: 'text', placeholder: 'Priya Deshpande' },
              { label: 'Email', type: 'email', placeholder: 'priya@email.in' },
              { label: 'Phone', type: 'tel', placeholder: '+91 98XXXXXXXX' },
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
                Current status
              </span>
              <select
                className="w-full rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
                defaultValue="Student"
              >
                <option>Student</option>
                <option>Recent graduate</option>
                <option>Working professional</option>
                <option>Career switcher</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-dim">
                Why this track? (optional)
              </span>
              <textarea
                rows={3}
                placeholder="GitHub, CTF handle, or anything you've built or broken."
                className="w-full resize-y rounded-lg border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
              />
            </label>
            <NeonButton type="submit" className="w-full">
              Submit Application
            </NeonButton>
            <p className="font-mono text-[11px] leading-relaxed text-dim">
              Cohorts are paid. You never pay us — for training, a skill report, or introductions.
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function InternshipsPage() {
  const [activeTrack, setActiveTrack] = useState<string>('cyber');
  const [openWeek, setOpenWeek] = useState<string | null>(null);
  const [applying, setApplying] = useState<InternshipTrack | null>(null);

  const track = tracks.find((t) => t.id === activeTrack) ?? tracks[0];

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
              <GraduationCap className="h-3.5 w-3.5 text-fg" />
              S-03 · INDUSTRY INTERNSHIPS
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-5xl">
              Internships that end in a <span className="text-gradient-white">job offer</span>, not a certificate.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Cohorts in cybersecurity, full-stack development and DevOps toolchains. Mentored by the
              engineers who run client work, assessed on real tickets, finished with a signed skill
              report and automatic entry to the hiring pool.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton onClick={() => setApplying(track)}>
                Apply to Cohort 12
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>
              <NeonButton href="#curriculum" variant="outline">
                Read the Curriculum
              </NeonButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-overlay/[0.08] pt-6 font-mono text-xs text-dim">
              <span>Next cohort · <b className="font-medium text-fg">18 August 2026</b></span>
              <span>Applications close · <b className="font-medium text-fg">5 August</b></span>
              <span>Mentor ratio · <b className="font-medium text-fg">1 per 6 interns</b></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Track selector + curriculum accordion */}
      <section className="py-20 md:py-28" id="curriculum">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{three.tracks}"
            title="Pick a track, inspect every week."
            description="No mystery modules. The full week-by-week plan is public before you apply."
          />

          {/* Track tabs */}
          <div className="mb-10 grid gap-3 md:grid-cols-3">
            {tracks.map((t) => {
              const Icon = t.icon;
              const active = t.id === activeTrack;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTrack(t.id);
                    setOpenWeek(null);
                  }}
                  aria-pressed={active}
                  className={cn(
                    'rounded-2xl border p-5 text-left transition-all duration-300',
                    active
                      ? 'border-accent bg-surface/90 shadow-glow-soft'
                      : 'border-line bg-surface/60 hover:border-line-strong',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={cn('h-5 w-5', active ? 'text-accent' : 'text-dim')} />
                    <span className="font-mono text-[10px] tracking-widest text-dim">{t.duration}</span>
                  </div>
                  <p className="mt-3 text-base font-bold tracking-tight text-fg">{t.name}</p>
                  <p className="mt-1 font-mono text-[11px] text-dim">
                    {t.seats} seats · {t.stipend}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active track detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur-xl">
                <p className="max-w-2xl text-sm leading-relaxed text-muted">{track.summary}</p>
                <NeonButton onClick={() => setApplying(track)}>Apply to This Track</NeonButton>
              </div>

              {/* Curriculum accordion */}
              <div className="overflow-hidden rounded-2xl border border-line">
                {track.curriculum.map((wk) => {
                  const isOpen = openWeek === wk.week;
                  return (
                    <div key={wk.week} className="border-b border-line last:border-b-0">
                      <button
                        onClick={() => setOpenWeek(isOpen ? null : wk.week)}
                        aria-expanded={isOpen}
                        className={cn(
                          'flex w-full items-center gap-4 px-6 py-5 text-left transition-colors',
                          isOpen ? 'bg-surface' : 'bg-soft hover:bg-surface',
                        )}
                      >
                        <span className="w-28 flex-none font-mono text-[11px] tracking-widest text-dim">
                          {wk.week.toUpperCase()}
                        </span>
                        <span className="text-sm font-bold tracking-tight text-fg md:text-base">
                          {wk.title}
                        </span>
                        <ChevronDown
                          className={cn(
                            'ml-auto h-4 w-4 flex-none text-dim transition-transform duration-300',
                            isOpen && 'rotate-180 text-accent',
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.3, 1] }}
                            className="overflow-hidden bg-base"
                          >
                            <ul className="space-y-2.5 px-6 py-5 md:pl-[8.5rem]">
                              {wk.topics.map((topic) => (
                                <li key={topic} className="flex items-start gap-2.5 text-sm text-muted">
                                  <Check className="mt-0.5 h-4 w-4 flex-none text-fg" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {applying && <ApplicationModal track={applying} onClose={() => setApplying(null)} />}
      </AnimatePresence>
    </>
  );
}
