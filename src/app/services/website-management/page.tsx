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
} from 'lucide-react';
import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';
import type { MonitorRow, PricingTier } from '@/types';

const features = [
  { icon: <RefreshCw className="h-5 w-5" />, title: 'Ongoing Maintenance', text: 'Core, plugin and dependency patching on a tested schedule — never on a live Friday deploy.' },
  { icon: <Globe className="h-5 w-5" />, title: 'Content Updates', text: 'Same-day content changes on request. Send an email; watch it go live.' },
  { icon: <ShoppingCart className="h-5 w-5" />, title: 'E-commerce Ops', text: 'Catalogue, checkout and payments kept healthy. 214 orders a day should not be scary.' },
  { icon: <Gauge className="h-5 w-5" />, title: 'Performance Optimization', text: 'Core Web Vitals, caching, image budgets. LCP under 1.5s is the target, not the dream.' },
  { icon: <Activity className="h-5 w-5" />, title: '24/7 Monitoring & Health Checks', text: 'Checks every 60 seconds from three regions. A ticket opens before you notice.' },
  { icon: <LifeBuoy className="h-5 w-5" />, title: 'Technical Support', text: 'A direct line to the named engineer on your account. Median first response: 18 minutes.' },
  { icon: <Wrench className="h-5 w-5" />, title: 'Troubleshooting', text: 'Everything that breaks at 2am, fixed by people who have seen it break before.' },
  { icon: <Zap className="h-5 w-5" />, title: 'Features, Redesigns & Integrations', text: 'New features, full redesigns and 3rd-party integrations shipped against a written scope.' },
];

const tiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$170',
    period: '/month',
    description: 'For brochure sites that need to stay patched, backed up and online.',
    features: [
      '1 website, up to 10 pages',
      'Weekly core & plugin patching',
      'Uptime + SSL monitoring',
      'Monthly backups, tested restores',
      '4 content updates / month',
      'Email support, next business day',
    ],
    cta: 'Start with Basic',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$450',
    period: '/month',
    description: 'For stores and lead engines where downtime is lost revenue.',
    features: [
      'Up to 3 properties incl. e-commerce',
      'Daily patching window + staging site',
      '24/7 uptime, SSL & malware monitoring',
      'Daily backups, quarterly restore drills',
      'Unlimited content updates',
      'Core Web Vitals optimization',
      'Named engineer · 30-min response SLA',
      '8 dev hours / month for new features',
    ],
    popular: true,
    cta: 'Choose Growth',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For estates, regulated industries and anything with an on-call rota.',
    features: [
      'Unlimited properties & environments',
      '24/7 on-call with 15-min response SLA',
      'Dedicated engineering pod',
      'Security posture reviews & pen-test liaison',
      'Custom integrations & migrations',
      'Quarterly roadmap & architecture reviews',
      'White-label status board for your clients',
    ],
    cta: 'Talk to Us',
  },
];

const monitorRows: MonitorRow[] = [
  { domain: 'kesariretail.in', meta: 'LCP 1.2s · TTFB 180ms', status: 'healthy', spark: [40, 65, 50, 80, 62, 95, 70] },
  { domain: 'shop.kesariretail.in', meta: 'checkout OK · 214 orders today', status: 'healthy', spark: [55, 70, 45, 88, 72, 60, 84] },
  { domain: 'deccandiagnostics.com', meta: 'plugin update queued · window 02:00', status: 'patching', spark: [60, 48, 78, 52, 90, 66, 74] },
  { domain: 'ferrolite.co.in', meta: 'SSL renews in 46 days', status: 'healthy', spark: [70, 82, 58, 76, 64, 88, 80] },
  { domain: 'sahyadri.edu.in', meta: 'backup verified · restore tested 21 Jul', status: 'healthy', spark: [44, 68, 86, 56, 78, 62, 92] },
];

export default function WebsiteManagementPage() {
  const [selectedTier, setSelectedTier] = useState('growth');
  const [rows, setRows] = useState<MonitorRow[]>(monitorRows);
  const [lastCheck, setLastCheck] = useState(42);

  // Live monitoring board: sparklines shift and the check clock ticks
  useEffect(() => {
    const sparkId = setInterval(() => {
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          spark: [...row.spark.slice(1), 40 + Math.floor(Math.random() * 56)],
        }))
      );
      setLastCheck(0);
    }, 2000);
    const clockId = setInterval(() => setLastCheck((s) => s + 1), 1000);
    return () => {
      clearInterval(sparkId);
      clearInterval(clockId);
    };
  }, []);

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
              <Server className="h-3.5 w-3.5 text-fg" />
              S-01 · WEBSITE MANAGEMENT
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-5xl">
              Your site, watched and maintained <span className="text-gradient-white">every day.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              We take over the running of a live website: the CMS, the stack under it, the store, and
              everything that breaks at 2am. You get a named engineer, a monthly report, and no
              surprises on the invoice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/contact">
                Get Your Status Board
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>
              <NeonButton href="#pricing" variant="outline">
                View Pricing
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full service breakdown */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{full.breakdown}"
            title="Everything a live site needs to stay live"
            description="One retainer covers the whole operational surface — from patching to redesigns."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.05} className="p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-soft text-muted">
                  {f.icon}
                </span>
                <h3 className="mt-4 text-base font-bold tracking-tight text-fg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring dashboard mockup */}
      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                badge="flag{ops.transparency}"
                title="You shouldn't have to ask whether your site is up."
                description="Every managed account gets a status board like this one. Checks run every 60 seconds from three regions. When something drifts, a ticket opens before you notice — and you can see what we did about it."
                className="mb-8"
              />
              <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-dim">
                <span>Checks per site, daily · <b className="font-medium text-fg">1,440</b></span>
                <span>Mean time to restore · <b className="font-medium text-fg">11 min</b></span>
              </div>
            </div>

            <GlassCard hover={false} className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-overlay/[0.08] bg-shade/30 px-5 py-3.5">
                <span className="flex items-center gap-2 font-mono text-xs text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
                  Client estate · 7 properties
                </span>
                <span className="font-mono text-[10px] text-dim">last check {lastCheck}s ago</span>
              </div>
              {rows.map((row) => (
                <div
                  key={row.domain}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-overlay/[0.04] px-5 py-4 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm text-fg">{row.domain}</p>
                    <p className="truncate font-mono text-[11px] text-dim">{row.meta}</p>
                  </div>
                  <div className="flex h-5 items-end gap-0.5" aria-hidden="true">
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
                    {row.status === 'healthy' ? 'Healthy' : 'Patching'}
                  </span>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-overlay/[0.08] py-20 md:py-28" id="pricing">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{pricing}"
            title="Three tiers. Monthly. No lock-in."
            description="Thirty days' notice on every retainer. Click a plan to compare — the one most clients pick is highlighted."
            align="center"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.map((tier, i) => {
              const active = selectedTier === tier.id;
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.3, 1] }}
                  onClick={() => setSelectedTier(tier.id)}
                  className={cn(
                    'relative flex cursor-pointer flex-col rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 md:p-8',
                    active
                      ? 'border-accent bg-surface/90 shadow-glow-white lg:-translate-y-2'
                      : 'border-line bg-surface/70 hover:border-line-strong',
                  )}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest text-inverse">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="text-lg font-bold tracking-tight text-fg">{tier.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tier.description}</p>
                  <p className="mt-5">
                    <span className="text-4xl font-extrabold tracking-tight text-fg">{tier.price}</span>
                    <span className="ml-1 font-mono text-xs text-dim">{tier.period}</span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-fg" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <NeonButton href="/contact" variant={active ? 'solid' : 'outline'} className="w-full">
                      {tier.cta}
                    </NeonButton>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="mt-8 text-center font-mono text-xs text-dim">
            <Lock className="mr-1.5 inline h-3.5 w-3.5" />
            All plans include the two-week takeover audit — you get the findings whether or not you sign.
          </p>
        </div>
      </section>
    </>
  );
}
