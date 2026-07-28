'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Globe,
  TrendingUp,
  GraduationCap,
  Flag,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface NavDropItem {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const servicesItems: NavDropItem[] = [
  {
    label: 'Website Management',
    description: '24/7 monitoring, maintenance & feature development',
    href: '/services/website-management',
    icon: <Globe className="h-4 w-4" />,
  },
  {
    label: 'Social Media & Growth',
    description: 'Content engine, SEO, GA4 & performance marketing',
    href: '/services/social-media-growth',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    label: 'Industry Internships',
    description: 'Cybersecurity, Full-Stack & DevOps career tracks',
    href: '/academy/internships',
    icon: <GraduationCap className="h-4 w-4" />,
  },
];

const platformItems: NavDropItem[] = [
  {
    label: 'CTF & Developer Events',
    description: 'Live hacking arenas, hackathons & code sprints',
    href: '/platform/ctf-events',
    icon: <Flag className="h-4 w-4" />,
  },
  {
    label: 'Hire Developers',
    description: 'Vetted, verified elite tech talent hub',
    href: '/platform/hire-developers',
    icon: <Users className="h-4 w-4" />,
  },
];

function Dropdown({ label, items }: { label: string; items: NavDropItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={cn(
          'flex items-center gap-1 font-mono text-xs tracking-wide transition-colors',
          open ? 'text-fg' : 'text-muted hover:text-fg',
        )}
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full w-80 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-base shadow-elevated backdrop-blur-xl">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-overlay/[0.05]"
                >
                  <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-line bg-soft text-muted transition-colors group-hover:border-line-strong group-hover:text-accent">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-fg">{item.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-dim">{item.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BrandMark() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1.2" y="1.2" width="21.6" height="21.6" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <path d="M12 1.2v5.6M12 17.2v5.6M1.2 12h5.6M17.2 12h5.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Fluctuating "engineers online" counter — pure client-side simulation
function LiveOnline() {
  const [online, setOnline] = useState<number | null>(null);

  useEffect(() => {
    setOnline(1240 + Math.floor(Math.random() * 40));
    const id = setInterval(() => {
      setOnline((v) => (v === null ? v : Math.max(1180, v + Math.floor(Math.random() * 13) - 6)));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-muted xl:flex">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      LIVE · {online === null ? '—' : online.toLocaleString('en-IN')} ONLINE
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const mobileLinks = [
    { label: 'Home', href: '/' },
    ...servicesItems.map(({ label, href }) => ({ label, href })),
    ...platformItems.map(({ label, href }) => ({ label, href })),
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-overlay/[0.08] bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-8 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-fg">
          <BrandMark />
          Nexus Forge
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          <Dropdown label="SERVICES" items={servicesItems} />
          <Dropdown label="PLATFORMS" items={platformItems} />
          <Link
            href="/academy/internships"
            className="font-mono text-xs tracking-wide text-muted transition-colors hover:text-fg"
          >
            ACADEMY
          </Link>
          <Link
            href="/contact"
            className="font-mono text-xs tracking-wide text-muted transition-colors hover:text-fg"
          >
            CONTACT
          </Link>
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <LiveOnline />
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-accent"
          >
            Client Login
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-inverse shadow-glow-soft transition-all hover:bg-accent-hover hover:shadow-glow-white"
          >
            Launch Portal
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile burger */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.3, 1] }}
            className="overflow-hidden border-t border-overlay/[0.08] bg-soft lg:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-5 py-4">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-overlay/[0.05] hover:text-fg"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-inverse"
              >
                Launch Portal
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
