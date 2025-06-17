import Stripe from 'stripe';
import { log } from '../middleware/logger';

// Check if we're using memory store or SQLite (local development)
const isMemoryStore = process.env.DB_TYPE === 'memory';
const isSQLiteStore = process.env.DB_TYPE === 'sqlite';
const isStripeDisabled = isMemoryStore || isSQLiteStore;

// Initialize Stripe conditionally
let stripe: any;
const SUBSCRIPTION_PRICES = {
  monthly: process.env.STRIPE_PRICE_ID || '' // Your Stripe price ID for monthly subscription
};

if (isStripeDisabled) {
  log.info('Stripe disabled in local/memory mode');
  // Export a disabled version with no-op functions
  stripe = {
    disabled: true,
    customers: { create: async () => ({ id: 'disabled' }) },
    checkout: { sessions: { create: async () => ({ url: '#' }) } },
    webhooks: { constructEvent: () => ({ type: 'disabled', data: { object: {} } }) }
  };
} else {
  // Initialize real Stripe with your secret key
  if (!process.env.STRIPE_SECRET_KEY) {
    log.warn('STRIPE_SECRET_KEY not provided, subscription features will not work');
    // Create a disabled stripe instance when no key is provided
    stripe = {
      disabled: true,
      customers: { create: async () => ({ id: 'disabled' }) },
      checkout: { sessions: { create: async () => ({ url: '#' }) } },
      webhooks: { constructEvent: () => ({ type: 'disabled', data: { object: {} } }) }
    };
  } else {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia' // Use the latest API version
    });
  }
}

export { stripe, SUBSCRIPTION_PRICES, isStripeDisabled };