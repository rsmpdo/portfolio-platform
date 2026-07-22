const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Layout = require('../models/Layout');
const Payment = require('../models/Payment');
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
// @desc    Toggle layout publication / ban inappropriate portfolio
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

module.exports = router;
