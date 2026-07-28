import Hero from '@/components/sections/Hero';
import ServicesBento from '@/components/sections/ServicesBento';
import CTFInteractivePreview from '@/components/sections/CTFInteractivePreview';
import TalentMatrixPreview from '@/components/sections/TalentMatrixPreview';
import LiveStats from '@/components/sections/LiveStats';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Testimonial } from '@/types';

const clients = [
  'Kesari Retail', 'Deccan Diagnostics', 'Baner Coffee Roasters', 'Ferrolite Auto',
  'Sahyadri Institute', 'OpenLedger', 'Vastra&Co',
];

const testimonials: Testimonial[] = [
  {
    quote:
      "We used to raise a ticket and wait three days. Now someone replies before I've finished writing the second sentence. The store hasn't gone down in fourteen months.",
    name: 'Anita Kulkarni',
    initials: 'AK',
    title: 'Head of Digital · Kesari Retail',
  },
  {
    quote:
      "We ran a private CTF as our first interview round. Two of the four people we hired wouldn't have passed our old CV screen. Both are now on the security team.",
    name: 'Rohan Mehta',
    initials: 'RM',
    title: 'Engineering Manager · OpenLedger',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trust strip */}
      <div className="overflow-hidden border-b border-overlay/[0.08] py-6" aria-label="Selected clients">
        <div className="flex w-max animate-marquee gap-14">
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="whitespace-nowrap text-lg font-semibold tracking-tight text-dim">
              {c}
            </span>
          ))}
        </div>
      </div>

      <ServicesBento />

      {/* Live stats band */}
      <LiveStats />

      <CTFInteractivePreview />
      <TalentMatrixPreview />

      {/* Trust & Testimonials */}
      <section className="border-t border-overlay/[0.08] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader badge="flag{from.clients}" title="What changed after handover" />
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <GlassCard key={t.initials} delay={i * 0.1} className="flex flex-col p-7 md:p-9">
                <blockquote className="text-lg font-medium leading-relaxed tracking-tight text-fg">
                  “{t.quote}”
                </blockquote>
                <div className="mt-auto flex items-center gap-3.5 pt-7">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-inverse">
                    {t.initials}
                  </span>
                  <div className="text-sm leading-snug">
                    <p className="font-semibold text-fg">{t.name}</p>
                    <p className="font-mono text-xs text-dim">{t.title}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
