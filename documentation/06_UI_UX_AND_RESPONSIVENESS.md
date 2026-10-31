# UI/UX Design System & Responsiveness Specifications

**Course:** EC4307 Web Application Development Mini Project  
**Author:** Ranaweerage Shashika Madhusankha Priyanath  
**Evaluation Rubric Alignment:** UI/UX & Responsiveness - Layout, navigation, consistency, mobile support (2 Marks)  

---

## 1. Design System & Visual Philosophy

PortfolioCraft adopts an **Enterprise Dark Glassmorphism** aesthetic tailored for high-end digital creators, engineers, and design studios.

### 1.1. Core Visual Tokens
- **Background Palette:** Deep OLED slate (`#020617` / `#070a10`) reducing eye strain and highlighting user creative assets.
- **Subtle Fractal Noise Overlay:** A persistent 1.5%–2% SVG fractal noise texture (`feTurbulence`) blended across the dark background in `frontend/src/index.css` to eliminate flat digital gradients and introduce high-end tactile material depth.
- **Glassmorphism Layers:** Multi-layered translucent panels (`backdrop-blur-md`, `bg-white/[0.02]`, `border-white/[0.08]`) establishing depth and visual hierarchy without heavy drop shadows.
- **Dynamic CSS Theme Variables:**
- `--theme-primary`: Main interactive accents, badges, and primary buttons.
- `--theme-secondary`: Gradients, hover accents, and glowing borders.
- `--theme-bg`: Canvas background.
- `--theme-surface`: Card containers and input elements.
- `--theme-text`: Main headings and high-contrast titles.
- `--theme-muted`: Secondary paragraphs, dates, and metadata labels.
- `--theme-font`: Dynamically injected Google Font family.

---

## 2. Navigation Architecture & Consistency

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo] PortfolioCraft   Features  Templates  Showcase  Plans  About ...│ [Sign In] [Get Started]
└─────────────────────────────────────────────────────────────────────────┘
```

1. **Global Full-Width Fixed Header (`Header.jsx`):**
- Full edge-to-edge layout (`w-full px-4 sm:px-6 lg:px-8`) anchored at the top with glass backdrop blur (`backdrop-blur-xl`).
- Active route detection: Highlights the current route with an indigo bottom border indicator (`border-b-2 border-indigo-500`).
- Authenticated Actions: Displays direct navigation to `/editor` ("My Portfolio"), Admin badge for elevated users, user avatar initial, and an explicit **"Sign Out"** label alongside the logout icon for clear visual feedback.
- Responsive Hamburger Drawer: Automatically collapses navigation items into an animated full-screen mobile menu on screens `< 1024px`.
2. **Global Comprehensive Footer (`Footer.jsx`):**
- 3 balanced columns (`PLATFORM`, `COMPANY`, `LEGAL`) providing discoverability for marketing, corporate, and compliance pages.
- Status badge indicator ("All Systems Operational").
- Direct social channels and copyright strip.
3. **Floating "Back to Top" Action:**
- Detects scroll position (`window.scrollY > 300`) and reveals a smooth-scroll floating action button to return visitors to the top of long case studies.
4. **Contextual Route Scrolls:**
- Global scroll listener ensures the window instantly scrolls to `(top: 0, left: 0)` on every page transition.

---

## 3. Multi-Device Responsive Breakpoints

PortfolioCraft is built mobile-first using Tailwind CSS responsive utility prefixes:

| Viewport Category | Screen Width | Typical Target Devices | Layout Adaptations |
| :--- | :--- | :--- | :--- |
| **Mobile (`xs` / `sm`)** | `< 640px` | iPhone 14/15, Pixel 7, Galaxy S23 | 1-column stacked cards, collapsed mobile navigation drawer, touch-friendly 44px hit targets. |
| **Tablet (`md` / `lg`)** | `768px - 1024px` | iPad, Galaxy Tab, Surface Pro | 2-column project grids, collapsible editor sidebar, responsive timeline nodes. |
| **Desktop (`xl` / `2xl`)**| `> 1280px` | MacBooks, 4K Monitors, Ultra-wides | 3-column showcase grids, dual-pane editor workbench with live side-by-side preview. |

---

## 4. Live Multi-Device Viewport Emulator (In Editor)

To ensure creators don't need external testing tools, the CMS editor (`Editor.jsx`) features an integrated **Hardware Viewport Switcher**:

```
[ Monitor (Desktop) ]   [ Tablet (768px) ]   [ Smartphone (390px) ]
```

1. **Desktop Mode (`100%` Width):** Full-screen canvas showing complete multi-column desktop layout.
2. **Tablet Mode (`768px` Centered Canvas):** Wraps the portfolio preview in a centered tablet container with rounded borders and responsive margins.
3. **Mobile Mode (`390px` Centered Canvas):** Renders the portfolio in an exact mobile screen dimension (iPhone standard), verifying font wrapping, image ratios, and button tap ergonomics.

---

## 5. Accessibility (a11y) & Interactive Ergonomics

- **Contrast Ratios:** Text colors adhere to WCAG 2.1 AA standards ($>4.5:1$ contrast against dark surfaces).
- **Keyboard Navigation:** Form inputs, buttons, and modal dialogs support keyboard tabbing with visible focus rings (`focus:ring-2 focus:ring-indigo-500`).
- **Semantic HTML5:** Proper use of landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- **Feedback & Micro-interactions:**
- Interactive buttons feature subtle spring transforms (`active:scale-95`).
- Loading buttons display spinning loaders (`<Loader2 className="animate-spin" />`) to prevent accidental duplicate form submissions.
- Toast alerts and success pills indicate persistence confirmation ("Saved!").

---

## 6. Homepage Hero Ergonomics & Modular Presentation

1. **Balanced Two-Line Headline:**
   - Designed with responsive typography (`text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem]`) and `sm:whitespace-nowrap` blocks.
   - Line 1: *"Your Craft Is Extraordinary."*
   - Line 2: *"Give It the Stage It Deserves."*
   - Guarantees clean two-line alignment on desktop and tablet viewports without premature word-breaks or awkward 4-line wrapping.

2. **Cycling Portfolio Showcase Background:**
   - Automated 4.5-second cross-fade interval rotating through 6 high-definition, verified design and engineering showcase backgrounds (UI Systems, Strategy, Distributed Code, Spatial 3D, Haute Editorial, Telemetry).
   - Radial and vertical dark gradient overlays maintain WCAG AA text contrast ratio ($> 7:1$) against all background imagery.

3. **Dedicated Modular `SocialLinks` Section:**
   - Separated from the hero header into an independent modular component.
   - Renders responsive icon pills with custom handles and direct link routing across 7 major creator platforms.
