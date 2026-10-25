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

### 2.2. Comprehensive Component Library (10 Types)
1. **Hero Banner (`HeroBanner`)**: Impactful headline, subtitle, avatar image upload, dynamic badge, CTA action button, ambient video background (`bgVideoUrl`), and social links (GitHub, LinkedIn).
2. **About Me (`AboutMe`)**: Personal biography, highlighted skills pills, years of experience, completed project counters, and client satisfaction numbers.
3. **Projects Grid (`ProjectsGrid`)**: Multi-card portfolio showcase with project images, title, description, technology tags, live demo links, and direct GitHub source code buttons.
4. **Experience Timeline (`ExperienceTimeline`)**: Career chronology with company names, roles, employment dates, achievement descriptions, and key competence tags.
5. **Skills Cloud (`SkillsCloud`)**: Categorized technical competencies grouped into Frontend, Backend, DevOps, and Tooling with animated interactive skill badges.
6. **Case Study & Markdown (`RichTextSection`)**: Freeform technical prose supporting GitHub-flavored markdown, callout blockquotes, and preformatted code blocks with syntax decoration.
7. **Interactive Prototype (`PremiumEmbed`)**: Pro/Studio feature supporting embeds for **Figma & FigJam** clickable prototypes, **Spline 3D** WebGL interactive scenes, **YouTube / Loom** async video walkthroughs, and custom sandboxes (CodePen, StackBlitz).
8. **Data Metrics & Impact (`AdvancedMetrics`)**: Enterprise metric cards displaying quantified business outcomes (e.g. `$12M+ Revenue`, `99.99% Uptime SLA`).
9. **Visual Showcase (`MediaGallery`)**: Grid of visual design artifacts with high-resolution imagery and design descriptions.
10. **Testimonials Carousel (`TestimonialsCarousel`)**: Client quotes, author avatars, and credentials.

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
