const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/User');
const Layout = require('../models/Layout');
const sendEmail = require('../utils/sendEmail');

const ADMIN_SECRET = process.env.ADMIN_SECRET_CODE || 'PORTFOLIO_CRAFT_ADMIN_2026';

// Helper to get client frontend URL dynamically
const getClientUrl = (req) => {
  if (process.env.CLIENT_URL) return process.env.CLIENT_URL.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const host = req.headers['x-forwarded-host'] || req.get('host') || '';
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return 'http://localhost:5173';
  }
  return `${protocol}://${host}`;
};

// Helper to generate JWT token
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role, username: user.username },
    process.env.JWT_SECRET || 'secret_key_123',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      plan: user.plan || 'free',
      isVerified: user.isVerified
    }
  });
};

// @route   POST /api/auth/register
// @desc    Register new user (Supports optional Admin Secret Code)
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, adminSecretCode } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username, email and password' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    // Verify Admin Secret Code if provided
    let assignedRole = 'standard';
    if (adminSecretCode) {
      if (adminSecretCode.trim() === ADMIN_SECRET) {
        assignedRole = 'admin';
      } else {
        return res.status(400).json({ success: false, message: 'Invalid Administrator Secret Code' });
      }
    }

    // Create user instance
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
      role: assignedRole,
      plan: 'free'
    });

    // Generate email verification token
    const verificationToken = user.getVerificationToken();
    await user.save();

    // Send verification email
    const clientUrl = getClientUrl(req);
    const verifyUrl = `${clientUrl}/verify-email/${verificationToken}`;
    const message = `You are receiving this email because you (or someone else) registered a new account on PortfolioCraft.\n\nPlease click the link below to verify your email address:\n\n${verifyUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Email Verification - PortfolioCraft',
        message
      });
    } catch (error) {
      console.log(error);
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }

    // Create default initial portfolio layout for user
    await Layout.create({
      userId: user._id,
      handle: username.toLowerCase(),
      title: `${username}'s Portfolio`,
      components: [
        {
          id: 'hero-1',
          type: 'HeroBanner',
          title: 'Hero Banner',
          order: 0,
          isVisible: true,
          props: {
            headline: `Hi, I'm ${username}`,
            subheadline: 'Full Stack Developer & Creative Innovator',
            ctaText: 'View My Work',
            ctaLink: '#projects',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
          }
        },
        {
          id: 'about-1',
          type: 'AboutMe',
          title: 'About Me',
          order: 1,
          isVisible: true,
          props: {
            heading: 'About Me',
            bio: 'I build modern, high-performance web applications with clean design and robust architecture.',
            skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'TypeScript']
          }
        },
        {
          id: 'projects-1',
          type: 'ProjectsGrid',
          title: 'Featured Projects',
          order: 2,
          isVisible: true,
          props: {
            heading: 'Featured Projects',
            items: [
              {
                id: 'p1',
                title: 'Portfolio Platform',
                description: 'Dynamic MERN layout engine with real-time preview and custom drag-and-drop components.',
                tags: ['MongoDB', 'Express', 'React', 'Node.js'],
                githubUrl: `https://github.com/${username}/portfolio-platform`,
                liveUrl: 'https://portfolio-platform.dev'
              }
            ]
          }
        },
        {
          id: 'contact-1',
          type: 'ContactSection',
          title: 'Get In Touch',
          order: 3,
          isVisible: true,
          props: {
            heading: 'Let\'s Work Together',
            email: email,
            messagePlaceholder: 'Send me a message...'
          }
        }
      ]
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/auth/verify-email/:verificationToken
// @desc    Verify email address token
// @access  Public
router.get('/verify-email/:verificationToken', async (req, res) => {
  try {
    const verificationToken = crypto
      .createHash('sha256')
      .update(req.params.verificationToken)
      .digest('hex');

    const user = await User.findOne({
      verificationToken,
      verificationTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Email successfully verified!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user & get JWT token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get logged in user profile
// @access  Private
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user
    });
  }
);

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
// @access  Private
router.post(
  '/resend-verification',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (user.isVerified) {
        return res.status(400).json({ success: false, message: 'Email is already verified' });
      }

      // Generate email verification token
      const verificationToken = user.getVerificationToken();
      await user.save();

      // Send verification email
      const clientUrl = getClientUrl(req);
      const verifyUrl = `${clientUrl}/verify-email/${verificationToken}`;
      const message = `You requested a new verification link for PortfolioCraft.\n\nPlease click the link below to verify your email address:\n\n${verifyUrl}`;

      try {
        await sendEmail({
          email: user.email,
          subject: 'Resend: Email Verification - PortfolioCraft',
          message
        });
        res.status(200).json({ success: true, message: 'Verification email sent' });
      } catch (error) {
        console.error(error);
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({ success: false, message: 'Email could not be sent' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
