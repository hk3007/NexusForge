'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

/** White CTA button with a soft glow — solid, outline and ghost variants. */
export default function NeonButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className,
  type = 'button',
  disabled,
}: NeonButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-200 active:translate-y-px disabled:opacity-40 disabled:pointer-events-none';

  const variants = {
    solid:
      'bg-accent text-inverse shadow-glow-white hover:bg-accent-hover hover:shadow-glow-strong',
    outline:
      'border border-line bg-overlay/[0.02] text-fg hover:border-accent hover:bg-overlay/[0.06]',
    ghost: 'px-0 py-1 text-muted hover:text-accent',
  };

  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
