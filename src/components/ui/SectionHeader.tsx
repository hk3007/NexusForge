'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Consistent mono badge + white title block used on every section. */
export default function SectionHeader({
  badge,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
      className={cn(
        'mb-12 max-w-2xl md:mb-16',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-md border border-line bg-overlay/[0.04] px-3 py-1.5 font-mono text-[11px] font-medium tracking-widest text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
        {badge.toUpperCase()}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-fg md:text-[2.6rem] md:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-4 text-base leading-relaxed text-muted md:text-lg', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
