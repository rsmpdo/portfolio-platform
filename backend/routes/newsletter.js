const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const sendEmail = require('../utils/sendEmail');

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to weekly portfolio tips & masterclasses
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email address' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if subscriber already exists
    let subscriber = await Subscriber.findOne({ email: cleanEmail });

    if (subscriber) {
      if (!subscriber.isActive) {
        subscriber.isActive = true;
        await subscriber.save();
      }
    } else {
      subscriber = await Subscriber.create({ email: cleanEmail });
    }

    // Send confirmation welcome email with weekly portfolio tips
    try {
      await sendEmail({
        email: cleanEmail,
        subject: '🎉 Welcome to PortfolioCraft Weekly Tips & Masterclasses!',
        message: `Welcome to PortfolioCraft Weekly Tips!\n\nThank you for subscribing with ${cleanEmail}.\n\nEvery week, you'll receive actionable insights on portfolio design, case study storytelling, and winning high-value clients.\n\nHappy building,\nThe PortfolioCraft Team`
      });
    } catch (mailErr) {
      console.log('Email dispatch warning (SMTP sandbox or dev mode):', mailErr.message);
      // Non-blocking for email delivery in development
    }

    res.status(200).json({
      success: true,
      message: 'Subscribed successfully! Welcome email sent.',
      subscriber
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/newsletter/subscribers
// @desc    Get total count of subscribers (Admin / Public stats)
// @access  Public
router.get('/count', async (req, res) => {
  try {
    const count = await Subscriber.countDocuments({ isActive: true });
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
