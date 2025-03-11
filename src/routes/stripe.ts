import express, { Request, Response } from 'express';
import { stripe, SUBSCRIPTION_PRICES } from '../config/stripe';
import { User } from '../models/user';
import { authMiddleware } from '../middleware/auth';
import { log } from '../middleware/logger';
import path from 'path';

const router = express.Router();

// Get subscription status
router.get('/status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    const user = await User.findOne({ where: { apiKey } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      subscriptionStatus: user.dataValues.subscriptionStatus || 'free',
      subscriptionEndsAt: user.dataValues.subscriptionEndsAt || null
    });
    return;
  } catch (error) {
    log.error(`Error getting subscription status: ${error}`);
    res.status(500).json({ error: 'Failed to get subscription status' });
    return;
  }
});

// Create checkout session
router.post('/create-checkout-session', authMiddleware, async (req: Request, res: Response) => {
  try {
    log.info('Creating checkout session');
    const apiKey = req.headers['x-api-key'] as string;
    const user = await User.findOne({ where: { apiKey } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get or create Stripe customer
    let customerId = user.stripeCustomerId;
    log.info(`User: `, user);
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.dataValues.email,
        metadata: { userId: user.dataValues.id.toString() }
      });
      
      customerId = customer.id;
      await user.update({ stripeCustomerId: customerId });
    }


    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: SUBSCRIPTION_PRICES.monthly,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/api/subscriptions/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/api/subscriptions/subscription-cancel`,
      metadata: { userId: user.dataValues.id.toString() }
    });

    res.json({ url: session.url });
  } catch (error) {
    log.error(`Error creating checkout session: ${error}`);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Customer portal session for managing subscription
router.post('/create-portal-session', authMiddleware, async (req: Request, res: Response) => {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    const user = await User.findOne({ where: { apiKey } });

    if (!user || !user.dataValues.stripeCustomerId) {
      res.status(404).json({ error: 'User or customer ID not found' });
      return;
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.dataValues.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/dashboard`
    });

    res.json({ url: portalSession.url });
  } catch (error) {
    log.error(`Error creating portal session: ${error}`);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

// Handle subscription success
router.get('/subscription-success', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/subscription-success.html'));
});

// Handle subscription cancel
router.get('/subscription-cancel', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/subscription-cancel.html'));
});

export default router;