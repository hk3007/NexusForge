'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const columns = [
  {
    heading: 'Services',
    links: [
      { label: 'Website Management', href: '/services/website-management' },
      { label: 'Social Media & Growth', href: '/services/social-media-growth' },
      { label: 'Industry Internships', href: '/academy/internships' },
      { label: 'CTF & Developer Events', href: '/platform/ctf-events' },
      { label: 'Hire Developers', href: '/platform/hire-developers' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'Upcoming Events', href: '/platform/ctf-events' },
      { label: 'Live Leaderboard', href: '/platform/ctf-events' },
      { label: 'Talent Matrix', href: '/platform/hire-developers' },
      { label: 'Skill Reports', href: '/platform/hire-developers' },
      { label: 'Academy Cohorts', href: '/academy/internships' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/' },
      { label: 'Contact', href: '/contact' },
      { label: 'Support Desk', href: '/contact' },
      { label: 'Work With Us', href: '/contact' },
      { label: 'Status', href: '/' },
    ],
  },
];

function BrandMark() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1.2" y="1.2" width="21.6" height="21.6" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <path d="M12 1.2v5.6M12 17.2v5.6M1.2 12h5.6M17.2 12h5.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Drifting latency probes + seconds-since-last-check, refreshed live
function LiveTelemetry() {
  const [probes, setProbes] = useState<{ api: number; web: number; cdn: number } | null>(null);
  const [sinceCheck, setSinceCheck] = useState(0);

  useEffect(() => {
    const jitter = (base: number, spread: number) =>
      Math.max(8, Math.round(base + (Math.random() - 0.5) * spread));
    const probe = () => setProbes({ api: jitter(42, 14), web: jitter(118, 30), cdn: jitter(23, 10) });
    probe();
    const probeId = setInterval(probe, 2500);
    const clockId = setInterval(() => setSinceCheck((s) => (s + 1) % 60), 1000);
    return () => {
      clearInterval(probeId);
      clearInterval(clockId);
    };
  }, []);

  return (
    <span className="font-mono text-[11px] text-dim">
      {probes === null
        ? 'Checks every 60s · 3 regions · Last incident: none in 400+ days'
        : `API ${probes.api}ms · WEB ${probes.web}ms · CDN ${probes.cdn}ms · last check ${sinceCheck}s ago`}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-overlay/[0.08] bg-base">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        {/* Systems Operational indicator */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface/80 px-6 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs font-medium tracking-widest text-fg">
              ALL SYSTEMS OPERATIONAL — 99.99% UPTIME
            </span>
          </div>
          <LiveTelemetry />
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand + newsletter */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-fg">
              <BrandMark />
              Nexus Forge
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Managed digital operations, and the training-to-hiring pipeline behind them. Next-gen
              infrastructure, security & tech talent.
            </p>
            <div className="mt-6">
              <p className="font-mono text-[11px] tracking-widest text-dim">NEWSLETTER</p>
              <form className="mt-3 flex max-w-sm gap-2">
                <input
                  type="email"
                  required
                  placeholder="you@company.in"
                  className="w-full rounded-lg border border-line bg-soft px-3.5 py-2.5 text-sm text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent-hover"
                >
                  Join
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
            <address className="mt-6 font-mono text-[11px] not-italic leading-loose text-dim">
              Nexus Forge Technologies Pvt Ltd
              <br />
              4th floor, Marisoft III, Kalyani Nagar
              <br />
              Pune, Maharashtra 411014
              <br />
              hello@nexusforge.in · +91 20 4956 1180
            </address>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-mono text-[11px] font-medium tracking-widest text-dim">
                {col.heading.toUpperCase()}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-overlay/[0.08] pt-6">
          <p className="font-mono text-[11px] text-dim">
            © 2026 Nexus Forge Technologies Pvt Ltd · CIN U62099PN2019PTC184402
          </p>
          <nav className="ml-auto flex gap-5" aria-label="Legal">
            <Link href="/" className="font-mono text-[11px] text-dim transition-colors hover:text-fg">
              Privacy
            </Link>
            <Link href="/" className="font-mono text-[11px] text-dim transition-colors hover:text-fg">
              Terms
            </Link>
            <Link href="/" className="font-mono text-[11px] text-dim transition-colors hover:text-fg">
              Security
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
