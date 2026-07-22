const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const Payment = require('../models/Payment');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @route   POST /api/payment/create-checkout-session
// @desc    Create Stripe Checkout Session
// @access  Private
router.post(
  '/create-checkout-session',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { plan } = req.body;
      const user = req.user;

      if (!plan || !['pro', 'studio'].includes(plan)) {
        return res.status(400).json({ success: false, message: 'Invalid plan selected' });
      }

      if (!user.isVerified) {
        return res.status(403).json({ success: false, message: 'Please verify your email before purchasing a plan' });
      }

      const amount = plan === 'pro' ? 1200 : 2900; // in cents

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: user.email,
        client_reference_id: user._id.toString(),
        metadata: {
          plan: plan,
          userId: user._id.toString()
        },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `PortfolioCraft ${plan.toUpperCase()} Plan`,
                description: `Monthly subscription for ${plan.toUpperCase()} features`
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin || 'http://localhost:5173'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || 'http://localhost:5173'}/pricing`,
      });

      res.status(200).json({ success: true, url: session.url });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   POST /api/payment/webhook
// @desc    Stripe Webhook
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder'
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      const userId = session.client_reference_id;
      const plan = session.metadata.plan;
      const amount = session.amount_total / 100;

      const user = await User.findById(userId);
      if (user) {
        user.plan = plan;
        user.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await user.save();

        await Payment.create({
          userId: user._id,
          email: user.email,
          plan,
          amount,
          currency: session.currency,
          status: 'completed',
          transactionId: session.id,
          paymentMethod: 'Stripe'
        });

        await sendEmail({
          email: user.email,
          subject: `🧾 Official Receipt — PortfolioCraft ${plan.toUpperCase()} Plan`,
          message: `Thank you for your purchase!\n\nTransaction ID: ${session.id}\nPlan: ${plan.toUpperCase()} ($${amount})\n\nYour account has been upgraded.`
        });
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
    }
  }

  res.status(200).json({ received: true });
});

// @route   GET /api/payment/history
// @desc    Get user payment billing history
// @access  Private
router.get(
  '/history',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const payments = await Payment.find({ userId: req.user._id }).sort('-createdAt');
      res.status(200).json({ success: true, count: payments.length, payments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
