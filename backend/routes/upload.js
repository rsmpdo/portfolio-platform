const express = require('express');
const router = express.Router();
const passport = require('passport');
const { upload } = require('../config/cloudinary');

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
