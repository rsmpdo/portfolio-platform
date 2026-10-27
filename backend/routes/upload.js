const express = require('express');
const router = express.Router();
const passport = require('passport');
const { cloudinary, upload } = require('../config/cloudinary');

// @route   GET /api/upload/signature
// @desc    Generate signed parameters for direct browser-to-Cloudinary upload (eliminates backend proxy hop)
// @access  Private
router.get(
  '/signature',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const folder = 'portfolio_uploads';
      const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder },
        process.env.CLOUDINARY_API_SECRET
      );

      res.status(200).json({
        success: true,
        timestamp,
        folder,
        signature,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   POST /api/upload
// @desc    Upload media asset (image/video) to Cloudinary CDN
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('file'),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      res.status(200).json({
        success: true,
        url: req.file.path,
        public_id: req.file.filename,
        format: req.file.format,
        resource_type: req.file.resource_type
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
