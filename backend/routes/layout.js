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

// @route   GET /api/layouts/me
// @desc    Get current logged in user layout for editing
// @access  Private
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let layout = await Layout.findOne({ userId: req.user._id });

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
      const { title, handle, theme, seo, components, isPublished } = req.body;

      let layout = await Layout.findOne({ userId: req.user._id });

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
