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

/* =========================================================
   SERVICES
========================================================= */

const servicesItems: NavDropItem[] = [
  {
    label: 'Website Management',
    description:
      '24/7 monitoring, maintenance & feature development',
    href: '/services/website-management',
    icon: <Globe className="h-4 w-4" />,
  },
  {
    label: 'Social Media & Growth',
    description:
      'Content engine, SEO, GA4 & performance marketing',
    href: '/services/social-media-growth',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    label: 'Industry Internships',
    description:
      'Cybersecurity, Full-Stack & DevOps career tracks',
    href: '/academy/internships',
    icon: <GraduationCap className="h-4 w-4" />,
  },
];

/* =========================================================
   PLATFORMS
========================================================= */

const platformItems: NavDropItem[] = [
  {
    label: 'CTF & Developer Events',
    description:
      'Live hacking arenas, hackathons & code sprints',
    href: '/platform/ctf-events',
    icon: <Flag className="h-4 w-4" />,
  },
  {
    label: 'Hire Developers',
    description:
      'Vetted, verified elite tech talent hub',
    href: '/platform/hire-developers',
    icon: <Users className="h-4 w-4" />,
  },
];

/* =========================================================
   DROPDOWN
========================================================= */

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: NavDropItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          'flex items-center gap-1.5 rounded-lg',
          'px-2.5 py-2',
          'font-mono text-[11px] font-medium',
          'tracking-[0.08em]',
          'transition-all duration-200',
          open
            ? 'bg-overlay/[0.06] text-fg'
            : 'text-muted hover:bg-overlay/[0.04] hover:text-fg',
        )}
        aria-expanded={open}
      >
        {label}

        <ChevronDown
          className={cn(
            'h-3.5 w-3.5',
            'transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.97,
            }}
            transition={{
              duration: 0.18,
              ease: [0.2, 0.7, 0.3, 1],
            }}
            className="absolute left-0 top-full z-[70] w-[340px] pt-3"
          >
            <div
              className={cn(
                'overflow-hidden rounded-2xl',
                'border border-line',
                'bg-base/95',
                'backdrop-blur-2xl',
                'shadow-2xl',
              )}
            >
              <div className="p-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'group flex items-start gap-3',
                      'rounded-xl px-3 py-3',
                      'transition-all duration-200',
                      'hover:bg-overlay/[0.05]',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-9 w-9 flex-none',
                        'items-center justify-center',
                        'rounded-xl',
                        'border border-line',
                        'bg-soft text-muted',
                        'transition-all duration-200',
                        'group-hover:border-line-strong',
                        'group-hover:bg-overlay/[0.05]',
                        'group-hover:text-accent',
                      )}
                    >
                      {item.icon}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-fg">
                        {item.label}
                      </span>

                      <span className="mt-1 block text-xs leading-relaxed text-dim">
                        {item.description}
                      </span>
                    </span>

                    <ArrowUpRight
                      className={cn(
                        'ml-auto mt-1 h-3.5 w-3.5',
                        'flex-none text-dim',
                        'opacity-0',
                        'transition-all duration-200',
                        'group-hover:-translate-y-0.5',
                        'group-hover:translate-x-0.5',
                        'group-hover:text-accent',
                        'group-hover:opacity-100',
                      )}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   NEXFORTECH BRAND MARK
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
   LIVE ONLINE
========================================================= */

function LiveOnline() {
  const [online, setOnline] = useState<number | null>(null);

  useEffect(() => {
    setOnline(
      1240 + Math.floor(Math.random() * 40),
    );

    const id = setInterval(() => {
      setOnline((value) =>
        value === null
          ? value
          : Math.max(
            1180,
            value +
            Math.floor(Math.random() * 13) -
            6,
          ),
      );
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        'hidden xl:flex',
        'items-center gap-2',
        'rounded-full',
        'border border-line',
        'bg-soft/40',
        'px-3 py-1.5',
        'font-mono text-[10px]',
        'tracking-[0.12em]',
        'text-muted',
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />

        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
      </span>

      LIVE ·{' '}
      {online === null
        ? '—'
        : online.toLocaleString('en-IN')}{' '}
      ONLINE
    </span>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  /* Close mobile menu after route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Prevent body scroll when mobile drawer is open */
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileOpen]);

  /* =======================================================
     MOBILE LINKS
  ======================================================= */

  const mobileLinks = [
    {
      label: 'Home',
      href: '/',
    },
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
    {
      label: 'Academy',
      href: '/academy/internships',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ];

  /* =======================================================
     ACTIVE LINK
  ======================================================= */

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ===================================================
          FLOATING NEXFORTECH NAVBAR
      =================================================== */}

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          'px-3 pt-3',
          'sm:px-4 sm:pt-4',
          'lg:px-6 lg:pt-5',
          'pointer-events-none',
        )}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.2, 0.7, 0.3, 1],
          }}
          className={cn(
            'pointer-events-auto',
            'mx-auto w-full max-w-7xl',
            'rounded-2xl',
            'lg:rounded-[22px]',
            'border border-line',
            'bg-base/80',
            'backdrop-blur-2xl',
            'shadow-[0_12px_45px_rgba(0,0,0,0.10)]',
          )}
        >
          {/* =================================================
              MAIN NAVIGATION
          ================================================= */}

          <div
            className={cn(
              'flex items-center',
              'h-[64px]',
              'sm:h-[68px]',
              'gap-3',
              'sm:gap-5',
              'lg:gap-7',
              'px-3',
              'sm:px-5',
              'lg:px-6',
            )}
          >
            {/* =================================================
                BRAND
            ================================================= */}

            <Link
              href="/"
              aria-label="NexForTech Home"
              className={cn(
                'group flex flex-none',
                'items-center gap-2.5',
                'text-base sm:text-lg',
                'font-extrabold',
                'tracking-tight',
                'text-fg',
              )}
            >
              <span
                className={cn(
                  'transition-transform duration-300',
                  'group-hover:rotate-6',
                )}
              >
                <BrandMark />
              </span>

              {/* Desktop / Tablet */}
              <span className="hidden xs:inline">
                NexForTech
              </span>

              {/* Small Mobile */}
              <span className="xs:hidden">
                NexForTech
              </span>
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              <Dropdown
                label="SERVICES"
                items={servicesItems}
              />

              <Dropdown
                label="PLATFORMS"
                items={platformItems}
              />

              <Link
                href="/academy/internships"
                className={cn(
                  'rounded-lg px-2.5 py-2',
                  'font-mono text-[11px]',
                  'font-medium',
                  'tracking-[0.08em]',
                  'transition-all duration-200',
                  isActive('/academy')
                    ? 'bg-overlay/[0.06] text-fg'
                    : 'text-muted hover:bg-overlay/[0.04] hover:text-fg',
                )}
              >
                ACADEMY
              </Link>

              <Link
                href="/contact"
                className={cn(
                  'rounded-lg px-2.5 py-2',
                  'font-mono text-[11px]',
                  'font-medium',
                  'tracking-[0.08em]',
                  'transition-all duration-200',
                  isActive('/contact')
                    ? 'bg-overlay/[0.06] text-fg'
                    : 'text-muted hover:bg-overlay/[0.04] hover:text-fg',
                )}
              >
                CONTACT
              </Link>
            </nav>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div
              className={cn(
                'ml-auto hidden lg:flex',
                'items-center gap-2.5',
              )}
            >
              <LiveOnline />

              <ThemeToggle />

              {/* Client Login */}
              <Link
                href="/contact"
                className={cn(
                  'rounded-xl',
                  'border border-line',
                  'bg-soft/30',
                  'px-3.5 py-2',
                  'text-sm font-semibold',
                  'text-fg',
                  'transition-all duration-200',
                  'hover:border-line-strong',
                  'hover:bg-soft',
                )}
              >
                Client Login
              </Link>

              {/* Launch Portal */}
              <Link
                href="/contact"
                className={cn(
                  'group flex items-center',
                  'gap-1.5',
                  'rounded-xl',
                  'bg-accent',
                  'px-4 py-2',
                  'text-sm font-semibold',
                  'text-inverse',
                  'shadow-glow-soft',
                  'transition-all duration-200',
                  'hover:bg-accent-hover',
                  'hover:shadow-glow-white',
                )}
              >
                Launch Portal

                <ArrowUpRight
                  className={cn(
                    'h-4 w-4',
                    'transition-transform duration-200',
                    'group-hover:-translate-y-0.5',
                    'group-hover:translate-x-0.5',
                  )}
                />
              </Link>
            </div>

            {/* =================================================
                MOBILE CONTROLS
            ================================================= */}

            <div
              className={cn(
                'ml-auto flex lg:hidden',
                'items-center gap-2',
              )}
            >
              <ThemeToggle />

              <button
                type="button"
                className={cn(
                  'flex h-10 w-10',
                  'items-center justify-center',
                  'rounded-xl',
                  'border border-line',
                  'bg-soft/30',
                  'text-fg',
                  'transition-all duration-200',
                  'hover:border-line-strong',
                  'hover:bg-soft',
                )}
                onClick={() =>
                  setMobileOpen(
                    (value) => !value,
                  )
                }
                aria-label={
                  mobileOpen
                    ? 'Close NexForTech navigation'
                    : 'Open NexForTech navigation'
                }
                aria-expanded={mobileOpen}
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{
                        opacity: 0,
                        rotate: -90,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: 90,
                        scale: 0.8,
                      }}
                    >
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{
                        opacity: 0,
                        rotate: 90,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: -90,
                        scale: 0.8,
                      }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* =================================================
              MOBILE MENU
          ================================================= */}

          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.28,
                  ease: [0.2, 0.7, 0.3, 1],
                }}
                className="overflow-hidden lg:hidden"
              >
                <div
                  className={cn(
                    'border-t border-line',
                    'px-3 pb-4 pt-3',
                    'sm:px-5 sm:pb-5',
                  )}
                >
                  <nav
                    className="space-y-1"
                    aria-label="NexForTech mobile navigation"
                  >
                    {mobileLinks.map(
                      (link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{
                            opacity: 0,
                            x: -8,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay:
                              index * 0.025,
                            duration: 0.2,
                          }}
                        >
                          <Link
                            href={link.href}
                            className={cn(
                              'flex items-center',
                              'rounded-xl',
                              'px-3 py-3',
                              'text-sm font-medium',
                              'transition-all duration-200',
                              isActive(
                                link.href,
                              )
                                ? 'bg-overlay/[0.06] text-fg'
                                : 'text-muted hover:bg-overlay/[0.04] hover:text-fg',
                            )}
                          >
                            <span>
                              {link.label}
                            </span>

                            {isActive(
                              link.href,
                            ) && (
                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
                              )}
                          </Link>
                        </motion.div>
                      ),
                    )}
                  </nav>

                  {/* =================================================
                      MOBILE ACTIONS
                  ================================================= */}

                  <div
                    className={cn(
                      'mt-3 grid',
                      'grid-cols-1',
                      'gap-2',
                      'sm:grid-cols-2',
                    )}
                  >
                    <Link
                      href="/contact"
                      className={cn(
                        'flex items-center',
                        'justify-center',
                        'rounded-xl',
                        'border border-line',
                        'bg-soft/30',
                        'px-4 py-3',
                        'text-sm font-semibold',
                        'text-fg',
                        'transition-all duration-200',
                        'hover:border-line-strong',
                      )}
                    >
                      Client Login
                    </Link>

                    <Link
                      href="/contact"
                      className={cn(
                        'flex items-center',
                        'justify-center',
                        'gap-1.5',
                        'rounded-xl',
                        'bg-accent',
                        'px-4 py-3',
                        'text-sm font-semibold',
                        'text-inverse',
                        'shadow-glow-soft',
                      )}
                    >
                      Launch Portal

                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* =================================================
                      MOBILE LIVE STATUS
                  ================================================= */}

                  <div className="mt-3 flex justify-center sm:hidden">
                    <LiveOnline />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* =====================================================
          FLOATING NAVBAR SPACER
      ===================================================== */}

      <div className="h-[88px] sm:h-[96px] lg:h-[104px]" />
    </>
  );
}