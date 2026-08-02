'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

/** Charcoal glass card with a ruby hover border. */
export default function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.3, 1] }}
      className={cn(
        'rounded-2xl border border-line bg-surface/80 backdrop-blur-xl shadow-elevated transition-colors duration-300',
        hover && 'hover:border-accent/60',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
