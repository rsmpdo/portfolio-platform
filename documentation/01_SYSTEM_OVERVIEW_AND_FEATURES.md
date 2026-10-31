# System Overview & Feature Specifications

**Course:** EC4307 Web Application Development Mini Project  
**Institution:** University of Ruhuna, Faculty of Engineering  
**Application Title:** PortfolioCraft (MERN Stack Portfolio Management Platform)  
**Author:** Ranaweerage Shashika Madhusankha Priyanath  

---

## 1. Executive Summary

**PortfolioCraft** is a modern, component-driven Portfolio Management System built using the **MERN Stack** (MongoDB, Express.js, React 18, Node.js). Engineered to empower developers, designers, and creative professionals, the platform delivers an Adobe Portfolio–grade content management system (CMS) where creators can visually construct, customize, and publish high-performance web portfolios without writing code.

The system solves the friction of traditional portfolio maintenance by pairing a schema-less document store (MongoDB) with a modular React visual builder. Layout configurations are stored as structured JSON documents, enabling instant switching between design themes without losing portfolio content.

---

## 2. Core Platform Capabilities & Modules

```
                                  PORTFOLIOCRAFT ECOSYSTEM
                                              │
    ┌───────────────────────┬─────────────────┴─────────────────┬───────────────────────┐
    ▼                       ▼                                   ▼                       ▼
[Visual CMS Editor]     [Dynamic Renderer]             [Creator Analytics]      [Platform Management]
 ├─ Drag & Drop Ordering ├─ Edge-rendered /p/:handle    ├─ Total Views Counter   ├─ Role-Based Access
 ├─ 10 Component Types   ├─ Realtime theme CSS tokens   ├─ Unique Visitors       ├─ Payment Slip Review
 ├─ 30-State Undo/Redo   ├─ Custom fonts injection      ├─ ATS Resume CTR (%)    ├─ Candidate Applications
 ├─ Live Theme Selector  ├─ ATS Resume Print Engine     ├─ 14-Day Velocity Chart ├─ Contact Inquiry Logs
 └─ Viewport Simulator   └─ SEO OpenGraph preview       └─ Inbound Referrers     └─ Security & Rate Limits
```

### 2.1. Visual Component-Based CMS Editor
The heart of PortfolioCraft is an interactive React-driven builder located at `/editor`:
- **Active Section Management:** Creators can add, delete, reorder, and toggle visibility of 10 distinct content sections with instant visual feedback.
- **Undo / Redo Action History:** Built with a 30-state Redux history stack. Creators can freely experiment with layouts, color schemes, or component deletions, pressing `Ctrl + Z` (or `Cmd + Z`) to undo and `Ctrl + Y` (or `Cmd + Shift + Z`) to redo.
- **Live Device Viewport Simulator:** Switch between **Desktop (100%)**, **Tablet (768px)**, and **Mobile (390px)** modes to inspect responsive wrapping and touch targets in real-time.
- **Live Template Switching:** Switch between 6 curated portfolio themes (*Minimalist Editorial*, *Spatial Architect*, *Swiss Grid*, *Dark Luxe*, *Vibrant Creative*, *Cyberpunk Dev*) with content retention.

### 2.2. Comprehensive Component Library (11 Types)
1. **Hero Banner (`HeroBanner`)**: Headline, subtitle, avatar photo upload, dynamic status badge, CTA button, and ambient cinematic video background (`bgVideoUrl`).
2. **Social Links (`SocialLinks`)**: Dedicated modular section for social channels (GitHub, LinkedIn, Twitter/X, Dribbble, Behance, YouTube, Personal Website) with custom handle labels and direct outbound URLs.
3. **About Me (`AboutMe`)**: Personal biography, highlighted skills pills, years of experience, completed project counters, and client satisfaction metrics.
4. **Projects Grid (`ProjectsGrid`)**: Multi-card portfolio showcase with project screenshots, titles, descriptions, technology tags, live demo URLs, and GitHub repository links.
5. **Experience Timeline (`ExperienceTimeline`)**: Career chronology with organization names, roles, employment periods, key deliverables, and competency tags.
6. **Skills Cloud (`SkillsCloud`)**: Grouped technical competencies (Frontend, Backend, DevOps, Tooling) with animated interactive badges.
7. **Case Study & Markdown (`RichTextSection`)**: Freeform technical writing supporting GitHub-flavored markdown, callout blocks, and preformatted code blocks.
8. **Interactive Prototype (`PremiumEmbed`)**: Pro/Studio embed support for **Figma & FigJam** prototypes, **Spline 3D** WebGL scenes, **YouTube / Loom** walkthroughs, and code sandboxes (CodePen, StackBlitz).
9. **Data Metrics & Impact (`AdvancedMetrics`)**: Quantified KPI cards showcasing engineering and business outcomes (e.g. `$12M+ Assets`, `99.99% SLA`).
10. **Visual Showcase (`MediaGallery`)**: High-resolution gallery for design artifacts, branding mockups, and visual case studies.
11. **Testimonials Carousel (`TestimonialsCarousel`)**: Client recommendations, author avatars, titles, and ratings.

---

### 2.3. Theme Engine & Typography Selector
- **6 Granular Color Tokens:** Full control over Primary Accent (`--theme-primary`), Secondary Accent (`--theme-secondary`), Canvas Background (`--theme-bg`), Card Surface (`--theme-surface`), Primary Text (`--theme-text`), and Muted Text (`--theme-muted`).
- **1-Click Curated Palettes:** Instant application of *Emerald Matrix*, *Obsidian Gold*, *Electric Violet*, *Cyberpunk Cyan*, *Crimson Dusk*, *OLED Pure Dark*, *Nordic Light*, and *Warm Paper*.
- **9 Google Fonts:** Live dynamic font switching across *Plus Jakarta Sans*, *Outfit*, *Inter*, *Space Grotesk*, *Playfair Display*, *Syne*, *Cinzel*, *DM Sans*, and *JetBrains Mono*.

---

### 2.4. 1-Click ATS-Friendly "Download as PDF Resume"
- Automatically aggregates structured portfolio information (Hero name, About Me bio, Skills categories, Experience chronology, Projects, and Contact info) into a clean, single-page vector document.
- Uses native browser `@media print` CSS rules inside an isolated iframe, guaranteeing 100% selectable, high-contrast text parseable by Applicant Tracking Systems (ATS).
- Toggleable in editor settings (`theme.showResumeDownload`) and triggers download tracking on public visits.

---

### 2.5. Cookieless Creator Analytics Dashboard
- Private, privacy-friendly telemetry panel integrated into the editor sidebar (`/editor` Analytics tab).
- **Four Core Metrics:** Total Profile Views, Unique Visitors, ATS Resume Downloads, and Resume Click-Through Rate (CTR %).
- **14-Day View Velocity Chart:** Interactive bar chart visualizing traffic spikes and view distribution over time.
- **Traffic Referrers Breakdown:** Source distribution across LinkedIn, GitHub, Twitter/X, Google Search, and Direct traffic.
- **Privacy First:** 100% cookieless tracking using server-side daily hashed visits without third-party tracking beacons.
- **Tier Gating:** Free users receive a teaser card with live view counters and an upgrade prompt; Pro and Studio creators unlock full velocity history and CTR calculations.

---

### 2.6. Public Portfolio Dynamic Rendering Engine
- Publicly accessible via `/p/:handle` (e.g., `/p/alex-morgan`).
- Server dynamically fetches layout JSON from MongoDB, validates publication state (`isPublished === true`), and mounts responsive components with zero layout shifts.
- Dynamic HTML document headers inject creator custom meta titles, descriptions, and keywords for search engine optimization (SEO).

---

### 2.7. Administrative Control & Business Workflows
- **Admin Dashboard (`/admin`):** Protected route accessible via JWT role verification or secret elevation code.
- **Contact Message Logs:** Real-time visibility into inquiries sent to platform creators with sender metadata and inquiry types.
- **Payment Verification System:** Creators on the free plan submit manual payment receipts (e.g. Wise bank transfer slips). Administrators review uploaded slips in `/admin` and approve or reject them to elevate user plans to Pro or Studio.
- **Job Applications (`/careers`):** Dedicated applicant tracking where candidate resumes and applications submitted through `/careers` are inspected and managed by administrators.
- **Newsletter Subscribers (`/blog`):** Aggregated subscriber directory with exportable email records.

---

### 2.8. Account Security & Authenticator App Two-Factor Authentication (2FA)
- **RFC 6238 TOTP Standard:** Two-Factor Authentication implemented in `backend/utils/totp.js` using Node's native `crypto` module with zero external dependencies.
- **Authenticator App Support:** Compatible with standard TOTP applications including Google Authenticator, Microsoft Authenticator, 1Password, and Authy.
- **Setup & Verification Workflow:**
  1. `POST /api/users/2fa/setup`: Generates a cryptographically secure Base32 secret, temporary setup cache, and vector SVG QR code data URL.
  2. `POST /api/users/2fa/verify`: Validates the 6-digit TOTP token against a $\pm 1$ time-step drift window (30-second intervals) and commits `twoFactorEnabled: true` to the user record.
  3. Emergency backup recovery codes are generated and hashed for safe account recovery.
  4. `POST /api/users/2fa/disable`: Requires current account password confirmation to revoke 2FA.
- **Two-Step Login Challenge:** When a 2FA-enabled account logs in via `POST /api/users/login`, the server responds with `{ require2FA: true, tempToken }`. The client prompts for the 6-digit authenticator code before issuing the final signed JWT session token.

---

### 2.9. Creator Plans & Tier Management
- **Plans Architecture (`/plans`):** Structured pricing tiers engineered for creators at different career stages:
  - **Free Forever ($0):** 1 live published portfolio, 5 modular sections, Cloudinary CDN media uploads, custom `/p/username` slug, and ATS resume export.
  - **Pro Creator ($12 one-time lifetime):** Up to 3 published portfolios, unlimited sections, interactive Figma/Spline/CodePen embeds, and visitor telemetry.
  - **Studio & Team ($29 one-time lifetime):** Up to 5 published portfolios, cinematic video backgrounds, 3D Spline embeds, white-label branding removal, and priority CDN edge caching.
- **Homepage Tier Overview:** Transparent tier comparison matrix integrated directly on the homepage (`/`) to guide creator onboarding.

---

### 2.10. Newsletter Subscription & Outbound Notifications
- **Blog Subscription Integration (`/blog`):** Newsletter subscription widget capturing creator audience emails with client-side regex validation and duplicate prevention.
- **Canonical URL Enforcement:** Outbound email service (`backend/utils/emailTemplate.js`) normalizes all verification and CTA URLs to the canonical production domain (`https://portfoliocraftlk.vercel.app`), eliminating broken localhost references in staging and production.

---

### 2.11. Dynamic Homepage Experience
- **Cycling Showcase Background:** Background gallery featuring 6 verified high-resolution portfolio designs (Product Systems, Strategy, Distributed Code, Spatial 3D, Haute Editorial, Analytics) cross-fading automatically every 4.5 seconds with dark contrast gradient masks.
- **Interactive Live Preview:** Real-time persona switcher (Product Designer, Cloud Architect, Creative Director) displaying live portfolio previews, metrics, and SSL indicators.
- **Balanced Two-Line Headline:** Responsive headline structure designed to render cleanly across desktop, tablet, and mobile viewports.
