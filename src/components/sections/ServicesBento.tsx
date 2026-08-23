'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Flag,
  Globe,
  GraduationCap,
  TrendingUp,
  Users,
  Check,
  Sparkles,
} from 'lucide-react';

import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

interface BentoItem {
  code: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  metric: string;
  features: string[];
  span: string;
  featured?: boolean;
}

const items: BentoItem[] = [
  {
    code: 'S-01',
    title: 'Website Management',
    description:
      'Your site, watched and maintained every day. CMS, stack, store — and everything that breaks at 2am. Named engineer, monthly reporting, and no surprises.',
    href: '/services/website-management',
    icon: <Globe className="h-5 w-5" />,
    metric: '99.97% uptime across managed properties',
    features: [
      '24/7 uptime, SSL & malware monitoring',
      'Core, plugin & dependency patching',
      'E-commerce ops & Core Web Vitals',
      'New features, redesigns & integrations',
    ],
    span: 'md:col-span-2 md:row-span-2',
    featured: true,
  },
  {
    code: 'S-02',
    title: 'Social Media & Growth',
    description:
      'Posts, reels and copy on a calendar you approve, connected to analytics that tie campaigns and content back to business growth.',
    href: '/services/social-media-growth',
    icon: <TrendingUp className="h-5 w-5" />,
    metric: 'Weekly numbers · monthly review',
    features: [
      'Technical SEO & content clusters',
      'Meta & Google Ads testing',
    ],
    span: 'md:col-span-1',
  },
  {
    code: 'S-03',
    title: 'Industry Internships',
    description:
      'Cohorts in Cybersecurity, Full-Stack and DevOps — mentored by engineers working on real-world technology projects.',
    href: '/academy/internships',
    icon: <GraduationCap className="h-5 w-5" />,
    metric: '1,840 enrolled · live tickets from week 4',
    features: [
      'One mentor per six interns',
      'Signed skill report at completion',
    ],
    span: 'md:col-span-1',
  },
  {
    code: 'S-04',
    title: 'CTF & Developer Events',
    description:
      'Live capture-the-flag arenas, hackathons and coding competitions with isolated infrastructure, live scoring and anti-cheat systems.',
    href: '/platform/ctf-events',
    icon: <Flag className="h-5 w-5" />,
    metric: 'Scale tested to 2,400 concurrent teams',
    features: [
      'Jeopardy & attack-defend formats',
      'White-label on your own domain',
    ],
    span: 'md:col-span-1',
  },
  {
    code: 'S-05',
    title: 'Hire Developers & Talent Hub',
    description:
      'Shortlist from verified solve records, technical submissions and mentor feedback instead of relying only on CVs.',
    href: '/platform/hire-developers',
    icon: <Users className="h-5 w-5" />,
    metric: '212 placements made in 2025',
    features: [
      'Verified-skill search · 1,204 profiles',
      '90-day replacement guarantee',
    ],
    span: 'md:col-span-2',
  },
];

export default function ServicesBento() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-accent/[0.025]
            blur-[140px]
            dark:bg-accent/[0.045]
          "
        />

        <div
          className="
            absolute
            -left-40
            top-1/2
            h-[300px]
            w-[300px]
            rounded-full
            bg-accent/[0.015]
            blur-[120px]
            dark:bg-accent/[0.025]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.02]
            dark:opacity-[0.025]
          "
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* ===================================================
            HEADER
        =================================================== */}

        <SectionHeader
          badge="flag{what.we.run}"
          title="Five services. One technology partner."
          description="From digital infrastructure and growth to technical talent and developer ecosystems, NexForTech builds and operates the systems that keep modern businesses moving."
        />

        {/* ===================================================
            BENTO
        =================================================== */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.code}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: '-60px',
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: [0.2, 0.7, 0.3, 1],
              }}
              className={cn(
                'group',
                item.span,
              )}
            >
              <Link
                href={item.href}
                className={cn(
                  `
                  relative
                  flex
                  h-full
                  min-h-[300px]
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  border-line
                  bg-surface
                  p-5
                  transition-all
                  duration-300
                  ease-out
                  
                  /* LIGHT */
                  hover:-translate-y-1
                  hover:border-accent/30
                  hover:bg-surface
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]

                  /* DARK */
                  dark:bg-[#101010]
                  dark:border-white/[0.09]
                  dark:hover:border-white/[0.18]
                  dark:hover:bg-[#151515]
                  dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)]
                  
                  sm:p-6
                  md:p-7
                  `,
                  item.featured &&
                    'min-h-[440px] md:min-h-[560px]',
                )}
              >
                {/* =================================================
                    TOP ACCENT LINE
                ================================================= */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-accent/0
                    to-transparent
                    transition-all
                    duration-500
                    group-hover:via-accent/70
                    dark:group-hover:via-accent/50
                  "
                />

                {/* =================================================
                    SUBTLE HOVER GLOW
                ================================================= */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-48
                    w-48
                    rounded-full
                    bg-accent/[0.02]
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100

                    dark:bg-accent/[0.05]
                  "
                />

                {/* =================================================
                    TOP ROW
                ================================================= */}

                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-line
                      bg-soft
                      text-muted
                      transition-all
                      duration-300

                      group-hover:border-accent/30
                      group-hover:bg-accent/[0.05]
                      group-hover:text-accent

                      dark:border-white/[0.08]
                      dark:bg-white/[0.035]
                      dark:group-hover:border-accent/30
                      dark:group-hover:bg-accent/[0.08]
                    "
                  >
                    {item.icon}
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-line
                      bg-soft
                      px-2.5
                      py-1
                      font-mono
                      text-[9px]
                      font-medium
                      tracking-[0.16em]
                      text-dim

                      dark:border-white/[0.08]
                      dark:bg-white/[0.025]
                    "
                  >
                    {item.code}
                  </span>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="relative z-10 mt-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={cn(
                        `
                        max-w-xl
                        text-xl
                        font-bold
                        tracking-tight
                        text-fg
                        transition-colors
                        duration-300
                        sm:text-2xl
                        `,
                        item.featured &&
                          'md:text-3xl',
                      )}
                    >
                      {item.title}
                    </h3>

                    {item.featured && (
                      <span
                        className="
                          hidden
                          rounded-lg
                          border
                          border-line
                          bg-soft
                          p-1.5
                          text-dim
                          transition-all
                          duration-300
                          group-hover:border-accent/30
                          group-hover:bg-accent/[0.06]
                          group-hover:text-accent
                          sm:flex
                        "
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>

                  <p
                    className={cn(
                      `
                      mt-3
                      max-w-2xl
                      text-sm
                      leading-7
                      text-muted
                      `,
                      item.featured &&
                        'md:text-[15px]',
                    )}
                  >
                    {item.description}
                  </p>
                </div>

                {/* =================================================
                    FEATURES
                ================================================= */}

                <ul
                  className={cn(
                    `
                    relative
                    z-10
                    mt-6
                    space-y-3
                    `,
                    item.featured &&
                      'md:mt-8',
                  )}
                >
                  {item.features.map(
                    (feature) => (
                      <li
                        key={feature}
                        className="
                          flex
                          items-start
                          gap-2.5
                        "
                      >
                        <span
                          className="
                            mt-0.5
                            flex
                            h-4
                            w-4
                            flex-none
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-line
                            bg-soft
                            transition-all
                            duration-300

                            group-hover:border-accent/30

                            dark:border-white/[0.08]
                            dark:bg-white/[0.035]
                            dark:group-hover:bg-accent/[0.06]
                          "
                        >
                          <Check
                            className="
                              h-2.5
                              w-2.5
                              text-muted
                              transition-colors
                              duration-300
                              group-hover:text-accent
                            "
                          />
                        </span>

                        <span
                          className="
                            text-[12px]
                            leading-5
                            text-muted
                            sm:text-[13px]
                          "
                        >
                          {feature}
                        </span>
                      </li>
                    ),
                  )}
                </ul>

                {/* =================================================
                    METRIC
                ================================================= */}

                <div
                  className="
                    relative
                    z-10
                    mt-auto
                    flex
                    items-end
                    justify-between
                    gap-4
                    border-t
                    border-line
                    pt-5

                    dark:border-white/[0.07]
                  "
                >
                  <div className="min-w-0">
                    <span
                      className="
                        mb-1
                        block
                        font-mono
                        text-[8px]
                        tracking-[0.16em]
                        text-dim
                      "
                    >
                      PERFORMANCE SIGNAL
                    </span>

                    <span
                      className="
                        block
                        truncate
                        font-mono
                        text-[10px]
                        text-muted
                        sm:text-[11px]
                      "
                    >
                      {item.metric}
                    </span>
                  </div>

                  {/* =================================================
                      ARROW
                  ================================================= */}

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      flex-none
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-line
                      bg-soft
                      text-dim
                      transition-all
                      duration-300

                      group-hover:border-accent/40
                      group-hover:bg-accent
                      group-hover:text-inverse

                      dark:border-white/[0.09]
                      dark:bg-white/[0.035]
                      dark:group-hover:border-accent
                      dark:group-hover:bg-accent
                    "
                  >
                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </span>
                </div>

                {/* =================================================
                    BOTTOM ACTIVE INDICATOR
                ================================================= */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-1/2
                    h-px
                    w-0
                    -translate-x-1/2
                    bg-accent
                    opacity-70
                    transition-all
                    duration-500
                    group-hover:w-1/2

                    dark:opacity-80
                  "
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ===================================================
            CTA
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="mt-6"
        >
          <Link
            href="/contact"
            className="
              group
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              border-line
              bg-surface
              p-5
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:border-accent/30

              dark:border-white/[0.08]
              dark:bg-[#101010]
              dark:hover:border-white/[0.16]
              dark:hover:bg-[#141414]

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-6
            "
          >
            <div>
              <p
                className="
                  font-mono
                  text-[9px]
                  font-medium
                  tracking-[0.18em]
                  text-accent
                "
              >
                NEXFORTECH / NEXT STEP
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-semibold
                  text-fg
                  sm:text-lg
                "
              >
                Have a technical challenge?
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-muted
                  sm:text-sm
                "
              >
                Tell us what you are building and
                we'll figure out the right team for it.
              </p>
            </div>

            <span
              className="
                flex
                w-fit
                items-center
                gap-2
                rounded-xl
                bg-accent
                px-4
                py-2.5
                text-sm
                font-semibold
                text-inverse
                transition-all
                duration-300
                hover:bg-accent-hover
              "
            >
              Talk to NexForTech

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}