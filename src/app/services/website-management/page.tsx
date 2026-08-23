'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Check,
  Gauge,
  Globe,
  LifeBuoy,
  Lock,
  RefreshCw,
  Server,
  ShoppingCart,
  Wrench,
  Zap,
  ShieldCheck,
  Database,
  Clock3,
  Layers3,
  Code2,
  SearchCheck,
  FileCheck2,
  Building2,
  Plus,
} from 'lucide-react';

import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';
import type { MonitorRow, PricingTier } from '@/types';

/* =========================================================
   SERVICE FEATURES
========================================================= */

const features = [
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: 'Ongoing Maintenance',
    text: 'Core, plugin and dependency patching on a tested schedule — never on a live Friday deploy.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Content Updates',
    text: 'Content changes handled within your plan allowance without requiring your team to touch the CMS.',
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: 'E-commerce Operations',
    text: 'Catalogue, checkout and payment flows monitored and maintained for revenue-critical stores.',
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: 'Performance Optimization',
    text: 'Core Web Vitals, caching, image budgets and frontend performance continuously reviewed.',
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: '24/7 Monitoring & Health Checks',
    text: 'Automated checks from multiple regions help identify downtime and degradation before customers report it.',
  },
  {
    icon: <LifeBuoy className="h-5 w-5" />,
    title: 'Technical Support',
    text: 'Direct operational support with response targets based on your selected service tier.',
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: 'Troubleshooting',
    text: 'Production issues, deployment problems and unexpected failures handled by experienced engineers.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Features, Redesigns & Integrations',
    text: 'New features, redesigns and third-party integrations delivered against an agreed scope.',
  },
];

/* =========================================================
   PRICING TIERS
========================================================= */

const tiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'AUD $249',
    period: '/month',
    description:
      'For brochure and small-business websites that need reliable maintenance, monitoring and support.',
    features: [
      '1 website',
      'Up to 15 pages',
      'Weekly core, plugin & dependency patching',
      'Basic uptime + SSL monitoring',
      'Basic malware/security monitoring',
      'Weekly backups',
      'Annual restore testing',
      '4 content updates / month',
      'Basic performance monitoring',
      'Email support · next business day',
      'Monthly report',
      'Live status board',
      '30-day notice',
    ],
    cta: 'Start with Basic',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'AUD $599',
    period: '/month',
    description:
      'For e-commerce, lead-generation and revenue sites where uptime and performance directly affect growth.',
    features: [
      'Up to 3 properties',
      'E-commerce included',
      'Daily maintenance window',
      'Staging + QA environment',
      '24/7 uptime + SSL monitoring',
      '24/7 malware/security monitoring',
      'Daily backups',
      'Quarterly restore drills',
      '12 content updates / month',
      'Core Web Vitals optimization',
      'Priority support + named engineer',
      '30-minute response target',
      '4 development hours / month',
      'Scoped integrations',
      'Annual security posture review',
      'Annual architecture + roadmap review',
      'Monthly report',
      'Live status board',
      '30-day notice',
    ],
    popular: true,
    cta: 'Choose Growth',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'From AUD $1,999',
    period: '/month',
    description:
      'For multi-site estates, regulated businesses and organisations requiring dedicated operational coverage.',
    features: [
      'Multiple / custom properties',
      'Continuous / custom maintenance',
      'Dedicated environments',
      '24/7 uptime + SSL monitoring',
      'Advanced security monitoring',
      'Custom backup strategy',
      'Scheduled recovery drills',
      'Fair-use / custom content updates',
      'Advanced performance optimization',
      '24/7 on-call support',
      '15-minute response target',
      'Custom development allocation',
      'Included / scoped integrations',
      'Included / scoped migrations',
      'Quarterly security posture review',
      'Pen-test liaison',
      'Quarterly architecture review',
      'Quarterly roadmap review',
      'White-label/custom status board',
      'Custom SLA',
      '30-day notice',
    ],
    cta: 'Talk to Us',
  },
];

/* =========================================================
   SERVICE COMPARISON
========================================================= */

const comparisonRows = [
  {
    label: 'Websites',
    basic: '1',
    growth: 'Up to 3',
    enterprise: 'Unlimited / custom',
    frequency: 'Monthly',
  },
  {
    label: 'Pages / complexity',
    basic: 'Up to 15 pages',
    growth: 'Up to 3 properties incl. e-commerce',
    enterprise: 'Custom estate',
    frequency: 'Plan',
  },
  {
    label: 'Core/plugin/dependency patching',
    basic: 'Weekly',
    growth: 'Daily maintenance window',
    enterprise: 'Continuous / custom',
    frequency: 'Scheduled',
  },
  {
    label: 'Staging / testing',
    basic: 'Basic',
    growth: 'Staging + QA',
    enterprise: 'Dedicated environments',
    frequency: 'Per release',
  },
  {
    label: 'Content updates',
    basic: 'Up to 4',
    growth: 'Up to 12',
    enterprise: 'Fair-use / custom',
    frequency: 'Monthly',
  },
  {
    label: 'E-commerce operations',
    basic: '—',
    growth: 'Included',
    enterprise: 'Included',
    frequency: 'Store health',
  },
  {
    label: 'Uptime + SSL monitoring',
    basic: 'Included',
    growth: '24/7',
    enterprise: '24/7',
    frequency: 'Automated',
  },
  {
    label: 'Malware/security monitoring',
    basic: 'Basic',
    growth: '24/7',
    enterprise: 'Advanced',
    frequency: 'Automated + review',
  },
  {
    label: 'Backups',
    basic: 'Weekly',
    growth: 'Daily',
    enterprise: 'Custom',
    frequency: 'Per site',
  },
  {
    label: 'Restore testing',
    basic: 'Annual',
    growth: 'Quarterly',
    enterprise: 'Scheduled drills',
    frequency: 'Recovery',
  },
  {
    label: 'Performance / CWV',
    basic: 'Monitoring',
    growth: 'Optimization',
    enterprise: 'Advanced optimization',
    frequency: 'Monthly',
  },
  {
    label: 'Support',
    basic: 'Email / next business day',
    growth: 'Priority support',
    enterprise: 'On-call SLA',
    frequency: 'SLA',
  },
  {
    label: 'Development hours',
    basic: '—',
    growth: '4 hours/month',
    enterprise: 'Custom',
    frequency: 'Monthly',
  },
  {
    label: 'Integrations',
    basic: 'Quoted',
    growth: 'Scoped',
    enterprise: 'Included / scoped',
    frequency: 'As required',
  },
  {
    label: 'Security posture review',
    basic: '—',
    growth: 'Annual basic',
    enterprise: 'Quarterly',
    frequency: 'Review',
  },
  {
    label: 'Pen-test liaison',
    basic: '—',
    growth: '—',
    enterprise: 'Included',
    frequency: 'Engagement',
  },
  {
    label: 'Status board',
    basic: 'Included',
    growth: 'Included',
    enterprise: 'White-label/custom',
    frequency: 'Live',
  },
  {
    label: 'Monthly report',
    basic: 'Included',
    growth: 'Included',
    enterprise: 'Included',
    frequency: 'Monthly',
  },
  {
    label: 'Architecture / roadmap review',
    basic: '—',
    growth: 'Annual',
    enterprise: 'Quarterly',
    frequency: 'Review',
  },
  {
    label: 'Notice period',
    basic: '30 days',
    growth: '30 days',
    enterprise: '30 days',
    frequency: 'Commercial',
  },
];

/* =========================================================
   ADD-ON PRICING
========================================================= */

const addons = [
  {
    icon: <Globe className="h-4 w-4" />,
    name: 'Additional simple content update',
    unit: 'Per update',
    price: 'AUD $45',
    used: 'Beyond plan allowance',
    notes: 'Text / image / CMS change',
  },
  {
    icon: <Wrench className="h-4 w-4" />,
    name: 'Complex content update',
    unit: 'Per update',
    price: 'AUD $90',
    used: 'Beyond plan allowance',
    notes: 'Layout or complex CMS work',
  },
  {
    icon: <Code2 className="h-4 w-4" />,
    name: 'Standard development',
    unit: 'Per hour',
    price: 'AUD $150',
    used: 'Beyond included hours',
    notes: 'Feature / maintenance development',
  },
  {
    icon: <Zap className="h-4 w-4" />,
    name: 'Senior / complex development',
    unit: 'Per hour',
    price: 'AUD $200',
    used: 'Advanced engineering',
    notes: 'Complex feature / integration',
  },
  {
    icon: <Clock3 className="h-4 w-4" />,
    name: 'Emergency / after-hours support',
    unit: 'Per hour',
    price: 'AUD $275',
    used: 'Urgent incidents',
    notes: 'Outside normal support',
  },
  {
    icon: <Layers3 className="h-4 w-4" />,
    name: 'Additional property',
    unit: 'Per site / month',
    price: 'AUD $125',
    used: 'Beyond plan allowance',
    notes: 'Monitoring + maintenance',
  },
  {
    icon: <Gauge className="h-4 w-4" />,
    name: 'Performance optimization',
    unit: 'Per task',
    price: 'AUD $120',
    used: 'Beyond included optimization',
    notes: 'CWV / cache / image',
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    name: 'Security review',
    unit: 'Per review',
    price: 'AUD $450',
    used: 'Formal review',
    notes: 'Security posture assessment',
  },
  {
    icon: <Code2 className="h-4 w-4" />,
    name: 'Integration development',
    unit: 'Per hour',
    price: 'AUD $200',
    used: 'Third-party integration',
    notes: 'API / platform integration',
  },
  {
    icon: <RefreshCw className="h-4 w-4" />,
    name: 'Migration',
    unit: 'Per project',
    price: 'From AUD $600',
    used: 'Site / platform migration',
    notes: 'Final quote by scope',
  },
  {
    icon: <Database className="h-4 w-4" />,
    name: 'Restore drill',
    unit: 'Per test',
    price: 'AUD $100',
    used: 'Additional recovery test',
    notes: 'Backup recovery validation',
  },
  {
    icon: <SearchCheck className="h-4 w-4" />,
    name: 'Architecture review',
    unit: 'Per review',
    price: 'AUD $650',
    used: 'Advanced architecture',
    notes: 'Technical architecture assessment',
  },
  {
    icon: <RefreshCw className="h-4 w-4" />,
    name: 'Full redesign',
    unit: 'Per project',
    price: 'Quoted',
    used: 'Redesign',
    notes: 'Scope-based proposal',
  },
];

/* =========================================================
   ENTERPRISE ESTATE
========================================================= */

const enterpriseEstate = [
  {
    estate: '3–5 properties',
    price: 'AUD $1,999–$2,499',
    use: 'Growing business estate',
    notes: 'Dedicated operational allocation',
  },
  {
    estate: '6–10 properties',
    price: 'AUD $2,500–$3,999',
    use: 'Multi-brand / multi-site',
    notes: 'Higher monitoring/support load',
  },
  {
    estate: '11–25 properties',
    price: 'AUD $4,000–$6,999',
    use: 'Large digital estate',
    notes: 'Dedicated engineering allocation',
  },
  {
    estate: '25+ properties',
    price: 'From AUD $7,000',
    use: 'Enterprise estate',
    notes: 'Custom SLA and engineering pod',
  },
];

/* =========================================================
   COMMERCIAL RULES
========================================================= */

const commercialRules = [
  {
    rule: 'Currency',
    policy:
      'All client-facing prices are in Australian Dollars (AUD).',
  },
  {
    rule: 'GST',
    policy:
      'Add Australian GST where applicable and clearly state whether website prices are GST-inclusive or exclusive.',
  },
  {
    rule: 'Ad / third-party costs',
    policy:
      'Hosting, premium plugins, paid monitoring, CDN, licences, external penetration testing and vendor charges are excluded unless specifically included.',
  },
  {
    rule: 'Development',
    policy:
      'Included development hours are limited to the stated allowance; additional work uses the applicable add-on rates.',
  },
  {
    rule: 'Emergency work',
    policy:
      'Emergency and after-hours work is separately charged for Basic and Growth.',
  },
  {
    rule: 'Enterprise',
    policy:
      'Enterprise pricing starts at AUD $1,999/month and scales with properties, environments, SLA and engineering coverage.',
  },
  {
    rule: 'Notice',
    policy:
      '30-day notice applies to recurring retainers.',
  },
  {
    rule: 'Pricing positioning',
    policy:
      "Growth is the recommended 'Most Popular' plan.",
  },
];

/* =========================================================
   MONITORING DATA
========================================================= */

const monitorRows: MonitorRow[] = [
  {
    domain: 'kesariretail.in',
    meta: 'LCP 1.2s · TTFB 180ms',
    status: 'healthy',
    spark: [40, 65, 50, 80, 62, 95, 70],
  },
  {
    domain: 'shop.kesariretail.in',
    meta: 'checkout OK · 214 orders today',
    status: 'healthy',
    spark: [55, 70, 45, 88, 72, 60, 84],
  },
  {
    domain: 'deccandiagnostics.com',
    meta: 'plugin update queued · window 02:00',
    status: 'patching',
    spark: [60, 48, 78, 52, 90, 66, 74],
  },
  {
    domain: 'ferrolite.co.in',
    meta: 'SSL renews in 46 days',
    status: 'healthy',
    spark: [70, 82, 58, 76, 64, 88, 80],
  },
  {
    domain: 'sahyadri.edu.in',
    meta: 'backup verified · restore tested 21 Jul',
    status: 'healthy',
    spark: [44, 68, 86, 56, 78, 62, 92],
  },
];

/* =========================================================
   PLAN SUMMARY
========================================================= */

const planSummary = [
  {
    plan: 'Basic',
    price: 'AUD $249',
    bestFor: 'Brochure / small business websites',
    development: '—',
    support: 'Email / next business day',
    properties: '1',
  },
  {
    plan: 'Growth',
    price: 'AUD $599',
    bestFor: 'E-commerce / lead-generation / revenue sites',
    development: '4 hours/month',
    support: 'Named engineer / 30-min target',
    properties: 'Up to 3',
  },
  {
    plan: 'Enterprise',
    price: 'From AUD $1,999',
    bestFor: 'Multi-site / regulated / on-call estates',
    development: 'Custom',
    support: '24/7 on-call / 15-min target',
    properties: 'Multiple',
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function WebsiteManagementPage() {
  const [selectedTier, setSelectedTier] = useState('growth');
  const [rows, setRows] = useState<MonitorRow[]>(monitorRows);
  const [lastCheck, setLastCheck] = useState(42);

  /* Live monitoring simulation */
  useEffect(() => {
    const sparkId = setInterval(() => {
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          spark: [
            ...row.spark.slice(1),
            40 + Math.floor(Math.random() * 56),
          ],
        })),
      );

      setLastCheck(0);
    }, 2000);

    const clockId = setInterval(() => {
      setLastCheck((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(sparkId);
      clearInterval(clockId);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-overlay/[0.08]">
        <HeroGlow />

        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.2, 0.7, 0.3, 1],
            }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-line bg-overlay/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-widest text-muted">
              <Server className="h-3.5 w-3.5 text-fg" />
              S-01 · WEBSITE MANAGEMENT · AUSTRALIA
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-6xl">
              Your site, watched and maintained{' '}
              <span className="text-gradient-white">
                every day.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              NexForTech takes over the running of your live website:
              the CMS, the stack underneath it, the store and everything
              that breaks at 2am. You get a named engineer, operational
              visibility and predictable Australian pricing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/contact">
                Get Your Status Board
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>

              <NeonButton href="#pricing" variant="outline">
                View Australian Pricing
              </NeonButton>
            </div>

            {/* Pricing micro badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'AUD pricing',
                '30-day notice',
                'Growth from $599/month',
                'Enterprise from $1,999/month',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line bg-soft px-3 py-1.5 font-mono text-[10px] tracking-wide text-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SERVICE BREAKDOWN
      ===================================================== */}

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{full.breakdown}"
            title="Everything a live site needs to stay live"
            description="One retainer covers the operational surface — from patching and backups to monitoring, support, performance and development."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <GlassCard
                key={f.title}
                delay={i * 0.05}
                className="group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 dark:hover:border-white/[0.15]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-soft text-muted transition-colors duration-300 group-hover:border-accent/20 group-hover:text-fg">
                  {f.icon}
                </span>

                <h3 className="mt-4 text-base font-bold tracking-tight text-fg">
                  {f.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.text}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MONITORING DASHBOARD
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                badge="flag{ops.transparency}"
                title="You shouldn't have to ask whether your site is up."
                description="Every managed account gets a status board like this one. Checks run every 60 seconds from three regions. When something drifts, a ticket opens before you notice."
                className="mb-8"
              />

              <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-dim">
                <span>
                  Checks per site, daily ·{' '}
                  <b className="font-medium text-fg">1,440</b>
                </span>

                <span>
                  Mean time to restore ·{' '}
                  <b className="font-medium text-fg">11 min</b>
                </span>
              </div>
            </div>

            <GlassCard hover={false} className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-overlay/[0.08] bg-shade/30 px-5 py-3.5">
                <span className="flex items-center gap-2 font-mono text-xs text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
                  Client estate · 7 properties
                </span>

                <span className="font-mono text-[10px] text-dim">
                  last check {lastCheck}s ago
                </span>
              </div>

              {rows.map((row) => (
                <div
                  key={row.domain}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-overlay/[0.04] px-5 py-4 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm text-fg">
                      {row.domain}
                    </p>

                    <p className="truncate font-mono text-[11px] text-dim">
                      {row.meta}
                    </p>
                  </div>

                  <div
                    className="flex h-5 items-end gap-0.5"
                    aria-hidden="true"
                  >
                    {row.spark.map((h, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-sm bg-dim transition-all duration-500"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  <span
                    className={cn(
                      'rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-widest',
                      row.status === 'healthy'
                        ? 'border-line-strong bg-overlay/[0.06] text-fg'
                        : 'border-line bg-shade/30 text-muted',
                    )}
                  >
                    {row.status === 'healthy'
                      ? 'Healthy'
                      : 'Patching'}
                  </span>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING
      ===================================================== */}

      <section
        className="border-t border-overlay/[0.08] py-20 md:py-28"
        id="pricing"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{australia.pricing}"
            title="Website Management — Australia"
            description="Client-facing Australian Dollar pricing for the complete NexForTech Website Management service. Growth is our recommended plan."
            align="center"
          />

          {/* Pricing cards */}
          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.map((tier, i) => {
              const active = selectedTier === tier.id;

              return (
                <motion.div
                  key={tier.id}
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
                    margin: '-40px',
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.2, 0.7, 0.3, 1],
                  }}
                  onClick={() => setSelectedTier(tier.id)}
                  className={cn(
                    'relative flex cursor-pointer flex-col rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 md:p-8',
                    active
                      ? 'border-accent bg-surface/90 shadow-glow-white lg:-translate-y-2'
                      : 'border-line bg-surface/70 hover:border-line-strong dark:hover:border-white/[0.15]',
                  )}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest text-inverse">
                      MOST POPULAR
                    </span>
                  )}

                  <h3 className="text-lg font-bold tracking-tight text-fg">
                    {tier.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {tier.description}
                  </p>

                  <p className="mt-5">
                    <span className="text-4xl font-extrabold tracking-tight text-fg">
                      {tier.price}
                    </span>

                    <span className="ml-1 font-mono text-xs text-dim">
                      {tier.period}
                    </span>
                  </p>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-none text-fg" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <NeonButton
                      href="/contact"
                      variant={active ? 'solid' : 'outline'}
                      className="w-full"
                    >
                      {tier.cta}
                    </NeonButton>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-8 text-center font-mono text-xs text-dim">
            <Lock className="mr-1.5 inline h-3.5 w-3.5" />
            All plans include the two-week takeover audit — you get the
            findings whether or not you sign.
          </p>
        </div>
      </section>

      {/* =====================================================
          DETAILED PLAN COMPARISON
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{plan.comparison}"
            title="Compare every operational detail."
            description="A transparent breakdown of what is included across Basic, Growth and Enterprise."
          />

          <div className="overflow-hidden rounded-2xl border border-line bg-surface/80 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr className="border-b border-line bg-soft">
                    <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-widest text-dim">
                      Deliverable
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-widest text-dim">
                      Basic
                    </th>

                    <th className="bg-accent/[0.035] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-widest text-fg">
                      Growth · Most Popular
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-widest text-dim">
                      Enterprise
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[10px] uppercase tracking-widest text-dim">
                      Frequency / Limit
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-overlay/[0.05] transition-colors hover:bg-overlay/[0.025]"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-fg">
                        {row.label}
                      </td>

                      <td className="px-5 py-4 text-sm text-muted">
                        {row.basic}
                      </td>

                      <td className="bg-accent/[0.018] px-5 py-4 text-sm font-medium text-fg">
                        {row.growth}
                      </td>

                      <td className="px-5 py-4 text-sm text-muted">
                        {row.enterprise}
                      </td>

                      <td className="px-5 py-4 font-mono text-[10px] text-dim">
                        {row.frequency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PLAN SUMMARY
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{quick.summary}"
            title="Choose the right operating model."
            description="A quick client-facing summary of the three Australian website management tiers."
            align="center"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {planSummary.map((plan, i) => (
              <motion.div
                key={plan.plan}
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
                  duration: 0.45,
                  delay: i * 0.08,
                }}
                className={cn(
                  'rounded-2xl border bg-surface/80 p-6 backdrop-blur-xl',
                  plan.plan === 'Growth'
                    ? 'border-accent/40 dark:border-white/[0.15]'
                    : 'border-line',
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-dim">
                    {plan.plan}
                  </h3>

                  {plan.plan === 'Growth' && (
                    <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest text-inverse">
                      POPULAR
                    </span>
                  )}
                </div>

                <p className="mt-4 text-2xl font-extrabold text-fg">
                  {plan.price}
                </p>

                <p className="mt-3 min-h-[48px] text-sm leading-relaxed text-muted">
                  {plan.bestFor}
                </p>

                <div className="mt-6 space-y-3 border-t border-line pt-5">
                  <div className="flex justify-between gap-4">
                    <span className="text-xs text-dim">
                      Development
                    </span>

                    <span className="text-right text-xs font-medium text-fg">
                      {plan.development}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-xs text-dim">
                      Support
                    </span>

                    <span className="text-right text-xs font-medium text-fg">
                      {plan.support}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-xs text-dim">
                      Properties
                    </span>

                    <span className="text-right text-xs font-medium text-fg">
                      {plan.properties}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ADD-ON PRICING
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{add.ons}"
            title="Additional work, clearly priced."
            description="Need something outside your plan allowance? Use the published Australian add-on rates or request a scoped quote."
          />

          <div className="overflow-hidden rounded-2xl border border-line bg-surface/80 backdrop-blur-xl">
            <div className="grid border-b border-line bg-soft px-5 py-4 md:grid-cols-[2fr_1fr_1fr_1.4fr_1.8fr] md:gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                Add-on
              </span>

              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-dim md:block">
                Unit
              </span>

              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-dim md:block">
                Client Price
              </span>

              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-dim md:block">
                When Used
              </span>

              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-dim md:block">
                Notes
              </span>
            </div>

            {addons.map((addon) => (
              <div
                key={addon.name}
                className="
                  grid
                  gap-3
                  border-b
                  border-overlay/[0.05]
                  px-5
                  py-4
                  transition-colors
                  hover:bg-overlay/[0.025]
                  md:grid-cols-[2fr_1fr_1fr_1.4fr_1.8fr]
                  md:items-center
                  md:gap-4
                "
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-line bg-soft text-muted">
                    {addon.icon}
                  </span>

                  <span className="text-sm font-medium text-fg">
                    {addon.name}
                  </span>
                </div>

                <span className="font-mono text-[10px] text-dim">
                  {addon.unit}
                </span>

                <span className="font-semibold text-fg">
                  {addon.price}
                </span>

                <span className="text-xs text-muted">
                  {addon.used}
                </span>

                <span className="text-xs text-dim">
                  {addon.notes}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ENTERPRISE ESTATE
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{enterprise.estate}"
            title="Enterprise estate pricing."
            description="For organisations managing multiple brands, properties or environments, pricing scales with estate size and operational coverage."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {enterpriseEstate.map((item, i) => (
              <motion.div
                key={item.estate}
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
                  duration: 0.45,
                  delay: i * 0.07,
                }}
                className="
                  group
                  rounded-2xl
                  border
                  border-line
                  bg-surface/80
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-accent/25
                  dark:hover:border-white/[0.15]
                "
              >
                <Building2 className="h-5 w-5 text-muted transition-colors group-hover:text-fg" />

                <p className="mt-5 font-mono text-xs uppercase tracking-widest text-dim">
                  {item.estate}
                </p>

                <p className="mt-3 text-xl font-extrabold tracking-tight text-fg">
                  {item.price}
                </p>

                <p className="mt-3 text-sm text-muted">
                  {item.use}
                </p>

                <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-dim">
                  {item.notes}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMERCIAL RULES
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <SectionHeader
            badge="flag{commercial.rules}"
            title="Commercial terms."
            description="Important pricing and engagement rules for Australian clients."
          />

          <div className="overflow-hidden rounded-2xl border border-line bg-surface/80 backdrop-blur-xl">
            {commercialRules.map((item, index) => (
              <div
                key={item.rule}
                className={cn(
                  'grid gap-2 px-5 py-5 md:grid-cols-[220px_1fr] md:gap-8',
                  index !== commercialRules.length - 1 &&
                    'border-b border-overlay/[0.05]',
                )}
              >
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-muted" />

                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-fg">
                    {item.rule}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted">
                  {item.policy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-live" />
            Ready when you are
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
            Stop managing the website.
            <br />
            <span className="text-gradient-white">
              Start managing the business.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Choose Basic, Growth or Enterprise — or tell us about your
            estate and we'll recommend the right operational model.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <NeonButton href="/contact">
              Talk to NexForTech
              <ArrowUpRight className="h-4 w-4" />
            </NeonButton>

            <NeonButton href="#pricing" variant="outline">
              Compare Plans
            </NeonButton>
          </div>
        </div>
      </section>
    </>
  );
}