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

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        ease: [0.2, 0.7, 0.3, 1],
      }}
      className={cn(
        'relative mb-14 max-w-4xl md:mb-20',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <span
          className={cn(
            'inline-flex items-center gap-2',
            'rounded-full',
            'border border-line',
            'bg-soft/60 backdrop-blur-xl',
            'px-4 py-2',
            'font-mono text-[11px] font-semibold',
            'tracking-[0.18em]',
            'text-muted',
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>

          {badge.toUpperCase()}
        </span>
      </motion.div>

      {/* Title */}
      <h2
        className={cn(
          'mt-6',
          'text-4xl font-extrabold tracking-tight',
          'text-fg',
          'sm:text-5xl',
          'lg:text-6xl',
          'leading-[1.05]',
        )}
      >
        {title}
      </h2>

      {/* Accent Line */}
      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        whileInView={{
          width: align === 'center' ? 120 : 90,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{
          delay: 0.25,
          duration: 0.6,
        }}
        className={cn(
          'mt-6 h-[3px] rounded-full',
          'bg-gradient-to-r from-accent via-accent to-transparent',
          align === 'center' && 'mx-auto',
        )}
      />

      {/* Description */}
      {description && (
        <p
          className={cn(
            'mt-6',
            'max-w-3xl',
            'text-base md:text-lg lg:text-xl',
            'leading-relaxed',
            'text-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}

      {/* Decorative Glow */}
      <div
        className={cn(
          'pointer-events-none absolute -top-10',
          align === 'center'
            ? 'left-1/2 -translate-x-1/2'
            : 'left-0',
          'h-24 w-24 rounded-full',
          'bg-accent/10 blur-3xl',
        )}
      />
    </motion.div>
  );
}