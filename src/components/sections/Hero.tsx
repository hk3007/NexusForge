'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, TerminalSquare } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import HeroGlow from '@/components/ui/HeroGlow';

const terminalLines = [
  { prompt: true, text: 'nexusforge status --all' },
  { prompt: false, text: '✓ 40 managed properties · uptime 99.97%' },
  { prompt: false, text: '✓ ctf-arena · 1,120 teams registered' },
  { prompt: false, text: '✓ talent-hub · 1,204 verified profiles' },
  { prompt: true, text: 'nexusforge deploy --monitor' },
  { prompt: false, text: '→ checks every 60s from 3 regions…' },
];

const tickerItems = [
  'UPTIME 99.97%', 'MEDIAN TICKET RESPONSE 18 MIN', 'ENGINEERS PLACED IN 2025: 212',
  'CTF EVENTS RUN: 96', 'VERIFIED SKILL REPORTS: 1,204', 'MEAN TIME TO RESTORE: 11 MIN',
  'CHECKS PER SITE DAILY: 1,440', 'CONCURRENT TEAMS TESTED: 2,400',
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(1);
  const [clock, setClock] = useState<string | null>(null);

  // Terminal types out its lines, holds, then loops forever
  useEffect(() => {
    if (visibleLines >= terminalLines.length) {
      const id = setTimeout(() => setVisibleLines(1), 4200);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setVisibleLines((v) => v + 1), 650);
    return () => clearTimeout(id);
  }, [visibleLines]);

  // Live IST wall clock in the terminal chrome
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-IN', {
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <HeroGlow />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-line bg-overlay/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-widest text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-fg" />
              Secure, Trust, Growth
            </span>
            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-fg md:text-6xl">
              Next-Gen <span className="text-gradient-white">Infrastructure, Security</span> &amp; Tech Talent
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Nexus Forge runs website and social operations for 40+ brands across India. The same team
              trains engineers, proves their skill in live CTFs, and places them into the roles that
              need them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/contact">
                Book a Systems Review
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>
              <NeonButton href="/platform/ctf-events" variant="outline">
                See the Platform
              </NeonButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-overlay/[0.08] pt-6 font-mono text-xs text-dim">
              <span>Uptime across managed sites · <b className="font-medium text-fg">99.97%</b></span>
              <span>Median ticket response · <b className="font-medium text-fg">18 min</b></span>
              <span>Engineers placed in 2025 · <b className="font-medium text-fg">212</b></span>
            </div>
          </motion.div>

          {/* Terminal preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.7, 0.3, 1] }}
            className="glass-panel overflow-hidden rounded-2xl shadow-elevated"
          >
            <div className="flex items-center gap-2.5 border-b border-overlay/[0.08] bg-shade/30 px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted">
                <TerminalSquare className="h-3.5 w-3.5" />
                nexusforge / control-plane
              </span>
              <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-dim">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
                {clock === null ? 'live' : `live · ${clock} ist`}
              </span>
            </div>
            <div className="min-h-[240px] space-y-2.5 px-5 py-5 font-mono text-[13px]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={line.prompt ? 'text-fg' : 'text-muted'}
                >
                  {line.prompt ? <span className="mr-2 text-dim">$</span> : null}
                  {line.text}
                </motion.p>
              ))}
              <span className="inline-block h-4 w-2 animate-pulse-dot bg-accent" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-4 border-t border-overlay/[0.08] bg-shade/30">
              {[
                { n: '01', t: 'Train', v: '1,840' },
                { n: '02', t: 'Compete', v: '96' },
                { n: '03', t: 'Verify', v: '1,204' },
                { n: '04', t: 'Hire', v: '212' },
              ].map((s) => (
                <div key={s.n} className="border-r border-overlay/[0.06] px-4 py-3.5 last:border-r-0">
                  <p className="font-mono text-[10px] tracking-widest text-dim">{s.n} · {s.t.toUpperCase()}</p>
                  <p className="mt-1 font-mono text-sm font-bold text-fg">{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Real-time metrics ticker */}
      <div className="relative border-y border-overlay/[0.08] bg-overlay/[0.015] py-4" aria-label="Live metrics">
        <div className="flex w-max animate-marquee gap-12">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap font-mono text-xs tracking-widest text-dim">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
