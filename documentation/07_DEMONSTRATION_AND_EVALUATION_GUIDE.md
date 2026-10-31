# Project Demonstration & Evaluation Defense Guide

**Course:** EE4207 Web Application Development Mini Project  
**Institution:** Faculty of Engineering, University of Ruhuna  
**Application Title:** PortfolioCraft (MERN Stack Portfolio Management Platform)  
**Author:** Priyanath  R.S.M.

---

## 1. 5-Minute Demonstration Video

Demonstration Video : `<link>`

---

## 2. Evaluation Rubric Compliance Checklist

| Criterion | Marks | Evidence in Project Codebase |
| :--- | :---: | :--- |
| **Create** | **4** | • Layout creation: `POST /api/layouts`<br>• Component addition in `EditorSidebar.jsx`<br>• User registration: `POST /api/auth/register`<br>• Contact messages: `POST /api/messages`<br>• Payment slips: `POST /api/payment/submit`<br>• 2FA secret generation: `POST /api/users/2fa/setup`<br>• Blog newsletter subscribe: `POST /api/newsletter/subscribe` |
| **Read** | **4** | • Public portfolio handle resolution: `GET /api/layouts/public/:handle`<br>• Template explorer with category filters (`Templates.jsx`)<br>• Showcase gallery search and tag filtering (`Showcase.jsx`)<br>• Admin dashboard data tables (`AdminDashboard.jsx`) |
| **Update** | **4** | • Live component editing & reordering: `PUT /api/layouts/:id`<br>• Theme token and font family customization (`updateTheme`)<br>• User profile settings: `PUT /api/auth/profile`<br>• Admin payment approval: `PUT /api/admin/payment-request/:id/approve` |
| **Delete** | **4** | • Safe portfolio deletion with count guard: `DELETE /api/layouts/id/:layoutId`<br>• Component deletion with Undo safety (`removeComponent`)<br>• Cascading account deletion: `POST /api/auth/delete-account`<br>• Admin message/career deletion endpoints |
| **Validation & Error Handling** | **2** | • Client-side form input validation & alert banners<br>• Mongoose schema validation, required fields, and enums<br>• `express-rate-limit` on `/login`, `/register`, `/forgot-password`<br>• Standardized semantic HTTP status codes (`200`, `201`, `400`, `401`, `403`, `404`) |
| **Database Design** | **4** | • MongoDB schema with primary keys and foreign key references<br>• Schema-less polymorphic `components` array for flexible CMS storage<br>• Unique indexes on `email`, `username`, and `handle`<br>• Complete Entity-Relationship Diagram in `04_DATABASE_DESIGN_AND_ERD.md` |
| **UI/UX & Responsiveness** | **2** | • Consistent dark glassmorphism design system (`glass`, `glass-dark`)<br>• Mobile drawer menu and responsive grid breakpoints (`sm`, `md`, `lg`, `xl`)<br>• Built-in multi-device hardware simulator (Desktop, Tablet, Mobile) in editor<br>• Smooth scroll restoration and floating back-to-top button |
| **Code Quality & Structure** | **2** | • Modular architecture separating routes, controllers, models, and slices<br>• Redux Toolkit state management with 30-state undo/redo history<br>• Clear naming conventions, Git version control, and zero ESLint/Vite build warnings |
| **Documentation** | **2** | • Exhaustive documentation suite in `/documentation` (Overview, CRUD, Tech Stack, Database/ERD, Build/Deploy, UI/UX, Evaluation Guide) |
| **Demonstration** | **2** | • Structured 5-minute demonstration script adhering to the camera-on and time-limit requirements |
