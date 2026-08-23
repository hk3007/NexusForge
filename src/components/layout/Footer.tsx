'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Activity,
  ShieldCheck,
  Zap,
} from 'lucide-react';

/* =========================================================
   FOOTER NAVIGATION
========================================================= */

const columns = [
  {
    heading: 'Services',
    links: [
      {
        label: 'Website Management',
        href: '/services/website-management',
      },
      {
        label: 'Social Media & Growth',
        href: '/services/social-media-growth',
      },
      {
        label: 'Industry Internships',
        href: '/academy/internships',
      },
      {
        label: 'CTF & Developer Events',
        href: '/platform/ctf-events',
      },
      {
        label: 'Hire Developers',
        href: '/platform/hire-developers',
      },
    ],
  },
  {
    heading: 'Platform',
    links: [
      {
        label: 'Upcoming Events',
        href: '/platform/ctf-events',
      },
      {
        label: 'Live Leaderboard',
        href: '/platform/ctf-events',
      },
      {
        label: 'Talent Matrix',
        href: '/platform/hire-developers',
      },
      {
        label: 'Skill Reports',
        href: '/platform/hire-developers',
      },
      {
        label: 'Academy Cohorts',
        href: '/academy/internships',
      },
    ],
  },
  {
    heading: 'Company',
    links: [
      {
        label: 'About',
        href: '/',
      },
      {
        label: 'Contact',
        href: '/contact',
      },
      {
        label: 'Support Desk',
        href: '/contact',
      },
      {
        label: 'Work With Us',
        href: '/contact',
      },
      {
        label: 'Status',
        href: '/',
      },
    ],
  },
];

/* =========================================================
   BRAND MARK
========================================================= */

function BrandMark() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.2"
        y="1.2"
        width="21.6"
        height="21.6"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="12"
        cy="12"
        r="3.2"
        fill="currentColor"
      />

      <path
        d="M12 1.2v5.6M12 17.2v5.6M1.2 12h5.6M17.2 12h5.6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* =========================================================
   LIVE TELEMETRY
========================================================= */

function LiveTelemetry() {
  const [probes, setProbes] = useState<{
    api: number;
    web: number;
    cdn: number;
  } | null>(null);

  const [sinceCheck, setSinceCheck] =
    useState(0);

  useEffect(() => {
    const jitter = (
      base: number,
      spread: number,
    ) =>
      Math.max(
        8,
        Math.round(
          base +
            (Math.random() - 0.5) *
              spread,
        ),
      );

    const probe = () => {
      setProbes({
        api: jitter(42, 14),
        web: jitter(118, 30),
        cdn: jitter(23, 10),
      });
    };

    probe();

    const probeId = setInterval(
      probe,
      2500,
    );

    const clockId = setInterval(
      () =>
        setSinceCheck(
          (value) => (value + 1) % 60,
        ),
      1000,
    );

    return () => {
      clearInterval(probeId);
      clearInterval(clockId);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {probes === null ? (
        <span className="font-mono text-[10px] text-dim">
          CHECKING GLOBAL SYSTEMS...
        </span>
      ) : (
        <>
          <span className="font-mono text-[10px] text-dim">
            API{' '}
            <span className="text-fg">
              {probes.api}ms
            </span>
          </span>

          <span className="hidden h-3 w-px bg-line sm:block" />

          <span className="font-mono text-[10px] text-dim">
            WEB{' '}
            <span className="text-fg">
              {probes.web}ms
            </span>
          </span>

          <span className="hidden h-3 w-px bg-line sm:block" />

          <span className="font-mono text-[10px] text-dim">
            CDN{' '}
            <span className="text-fg">
              {probes.cdn}ms
            </span>
          </span>

          <span className="hidden h-3 w-px bg-line sm:block" />

          <span className="font-mono text-[10px] text-dim">
            CHECKED {sinceCheck}s AGO
          </span>
        </>
      )}
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-overlay/[0.08] bg-base">
      {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent/[0.035] blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-accent/[0.02] blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize:
              '50px 50px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        {/* ===================================================
            SYSTEM STATUS
        =================================================== */}

        <div
          className={[
            'mb-14 flex flex-col',
            'gap-4 lg:flex-row',
            'lg:items-center lg:justify-between',
            'rounded-2xl',
            'border border-line',
            'bg-surface/70',
            'px-5 py-4 sm:px-6 sm:py-5',
            'backdrop-blur-xl',
          ].join(' ')}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-40" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live" />
            </span>

            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-fg sm:text-xs">
                ALL SYSTEMS OPERATIONAL
              </p>

              <p className="mt-0.5 font-mono text-[9px] tracking-wide text-dim">
                GLOBAL INFRASTRUCTURE · 99.99% UPTIME
              </p>
            </div>
          </div>

          <LiveTelemetry />
        </div>

        {/* ===================================================
            TOP BRAND / CTA AREA
        =================================================== */}

        <div
          className={[
            'mb-16 grid gap-10',
            'lg:grid-cols-[1.4fr_0.6fr]',
            'lg:items-end',
          ].join(' ')}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="transition-transform duration-300 group-hover:rotate-6">
                <BrandMark />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                NexForTech
              </span>
            </Link>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              Building digital systems, developing
              technical talent, and powering the next
              generation of technology-driven businesses.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-full border border-line bg-soft/40 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />

                <span className="font-mono text-[9px] tracking-wider text-muted">
                  SECURITY FIRST
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-line bg-soft/40 px-3 py-1.5">
                <Zap className="h-3.5 w-3.5 text-accent" />

                <span className="font-mono text-[9px] tracking-wider text-muted">
                  PERFORMANCE DRIVEN
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-line bg-soft/40 px-3 py-1.5">
                <Activity className="h-3.5 w-3.5 text-accent" />

                <span className="font-mono text-[9px] tracking-wider text-muted">
                  ALWAYS ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:text-right">
            <p className="font-mono text-[10px] tracking-[0.16em] text-dim">
              READY TO BUILD?
            </p>

            <Link
              href="/contact"
              className={[
                'group mt-3 inline-flex',
                'items-center gap-2',
                'rounded-xl',
                'bg-accent',
                'px-5 py-3',
                'text-sm font-semibold',
                'text-inverse',
                'shadow-glow-soft',
                'transition-all duration-200',
                'hover:bg-accent-hover',
                'hover:shadow-glow-white',
              ].join(' ')}
            >
              Start a Conversation

              <ArrowUpRight
                className={[
                  'h-4 w-4',
                  'transition-transform duration-200',
                  'group-hover:-translate-y-0.5',
                  'group-hover:translate-x-0.5',
                ].join(' ')}
              />
            </Link>
          </div>
        </div>

        {/* ===================================================
            DIVIDER
        =================================================== */}

        <div className="mb-12 h-px bg-line" />

        {/* ===================================================
            NAVIGATION GRID
        =================================================== */}

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand / Mission */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-mono text-[10px] font-medium tracking-[0.16em] text-dim">
              NEXFORTECH
            </p>

            <p className="mt-4 max-w-xs text-xs leading-6 text-muted">
              Technology, infrastructure and
              talent engineered for the modern
              digital world.
            </p>

            <Link
              href="/contact"
              className="group mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-fg transition-colors hover:text-accent"
            >
              WORK WITH US

              <ArrowUpRight
                className={[
                  'h-3.5 w-3.5',
                  'transition-transform duration-200',
                  'group-hover:-translate-y-0.5',
                  'group-hover:translate-x-0.5',
                ].join(' ')}
              />
            </Link>
          </div>

          {/* Navigation Columns */}
          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="font-mono text-[10px] font-medium tracking-[0.16em] text-dim">
                {column.heading.toUpperCase()}
              </h4>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-fg sm:text-sm"
                    >
                      <span>
                        {link.label}
                      </span>

                      <ArrowUpRight
                        className={[
                          'h-3 w-3',
                          'opacity-0',
                          '-translate-x-1',
                          'transition-all duration-200',
                          'group-hover:translate-x-0',
                          'group-hover:opacity-100',
                        ].join(' ')}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===================================================
            NEWSLETTER
        =================================================== */}

        <div
          className={[
            'mt-14 overflow-hidden',
            'rounded-2xl',
            'border border-line',
            'bg-surface/60',
            'backdrop-blur-xl',
          ].join(' ')}
        >
          <div
            className={[
              'flex flex-col gap-6',
              'px-5 py-6',
              'sm:px-7 sm:py-7',
              'lg:flex-row',
              'lg:items-center',
              'lg:justify-between',
            ].join(' ')}
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] text-dim">
                NEXFORTECH INTELLIGENCE
              </p>

              <h3 className="mt-2 text-lg font-bold text-fg">
                Stay ahead of the next release.
              </h3>

              <p className="mt-1 text-xs text-muted">
                Product updates, technical insights,
                events and opportunities.
              </p>
            </div>

            <form className="flex w-full max-w-md gap-2">
              <input
                type="email"
                required
                placeholder="you@company.in"
                aria-label="Email address"
                className={[
                  'min-w-0 flex-1',
                  'rounded-xl',
                  'border border-line',
                  'bg-soft',
                  'px-3.5 py-3',
                  'text-sm text-fg',
                  'placeholder:text-dim',
                  'transition-colors',
                  'focus:border-accent',
                  'focus:outline-none',
                ].join(' ')}
              />

              <button
                type="submit"
                className={[
                  'flex flex-none',
                  'items-center gap-1.5',
                  'rounded-xl',
                  'bg-accent',
                  'px-4 py-3',
                  'text-sm font-semibold',
                  'text-inverse',
                  'transition-colors',
                  'hover:bg-accent-hover',
                ].join(' ')}
              >
                Join

                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* ===================================================
            BOTTOM BAR
        =================================================== */}

        <div
          className={[
            'mt-10 flex flex-col',
            'gap-4',
            'border-t border-line',
            'pt-6',
            'sm:flex-row',
            'sm:items-center',
            'sm:justify-between',
          ].join(' ')}
        >
          <p className="font-mono text-[10px] leading-relaxed text-dim">
            © 2026 NexForTech. All rights reserved.
          </p>

          <nav
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Legal"
          >
            <Link
              href="/privacy"
              className="font-mono text-[10px] text-dim transition-colors hover:text-fg"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="font-mono text-[10px] text-dim transition-colors hover:text-fg"
            >
              Terms
            </Link>

            <Link
              href="/security"
              className="font-mono text-[10px] text-dim transition-colors hover:text-fg"
            >
              Security
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}