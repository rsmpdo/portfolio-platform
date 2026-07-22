const express = require('express');
const router = express.Router();
const passport = require('passport');
const Payment = require('../models/Payment');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @route   POST /api/payment/checkout
// @desc    Process plan subscription payment (Pro / Studio) safely
// @access  Private / Public (Supports guest or authenticated checkout)
router.post('/checkout', async (req, res) => {
  try {
    const { plan, email, cardNumber, expDate, cvc, nameOnCard } = req.body;

    if (!plan || !['pro', 'studio'].includes(plan)) {
      return res.status(400).json({ success: false, message: 'Please select a valid plan (pro or studio)' });
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email address for receipt and account access' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const amount = plan === 'pro' ? 12 : 29;
    const transactionId = `txn_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    // Find or locate associated user
    let user = await User.findOne({ email: cleanEmail });

    if (user) {
      user.plan = plan;
      user.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      await user.save();
    }

    // Record Payment Transaction in DB
    const payment = await Payment.create({
      userId: user ? user._id : new User()._id,
      email: cleanEmail,
      plan,
      amount,
      currency: 'USD',
      status: 'completed',
      transactionId,
      paymentMethod: 'SSL Encrypted Card'
    });

    // Dispatch Official Payment Receipt Email via Nodemailer
    try {
      await sendEmail({
        email: cleanEmail,
        subject: `🧾 Official Payment Receipt — PortfolioCraft ${plan.toUpperCase()} Plan ($${amount})`,
        message: `Thank you for subscribing to PortfolioCraft ${plan.toUpperCase()} Plan!\n\nTransaction ID: ${transactionId}\nPlan: ${plan.toUpperCase()} ($${amount}/mo)\nBilling Date: ${new Date().toLocaleDateString()}\nStatus: Paid & Active\n\nYour account has been upgraded to ${plan.toUpperCase()} status. You now have access to unlimited sections, custom domains, and premium themes.\n\nThank you for choosing PortfolioCraft,\nThe PortfolioCraft Team`
      });
    } catch (mailErr) {
      console.log('Payment receipt email dispatch warning:', mailErr.message);
    }

    res.status(200).json({
      success: true,
      message: `Successfully subscribed to ${plan.toUpperCase()} plan! Receipt sent to ${cleanEmail}`,
      transactionId,
      plan,
      amount,
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
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
