const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Trust reverse proxy headers (e.g. Vercel, Nginx, Cloudflare) for accurate client IP rate limiting
app.set('trust proxy', 1);

// Security Middlewares
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during development/staging
      }
    },
    credentials: true
  })
);

// Body Parser Middleware
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payment/webhook') {
    next();
  } else {
    express.json({ limit: '10mb' })(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api/', apiLimiter);

// Passport Middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/layouts', require('./routes/layout'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/messages', require('./routes/message'));
app.use('/api/careers', require('./routes/career'));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Portfolio API Backend is running smoothly', timestamp: new Date() });
});

// Dynamic Sitemap Generator for Search Engines
app.get(['/sitemap.xml', '/api/sitemap.xml'], async (req, res) => {
  try {
    const Layout = require('./models/Layout');
    const baseUrl = process.env.CLIENT_URL || 'https://portfoliocraftlk.vercel.app';
    const now = new Date().toISOString().split('T')[0];

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/features', priority: '0.9', changefreq: 'weekly' },
      { url: '/templates', priority: '0.9', changefreq: 'weekly' },
      { url: '/showcase', priority: '0.9', changefreq: 'daily' },
      { url: '/pricing', priority: '0.8', changefreq: 'weekly' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/blog', priority: '0.8', changefreq: 'weekly' },
      { url: '/careers', priority: '0.6', changefreq: 'monthly' },
      { url: '/contact', priority: '0.6', changefreq: 'monthly' },
      { url: '/showcase/alex', priority: '0.8', changefreq: 'weekly' },
      { url: '/showcase/marcus', priority: '0.8', changefreq: 'weekly' },
      { url: '/showcase/elena', priority: '0.8', changefreq: 'weekly' }
    ];

    let dynamicUrls = [];
    try {
      const publishedLayouts = await Layout.find(
        { isPublished: true, isBanned: { $ne: true }, handle: { $exists: true, $ne: '' } },
        'handle updatedAt'
      ).lean();

      dynamicUrls = publishedLayouts.map((l) => ({
        url: `/p/${l.handle}`,
        lastmod: (l.updatedAt || new Date()).toISOString().split('T')[0],
        priority: '0.8',
        changefreq: 'weekly'
      }));
    } catch (dbErr) {
      console.warn('Could not query dynamic sitemap layouts:', dbErr.message);
    }

    const allUrls = [...staticPages.map((p) => ({ ...p, lastmod: now })), ...dynamicUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${baseUrl}${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

// Robots.txt
app.get(['/robots.txt', '/api/robots.txt'], (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'https://portfoliocraftlk.vercel.app';
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /editor\nDisallow: /profile\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
});

// Global 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;

// Trigger nodemon restart for environment variables
