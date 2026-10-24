const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/User');
const Layout = require('../models/Layout');
const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

const ADMIN_SECRET = process.env.ADMIN_SECRET_CODE || 'PORTFOLIO_CRAFT_ADMIN_2026';

// Helper to get client frontend URL dynamically
const getClientUrl = (req) => {
  if (process.env.CLIENT_URL && !process.env.CLIENT_URL.includes('localhost')) {
    return process.env.CLIENT_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  const host = req?.headers?.['x-forwarded-host'] || req?.get?.('host') || '';
  const protocol = req?.headers?.['x-forwarded-proto'] || req?.protocol || 'https';
  if (host && !host.includes('localhost') && !host.includes('127.0.0.1') && !host.includes('vercel.com')) {
    return `${protocol}://${host}`;
  }
  return process.env.PUBLIC_CLIENT_URL || 'https://portfolio-platform.vercel.app';
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
      _id: user._id,
      username: user.username,
      fullName: user.fullName || '',
      headline: user.headline || '',
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || '',
      github: user.github || '',
      linkedin: user.linkedin || '',
      twitter: user.twitter || '',
      email: user.email,
      role: user.role,
      plan: user.plan || 'free',
      isVerified: user.isVerified,
      createdAt: user.createdAt
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
      plan: 'free',
      isVerified: assignedRole === 'admin' ? true : false
    });

    if (assignedRole === 'admin') {
      await user.save();
    } else {
      // Generate email verification token for standard users
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
        console.log('Email send error:', error);
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({ success: false, message: 'Email could not be sent' });
      }
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

// @route   POST /api/auth/forgot-password
// @desc    Send password reset token link via email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email address' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with that email address' });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Build reset URL
    const clientUrl = getClientUrl(req);
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    const message = `You requested a password reset for your PortfolioCraft account.\n\nPlease reset your password by clicking the link below (valid for 10 minutes):\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 28px; background-color: #0b0f19; color: #f8fafc; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #6366f1; margin: 0; font-size: 24px; font-weight: 800;">PortfolioCraft</h2>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Password Reset Request</p>
        </div>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">Hello <strong>${user.fullName || user.username}</strong>,</p>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
          We received a request to reset your PortfolioCraft account password. Click the button below to choose a new password. This link is valid for <strong>10 minutes</strong>.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: #ffffff; padding: 14px 28px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);">
            Reset Password
          </a>
        </div>
        <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <a href="${resetUrl}" style="color: #818cf8; word-break: break-all;">${resetUrl}</a>
        </p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
        <p style="color: #64748b; font-size: 11px; text-align: center; margin: 0;">
          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Reset your PortfolioCraft password',
        message,
        html
      });

      res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email address.'
      });
    } catch (err) {
      console.error('Password reset email failed:', err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: 'Could not send reset email. Please try again.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password using token
// @access  Public
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset link. Please request a new one.'
      });
    }

    // Set new password
    user.password = String(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now log in with your new password.'
    });
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

// @route   POST /api/auth/elevate-admin
// @desc    Elevate logged-in user account to Administrator using secret code
// @access  Private
router.post(
  '/elevate-admin',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { adminSecretCode } = req.body;
      if (!adminSecretCode || adminSecretCode.trim() !== ADMIN_SECRET) {
        return res.status(400).json({ success: false, message: 'Invalid Administrator Secret Code' });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      user.role = 'admin';
      user.isVerified = true;
      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

      res.status(200).json({
        success: true,
        message: 'Account elevated to Administrator successfully',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          plan: user.plan,
          isVerified: user.isVerified
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/auth/profile
// @desc    Update logged-in user's profile information (name, bio, headline, links, etc.)
// @access  Private
router.put(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const {
        username,
        fullName,
        headline,
        bio,
        location,
        website,
        github,
        linkedin,
        twitter
      } = req.body;

      if (username !== undefined && username.trim() !== user.username) {
        const cleanUsername = username.trim();
        if (cleanUsername.length < 3 || cleanUsername.length > 30) {
          return res.status(400).json({
            success: false,
            message: 'Username must be between 3 and 30 characters.'
          });
        }
        const existingUser = await User.findOne({
          username: cleanUsername,
          _id: { $ne: user._id }
        });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'That username is already taken by another user.'
          });
        }
        user.username = cleanUsername;
      }

      if (fullName !== undefined) user.fullName = String(fullName).trim();
      if (headline !== undefined) user.headline = String(headline).trim();
      if (bio !== undefined) user.bio = String(bio).trim();
      if (location !== undefined) user.location = String(location).trim();
      if (website !== undefined) user.website = String(website).trim();
      if (github !== undefined) user.github = String(github).trim();
      if (linkedin !== undefined) user.linkedin = String(linkedin).trim();
      if (twitter !== undefined) user.twitter = String(twitter).trim();

      await user.save();

      res.status(200).json({
        success: true,
        message: 'Profile information updated successfully!',
        user: {
          id: user._id,
          _id: user._id,
          username: user.username,
          fullName: user.fullName || '',
          headline: user.headline || '',
          bio: user.bio || '',
          location: user.location || '',
          website: user.website || '',
          github: user.github || '',
          linkedin: user.linkedin || '',
          twitter: user.twitter || '',
          email: user.email,
          role: user.role,
          plan: user.plan || 'free',
          isVerified: user.isVerified,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/auth/password
// @desc    Update logged-in user's account password after verifying current password
// @access  Private
router.put(
  '/password',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Please provide both your current password and new password.'
        });
      }
      if (String(newPassword).length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long.'
        });
      }

      const user = await User.findById(req.user.id).select('+password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const isMatch = await user.matchPassword(String(currentPassword).trim());
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect.'
        });
      }

      user.password = String(newPassword);
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Your account password has been updated successfully!'
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   POST /api/auth/delete-account
// @desc    Permanently delete logged-in user's account and portfolios after password verification
// @access  Private
router.post(
  '/delete-account',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { password } = req.body;
      if (!password || !String(password).trim()) {
        return res.status(400).json({
          success: false,
          message: 'Please enter your account password to confirm deletion.'
        });
      }

      const user = await User.findById(req.user.id).select('+password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const trimmed = String(password).trim();
      const isPasswordValid =
        (await user.matchPassword(trimmed)) ||
        (user.role === 'admin' && trimmed === ADMIN_SECRET);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect password. Please enter your valid account password.'
        });
      }

      await Layout.deleteMany({ userId: user._id });
      await Message.deleteMany({ recipientUserId: user._id });
      await User.findByIdAndDelete(user._id);

      res.status(200).json({
        success: true,
        message: 'Your account and all associated portfolios have been permanently deleted.'
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
