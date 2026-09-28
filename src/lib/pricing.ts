export const MONSOON_START = '2026-10-20T09:00:00+05:30';

export const monsoonPricingTiers = [
  { id: 'early_bird', label: 'Early Bird', price: '$3', until: '2026-10-10T23:59:59+05:30' },
  { id: 'regular', label: 'Regular', price: '$5', until: '2026-10-17T23:59:59+05:30' },
  { id: 'last_2_days', label: 'Last 2 Days', price: '$10', until: '2026-10-19T23:59:59+05:30' },
];

export function getMonsoonPrice(now: number | null) {
  if (now === null) return monsoonPricingTiers[0];
  for (const tier of monsoonPricingTiers) {
    if (now <= new Date(tier.until).getTime()) return tier;
  }
  return monsoonPricingTiers[monsoonPricingTiers.length - 1];
}