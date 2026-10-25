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
// @desc    Get published layout by handle (Public Portfolio View & Track Visitor)
// @access  Public
router.get('/public/:handle', async (req, res) => {
  try {
    const handle = req.params.handle.toLowerCase();
    const layout = await Layout.findOne({ handle, isPublished: true, isBanned: { $ne: true } }).populate('userId', 'username email fullName headline bio location website github linkedin twitter');

    if (!layout) {
      return res.status(404).json({ success: false, message: 'Portfolio layout not found' });
    }

    // Asynchronously record visitor & view for Creator Analytics without delaying response
    (async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        let referrerSource = 'Direct';
        const ref = (req.headers.referer || req.headers.referrer || '').toLowerCase();
        if (ref.includes('linkedin')) referrerSource = 'LinkedIn';
        else if (ref.includes('github')) referrerSource = 'GitHub';
        else if (ref.includes('twitter') || ref.includes('t.co') || ref.includes('x.com')) referrerSource = 'Twitter / X';
        else if (ref.includes('google')) referrerSource = 'Google';
        else if (ref.includes('facebook') || ref.includes('instagram')) referrerSource = 'Social Media';

        const targetLayout = await Layout.findById(layout._id);
        if (targetLayout) {
          if (!targetLayout.analytics) {
            targetLayout.analytics = { views: 0, uniqueVisitors: 0, resumeDownloads: 0, dailyViews: [], referrers: [] };
          }
          targetLayout.analytics.views = (targetLayout.analytics.views || 0) + 1;
          targetLayout.analytics.uniqueVisitors = (targetLayout.analytics.uniqueVisitors || 0) + 1;

          // 30-Day trend entry
          targetLayout.analytics.dailyViews = targetLayout.analytics.dailyViews || [];
          let dayEntry = targetLayout.analytics.dailyViews.find((d) => d.date === today);
          if (!dayEntry) {
            targetLayout.analytics.dailyViews.push({ date: today, views: 1, unique: 1, downloads: 0 });
            if (targetLayout.analytics.dailyViews.length > 30) targetLayout.analytics.dailyViews.shift();
          } else {
            dayEntry.views = (dayEntry.views || 0) + 1;
            dayEntry.unique = (dayEntry.unique || 0) + 1;
          }

          // Referrer tracking
          targetLayout.analytics.referrers = targetLayout.analytics.referrers || [];
          let refEntry = targetLayout.analytics.referrers.find((r) => r.source === referrerSource);
          if (!refEntry) {
            targetLayout.analytics.referrers.push({ source: referrerSource, count: 1 });
          } else {
            refEntry.count = (refEntry.count || 0) + 1;
          }

          await targetLayout.save();
        }
      } catch (trackErr) {
        console.warn('Analytics tracking error:', trackErr.message);
      }
    })();

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
  if (user.plan === 'pro') return 3;
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

// @route   POST /api/layouts/track-download/:handle
// @desc    Increment ATS resume download count for a portfolio
// @access  Public
router.post('/track-download/:handle', async (req, res) => {
  try {
    const handle = req.params.handle.toLowerCase();
    const today = new Date().toISOString().split('T')[0];
    const layout = await Layout.findOne({ handle });

    if (!layout) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    if (!layout.analytics) {
      layout.analytics = { views: 0, uniqueVisitors: 0, resumeDownloads: 0, dailyViews: [], referrers: [] };
    }
    layout.analytics.resumeDownloads = (layout.analytics.resumeDownloads || 0) + 1;

    layout.analytics.dailyViews = layout.analytics.dailyViews || [];
    let dayEntry = layout.analytics.dailyViews.find((d) => d.date === today);
    if (dayEntry) {
      dayEntry.downloads = (dayEntry.downloads || 0) + 1;
    } else {
      layout.analytics.dailyViews.push({ date: today, views: 0, unique: 0, downloads: 1 });
    }

    await layout.save();

    res.status(200).json({
      success: true,
      message: 'Download tracked successfully',
      downloads: layout.analytics.resumeDownloads
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/layouts/analytics/:id
// @desc    Get creator analytics for layout (Pro / Studio exclusive, gated for Free)
// @access  Private
router.get(
  '/analytics/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const layout = await Layout.findById(req.params.id);
      if (!layout) {
        return res.status(404).json({ success: false, message: 'Portfolio layout not found' });
      }

      // Verify layout ownership or admin
      if (layout.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }

      const userPlan = (req.user.plan || 'free').toLowerCase();
      const isProOrStudio = userPlan === 'pro' || userPlan === 'studio' || req.user.role === 'admin';

      if (!isProOrStudio) {
        return res.status(200).json({
          success: true,
          isLocked: true,
          plan: userPlan,
          views: layout.analytics?.views || 0,
          uniqueVisitors: layout.analytics?.uniqueVisitors || 0,
          resumeDownloads: layout.analytics?.resumeDownloads || 0,
          message: 'Creator Analytics is available on Pro Creator and Studio tiers.'
        });
      }

      const analytics = layout.analytics || { views: 0, uniqueVisitors: 0, resumeDownloads: 0, dailyViews: [], referrers: [] };
      const views = analytics.views || 0;
      const unique = analytics.uniqueVisitors || 0;
      const downloads = analytics.resumeDownloads || 0;
      const ctr = unique > 0 ? parseFloat(((downloads / unique) * 100).toFixed(1)) : 0.0;

      // Map referrer list to counts map
      const referrersMap = { direct: 0, linkedin: 0, github: 0, twitter: 0, google: 0 };
      (analytics.referrers || []).forEach((r) => {
        const key = (r.source || '').toLowerCase().replace(/[^a-z]/g, '');
        if (key.includes('linkedin')) referrersMap.linkedin += r.count || 0;
        else if (key.includes('github')) referrersMap.github += r.count || 0;
        else if (key.includes('twitter') || key.includes('x')) referrersMap.twitter += r.count || 0;
        else if (key.includes('google')) referrersMap.google += r.count || 0;
        else referrersMap.direct += r.count || 0;
      });

      const payload = {
        views,
        uniqueVisitors: unique,
        resumeDownloads: downloads,
        resumeCtr: ctr,
        dailyViews: analytics.dailyViews || [],
        referrers: referrersMap
      };

      res.status(200).json({
        success: true,
        isLocked: false,
        plan: userPlan,
        ...payload,
        analytics: payload
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
