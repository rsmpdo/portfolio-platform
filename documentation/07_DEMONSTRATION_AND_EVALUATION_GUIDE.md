# Project Demonstration & Evaluation Defense Guide

**Course:** EC4307 Web Application Development Mini Project  
**Author:** Ranaweerage Shashika Madhusankha Priyanath  
**Institution:** University of Ruhuna, Faculty of Engineering  
**Submission Requirement:** Maximum 5-minute recorded video demonstration with camera on.  

---

## 1. 5-Minute Demonstration Video Script & Timing Blueprint

> **IMPORTANT RULE FROM RUBRIC:** Penalties apply if the video exceeds 5 minutes. Practice with a stopwatch to finish in approximately 4 minutes 45 seconds. Keep your webcam active in the corner.

```
0:00 ──────────────── 1:00 ──────────────── 2:30 ──────────────── 3:45 ──────── 4:45
  [Intro & Overview]    [Visual CMS Editor]     [Analytics & Resume]    [Admin & CRUD]  [Security/Wrap]
```

### Segment 1: Introduction & High-Level Architecture (0:00 – 0:50)
- **Webcam:** State your name, index number, and project title: *"Hello, I am [Your Name], presenting PortfolioCraft for EC4307 Web Application Development."*
- **Screen:** Show the Homepage (`/`), pointing out the MERN stack architecture, dynamic theme preview, and responsive navigation.
- **Showcase & Templates:** Click **Templates** (`/templates`), demonstrate category filtering and live previews. Show **Plans** (`/plans`) detailing the 3 transparent creator tiers, and show **Showcase** (`/showcase`) to demonstrate public portfolio rendering at `/p/alex-morgan`.

---

### Segment 2: Interactive CMS Editor & Section Management (0:50 – 2:15)
- **Screen:** Navigate to `/editor`.
- **CRUD Demo - Read & Update:**
  - Show the **Sections** tab. Move a section up and down using the reorder buttons.
  - Open **About Me** in the inspector and change a title or text live. Show how the canvas updates instantly.
- **CRUD Demo - Create:**
  - Click **Add Section** and add the **Case Study & Markdown (`RichTextSection`)** or **Skills Cloud**.
- **Undo / Redo Demonstration:**
  - Press `Ctrl + Z` to undo the addition; press `Ctrl + Y` to redo it. Highlight the 30-state Redux history stack.
- **Theme & Typography Customizer:**
  - Switch to the **Theme** tab. Click a palette (e.g. *Emerald Matrix* or *Electric Violet*).
  - Change the font to *Playfair Display* or *Space Grotesk*.
- **Responsive Viewport Simulator:**
  - Click the **Tablet** icon (768px), then click the **Mobile** icon (390px) to prove full responsive design without leaving the editor.

---

### Segment 3: 1-Click ATS Resume & Creator Analytics (2:15 – 3:15)
- **Settings & ATS Resume:**
  - Switch to the **Settings** tab. Show the **ATS Resume Download** toggle.
  - Click **Test PDF** to show the browser print dialog rendering clean, ATS-friendly vector resume text.
- **Creator Analytics Dashboard:**
  - Switch to the **Analytics** tab.
  - Show the 4 performance metric cards: **Total Views**, **Unique Visitors**, **Resume Clicks**, and **Resume CTR %**.
  - Point to the **14-Day View Velocity Chart** and the **Traffic Referrer breakdown** (LinkedIn, GitHub, Direct). Mention that this tracking is 100% cookieless and GDPR-compliant.

---

### Segment 4: Administrative Dashboard & System CRUD (3:15 – 4:15)
- **Screen:** Open `/admin` in a new tab.
- **User Management & Safe Deletion:**
  - Show the users table. Demonstrate how an administrator inspects accounts and role permissions.
- **Payment Verification Workflow:**
  - Show the **Payment Requests** tab where free users upload bank slips for Pro/Studio upgrades. Demonstrate approving/rejecting a submission.
- **Contact Messages & Careers:**
  - Show the contact message logs and career candidate applications.
- **Database Safeguards:**
  - Mention that portfolio deletion has a safety constraint preventing users from deleting their only active portfolio.

---

### Segment 5: Security, 2FA & Defense Conclusion (4:15 – 4:45)
- **Account Security & 2FA:** Show `/settings` ("Account Security & Password"). Point out the **Authenticator App 2FA** setup with interactive QR code generator and recovery code safeguards.
- **Code Highlights:** Briefly show in IDE:
  - `backend/utils/totp.js`: RFC 6238 TOTP engine built natively with Node `crypto` (zero dependencies).
  - `backend/models/User.js`: Bcrypt password hashing, 2FA secret protection (`select: false`).
  - `backend/routes/auth.js`: Rate limiting and two-phase login challenge.
- **Wrap-up:** *"Thank you for your time and evaluation."*

---

## 2. Evaluation Rubric Compliance Checklist (30 / 30 Marks)

| Criterion | Marks | Evidence in Project Codebase |
| :--- | :---: | :--- |
| **Create** | **4 / 4** | • Layout creation: `POST /api/layouts`<br>• Component addition in `EditorSidebar.jsx`<br>• User registration: `POST /api/auth/register`<br>• Contact messages: `POST /api/messages`<br>• Payment slips: `POST /api/payment/submit`<br>• 2FA secret generation: `POST /api/users/2fa/setup`<br>• Blog newsletter subscribe: `POST /api/newsletter/subscribe` |
| **Read** | **4 / 4** | • Public portfolio handle resolution: `GET /api/layouts/public/:handle`<br>• Template explorer with category filters (`Templates.jsx`)<br>• Showcase gallery search and tag filtering (`Showcase.jsx`)<br>• Admin dashboard data tables (`AdminDashboard.jsx`) |
| **Update** | **4 / 4** | • Live component editing & reordering: `PUT /api/layouts/:id`<br>• Theme token and font family customization (`updateTheme`)<br>• User profile settings: `PUT /api/auth/profile`<br>• Admin payment approval: `PUT /api/admin/payment-request/:id/approve` |
| **Delete** | **4 / 4** | • Safe portfolio deletion with count guard: `DELETE /api/layouts/id/:layoutId`<br>• Component deletion with Undo safety (`removeComponent`)<br>• Cascading account deletion: `POST /api/auth/delete-account`<br>• Admin message/career deletion endpoints |
| **Validation & Error Handling** | **2 / 2** | • Client-side form input validation & alert banners<br>• Mongoose schema validation, required fields, and enums<br>• `express-rate-limit` on `/login`, `/register`, `/forgot-password`<br>• Standardized semantic HTTP status codes (`200`, `201`, `400`, `401`, `403`, `404`) |
| **Database Design** | **4 / 4** | • MongoDB schema with primary keys and foreign key references<br>• Schema-less polymorphic `components` array for flexible CMS storage<br>• Unique indexes on `email`, `username`, and `handle`<br>• Complete Entity-Relationship Diagram in `04_DATABASE_DESIGN_AND_ERD.md` |
| **UI/UX & Responsiveness** | **2 / 2** | • Consistent dark glassmorphism design system (`glass`, `glass-dark`)<br>• Mobile drawer menu and responsive grid breakpoints (`sm`, `md`, `lg`, `xl`)<br>• Built-in multi-device hardware simulator (Desktop, Tablet, Mobile) in editor<br>• Smooth scroll restoration and floating back-to-top button |
| **Code Quality & Structure** | **2 / 2** | • Modular architecture separating routes, controllers, models, and slices<br>• Redux Toolkit state management with 30-state undo/redo history<br>• Clear naming conventions, Git version control, and zero ESLint/Vite build warnings |
| **Documentation** | **2 / 2** | • Exhaustive documentation suite in `/documentation` (Overview, CRUD, Tech Stack, Database/ERD, Build/Deploy, UI/UX, Evaluation Guide) |
| **Demonstration** | **2 / 2** | • Structured 5-minute demonstration script adhering to the camera-on and time-limit requirements |
| **Total Marks** | **30 / 30** | **Comprehensive Full-Marks Coverage** |
