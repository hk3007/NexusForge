'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Flag, Rocket, ShieldCheck, UserCheck, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface LiveEvent {
  icon: LucideIcon;
  label: string;
  detail: string;
}

const EVENTS: LiveEvent[] = [
  { icon: Flag, label: 'CTF · first blood', detail: 'team shellsmiths solved crypto/lattice-lane (+480 pts)' },
  { icon: UserCheck, label: 'Talent placed', detail: 'SOC Analyst matched with OpenLedger — offer accepted' },
  { icon: Rocket, label: 'Deploy shipped', detail: 'kesari-retail storefront v2.14 → production, 0 downtime' },
  { icon: ShieldCheck, label: 'Threat blocked', detail: 'WAF stopped a credential-stuffing burst (2,341 reqs)' },
  { icon: Zap, label: 'New enrollment', detail: 'A. Deshmukh joined the Cybersecurity internship track' },
  { icon: Activity, label: 'Uptime check', detail: 'all 42 monitored endpoints healthy — avg 118 ms' },
  { icon: Flag, label: 'CTF · rank change', detail: 'ctrl_alt_defeat climbed to #2 on the live board' },
  { icon: Rocket, label: 'Campaign live', detail: 'performance ads batch #88 launched for D2C client' },
];

export default function LiveActivityToasts() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    const firstTimer = setTimeout(() => setVisible(true), 3500);
    const cycle = setInterval(() => {
      setIndex((i) => (i + 1) % EVENTS.length);
      setVisible(true);
      hideTimer = setTimeout(() => setVisible(false), 5000);
    }, 8000);
    return () => {
      clearTimeout(firstTimer);
      clearTimeout(hideTimer);
      clearInterval(cycle);
    };
  }, []);

  const event = EVENTS[index];
  const Icon = event.icon;

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-[70] hidden sm:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
            className="glass-panel flex w-[340px] items-start gap-3 rounded-xl p-3.5 shadow-elevated"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-overlay/[0.04]">
              <Icon className="h-4 w-4 text-fg" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  {event.label} · just now
                </p>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted">{event.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
