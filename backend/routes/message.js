const express = require('express');
const router = express.Router();
const passport = require('passport');
const Message = require('../models/Message');
const User = require('../models/User');
const Layout = require('../models/Layout');

// @route   POST /api/messages
// @desc    Submit a new contact message (Public)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { recipientHandle, recipientUserId, senderName, senderEmail, subject, message, isSiteAdminMessage } = req.body;

    if (!senderName || !senderEmail || !message) {
      return res.status(400).json({ success: false, message: 'Please fill out name, email, and message.' });
    }

    let targetUserId = recipientUserId;

    // Resolve user ID from portfolio handle if provided
    if (!targetUserId && recipientHandle) {
      const layout = await Layout.findOne({ handle: recipientHandle.toLowerCase() });
      if (layout) {
        targetUserId = layout.userId;
      } else {
        const user = await User.findOne({ username: recipientHandle.toLowerCase() });
        if (user) targetUserId = user._id;
      }
    }

    const newMessage = await Message.create({
      recipientUserId: targetUserId || null,
      recipientHandle: recipientHandle || '',
      isSiteAdminMessage: Boolean(isSiteAdminMessage || !targetUserId),
      senderName,
      senderEmail: senderEmail.toLowerCase(),
      subject: subject || 'Portfolio Contact Inquiry',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newMessage
    });
  } catch (error) {
    console.error('Submit message error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/messages/me
// @desc    Get received messages for logged-in user
// @access  Private
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const messages = await Message.find({ recipientUserId: req.user._id }).sort({ createdAt: -1 });
      const unreadCount = messages.filter((m) => !m.isRead).length;

      res.status(200).json({
        success: true,
        count: messages.length,
        unreadCount,
        messages
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   GET /api/messages/admin
// @desc    Get all site-wide contact messages for Admin
// @access  Private (Admin)
router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied: Admin role required.' });
      }

      const messages = await Message.find({}).sort({ createdAt: -1 }).populate('recipientUserId', 'username email');
      const unreadCount = messages.filter((m) => !m.isRead).length;

      res.status(200).json({
        success: true,
        count: messages.length,
        unreadCount,
        messages
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/messages/:id/read
// @desc    Toggle or set isRead state of a message
// @access  Private
router.get(
  '/:id/read',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const msg = await Message.findById(req.params.id);
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });

      // Check ownership or admin
      if (String(msg.recipientUserId) !== String(req.user._id) && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }

      msg.isRead = !msg.isRead;
      await msg.save();

      res.status(200).json({ success: true, isRead: msg.isRead });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   DELETE /api/messages/:id
// @desc    Delete a message
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const msg = await Message.findById(req.params.id);
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });

      // Check ownership or admin
      if (String(msg.recipientUserId) !== String(req.user._id) && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }

      await msg.deleteOne();
      res.status(200).json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
