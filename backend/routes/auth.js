const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const Layout = require('../models/Layout');
const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');
const { getEmailVerificationTemplate, getPasswordResetTemplate } = require('../utils/emailTemplate');
const {
  generateBase32Secret,
  verifyTOTP,
  generateRecoveryCodes,
  buildOtpAuthUrl
} = require('../utils/totp');

// Strict rate limiters for authentication endpoints to prevent brute-force attacks and email spamming
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 attempts per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP address. Please try again after 15 minutes.'
  }
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // max 10 account registrations per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many accounts registered from this IP address. Please try again later.'
  }
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 password reset requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many password reset requests from this IP address. Please wait 15 minutes before requesting another link.'
  }
});

const resendVerificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 resend requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many verification email requests. Please wait 15 minutes before trying again.'
  }
});

const ADMIN_SECRET = process.env.ADMIN_SECRET_CODE || 'PORTFOLIO_CRAFT_ADMIN_2026';

// Helper to get client frontend URL dynamically (always uses production URL for emails instead of localhost)
const getClientUrl = () => {
  if (
    process.env.CLIENT_URL &&
    !process.env.CLIENT_URL.includes('localhost') &&
    !process.env.CLIENT_URL.includes('127.0.0.1')
  ) {
    return process.env.CLIENT_URL.replace(/\/$/, '');
  }
  return 'https://portfoliocraftlk.vercel.app';
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
      twoFactorEnabled: Boolean(user.twoFactorEnabled),
      createdAt: user.createdAt
    }
  });
};

// @route   POST /api/auth/register
// @desc    Register new user (Supports optional Admin Secret Code)
// @access  Public
router.post('/register', registerLimiter, async (req, res) => {
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
      const html = getEmailVerificationTemplate({
        recipientName: user.fullName || user.username,
        verifyUrl
      });

      try {
        await sendEmail({
          email: user.email,
          subject: 'Email Verification - PortfolioCraft',
          message,
          html
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
router.post('/login', loginLimiter, async (req, res) => {
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

    // Check if Two-Factor Authentication (Authenticator App) is enabled
    if (user.twoFactorEnabled) {
      const tempToken = jwt.sign(
        { id: user._id, purpose: '2fa_login' },
        process.env.JWT_SECRET || 'secret_key_123',
        { expiresIn: '10m' }
      );
      return res.status(200).json({
        success: true,
        requiresTwoFactor: true,
        tempToken,
        message: 'Enter the 6-digit code from your Authenticator app.'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/2fa/login-verify
// @desc    Verify 6-digit Authenticator App TOTP code or backup recovery code during login
// @access  Public (Requires valid 2FA tempToken)
router.post('/2fa/login-verify', loginLimiter, async (req, res) => {
  try {
    const { tempToken, code } = req.body;
    if (!tempToken || !code) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your 6-digit Authenticator code or recovery code.'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.JWT_SECRET || 'secret_key_123');
    } catch {
      return res.status(401).json({
        success: false,
        message: 'Your 2FA verification session expired. Please sign in again.'
      });
    }

    if (decoded.purpose !== '2fa_login' || !decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid verification session.' });
    }

    const user = await User.findById(decoded.id).select('+twoFactorSecret +twoFactorRecoveryCodes');
    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return res.status(400).json({ success: false, message: '2FA is not active on this account.' });
    }

    const cleanCode = String(code).trim().toUpperCase();
    const isTotpValid = verifyTOTP(cleanCode, user.twoFactorSecret);

    let isRecoveryValid = false;
    if (!isTotpValid && Array.isArray(user.twoFactorRecoveryCodes)) {
      const idx = user.twoFactorRecoveryCodes.findIndex(
        (rc) => String(rc).toUpperCase() === cleanCode
      );
      if (idx !== -1) {
        isRecoveryValid = true;
        user.twoFactorRecoveryCodes.splice(idx, 1);
        await user.save({ validateBeforeSave: false });
      }
    }

    if (!isTotpValid && !isRecoveryValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Authenticator code. Please check your app and try again.'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset token link via email
// @access  Public
router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
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

    const html = getPasswordResetTemplate({
      recipientName: user.fullName || user.username,
      resetUrl,
      expiresIn: '10 minutes'
    });

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
  resendVerificationLimiter,
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
      const html = getEmailVerificationTemplate({
        recipientName: user.fullName || user.username,
        verifyUrl
      });

      try {
        await sendEmail({
          email: user.email,
          subject: 'Resend: Email Verification - PortfolioCraft',
          message,
          html
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
          twoFactorEnabled: Boolean(user.twoFactorEnabled),
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

// @route   POST /api/auth/2fa/setup
// @desc    Generate TOTP secret & QR code for Authenticator App setup
// @access  Private
router.post(
  '/2fa/setup',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('+twoFactorTempSecret');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const secret = generateBase32Secret(20);
      user.twoFactorTempSecret = secret;
      await user.save({ validateBeforeSave: false });

      const otpauthUrl = buildOtpAuthUrl({
        secret,
        accountName: user.email,
        issuer: 'PortfolioCraft'
      });
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(
        otpauthUrl
      )}`;

      res.status(200).json({
        success: true,
        secret,
        otpauthUrl,
        qrCodeUrl
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   POST /api/auth/2fa/verify-setup
// @desc    Verify 6-digit TOTP code from Authenticator App and activate 2FA
// @access  Private
router.post(
  '/2fa/verify-setup',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({
          success: false,
          message: 'Please enter the 6-digit code from your Authenticator app.'
        });
      }

      const user = await User.findById(req.user.id).select(
        '+twoFactorTempSecret +twoFactorSecret +twoFactorRecoveryCodes'
      );
      if (!user || !user.twoFactorTempSecret) {
        return res.status(400).json({
          success: false,
          message: 'Please start 2FA setup first to generate a QR code.'
        });
      }

      const isValid = verifyTOTP(code, user.twoFactorTempSecret);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: 'Invalid 6-digit code. Ensure your Authenticator app clock is synced and try again.'
        });
      }

      const recoveryCodes = generateRecoveryCodes(8);
      user.twoFactorSecret = user.twoFactorTempSecret;
      user.twoFactorTempSecret = undefined;
      user.twoFactorEnabled = true;
      user.twoFactorRecoveryCodes = recoveryCodes;
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: 'Two-Factor Authentication (2FA) is now enabled on your account!',
        recoveryCodes,
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
          twoFactorEnabled: true,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   POST /api/auth/2fa/disable
// @desc    Disable Authenticator App 2FA after verifying password or 6-digit TOTP code
// @access  Private
router.post(
  '/2fa/disable',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { password, code } = req.body;
      if (!password && !code) {
        return res.status(400).json({
          success: false,
          message: 'Please enter your current password or 6-digit Authenticator code to disable 2FA.'
        });
      }

      const user = await User.findById(req.user.id).select(
        '+password +twoFactorSecret +twoFactorTempSecret +twoFactorRecoveryCodes'
      );
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      let authorized = false;
      if (password && String(password).trim()) {
        authorized = await user.matchPassword(String(password).trim());
      }
      if (!authorized && code && user.twoFactorSecret) {
        authorized = verifyTOTP(String(code).trim(), user.twoFactorSecret);
      }

      if (!authorized) {
        return res.status(401).json({
          success: false,
          message: 'Invalid password or Authenticator code. Could not disable 2FA.'
        });
      }

      user.twoFactorEnabled = false;
      user.twoFactorSecret = undefined;
      user.twoFactorTempSecret = undefined;
      user.twoFactorRecoveryCodes = [];
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: 'Two-Factor Authentication has been disabled.',
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
          twoFactorEnabled: false,
          createdAt: user.createdAt
        }
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
