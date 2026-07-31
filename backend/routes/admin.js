const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Layout = require('../models/Layout');
const Payment = require('../models/Payment');
const PaymentRequest = require('../models/PaymentRequest');
const Subscriber = require('../models/Subscriber');
const sendEmail = require('../utils/sendEmail');

// Admin Auth Middleware
const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Administrator privileges required' });
};

// @route   GET /api/admin/stats
// @desc    Get system-wide analytics & stats
// @access  Private (Admin only)
router.get(
  '/stats',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const proUsers = await User.countDocuments({ plan: 'pro' });
      const studioUsers = await User.countDocuments({ plan: 'studio' });
      const totalLayouts = await Layout.countDocuments();
      const totalSubscribers = await Subscriber.countDocuments({ isActive: true });
      const totalPayments = await Payment.find({ status: 'completed' });
      const totalRevenue = totalPayments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

      res.status(200).json({
        success: true,
        stats: {
          totalUsers,
          proUsers,
          studioUsers,
          totalLayouts,
          totalSubscribers,
          totalRevenue
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   GET /api/admin/users
// @desc    Get list of all users
// @access  Private (Admin only)
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const users = await User.find().select('-password').sort('-createdAt');
      res.status(200).json({ success: true, count: users.length, users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/admin/user/:id/warn
// @desc    Send moderation warning note email to user
// @access  Private (Admin only)
router.put(
  '/user/:id/warn',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const { warningMessage } = req.body;
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      await sendEmail({
        email: user.email,
        subject: '⚠️ PortfolioCraft Admin Moderation Warning',
        message: `Hello ${user.username},\n\nOur platform administration team has reviewed your portfolio and issued the following notice:\n\n"${warningMessage || 'Please ensure all content in your portfolio complies with community guidelines.'}"\n\nPlease update your portfolio content accordingly.\n\nPortfolioCraft Admin Team`
      });

      res.status(200).json({ success: true, message: `Warning sent to ${user.email}` });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/admin/user/:id/plan
// @desc    Change user plan (free, pro, studio)
// @access  Private (Admin only)
router.put(
  '/user/:id/plan',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const { plan } = req.body;
      if (!['free', 'pro', 'studio'].includes(plan)) {
        return res.status(400).json({ success: false, message: 'Invalid plan' });
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      user.plan = plan;
      await user.save();

      res.status(200).json({ success: true, message: `User plan updated to ${plan}`, user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   DELETE /api/admin/user/:id
// @desc    Delete user and their layout
// @access  Private (Admin only)
router.delete(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      await Layout.deleteMany({ userId: user._id });
      await User.findByIdAndDelete(user._id);

      res.status(200).json({ success: true, message: 'User and associated portfolio deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   GET /api/admin/layouts
// @desc    Get all portfolio layouts for moderation
// @access  Private (Admin only)
router.get(
  '/layouts',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const layouts = await Layout.find().populate('userId', 'username email role plan');
      res.status(200).json({ success: true, count: layouts.length, layouts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/admin/layout/:id/toggle-publish
// @desc    Admin toggle layout publication status (does NOT ban)
// @access  Private (Admin only)
router.put(
  '/layout/:id/toggle-publish',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const layout = await Layout.findById(req.params.id);
      if (!layout) {
        return res.status(404).json({ success: false, message: 'Layout not found' });
      }

      layout.isPublished = !layout.isPublished;
      await layout.save();

      res.status(200).json({
        success: true,
        message: `Layout publication set to ${layout.isPublished}`,
        layout
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/admin/layout/:id/toggle-ban
// @desc    Admin ban/unban an inappropriate portfolio (independent of publish status)
// @access  Private (Admin only)
router.put(
  '/layout/:id/toggle-ban',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const layout = await Layout.findById(req.params.id);
      if (!layout) {
        return res.status(404).json({ success: false, message: 'Layout not found' });
      }

      layout.isBanned = !layout.isBanned;
      await layout.save();

      res.status(200).json({
        success: true,
        message: `Portfolio ban status set to ${layout.isBanned}`,
        layout
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);


// ─────────────────────────────────────────────────────────────────────────────
// MANUAL PAYMENT REQUEST REVIEW ROUTES
// ─────────────────────────────────────────────────────────────────────────────

// @route   GET /api/admin/payment-requests
// @desc    Get all manual payment requests (all statuses)
// @access  Private (Admin only)
router.get(
  '/payment-requests',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const requests = await PaymentRequest.find()
        .populate('userId', 'username email plan')
        .sort('-createdAt');
      res.status(200).json({ success: true, count: requests.length, requests });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/admin/payment-request/:id/approve
// @desc    Approve a payment request — upgrades user plan and notifies them
// @access  Private (Admin only)
router.put(
  '/payment-request/:id/approve',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const request = await PaymentRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({ success: false, message: 'Payment request not found' });
      }
      if (request.status !== 'pending') {
        return res.status(400).json({ success: false, message: `This request is already ${request.status}` });
      }

      // Upgrade the user's plan
      const user = await User.findById(request.userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.plan = request.plan;
      await user.save();

      // Mark request approved
      request.status = 'approved';
      request.adminNote = req.body.adminNote || 'Your payment has been verified and your plan has been upgraded.';
      request.reviewedAt = new Date();
      request.reviewedBy = req.user._id;
      await request.save();

      // Send approval email
      try {
        await sendEmail({
          email: user.email,
          subject: `✅ PortfolioCraft ${request.plan.toUpperCase()} Plan — Payment Approved!`,
          message: `Hi ${user.username || user.email},\n\nGreat news! Your payment of $${request.amount} USD for the PortfolioCraft ${request.plan.toUpperCase()} Plan has been verified and approved.\n\nYour account has been upgraded to ${request.plan.toUpperCase()}. You can now log in and enjoy all the premium features.\n\nThis is a one-time purchase — no recurring charges.\n\nThank you for joining PortfolioCraft!\n\n— The PortfolioCraft Team`
        });
      } catch (emailErr) {
        console.error('Approval email error:', emailErr.message);
      }

      res.status(200).json({
        success: true,
        message: `Payment request approved. ${user.email} upgraded to ${request.plan}.`,
        request
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/admin/payment-request/:id/reject
// @desc    Reject a payment request — notifies user with reason
// @access  Private (Admin only)
router.put(
  '/payment-request/:id/reject',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const request = await PaymentRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({ success: false, message: 'Payment request not found' });
      }
      if (request.status !== 'pending') {
        return res.status(400).json({ success: false, message: `This request is already ${request.status}` });
      }

      const adminNote = req.body.adminNote || 'Your payment could not be verified. Please resubmit with a clear payment slip.';

      request.status = 'rejected';
      request.adminNote = adminNote;
      request.reviewedAt = new Date();
      request.reviewedBy = req.user._id;
      await request.save();

      // Send rejection email
      try {
        const user = await User.findById(request.userId);
        if (user) {
          await sendEmail({
            email: user.email,
            subject: `❌ PortfolioCraft Payment Request — Update Required`,
            message: `Hi ${user.username || user.email},\n\nWe were unable to verify your payment request for the PortfolioCraft ${request.plan.toUpperCase()} Plan.\n\nReason: ${adminNote}\n\nPlease visit our pricing page to resubmit your payment with the correct documents.\n\nIf you believe this is an error, please contact our support team.\n\n— The PortfolioCraft Team`
          });
        }
      } catch (emailErr) {
        console.error('Rejection email error:', emailErr.message);
      }

      res.status(200).json({
        success: true,
        message: 'Payment request rejected and user notified.',
        request
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
