const express = require('express');
const router = express.Router();
const passport = require('passport');
const Application = require('../models/Application');

// Middleware to check admin role
const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};

// @route   POST /api/careers/apply
// @desc    Submit candidate job application (Public)
// @access  Public
router.post('/apply', async (req, res) => {
  try {
    const { jobId, jobTitle, department, fullName, email, portfolioUrl, resumeUrl, coverNote } = req.body;

    if (!fullName || !email || !portfolioUrl || !resumeUrl) {
      return res.status(400).json({ success: false, message: 'Please fill out all required application fields.' });
    }

    const referenceId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const application = await Application.create({
      jobId: jobId || 'fullstack-dev',
      jobTitle: jobTitle || 'Position Applicant',
      department: department || 'Engineering',
      fullName,
      email: email.toLowerCase(),
      portfolioUrl,
      resumeUrl,
      coverNote: coverNote || '',
      referenceId,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      referenceId,
      application
    });
  } catch (error) {
    console.error('Career application submit error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/careers/admin
// @desc    Get all candidate job applications for Admin
// @access  Private (Admin)
router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const applications = await Application.find({}).sort({ createdAt: -1 });

      const pendingCount = applications.filter((a) => a.status === 'pending').length;
      const shortlistedCount = applications.filter((a) => a.status === 'shortlisted').length;

      res.status(200).json({
        success: true,
        count: applications.length,
        pendingCount,
        shortlistedCount,
        applications
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/careers/admin/:id/status
// @desc    Update candidate application status
// @access  Private (Admin)
router.put(
  '/admin/:id/status',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const { status } = req.body;
      const app = await Application.findById(req.params.id);
      if (!app) return res.status(404).json({ success: false, message: 'Application not found' });

      if (status) app.status = status;
      await app.save();

      res.status(200).json({ success: true, application: app });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   DELETE /api/careers/admin/:id
// @desc    Delete candidate application
// @access  Private (Admin)
router.delete(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdmin,
  async (req, res) => {
    try {
      const app = await Application.findById(req.params.id);
      if (!app) return res.status(404).json({ success: false, message: 'Application not found' });

      await app.deleteOne();
      res.status(200).json({ success: true, message: 'Application deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
