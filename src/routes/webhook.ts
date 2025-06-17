import express, { Request, Response } from 'express';
import { stripe } from '../config/stripe';
import { User } from '../models/user';
import { log } from '../middleware/logger';

const router = express.Router();

// Stripe webhook handler
router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    log.error(`Webhook Error: ${err}`);
    res.status(400).send(`Webhook Error: ${err}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    default:
      log.info(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

// Handle subscription updates
async function handleSubscriptionUpdated(subscription: any) {
  try {
    const customerId = subscription.customer;
    const user = await User.findOne({ where: { stripeCustomerId: customerId } });

    if (!user) {
      log.error(`User not found for customer: ${customerId}`);
      return;
    }

    await user.update({
      subscriptionStatus: subscription.status,
      subscriptionId: subscription.id,
      subscriptionEndsAt: new Date(subscription.current_period_end * 1000)
    });

    log.info(`Updated subscription for user ${user.id} to status: ${subscription.status}`);
  } catch (error) {
    log.error(`Error updating subscription: ${error}`);
  }
}

// Handle subscription deletions
async function handleSubscriptionDeleted(subscription: any) {
  try {
    const customerId = subscription.customer;
    const user = await User.findOne({ where: { stripeCustomerId: customerId } });

    if (!user) {
      log.error(`User not found for customer: ${customerId}`);
      return;
    }

    await user.update({
      subscriptionStatus: 'canceled',
      subscriptionEndsAt: new Date(subscription.canceled_at * 1000)
    });

    log.info(`Subscription canceled for user ${user.id}`);
  } catch (error) {
    log.error(`Error handling subscription deletion: ${error}`);
  }
}

// Handle successful payments
async function handlePaymentSucceeded(invoice: any) {
  try {
    if (invoice.subscription) {
      const customerId = invoice.customer;
      const user = await User.findOne({ where: { stripeCustomerId: customerId } });

      if (!user) {
        log.error(`User not found for customer: ${customerId}`);
        return;
      }

      // Log the payment success only - request count management is handled by
      // the monthly cron job in src/cron/monthlyReset.ts
      log.info(`Payment success recorded for user ${user.id} (subscription: ${user.subscriptionStatus})`);
    }
  } catch (error) {
    log.error(`Error handling payment success: ${error}`);
  }
}

// Handle failed payments
async function handlePaymentFailed(invoice: any) {
  try {
    if (invoice.subscription) {
      const customerId = invoice.customer;
      const user = await User.findOne({ where: { stripeCustomerId: customerId } });

      if (!user) {
        log.error(`User not found for customer: ${customerId}`);
        return;
      }

      // Mark subscription as past_due
      await user.update({
        subscriptionStatus: 'past_due'
      });

      log.info(`Updated subscription status to past_due for user ${user.id}`);
    }
  } catch (error) {
    log.error(`Error handling payment failure: ${error}`);
  }
}

export default router;