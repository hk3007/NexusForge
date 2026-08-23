'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Camera,
  Check,
  LineChart,
  Megaphone,
  PenTool,
  Search,
  Send,
  TrendingUp,
  Sparkles,
  Plus,
} from 'lucide-react';

import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';

/* =========================================================
   HELPERS
========================================================= */

const formatAUD = (value: number) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);

/* =========================================================
   CONTENT PIPELINE
========================================================= */

const pipeline = [
  {
    step: '01',
    icon: <PenTool className="h-5 w-5" />,
    title: 'Plan & Approve',
    text: 'A monthly content calendar built around your launches, audience and business goals. You approve once.',
    output: 'content calendar',
  },
  {
    step: '02',
    icon: <Camera className="h-5 w-5" />,
    title: 'Create & Publish',
    text: 'Posts, reels and copy are created, captioned and scheduled across your selected channels.',
    output: 'published assets',
  },
  {
    step: '03',
    icon: <Search className="h-5 w-5" />,
    title: 'Optimize & Rank',
    text: 'Technical SEO, on-page SEO, content clusters, schema and Core Web Vitals aligned to search intent.',
    output: 'organic growth',
  },
  {
    step: '04',
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Measure & Prove',
    text: 'GA4, Tag Manager and conversion tracking connect marketing activity to leads, customers and revenue.',
    output: 'growth dashboard',
  },
];

/* =========================================================
   CAPABILITIES
========================================================= */

const capabilities = [
  {
    icon: <Megaphone className="h-4 w-4" />,
    label: 'Meta & Google Ads with creative testing',
  },
  {
    icon: <Search className="h-4 w-4" />,
    label: 'Technical SEO audits & content clusters',
  },
  {
    icon: <LineChart className="h-4 w-4" />,
    label: 'GA4 + conversion tracking',
  },
  {
    icon: <Send className="h-4 w-4" />,
    label: 'Community & inbox management',
  },
];

/* =========================================================
   CLIENT-FACING PRICING
========================================================= */

const pricingPlans = [
  {
    name: 'Launch',
    code: 'P-01',
    price: 350,
    description:
      'A strong starting point for businesses building a consistent social presence.',
    popular: false,
    features: [
      '8 static/social posts',
      '2 reels',
      '4 stories',
      'Caption & CTA creation',
      'Hashtag / keyword research',
      'Content calendar',
      'Monthly content strategy',
      'Community monitoring',
      'Meta Ads management',
      'Technical SEO monitoring',
      '2 on-page SEO optimisations',
      'GA4 management / reporting',
      'Monthly performance report',
      'Monthly review call',
      'Growth dashboard',
    ],
  },
  {
    name: 'Growth',
    code: 'P-02',
    price: 500,
    description:
      'Designed for businesses ready to combine content, paid media, SEO and analytics.',
    popular: true,
    features: [
      '12 static/social posts',
      '4 reels',
      '8 stories',
      'Caption & CTA creation',
      'Hashtag / keyword research',
      'Content calendar',
      'Monthly content strategy',
      'Community monitoring',
      'Meta Ads management',
      'Google Ads management',
      'Creative testing',
      'Campaign setup & optimisation',
      'Technical SEO monitoring',
      '4 on-page SEO optimisations',
      'Content cluster planning',
      'Schema optimisation',
      'Core Web Vitals monitoring',
      'GA4 management / reporting',
      'Google Tag Manager',
      'Conversion tracking',
      'Growth dashboard',
      '4 weekly performance reports',
      'Monthly performance report',
      'Monthly review call',
    ],
  },
  {
    name: 'Scale',
    code: 'P-03',
    price: 750,
    description:
      'For established brands that need higher content volume and deeper growth optimisation.',
    popular: false,
    features: [
      '16 static/social posts',
      '6 reels',
      '12 stories',
      'Caption & CTA creation',
      'Hashtag / keyword research',
      'Content calendar',
      'Monthly content strategy',
      'Community monitoring',
      'Meta Ads management',
      'Google Ads management',
      'Creative testing',
      '2 campaign setups / optimisations',
      'Competitor analysis',
      'Technical SEO monitoring',
      '6 on-page SEO optimisations',
      'Content cluster planning',
      'Schema optimisation',
      'Core Web Vitals monitoring',
      'GA4 management / reporting',
      'Google Tag Manager',
      'Conversion tracking',
      'Server-side event tracking',
      'Revenue attribution',
      'Growth dashboard',
      '4 weekly performance reports',
      'Monthly performance report',
      'Monthly review call',
      'Quarterly growth review',
    ],
  },
  {
    name: 'Performance',
    code: 'P-04',
    price: 1000,
    description:
      'A comprehensive growth system for businesses focused heavily on measurable acquisition.',
    popular: false,
    features: [
      '20 static/social posts',
      '8 reels',
      '16 stories',
      'Caption & CTA creation',
      'Hashtag / keyword research',
      'Content calendar',
      'Monthly content strategy',
      'Community monitoring',
      'Meta Ads management',
      'Google Ads management',
      'Creative testing',
      '3 campaign setups / optimisations',
      'Competitor analysis',
      'Technical SEO monitoring',
      '8 on-page SEO optimisations',
      'Content cluster planning',
      'Schema optimisation',
      'Core Web Vitals monitoring',
      'GA4 management / reporting',
      'Google Tag Manager',
      'Conversion tracking',
      'Server-side event tracking',
      'Revenue attribution',
      'Growth dashboard',
      '4 weekly performance reports',
      'Monthly performance report',
      'Monthly review call',
      'Quarterly growth review',
    ],
  },
];

/* =========================================================
   CLIENT ADD-ONS
========================================================= */

const addOns = [
  {
    name: 'Additional Social Post',
    unit: 'per post',
    price: 35,
    description: 'Design + caption + publishing',
  },
  {
    name: 'Additional Reel',
    unit: 'per reel',
    price: 150,
    description: 'Standard short-form video',
  },
  {
    name: 'Premium Reel',
    unit: 'per reel',
    price: 300,
    description: 'Higher-production short-form video',
  },
  {
    name: 'Additional Story',
    unit: 'per story',
    price: 20,
    description: 'Creative + publishing',
  },
  {
    name: 'Additional Platform',
    unit: 'per month',
    price: 250,
    description: 'Additional social platform management',
  },
  {
    name: 'Additional Campaign',
    unit: 'per campaign',
    price: 300,
    description: 'Campaign setup + optimisation',
  },
  {
    name: 'Additional SEO Page',
    unit: 'per page',
    price: 150,
    description: 'On-page SEO optimisation',
  },
  {
    name: 'Blog / Article',
    unit: 'per article',
    price: 250,
    description: 'SEO-focused article',
  },
  {
    name: 'Landing Page',
    unit: 'per page',
    price: 900,
    description: 'Standard conversion-focused landing page',
  },
  {
    name: 'GA4 Setup',
    unit: 'one-time',
    price: 350,
    description: 'Initial analytics setup',
  },
  {
    name: 'GTM Setup',
    unit: 'one-time',
    price: 350,
    description: 'Google Tag Manager setup',
  },
  {
    name: 'Server-Side Tracking Setup',
    unit: 'one-time',
    price: 900,
    description: 'Subject to platform support',
  },
  {
    name: 'Conversion Tracking Setup',
    unit: 'one-time',
    price: 450,
    description: 'Events and conversion configuration',
  },
];

/* =========================================================
   ROI MODEL
========================================================= */

const CPC = 0.65;
const CVR = 0.032;
const CLOSE = 0.22;
const AOV = 450;

/* =========================================================
   MAIN PAGE
========================================================= */

export default function SocialMediaGrowthPage() {
  const [spend, setSpend] = useState(1500);

  const projection = useMemo(() => {
    const clicks = Math.round(spend / CPC);
    const leads = Math.round(clicks * CVR);
    const customers = Math.round(leads * CLOSE);
    const revenue = customers * AOV;

    const roi =
      spend > 0
        ? ((revenue - spend) / spend) * 100
        : 0;

    return {
      clicks,
      leads,
      customers,
      revenue,
      roi,
    };
  }, [spend]);

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
              <TrendingUp className="h-3.5 w-3.5 text-fg" />
              S-02 · SOCIAL MEDIA & GROWTH ENGINE
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-6xl">
              Turn attention into{' '}
              <span className="text-gradient-white">
                measurable growth.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Content, social media, SEO, paid advertising and analytics
              working together as one growth engine. We publish, measure,
              optimise and continuously improve.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/contact">
                Ask for a Channel Audit
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>

              <NeonButton href="#pricing" variant="outline">
                View Pricing
              </NeonButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-overlay/[0.08] pt-6 font-mono text-xs text-dim">
              <span>
                Reporting cadence ·{' '}
                <b className="font-medium text-fg">
                  weekly numbers, monthly review
                </b>
              </span>

              <span>
                Pricing ·{' '}
                <b className="font-medium text-fg">
                  AUD
                </b>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTENT PIPELINE
      ===================================================== */}

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{content.pipeline}"
            title="Plan. Create. Optimize. Prove."
            description="Four stages, every month, in this order. Each one produces something you can inspect."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((p, i) => (
              <GlassCard
                key={p.step}
                delay={i * 0.07}
                className="p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-soft text-muted">
                    {p.icon}
                  </span>

                  <span className="font-mono text-[11px] tracking-widest text-dim">
                    STAGE {p.step}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold tracking-tight text-fg">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.text}
                </p>

                <p className="mt-4 border-t border-overlay/[0.06] pt-3 font-mono text-[11px] text-dim">
                  Produces ·{' '}
                  <b className="font-medium text-fg">
                    {p.output}
                  </b>
                </p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-soft px-4 py-3.5 text-sm text-muted transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:text-fg"
              >
                <span className="text-fg">
                  {c.icon}
                </span>

                {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING
      ===================================================== */}

      <section
        id="pricing"
        className="relative border-t border-overlay/[0.08] py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{growth.pricing}"
            title="Simple pricing. Complete growth."
            description="Choose the package that matches your current growth stage. All prices are in AUD."
            align="center"
          />

          <div className="grid gap-5 lg:grid-cols-4">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.code}
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
                  delay: index * 0.08,
                  ease: [0.2, 0.7, 0.3, 1],
                }}
                className="group relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-accent/50 bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-inverse shadow-glow-soft">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`
                    relative flex h-full flex-col overflow-hidden rounded-2xl
                    border bg-surface/80 p-6 backdrop-blur-xl
                    transition-all duration-300
                    ${
                      plan.popular
                        ? 'border-accent/60 shadow-glow-soft'
                        : 'border-line'
                    }
                    hover:-translate-y-1
                    hover:border-accent/60
                    hover:bg-surface
                    hover:shadow-glow-soft
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-dim">
                      {plan.code}
                    </span>

                    {plan.popular && (
                      <span className="h-2 w-2 rounded-full bg-live animate-pulse-dot" />
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-fg">
                    {plan.name}
                  </h3>

                  <p className="mt-2 min-h-[72px] text-sm leading-relaxed text-muted">
                    {plan.description}
                  </p>

                  <div className="mt-5 border-y border-overlay/[0.08] py-5">
                    <p className="text-3xl font-extrabold tracking-tight text-fg">
                      {formatAUD(plan.price)}
                    </p>

                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim">
                      per month
                    </p>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[12px] leading-relaxed text-muted"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-fg" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <NeonButton
                      href="/contact"
                      variant={
                        plan.popular
                          ? 'solid'
                          : 'outline'
                      }
                      className="w-full justify-center"
                    >
                      Choose {plan.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </NeonButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center font-mono text-[11px] leading-relaxed text-dim">
            Advertising spend, third-party platform charges and external
            software licences are separate unless specifically included in
            your proposal.
          </p>
        </div>
      </section>

      {/* =====================================================
          PACKAGE SUMMARY
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface/80 backdrop-blur-xl">
            <div className="border-b border-overlay/[0.08] bg-soft px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
                    PLAN SUMMARY
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-fg">
                    Growth packages at a glance
                  </h3>
                </div>

                <span className="hidden rounded-full border border-line px-3 py-1 font-mono text-[10px] text-muted sm:inline-flex">
                  AUD / MONTH
                </span>
              </div>
            </div>

            <div className="divide-y divide-overlay/[0.06]">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.code}
                  className="grid gap-3 px-6 py-5 transition-colors hover:bg-overlay/[0.025] sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-dim">
                        {plan.code}
                      </span>

                      <h4 className="font-semibold text-fg">
                        {plan.name}
                      </h4>

                      {plan.popular && (
                        <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-inverse">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-muted">
                      {plan.description}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-lg font-bold text-fg">
                      {formatAUD(plan.price)}
                    </p>

                    <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
                      monthly
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ADD-ON PRICING
      ===================================================== */}

      <section
        id="addons"
        className="border-t border-overlay/[0.08] py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{client.add-ons}"
            title="Need more? Add exactly what you need."
            description="Additional services can be added to any package at transparent client-facing rates."
            align="center"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
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
                  margin: '-30px',
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                }}
                className="group"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface hover:shadow-glow-soft">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-line bg-soft text-muted">
                      <Plus className="h-4 w-4" />
                    </span>

                    <span className="font-mono text-[9px] uppercase tracking-widest text-dim">
                      {addon.unit}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-fg">
                    {addon.name}
                  </h3>

                  <p className="mt-2 min-h-[40px] text-sm leading-relaxed text-muted">
                    {addon.description}
                  </p>

                  <div className="mt-5 border-t border-overlay/[0.08] pt-4">
                    <p className="text-2xl font-extrabold tracking-tight text-fg">
                      {formatAUD(addon.price)}
                    </p>

                    <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-dim">
                      client price
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-soft px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
                  IMPORTANT
                </p>

                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Advertising media spend is separate and paid directly by
                  the client. Third-party software or platform fees may also
                  apply where required.
                </p>
              </div>

              <span className="whitespace-nowrap rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-fg">
                AUD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ROI CALCULATOR
      ===================================================== */}

      <section
        className="border-t border-overlay/[0.08] py-20 md:py-28"
        id="roi"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{roi.calculator}"
            title="Growth ROI Calculator"
            description="Adjust your monthly advertising spend and see an illustrative projection based on the assumptions below."
            align="center"
          />

          <GlassCard
            hover={false}
            className="mx-auto max-w-4xl p-7 md:p-10"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-dim">
                  Monthly ad spend
                </p>

                <p className="mt-1 text-4xl font-extrabold tracking-tight text-fg">
                  {formatAUD(spend)}
                </p>
              </div>

              <p className="font-mono text-xs text-dim">
                CPC {formatAUD(CPC)} · CVR{' '}
                {(CVR * 100).toFixed(1)}% · close rate{' '}
                {(CLOSE * 100).toFixed(0)}%
              </p>
            </div>

            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={spend}
              onChange={(e) =>
                setSpend(Number(e.target.value))
              }
              aria-label="Monthly advertising spend"
              className="
                mt-8 h-1.5 w-full cursor-pointer appearance-none
                rounded-full bg-line
                accent-[rgb(var(--c-accent))]
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-accent
                [&::-webkit-slider-thumb]:shadow-glow-white
              "
            />

            <div className="mt-2 flex justify-between font-mono text-[10px] text-dim">
              <span>AUD $500</span>
              <span>AUD $10K</span>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-overlay/[0.08] bg-overlay/[0.08] md:grid-cols-4">
              {[
                {
                  label: 'Projected clicks',
                  value: projection.clicks.toLocaleString('en-AU'),
                },
                {
                  label: 'Projected leads',
                  value: projection.leads.toLocaleString('en-AU'),
                },
                {
                  label: 'New customers',
                  value: projection.customers.toLocaleString('en-AU'),
                },
                {
                  label: 'Projected revenue',
                  value: formatAUD(projection.revenue),
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="bg-base p-6"
                >
                  <p className="text-2xl font-extrabold tracking-tight text-fg">
                    {metric.value}
                  </p>

                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-soft px-6 py-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-dim">
                  Estimated ROI
                </p>

                <p className="mt-1 text-3xl font-extrabold tracking-tight text-fg">
                  {projection.roi > 0 ? '+' : ''}
                  {projection.roi.toFixed(0)}%
                </p>
              </div>

              <NeonButton href="/contact">
                Get a Real Projection
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>
            </div>

            <p className="mt-5 font-mono text-[11px] leading-relaxed text-dim">
              Illustrative only. Actual performance depends on your industry,
              offer, margins, audience, creative quality, landing pages and
              channel performance. Your final projection is prepared from
              your actual business data.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse-dot" />
            Ready to grow?
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
            Stop posting.
            <br />
            Start building a growth engine.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Get a complete review of your social channels, content,
            advertising, SEO and analytics — then receive a growth plan
            built around your business.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NeonButton href="/contact">
              Request a Growth Audit
              <ArrowUpRight className="h-4 w-4" />
            </NeonButton>

            <NeonButton href="#pricing" variant="outline">
              Compare Packages
            </NeonButton>
          </div>
        </div>
      </section>
    </>
  );
}