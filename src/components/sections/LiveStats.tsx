'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface LiveStat {
  target: number;
  decimals: number;
  suffix: string;
  label: string;
  /** keeps drifting upward after the count-up, like a live counter */
  drifts?: boolean;
}

const stats: LiveStat[] = [
  { target: 99.97, decimals: 2, suffix: '%', label: 'Uptime across managed properties' },
  { target: 18, decimals: 0, suffix: ' min', label: 'Median first response on tickets' },
  { target: 1204, decimals: 0, suffix: '', label: 'Engineers with a verified skill report', drifts: true },
  { target: 212, decimals: 0, suffix: '', label: 'Placements made in 2025', drifts: true },
];

function format(value: number, decimals: number): string {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatCell({ stat }: { stat: LiveStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(0);
  const [settled, setSettled] = useState(false);

  // Ease-out count-up once the cell scrolls into view
  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(stat.target * eased);
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setSettled(true);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.target]);

  // After settling, live counters keep ticking up every few seconds
  useEffect(() => {
    if (!settled || !stat.drifts) return;
    const id = setInterval(() => {
      if (Math.random() < 0.55) setValue((v) => v + 1);
    }, 4000);
    return () => clearInterval(id);
  }, [settled, stat.drifts]);

  return (
    <div ref={ref} className="bg-base p-7 md:p-9">
      <p className="text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
        {format(value, stat.decimals)}
        {stat.suffix}
      </p>
      <p className="mt-3 flex items-start gap-2 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-dim">
        {stat.drifts && <span className="mt-1 h-1.5 w-1.5 flex-none animate-pulse-dot rounded-full bg-accent" />}
        {stat.label}
      </p>
    </div>
  );
}

export default function LiveStats() {
  return (
    <section className="border-t border-overlay/[0.08]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
          telemetry · updating in real time
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-overlay/[0.08] bg-overlay/[0.08] md:grid-cols-4">
          {stats.map((s) => (
            <StatCell key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
