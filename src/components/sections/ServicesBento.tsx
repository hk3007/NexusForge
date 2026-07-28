'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flag, Globe, GraduationCap, TrendingUp, Users, Check } from 'lucide-react';
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
}

const items: BentoItem[] = [
  {
    code: 'S-01',
    title: 'Website Management',
    description:
      'Your site, watched and maintained every day. CMS, stack, store — and everything that breaks at 2am. Named engineer, monthly report, no surprises on the invoice.',
    href: '/services/website-management',
    icon: <Globe className="h-5 w-5" />,
    metric: '99.97% uptime across managed properties',
    features: ['24/7 uptime, SSL & malware monitoring', 'Core, plugin & dependency patching', 'E-commerce ops & Core Web Vitals', 'New features, redesigns & integrations'],
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    code: 'S-02',
    title: 'Social Media & Growth Engine',
    description: 'Posts, reels and copy on a calendar you approve, wired to GA4 analytics that tie spend to revenue.',
    href: '/services/social-media-growth',
    icon: <TrendingUp className="h-5 w-5" />,
    metric: 'Weekly numbers, monthly review call',
    features: ['Technical SEO & content clusters', 'Meta & Google Ads testing'],
    span: 'md:col-span-1',
  },
  {
    code: 'S-03',
    title: 'Industry Internships',
    description: 'Cohorts in Cybersecurity, Full-Stack and DevOps — mentored by the engineers who run client work.',
    href: '/academy/internships',
    icon: <GraduationCap className="h-5 w-5" />,
    metric: '1,840 enrolled · live tickets from week 4',
    features: ['One mentor per six interns', 'Signed skill report at the end'],
    span: 'md:col-span-1',
  },
  {
    code: 'S-04',
    title: 'CTF & Developer Events',
    description: 'Live capture-the-flag arenas, hackathons and coding competitions — isolated infra, live scoreboard, anti-cheat.',
    href: '/platform/ctf-events',
    icon: <Flag className="h-5 w-5" />,
    metric: 'Scale tested to 2,400 concurrent teams',
    features: ['Jeopardy & attack-defend formats', 'White-label on your own domain'],
    span: 'md:col-span-1',
  },
  {
    code: 'S-05',
    title: 'Hire Developers & Talent Hub',
    description: 'Shortlist from solve records, timed submissions and mentor notes instead of CVs. Median time to shortlist: 6 days.',
    href: '/platform/hire-developers',
    icon: <Users className="h-5 w-5" />,
    metric: '212 placements made in 2025',
    features: ['Verified-skill search, 1,204 profiles', '90-day replacement guarantee'],
    span: 'md:col-span-2',
  },
];

export default function ServicesBento() {
  return (
    <section className="relative py-20 md:py-28" id="services">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          badge="flag{what.we.run}"
          title="Five services, one team, one invoice."
          description="Most agencies hand you off after launch. We're built for the years after it — and for the shortage of people who can do the work."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.2, 0.7, 0.3, 1] }}
              className={cn('group', item.span)}
            >
              <Link
                href={item.href}
                className="flex h-full flex-col rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow-soft md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-soft text-muted transition-colors group-hover:border-line-strong group-hover:text-accent">
                    {item.icon}
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-dim">{item.code}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-fg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                <ul className="mt-4 space-y-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-fg" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between border-t border-overlay/[0.06] pt-4 first:mt-5 [&:not(:first-child)]:mt-5">
                  <span className="font-mono text-[11px] text-dim">{item.metric}</span>
                  <ArrowUpRight className="h-4 w-4 text-dim transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
