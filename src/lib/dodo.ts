import DodoPayments from 'dodopayments';

export const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: (process.env.DODO_ENV as 'test_mode' | 'live_mode') || 'test_mode',
});

// Server-only map: tier id -> Dodo product id
export const TIER_PRODUCT_IDS: Record<string, string | undefined> = {
  early_bird: process.env.DODO_PRODUCT_EARLY_BIRD,
  regular: process.env.DODO_PRODUCT_REGULAR,
  last_2_days: process.env.DODO_PRODUCT_LAST_2_DAYS,
};