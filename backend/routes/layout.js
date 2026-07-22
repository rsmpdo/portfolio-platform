const express = require('express');
const router = express.Router();
const passport = require('passport');
const Layout = require('../models/Layout');

// Middleware to check admin role
const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};

// @route   GET /api/layouts/public/:handle
// @desc    Get published layout by handle (Public Portfolio View)
// @access  Public
router.get('/public/:handle', async (req, res) => {
  try {
    const handle = req.params.handle.toLowerCase();
    const layout = await Layout.findOne({ handle, isPublished: true }).populate('userId', 'username email');

    if (!layout) {
      return res.status(404).json({ success: false, message: 'Portfolio layout not found' });
    }

    res.status(200).json({
      success: true,
      layout
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Helper function to get max allowed portfolios based on user plan
const getPlanLimit = (user) => {
  if (user.role === 'admin') return 100;
  if (user.plan === 'studio') return 5;
  if (user.plan === 'pro') return 2;
  return 1;
};

// @route   GET /api/layouts/my-portfolios
// @desc    Get all portfolios belonging to logged in user
// @access  Private
router.get(
  '/my-portfolios',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const layouts = await Layout.find({ userId: req.user._id }).sort({ createdAt: 1 });
      const maxAllowed = getPlanLimit(req.user);

      res.status(200).json({
        success: true,
        count: layouts.length,
        maxAllowed,
        plan: req.user.plan,
        layouts
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   POST /api/layouts/new
// @desc    Create a new portfolio layout for logged in user
// @access  Private
router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { title, handle, templateId } = req.body;

      const currentCount = await Layout.countDocuments({ userId: req.user._id });
      const maxAllowed = getPlanLimit(req.user);

      if (currentCount >= maxAllowed) {
        return res.status(403).json({
          success: false,
          message: `Portfolio limit reached for your ${req.user.plan.toUpperCase()} plan (${currentCount}/${maxAllowed}). ${
            req.user.plan !== 'studio' ? 'Upgrade to Studio plan to create up to 5 portfolios!' : ''
          }`
        });
      }

      const formattedHandle = (handle || `${req.user.username}-${Date.now().toString(36)}`).toLowerCase().trim();

      // Check handle uniqueness
      const existingHandle = await Layout.findOne({ handle: formattedHandle });
      if (existingHandle) {
        return res.status(400).json({ success: false, message: 'Portfolio handle URL already in use' });
      }

      const newLayout = await Layout.create({
        userId: req.user._id,
        title: title || `${req.user.username}'s Portfolio #${currentCount + 1}`,
        handle: formattedHandle,
        theme: { templateId: templateId || 'minimalist-editorial' },
        components: []
      });

      res.status(201).json({
        success: true,
        message: 'New portfolio layout created successfully',
        layout: newLayout
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   DELETE /api/layouts/id/:layoutId
// @desc    Delete a specific portfolio layout
// @access  Private
router.delete(
  '/id/:layoutId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const count = await Layout.countDocuments({ userId: req.user._id });
      if (count <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot delete your only portfolio' });
      }

      const layout = await Layout.findOne({ _id: req.params.layoutId, userId: req.user._id });
      if (!layout) {
        return res.status(404).json({ success: false, message: 'Portfolio layout not found' });
      }

      await layout.deleteOne();

      res.status(200).json({ success: true, message: 'Portfolio layout deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   GET /api/layouts/me
// @desc    Get current logged in user layout for editing (supports ?id=xxx)
// @access  Private
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.query;
      let layout;

      if (id) {
        layout = await Layout.findOne({ _id: id, userId: req.user._id });
      } else {
        layout = await Layout.findOne({ userId: req.user._id }).sort({ createdAt: 1 });
      }

      if (!layout) {
        // Create default layout if none exists
        layout = await Layout.create({
          userId: req.user._id,
          handle: req.user.username.toLowerCase(),
          title: `${req.user.username}'s Portfolio`,
          components: []
        });
      }

      res.status(200).json({
        success: true,
        layout
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/layouts/me
// @desc    Update full layout (components, theme, seo settings)
// @access  Private
router.put(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { _id, id, title, handle, theme, seo, components, isPublished } = req.body;
      const targetId = _id || id || req.query.id;

      let layout;
      if (targetId) {
        layout = await Layout.findOne({ _id: targetId, userId: req.user._id });
      } else {
        layout = await Layout.findOne({ userId: req.user._id }).sort({ createdAt: 1 });
      }

      if (!layout) {
        layout = new Layout({ userId: req.user._id });
      }

      if (title !== undefined) layout.title = title;
      if (handle !== undefined) layout.handle = handle.toLowerCase();
      if (theme !== undefined) layout.theme = { ...layout.theme, ...theme };
      if (seo !== undefined) layout.seo = { ...layout.seo, ...seo };
      if (components !== undefined) layout.components = components;
      if (isPublished !== undefined) layout.isPublished = isPublished;

      await layout.save();

      res.status(200).json({
        success: true,
        message: 'Layout successfully updated',
        layout
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   POST /api/layouts/component
// @desc    Add or update a single component in layout
// @access  Private
router.post(
  '/component',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id, type, title, order, isVisible, props } = req.body;

      let layout = await Layout.findOne({ userId: req.user._id });
      if (!layout) {
        return res.status(404).json({ success: false, message: 'Layout not found' });
      }

      const existingIndex = layout.components.findIndex((c) => c.id === id);

      if (existingIndex > -1) {
        // Update existing component
        layout.components[existingIndex] = {
          id,
          type,
          title: title || layout.components[existingIndex].title,
          order: order !== undefined ? order : layout.components[existingIndex].order,
          isVisible: isVisible !== undefined ? isVisible : layout.components[existingIndex].isVisible,
          props: props ? { ...layout.components[existingIndex].props, ...props } : layout.components[existingIndex].props
        };
      } else {
        // Add new component
        layout.components.push({
          id: id || `comp_${Date.now()}`,
          type,
          title: title || type,
          order: order || layout.components.length,
          isVisible: isVisible !== undefined ? isVisible : true,
          props: props || {}
        });
      }

      await layout.save();

      res.status(200).json({
        success: true,
        layout
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   DELETE /api/layouts/component/:componentId
// @desc    Remove component from layout
// @access  Private
router.delete(
  '/component/:componentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const layout = await Layout.findOne({ userId: req.user._id });
      if (!layout) {
        return res.status(404).json({ success: false, message: 'Layout not found' });
      }

      layout.components = layout.components.filter((c) => c.id !== req.params.componentId);
      await layout.save();

      res.status(200).json({
        success: true,
        message: 'Component removed',
        layout
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   GET /api/layouts/admin/all
// @desc    Admin view all system layouts
// @access  Private (Admin only)
router.get(
  '/admin/all',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const layouts = await Layout.find().populate('userId', 'username email role');
      res.status(200).json({ success: true, count: layouts.length, layouts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
