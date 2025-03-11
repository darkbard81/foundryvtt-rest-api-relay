import Stripe from 'stripe';
import { log } from '../middleware/logger';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia' // Use the latest API version
});

const SUBSCRIPTION_PRICES = {
  monthly: process.env.STRIPE_PRICE_ID || '' // Your Stripe price ID for monthly subscription
};

export { stripe, SUBSCRIPTION_PRICES };