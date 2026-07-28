'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Camera,
  LineChart,
  Megaphone,
  PenTool,
  Search,
  Send,
  TrendingUp,
} from 'lucide-react';
import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { formatINR } from '@/lib/utils';

const pipeline = [
  {
    step: '01',
    icon: <PenTool className="h-5 w-5" />,
    title: 'Plan & Approve',
    text: 'A monthly content calendar built around your launches and seasonality. You approve once.',
    output: 'content calendar',
  },
  {
    step: '02',
    icon: <Camera className="h-5 w-5" />,
    title: 'Create & Publish',
    text: 'Posts, reels and copy — shot, edited, captioned and scheduled across every channel.',
    output: 'published assets',
  },
  {
    step: '03',
    icon: <Search className="h-5 w-5" />,
    title: 'Optimize & Rank',
    text: 'Technical & on-page SEO, content clusters, schema and Core Web Vitals aligned to search intent.',
    output: 'organic growth',
  },
  {
    step: '04',
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Measure & Prove',
    text: 'GA4, Tag Manager and server-side events tie every rupee of spend to leads and revenue.',
    output: 'one dashboard',
  },
];

const capabilities = [
  { icon: <Megaphone className="h-4 w-4" />, label: 'Meta & Google Ads with creative testing' },
  { icon: <Search className="h-4 w-4" />, label: 'Technical SEO audits & content clusters' },
  { icon: <LineChart className="h-4 w-4" />, label: 'GA4 + server-side event tracking' },
  { icon: <Send className="h-4 w-4" />, label: 'Community & inbox management' },
];

/* ROI model: deliberately simple, deliberately conservative. */
const CPC = 18; // ₹ per click, blended
const CVR = 0.032; // visit → lead
const CLOSE = 0.22; // lead → customer
const AOV = 8400; // ₹ average order value

export default function SocialMediaGrowthPage() {
  const [spend, setSpend] = useState(60000);

  const projection = useMemo(() => {
    const clicks = Math.round(spend / CPC);
    const leads = Math.round(clicks * CVR);
    const customers = Math.round(leads * CLOSE);
    const revenue = customers * AOV;
    const roi = spend > 0 ? ((revenue - spend) / spend) * 100 : 0;
    return { clicks, leads, customers, revenue, roi };
  }, [spend]);

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
              <TrendingUp className="h-3.5 w-3.5 text-fg" />
              S-02 · SOCIAL MEDIA & GROWTH ENGINE
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-5xl">
              Channels that report back <span className="text-gradient-white">in rupees.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Posts, reels and copy on a calendar you approve, wired to analytics that tie spend to
              revenue. We publish, then we prove it worked — or we change it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/contact">
                Ask for a Channel Audit
                <ArrowUpRight className="h-4 w-4" />
              </NeonButton>
              <NeonButton href="#roi" variant="outline">
                Try the ROI Calculator
              </NeonButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-overlay/[0.08] pt-6 font-mono text-xs text-dim">
              <span>Reporting cadence · <b className="font-medium text-fg">weekly numbers, monthly review call</b></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content pipeline */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{content.pipeline}"
            title="Plan. Create. Optimize. Prove."
            description="Four stages, every month, in this order. Each one produces something you can inspect."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((p, i) => (
              <GlassCard key={p.step} delay={i * 0.07} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-soft text-muted">
                    {p.icon}
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-dim">STAGE {p.step}</span>
                </div>
                <h3 className="mt-4 text-base font-bold tracking-tight text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                <p className="mt-4 border-t border-overlay/[0.06] pt-3 font-mono text-[11px] text-dim">
                  Produces · <b className="font-medium text-fg">{p.output}</b>
                </p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-soft px-4 py-3.5 text-sm text-muted"
              >
                <span className="text-fg">{c.icon}</span>
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI calculator */}
      <section className="border-t border-overlay/[0.08] py-20 md:py-28" id="roi">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            badge="flag{roi.calculator}"
            title="Growth ROI Calculator"
            description="Drag the slider to your monthly ad spend. Projections use our blended client averages — conservative on purpose."
            align="center"
          />

          <GlassCard hover={false} className="mx-auto max-w-4xl p-7 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-dim">Monthly ad spend</p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight text-fg">{formatINR(spend)}</p>
              </div>
              <p className="font-mono text-xs text-dim">
                CPC ₹{CPC} · CVR {(CVR * 100).toFixed(1)}% · close rate {(CLOSE * 100).toFixed(0)}%
              </p>
            </div>

            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              aria-label="Monthly ad spend"
              className="mt-8 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-[rgb(var(--c-accent))]
                [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
                [&::-webkit-slider-thumb]:shadow-glow-white"
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-dim">
              <span>₹10K</span>
              <span>₹5L</span>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-overlay/[0.08] bg-overlay/[0.08] md:grid-cols-4">
              {[
                { label: 'Projected clicks', value: projection.clicks.toLocaleString('en-IN') },
                { label: 'Projected leads', value: projection.leads.toLocaleString('en-IN') },
                { label: 'New customers', value: projection.customers.toLocaleString('en-IN') },
                { label: 'Projected revenue', value: formatINR(projection.revenue) },
              ].map((m) => (
                <div key={m.label} className="bg-base p-6">
                  <p className="text-2xl font-extrabold tracking-tight text-fg">{m.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-soft px-6 py-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-dim">Estimated ROI</p>
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
              Illustrative only. Your audit projection is built from your industry, margins and current
              channel performance — not blended averages.
            </p>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
