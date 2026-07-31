import type { LucideIcon } from 'lucide-react';

/* ---------- Services ---------- */
export interface Service {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: LucideIcon;
  features: string[];
  metric: { label: string; value: string };
}

/* ---------- Pricing ---------- */
export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

/* ---------- Monitoring ---------- */
export interface MonitorRow {
  domain: string;
  meta: string;
  status: 'healthy' | 'patching';
  spark: number[];
}

/* ---------- Internships ---------- */
export interface CurriculumWeek {
  week: string;
  title: string;
  topics: string[];
}

export interface InternshipTrack {
  id: string;
  name: string;
  duration: string;
  seats: number;
  stipend: string;
  summary: string;
  icon: LucideIcon;
  curriculum: CurriculumWeek[];
}

/* ---------- CTF & Events ---------- */
export interface LeaderboardEntry {
  rank: number;
  team: string;
  solves: number;
  points: number;
  lastSolve: string;
}

export interface CTFEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  description: string;
  format: string;
  location: string;
  entry: string;
  seats: string;
  startsAt: string; // ISO date for countdown
  status: 'live' | 'upcoming';
}

/* ---------- Talent ---------- */
export type SkillFilter = 'All' | 'Cybersecurity' | 'React/Next.js' | 'Node.js' | 'AI/ML';

export interface Developer {
  id: string;
  name: string;
  initials: string;
  role: string;
  skills: SkillFilter[];
  stack: string[];
  ctfRank: number;
  solves: number;
  experience: string;
  availability: string;
  verified: boolean;
}

/* ---------- Testimonials ---------- */
export interface Testimonial {
  quote: string;
  name: string;
  initials: string;
  title: string;
}
