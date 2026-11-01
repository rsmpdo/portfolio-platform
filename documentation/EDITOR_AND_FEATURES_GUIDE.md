# 08. Visual Portfolio Editor & Feature Tier Reference

This document covers the architecture, workspace layout, tools, and plan-based feature availability of the PortfolioCraft Visual Editor (`/editor`). All editor logic is implemented across `frontend/src/pages/Editor.jsx`, `frontend/src/components/editor/EditorSidebar.jsx`, `frontend/src/components/editor/ComponentInspector.jsx`, `frontend/src/store/layoutSlice.js`, and `backend/routes/layout.js`.

---

## 1. Creator Plan Tiers Overview

PortfolioCraft offers three lifetime creator plans (`free`, `pro`, and `studio`). Features inside the visual editor check `user.plan` on the client for UI state and on the Express backend (`backend/routes/layout.js`) to enforce server-side limits.

| Plan Key | Display Name | Price | Max Live Portfolios | Max Sections per Portfolio | Core Editor Unlocks |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `free` | **Free Forever** | \$0 (forever) | 1 portfolio | Up to 5 sections | Visual CMS editor, 10 standard section types, 4 Free templates, 8 color palettes, 9 fonts, custom URL handle (`/p/:handle`), 1-click ATS PDF resume generator, live view and resume download counters, Cloudinary image uploads. |
| `pro` | **Pro Creator** | \$12 (one-time) | Up to 3 portfolios | Unlimited sections | Everything in Free + Interactive Embed section (`PremiumEmbed` for Figma, YouTube, Custom Iframes), 3 Pro templates, Phone/WhatsApp field in Contact section, SEO Meta Optimization with Google search snippet preview, full Cookieless Creator Analytics (unique visitors, resume CTR, 14-day traffic chart, referrer breakdown). |
| `studio` | **Studio & Team** | \$29 (one-time) | Up to 5 portfolios | Unlimited sections | Everything in Pro + Data Metrics & Impact section (`AdvancedMetrics`), 3 Studio templates, Cinematic MP4 Video Background in Hero Banner, 3D Spline embeds, White-Label Branding toggle (`hideBranding` to remove platform badge and footer). |

---

## 2. Editor Workspace Layout & Top Toolbar

The editor (`frontend/src/pages/Editor.jsx`) uses a three-column layout on desktop screens and slide-over drawers on tablet/mobile screens:

1. **Top Action Bar**:
   - **Portfolio Switcher**: Shown when the user owns more than one portfolio (`Pro` and `Studio` plans). Allows switching between portfolios (`/editor?id=<layoutId>`) without leaving the workspace.
   - **Active Template Badge**: Displays the active template preset name and accent color dot.
   - **Publish Status Pill**: Shows whether the current portfolio is `Live Published` (green indicator) or in `Draft Mode` (amber indicator).
   - **Responsive Viewport Switcher**: Switches the central canvas between **Desktop** (full width, up to `max-w-6xl`), **Tablet** (`768px` frame with camera bezel), and **Mobile** (`390px` smartphone frame with status bar and home bar).
   - **Undo / Redo Controls**: Reverts or reapplies up to 30 layout mutations stored in Redux (`past` and `future` stacks in `layoutSlice.js`). Supports both toolbar buttons and keyboard shortcuts (`Ctrl+Z` / `Cmd+Z` for Undo, `Ctrl+Y` / `Cmd+Shift+Z` for Redo). Keyboard listeners ignore events when focus is inside an `<input>`, `<textarea>`, or `contenteditable` element.
   - **View Live Link**: Opens `/p/:handle` in a new browser tab.
   - **Save Draft Button**: Persists all current layout, theme, and SEO changes to MongoDB with `isPublished: false`.
   - **Publish Live / Unpublish Button**: Toggles `isPublished` between `true` and `false` and saves immediately to `PUT /api/layouts`.
   - **Preview Mode Toggle**: Collapses both the left sidebar and right inspector so the creator can test the portfolio across the full viewport.

2. **Left Sidebar (`EditorSidebar.jsx`)**:
   - Displays the user's current plan badge (`Free Plan (X/5 Sections)`, `Pro Plan`, or `Studio Plan`) and a quick upgrade link for Free users.
   - Organized into four tabs: **Sections**, **Theme**, **Settings**, and **Analytics**.

3. **Center Interactive Canvas**:
   - Renders all sections in real time through `ComponentRenderer.jsx` using CSS custom properties (`--theme-primary`, `--theme-secondary`, `--theme-bg`, `--theme-surface`, `--theme-text`, `--theme-muted`, `--theme-font`).
   - Clicking any section on the canvas selects it and opens its property form in the right-hand inspector.

4. **Right Property Inspector (`ComponentInspector.jsx`)**:
   - Dynamically renders form controls, tag editors, markdown toolbars, and media uploaders tailored to whichever section is currently selected.

---

## 3. Portfolio Section Library & Tier Availability (12 Section Types)

Creators manage sections in the **Sections** tab of `EditorSidebar.jsx`. Each active section supports four quick actions in the sidebar list:
- **Move Up / Move Down**: Reorders the section index (`reorderComponents`).
- **Show / Hide Toggle**: Flips `isVisible` (`updateComponentVisibility`) so a section can be kept as a draft without appearing on the public portfolio.
- **Delete Section**: Removes the section (`removeComponent`), reversible via Undo (`Ctrl+Z`).

### Detailed Breakdown of All 12 Section Types

| # | Component Type | Display Title | Available Tiers | Editable Properties & Inspector Controls |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `HeroBanner` | **Hero Banner** | **Free, Pro, Studio** *(Video BG requires Studio)* | `badgeText` (tagline pill), `headline`, `subheadline`, `avatarUrl` (image upload/URL), `ctaText` (call-to-action button label), and `bgVideoUrl` (**Studio Plan**: looping ambient MP4 video background up to 50 MB). |
| 2 | `AboutMe` | **About Me** | **Free, Pro, Studio** | `heading`, `bio` (multi-line narrative), 3 highlight counters (`experienceYears`, `completedProjects`, `happyClients`), and `skills` managed through the interactive chip `TagEditor`. |
| 3 | `ProjectsGrid` | **Projects Grid** | **Free, Pro, Studio** | `heading` and dynamic `items[]` array. Each project card supports `title`, `description`, `imageUrl` (with direct Cloudinary upload), `liveUrl`, `githubUrl`, and `tags[]` (via `TagEditor`). Creators can add or remove unlimited project cards inside the section. |
| 4 | `ExperienceTimeline` | **Experience Timeline** | **Free, Pro, Studio** | `heading`, `subheading`, and dynamic `items[]` array. Each position entry includes `role`, `company`, `period` (e.g., `2023 - Present`), `description`, and `highlights[]` tags. |
| 5 | `SkillsCloud` | **Skills Cloud** | **Free, Pro, Studio** | `heading`, `subheading`, and categorized skill groups (`categories[]`). Each category has a `name` (e.g., `Frontend & UI`, `Backend & APIs`) and a `skills[]` tag list. |
| 6 | `TestimonialsCarousel` | **Testimonials** | **Free, Pro, Studio** | `heading` and `items[]` array. Each review includes `author`, `role` (title/company), `quote`, and `avatar` (photo upload or URL). |
| 7 | `SocialLinks` | **Social Links** | **Free, Pro, Studio** | `heading`, `subheading`, optional `name` and `avatarUrl`, plus `links[]`. Includes 1-click quick-add buttons for GitHub, LinkedIn, X/Twitter, Instagram, YouTube, Dribbble, Behance, and Website, plus a platform selector supporting 16 platforms (including Medium, Discord, Telegram, WhatsApp, Facebook, TikTok, LeetCode, and Email). |
| 8 | `ContactSection` | **Contact Section** | **Free, Pro, Studio** *(Phone/WhatsApp badge on Pro)* | `heading`, `subheading`, `email`, `phone` (Phone / WhatsApp number, marked as a Pro feature), `location` (availability/city), and `responseTime` guarantee. Also renders the public visitor contact form that delivers messages to the creator's inbox (`POST /api/messages/:handle`). |
| 9 | `MediaGallery` | **Media Gallery** | **Free, Pro, Studio** | `heading`, `subheading`, and `items[]` media tiles. Each tile supports `title`, `description`, `url`, and automatic `image` / `video` type detection for uploaded MP4, WebM, MOV, or image files. |
| 10 | `RichTextSection` | **Case Study & Markdown** | **Free, Pro, Studio** | `badge`, `heading`, `subheading`, `alignment` (`left` or `center`), and `content` (Markdown editor). Includes 1-click starter templates (*System Deep-Dive* and *Design Philosophy*) and a formatting toolbar for `H2`, `H3`, `Bold`, `Italic`, `Quote`, `Code` blocks, bullet `List`, and `Link`. |
| 11 | `PremiumEmbed` | **Interactive Embed** | **Pro, Studio** *(Spline 3D labeled Studio)* | `heading`, `embedType` (`figma`, `youtube`, `spline`, `custom`), `embedUrl` (accepts either a direct URL or a full `<iframe src="...">` snippet and automatically extracts the `src`), and `height` (`450px`, `600px`, `750px`, `900px`). Locked for Free users with an upgrade modal. |
| 12 | `AdvancedMetrics` | **Data Metrics & Impact** | **Studio Only** | `heading` and `metrics[]` KPI cards. Each KPI card configures a big stat `value` (e.g., `$12M+`, `99.99%`), `label`, and `icon` style (`trending`, `users`, `target`, `zap`). Locked for Free and Pro users with a Studio upgrade modal. |

---

## 4. Theme Engine, Templates, Colors & White-Labeling (`Theme` Tab)

The **Theme** tab in `EditorSidebar.jsx` controls the visual appearance of the entire portfolio.

### 4.1 Template Presets (10 Templates Across Tiers)
Creators can switch their active template preset from the dropdown in the Theme tab or apply one from the `/templates` gallery:
- **Free Tier Templates (4)**:
  - `minimalist-editorial` (Minimalist Editorial)
  - `dark-cyber` (Dark Cyberpunk)
  - `creative-director` (Creative Director)
  - `interactive-showcase` (Interactive Showcase)
- **Pro Creator Templates (3)**:
  - `luxury-motion-pro` (Luxury Motion Pro)
  - `fintech-saas-pro` (Fintech SaaS Pro)
  - `ai-neural-labs-pro` (AI Neural Labs Pro)
- **Studio & Team Templates (3)**:
  - `global-agency-studio` (Global Agency Studio)
  - `haute-couture-studio` (Haute Couture Studio)
  - `spatial-architect-studio` (Spatial Architect Studio)

### 4.2 Typography & Font Selector (All Tiers)
Available to **Free, Pro, and Studio** users. Applies across all headings and body text with a live specimen preview box in the sidebar:
- `Plus Jakarta Sans` (Modern Clean)
- `Outfit` (Geometric Tech)
- `Inter` (System Minimalist)
- `Space Grotesk` (Neo-Grotesque)
- `Playfair Display` (Luxury Editorial Serif)
- `Syne` (Avant-Garde Display)
- `Cinzel` (Classical Sophistication)
- `DM Sans` (Crisp Contemporary)
- `JetBrains Mono` (Developer Code)

### 4.3 Color Schemes & Custom Color Tokens (All Tiers)
Available to **Free, Pro, and Studio** users:
- **8 One-Click Color Palettes**: *Emerald Matrix*, *Obsidian Gold*, *Electric Violet*, *Cyberpunk Cyan*, *Crimson Dusk*, *OLED Pure Dark*, *Nordic Light*, and *Warm Paper*.
- **6 Granular Hex Color Pickers** (with a *Reset Defaults* action):
  1. `primaryColor` (Buttons, active badges, highlights — default `#6366f1`)
  2. `secondaryColor` (Gradients, borders, subtle glows — default `#a855f7`)
  3. `backgroundColor` (Main canvas and section background — default `#070a10`)
  4. `surfaceColor` (Cards, project tiles, containers — default `#111827`)
  5. `textColor` (Headings and primary text — default `#f8fafc`)
  6. `textMutedColor` (Body text, subtitles, labels — default `#94a3b8`)

### 4.4 White-Label Branding (`Studio` Tier Exclusive)
- **Feature**: `theme.hideBranding` toggle inside the Theme tab.
- **Tier Availability**: **Studio & Team (`studio`) only**. Free and Pro users see an *Unlock with Studio* lock button that triggers the upgrade modal.
- **Behavior**: When enabled on a Studio account, the public portfolio viewer (`/p/:handle`) hides the floating "PortfolioCraft" top badge and removes the platform watermark footer. The backend (`PUT /api/layouts`) also enforces this rule by resetting `hideBranding` to `false` if the authenticated user is not on the `studio` plan.

---

## 5. URL Handle, ATS PDF Resume & SEO Settings (`Settings` Tab)

The **Settings** tab in `EditorSidebar.jsx` manages public routing, recruiter resume generation, and search engine metadata.

### 5.1 Custom Portfolio URL Handle (`/p/:handle`)
- **Tier Availability**: **Free, Pro, and Studio** (every portfolio gets its own customizable slug, up to 1 portfolio on Free, 3 on Pro, and 5 on Studio).
- **Validation**: Lowercase alphanumeric characters and hyphens (`a-z`, `0-9`, `-`). Verified for uniqueness against the `layouts` collection in `PUT /api/layouts` before saving.

### 5.2 One-Click ATS PDF Resume Generator
- **Tier Availability**: **Free, Pro, and Studio**.
- **Controls**:
  - **Show Resume Button Toggle (`theme.showResumeDownload`)**: Controls whether visitors see the *Download Resume* button in the public portfolio navigation bar.
  - **Test PDF Button**: Calls `downloadAtsResume(activeLayout)` (`frontend/src/utils/resumeGenerator.js`) directly inside the editor so the creator can preview the generated single-page print layout formatted for Applicant Tracking Systems (extracting Hero, About, Experience, Projects, Skills, and Contact data).

### 5.3 SEO Meta Optimization & Google Search Preview
- **Tier Availability**: **Pro and Studio only**. Free users see a locked card prompting them to upgrade to Pro Creator (\$12).
- **Controls**:
  - `seo.metaTitle`: Custom browser tab and search engine title.
  - `seo.metaDescription`: Custom search snippet summary.
  - `seo.keywords`: Comma-separated keywords.
  - **Live Google Search Card Preview**: Renders a real-time preview of how the title, canonical URL (`https://portfoliocraft.io/p/:handle`), and description appear in Google search results.
- **Backend Enforcement**: `PUT /api/layouts` only persists `seo` fields when `user.plan` is `pro` or `studio`.

---

## 6. Cookieless Creator Analytics (`Analytics` Tab)

The **Analytics** tab fetches telemetry from `GET /api/layouts/analytics/:layoutId`. Visitor tracking uses a daily salted SHA-256 hash of the visitor's IP address and User-Agent so no tracking cookies are stored on visitor devices.

| Analytics Metric / Widget | Free Tier (`free`) | Pro Creator (`pro`) | Studio & Team (`studio`) |
| :--- | :--- | :--- | :--- |
| **Total Views Counter** | Included (live counter) | Included | Included |
| **Resume Clicks Counter** | Included (live counter) | Included | Included |
| **Unique Visitors Counter** | Locked | Included | Included |
| **Recruiter Resume CTR (%)** | Locked | Included (`downloads / uniqueVisitors`) | Included |
| **14-Day Traffic Velocity Bar Chart** | Locked | Included (daily breakdown with hover tooltips) | Included |
| **Referrer Sources Breakdown** | Locked | Included (LinkedIn, GitHub, Twitter/X, Google, Direct percentages) | Included |

---

## 7. Media Upload & Client-Side WebP Optimization Pipeline

Inside `ComponentInspector.jsx`, all image and video fields use the `MediaUploadField` component:
1. **Client-Side Image Compression (`optimizeImageFile`)**: Before uploading any raster image larger than 350 KB (excluding GIFs), an HTML5 `<canvas>` resizes dimensions to a maximum of `1920px` and re-encodes the image as `image/webp` at `0.84` quality if the resulting blob is smaller than the original file.
2. **Direct Signed Cloudinary Upload**: Requests a timestamped signature from `GET /api/upload/signature` and uploads directly to `https://api.cloudinary.com/v1_1/<cloudName>/auto/upload` with a live percentage progress bar.
3. **Backend Multipart Fallback**: If direct signed upload is unavailable, automatically falls back to `POST /api/upload` (`backend/routes/upload.js`, up to 50 MB file size limit).
4. **Instant Preview & Clear**: Displays an inline thumbnail (`<img>` or muted `<video>` preview) with a one-click clear button.

---

## 8. Complete Feature-by-Tier Matrix

| Feature Category | Feature / Capability | Free (`$0`) | Pro (`$12`) | Studio (`$29`) |
| :--- | :--- | :---: | :---: | :---: |
| **Account Limits** | Maximum Live Portfolios | 1 | 3 | 5 |
| **Account Limits** | Maximum Sections per Portfolio | 5 | Unlimited | Unlimited |
| **Editor Workspace** | Drag/Move Reordering & Visibility Toggles | Yes | Yes | Yes |
| **Editor Workspace** | 30-Step Undo / Redo (`Ctrl+Z` / `Ctrl+Y`) | Yes | Yes | Yes |
| **Editor Workspace** | Desktop, Tablet (`768px`), and Mobile (`390px`) Emulator | Yes | Yes | Yes |
| **Editor Workspace** | Multi-Portfolio Dropdown Switcher | — | Yes | Yes |
| **Sections** | Hero, About, Projects, Experience, Skills, Testimonials | Yes | Yes | Yes |
| **Sections** | Social Links (16 platforms), Contact, Media Gallery, Markdown Case Study | Yes | Yes | Yes |
| **Sections** | Interactive Embed (`PremiumEmbed`: Figma, YouTube, Custom Iframe) | — | Yes | Yes |
| **Sections** | Interactive 3D Spline Embed (`PremiumEmbed`) | — | Yes | Yes (Studio badge) |
| **Sections** | Data Metrics & Impact KPI Grid (`AdvancedMetrics`) | — | — | Yes |
| **Media & Assets** | Cloudinary Image Uploads with Automatic WebP Optimization | Yes | Yes | Yes |
| **Media & Assets** | Cinematic Looping MP4 Video Background in Hero Banner | — | — | Yes |
| **Templates & Styling** | Free Curated Templates (4 presets) | Yes | Yes | Yes |
| **Templates & Styling** | Pro Creator Templates (3 presets) | Preview only | Yes | Yes |
| **Templates & Styling** | Studio & Team Templates (3 presets) | Preview only | Preview only | Yes |
| **Templates & Styling** | 8 One-Click Color Palettes + 6 Custom Hex Color Tokens | Yes | Yes | Yes |
| **Templates & Styling** | 9 Google Font Families with Live Specimen Preview | Yes | Yes | Yes |
| **Branding** | White-Label Mode (`hideBranding` removes platform badge & footer) | — | — | Yes |
| **Publishing & Career** | Custom Portfolio URL Slug (`/p/:handle`) | Yes | Yes | Yes |
| **Publishing & Career** | 1-Click ATS PDF Resume Generator & Public Download Toggle | Yes | Yes | Yes |
| **SEO** | Custom Meta Title, Description, Keywords & Google Search Preview | — | Yes | Yes |
| **Analytics** | Basic Total Views & Resume Download Counters | Yes | Yes | Yes |
| **Analytics** | Unique Visitors, Resume CTR %, 14-Day Velocity Chart & Referrer Sources | — | Yes | Yes |
