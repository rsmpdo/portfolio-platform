const express = require('express');
const router = express.Router();
const passport = require('passport');
const { upload } = require('../config/cloudinary');
const PaymentRequest = require('../models/PaymentRequest');
const User = require('../models/User');

const PLAN_AMOUNTS = { pro: 12, studio: 29 };

// /api/payment/submit
router.post(
  '/submit',
  passport.authenticate('jwt', { session: false }),
  upload.fields([
    { name: 'nationalId', maxCount: 1 },
    { name: 'paymentSlip', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { plan, fullName, nationalIdNumber, country, phone } = req.body;
      const user = req.user;

      if (!plan || !['pro', 'studio'].includes(plan)) {
        return res.status(400).json({ success: false, message: 'Invalid plan selected. Choose "pro" or "studio".' });
      }

      if (!user.isVerified) {
        return res.status(403).json({ success: false, message: 'Please verify your email before submitting a payment request.' });
      }

      if (!fullName || !nationalIdNumber || !country || !phone) {
        return res.status(400).json({ success: false, message: 'All personal details are required.' });
      }

      if (!req.files?.nationalId || !req.files?.paymentSlip) {
        return res.status(400).json({ success: false, message: 'Both National ID and Payment Slip uploads are required.' });
      }

      const existingPending = await PaymentRequest.findOne({ userId: user._id, plan, status: 'pending' });
      if (existingPending) {
        return res.status(409).json({
          success: false,
          message: 'You already have a pending payment request for this plan. Please wait for admin review.'
        });
      }

      const nationalIdUrl = req.files.nationalId[0].path;
      const paymentSlipUrl = req.files.paymentSlip[0].path;

      const request = await PaymentRequest.create({
        userId: user._id,
        email: user.email,
        plan,
        amount: PLAN_AMOUNTS[plan],
        fullName,
        nationalIdNumber,
        country,
        phone,
        nationalIdUrl,
        paymentSlipUrl
      });

      res.status(201).json({
        success: true,
        message: 'Payment request submitted successfully. Our team will review your documents within 1–3 business days.',
        requestId: request._id
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// /api/payment/my-requests
router.get(
  '/my-requests',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const requests = await PaymentRequest.find({ userId: req.user._id }).sort('-createdAt');
      res.status(200).json({ success: true, count: requests.length, requests });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// /api/payment/history
router.get(
  '/history',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const requests = await PaymentRequest.find({ userId: req.user._id, status: 'approved' }).sort('-createdAt');
      res.status(200).json({ success: true, count: requests.length, payments: requests });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;

