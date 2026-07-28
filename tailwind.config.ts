import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--c-base) / <alpha-value>)',
        soft: 'rgb(var(--c-soft) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        line: {
          DEFAULT: 'rgb(var(--c-line) / <alpha-value>)',
          strong: 'rgb(var(--c-line-strong) / <alpha-value>)',
        },
        fg: 'rgb(var(--c-fg) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        dim: 'rgb(var(--c-dim) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          hover: 'rgb(var(--c-accent-hover) / <alpha-value>)',
        },
        inverse: 'rgb(var(--c-inverse) / <alpha-value>)',
        overlay: 'rgb(var(--c-overlay) / <alpha-value>)',
        shade: 'rgb(var(--c-shade) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-white': '0 0 40px -12px rgb(var(--c-accent) / 0.25)',
        'glow-soft': '0 0 24px -8px rgb(var(--c-accent) / 0.12)',
        'glow-strong': '0 0 56px -12px rgb(var(--c-accent) / 0.4)',
        elevated: 'var(--shadow-elevated)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.8)' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
