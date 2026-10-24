const express = require('express');
const router = express.Router();
const passport = require('passport');
const Message = require('../models/Message');
const User = require('../models/User');
const Layout = require('../models/Layout');

const ADMIN_SECRET = process.env.ADMIN_SECRET_CODE || 'PORTFOLIO_CRAFT_ADMIN_2026';

const SHOWCASE_DIRECTORY = {
  alex: {
    name: 'Alex Morgan',
    role: 'Senior Product Designer',
    email: 'alex.morgan@vervedigital.io',
    route: '/showcase/alex'
  },
  marcus: {
    name: 'Marcus Vance',
    role: 'Full Stack Engineer',
    email: 'marcus.vance@cloudscale.dev',
    route: '/showcase/marcus'
  },
  elena: {
    name: 'Elena Rostova',
    role: 'Creative Director',
    email: 'elena@atelierrostova.co.uk',
    route: '/showcase/elena'
  }
};

// @route   POST /api/messages
// @desc    Submit a new contact message (Public)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      recipientHandle,
      recipientUserId,
      senderName,
      senderEmail,
      subject,
      message,
      isSiteAdminMessage
    } = req.body;

    if (!senderName || !senderEmail || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill out name, email, and message.'
      });
    }

    let cleanHandle = (recipientHandle || '').toLowerCase().trim();
    if (cleanHandle === 'demo') cleanHandle = 'marcus';
    if (cleanHandle === 'sample') cleanHandle = 'elena';

    const isShowcaseHandle = Boolean(SHOWCASE_DIRECTORY[cleanHandle]);
    let targetUserId = recipientUserId || null;

    // Resolve user ID from portfolio handle if it's a user portfolio (not a standalone showcase handle)
    if (!targetUserId && cleanHandle && !isShowcaseHandle) {
      const layout = await Layout.findOne({ handle: cleanHandle });
      if (layout) {
        targetUserId = layout.userId;
      } else {
        const user = await User.findOne({ username: cleanHandle });
        if (user) targetUserId = user._id;
      }
    }

    const newMessage = await Message.create({
      recipientUserId: targetUserId || null,
      recipientHandle: cleanHandle,
      isSiteAdminMessage: Boolean(isSiteAdminMessage && !cleanHandle),
      senderName,
      senderEmail: senderEmail.toLowerCase(),
      subject: subject || (isShowcaseHandle ? 'Showcase Project Inquiry' : 'Portfolio Contact Inquiry'),
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        _id: newMessage._id,
        recipientHandle: newMessage.recipientHandle,
        createdAt: newMessage.createdAt
      }
    });
  } catch (error) {
    console.error('Submit message error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/messages/me
// @desc    Get received messages for logged-in user (Owner sees full message)
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
// @desc    Get privacy-preserving contact analytics & metadata log for Admin (NO raw message content exposed)
// @access  Private (Admin)
router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied: Admin role required.' });
      }

      const rawMessages = await Message.find({})
        .sort({ createdAt: -1 })
        .populate('recipientUserId', 'username email plan');

      // Seed map with the 3 Showcase creators so Admin always sees their contact stats
      const statsMap = {};
      Object.entries(SHOWCASE_DIRECTORY).forEach(([handle, info]) => {
        const key = `showcase:${handle}`;
        statsMap[key] = {
          key,
          recipientType: 'showcase',
          recipientHandle: handle,
          recipientName: info.name,
          recipientRole: info.role,
          recipientEmail: info.email,
          route: info.route,
          totalContacts: 0,
          unreadCount: 0,
          uniqueSendersSet: new Set(),
          lastContactedAt: null,
          lastSender: null
        };
      });

      rawMessages.forEach((m) => {
        let handle = (m.recipientHandle || '').toLowerCase().trim();
        if (handle === 'demo') handle = 'marcus';
        if (handle === 'sample') handle = 'elena';

        const isShowcase = Boolean(SHOWCASE_DIRECTORY[handle]);
        let key;
        let recipientType;
        let recipientName;
        let recipientEmail;
        let route;

        if (isShowcase) {
          key = `showcase:${handle}`;
          recipientType = 'showcase';
          recipientName = SHOWCASE_DIRECTORY[handle].name;
          recipientEmail = SHOWCASE_DIRECTORY[handle].email;
          route = SHOWCASE_DIRECTORY[handle].route;
        } else if (m.recipientUserId || handle) {
          const uName = m.recipientUserId?.username || handle || 'Portfolio User';
          const uEmail = m.recipientUserId?.email || '';
          key = `user:${handle || m.recipientUserId?._id}`;
          recipientType = 'user';
          recipientName = uName;
          recipientEmail = uEmail;
          route = handle ? `/p/${handle}` : '#';
        } else if (m.subject && m.subject.toLowerCase().includes('enterprise')) {
          key = 'platform:sales';
          recipientType = 'platform';
          recipientName = 'Enterprise Sales (/contact)';
          recipientEmail = 'sales@portfoliocraft.io';
          route = '/contact#enterprise-sales';
        } else {
          key = 'platform:support';
          recipientType = 'platform';
          recipientName = 'Platform Support (/contact)';
          recipientEmail = 'support@portfoliocraft.io';
          route = '/contact';
        }

        if (!statsMap[key]) {
          statsMap[key] = {
            key,
            recipientType,
            recipientHandle: handle || 'support',
            recipientName,
            recipientEmail,
            route,
            totalContacts: 0,
            unreadCount: 0,
            uniqueSendersSet: new Set(),
            lastContactedAt: null,
            lastSender: null
          };
        }

        const entry = statsMap[key];
        entry.totalContacts += 1;
        if (!m.isRead) entry.unreadCount += 1;
        if (m.senderEmail) entry.uniqueSendersSet.add(m.senderEmail.toLowerCase());

        if (!entry.lastContactedAt || new Date(m.createdAt) > new Date(entry.lastContactedAt)) {
          entry.lastContactedAt = m.createdAt;
          entry.lastSender = {
            name: m.senderName,
            email: m.senderEmail,
            subject: m.subject || 'Portfolio Contact Inquiry'
          };
        }
      });

      const recipientStats = Object.values(statsMap)
        .map((item) => ({
          key: item.key,
          recipientType: item.recipientType,
          recipientHandle: item.recipientHandle,
          recipientName: item.recipientName,
          recipientRole: item.recipientRole || null,
          recipientEmail: item.recipientEmail,
          route: item.route,
          totalContacts: item.totalContacts,
          uniqueSendersCount: item.uniqueSendersSet.size,
          unreadCount: item.unreadCount,
          lastContactedAt: item.lastContactedAt,
          lastSender: item.lastSender
        }))
        .sort((a, b) => b.totalContacts - a.totalContacts);

      // Build privacy-safe contact activity log (NO full message body!)
      const sanitizedLogs = rawMessages.map((m) => {
        let handle = (m.recipientHandle || '').toLowerCase().trim();
        if (handle === 'demo') handle = 'marcus';
        if (handle === 'sample') handle = 'elena';

        const isShowcase = Boolean(SHOWCASE_DIRECTORY[handle]);
        const key = isShowcase
          ? `showcase:${handle}`
          : m.recipientUserId || handle
          ? `user:${handle || m.recipientUserId?._id}`
          : m.subject && m.subject.toLowerCase().includes('enterprise')
          ? 'platform:sales'
          : 'platform:support';

        const statEntry = statsMap[key];

        return {
          _id: m._id,
          recipientType: statEntry?.recipientType || 'user',
          recipientHandle: handle,
          recipientName: statEntry?.recipientName || handle || 'User',
          recipientEmail: statEntry?.recipientEmail || '',
          recipientRoute: statEntry?.route || '#',
          recipientTotalContacts: statEntry?.totalContacts || 1,
          senderName: m.senderName,
          senderEmail: m.senderEmail,
          subject: m.subject || 'Portfolio Contact Inquiry',
          isRead: m.isRead,
          createdAt: m.createdAt
          // Note: `message` content is intentionally omitted for privacy!
        };
      });

      const unreadCount = rawMessages.filter((m) => !m.isRead).length;

      res.status(200).json({
        success: true,
        count: sanitizedLogs.length,
        unreadCount,
        recipientStats,
        messages: sanitizedLogs
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   POST /api/messages/admin/unlock
// @desc    Verify Admin password or Admin Secret Code to unlock private message bodies
// @access  Private (Admin)
router.post(
  '/admin/unlock',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied: Admin role required.' });
      }

      const { password } = req.body;
      if (!password || !password.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Please enter your Admin password or Administrator Secret Code.'
        });
      }

      const trimmed = password.trim();
      let isAuthorized = false;

      // 1. Check if it matches ADMIN_SECRET
      if (trimmed === ADMIN_SECRET) {
        isAuthorized = true;
      }

      // 2. Or check if it matches the logged-in Admin user's account password
      if (!isAuthorized) {
        const adminUser = await User.findById(req.user._id).select('+password');
        if (adminUser && (await adminUser.matchPassword(trimmed))) {
          isAuthorized = true;
        }
      }

      if (!isAuthorized) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Admin password or Secret Code. Message bodies remain locked.'
        });
      }

      const rawMessages = await Message.find({}).select('_id message');
      const unlockedBodies = {};
      rawMessages.forEach((m) => {
        unlockedBodies[m._id] = m.message;
      });

      res.status(200).json({
        success: true,
        message: 'Message bodies unlocked for this admin session.',
        unlockedBodies
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   GET /api/messages/:id/read
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
// @desc    Delete a message log entry
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
      res.status(200).json({ success: true, message: 'Message record deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
