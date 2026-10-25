# PortfolioCraft Technical Documentation Suite

**Course:** EC4307 Web Application Development Mini Project  
**Institution:** University of Ruhuna, Faculty of Engineering  
**Application Title:** PortfolioCraft (MERN Stack Portfolio Management Platform)  
**Author:** Ranaweerage Shashika Madhusankha Priyanath  
**Date:** October 2026  

---

## Documentation Index & Table of Contents

This directory contains the complete technical documentation, architecture specifications, database schemas, and evaluation defense guides prepared for the **EC4307 Web Application Development Mini Project**:

| Document | Topic & Focus Area | Target Evaluation Criteria |
| :--- | :--- | :--- |
| [**01. System Overview & Features**](./01_SYSTEM_OVERVIEW_AND_FEATURES.md) | Executive summary, core modules, component library, theme engine, 1-click ATS resume generator, cookieless creator analytics, and dynamic public rendering. | System Scope, Features, Innovation |
| [**02. CRUD Functionalities & Operations**](./02_CRUD_FUNCTIONALITIES_AND_OPERATIONS.md) | Detailed walkthrough of Create, Read, Update, and Delete operations across all persistent entities (`layouts`, `users`, `messages`, `paymentrequests`), validation rules, error handling, and deletion safety guards. | **Create (4m), Read (4m), Update (4m), Delete (4m), Validation (2m)** |
| [**03. Tech Stack & Architecture**](./03_TECH_STACK_AND_ARCHITECTURE.md) | Layered software architecture, data flow sequences, Redux Toolkit 30-state undo/redo history, route code-splitting (Option A), and performance benchmarks. | Architecture, Code Quality & Structure (2m) |
| [**04. Database Design & ERD**](./04_DATABASE_DESIGN_AND_ERD.md) | Complete Entity-Relationship Diagram (ERD), full data dictionary, Mongoose schema definitions, field data types, foreign key relationships, and query indexing strategies. | **Database Design (4m)** |
| [**05. Build, Installation & Deployment**](./05_BUILD_INSTALLATION_AND_DEPLOYMENT.md) | System requirements, environment variables (`.env`), step-by-step local installation, database seeding (`npm run seed`), production Vite build, and Vercel/Render cloud deployment. | Setup Steps, Build Pipeline |
| [**06. UI/UX & Responsiveness**](./06_UI_UX_AND_RESPONSIVENESS.md) | Design system, dark glassmorphism visual tokens, responsive breakpoints, live multi-device viewport emulator (Desktop, Tablet, Mobile), and accessibility (a11y). | **UI/UX & Responsiveness (2m)** |
| [**07. Demonstration & Evaluation Guide**](./07_DEMONSTRATION_AND_EVALUATION_GUIDE.md) | 5-Minute Demonstration Video Script (camera-on requirements), rubric compliance checklist (30/30 marks mapping), and technical defense questions. | **Demonstration (2m), Documentation (2m)** |

---

## Submission Checklist Summary (Rubric Aligned)

- [x] **Full CRUD on Main Entity (`Layouts`):**
  - **Create:** Generating new layouts, adding 10 component types via forms.
  - **Read:** Public `/p/:handle` portfolio viewer, template explorer, showcase search and filters.
  - **Update:** Drag-and-drop component reordering, live prop editing, theme tokens, typography, and publishing state.
  - **Delete:** Safely deleting layouts (with constraint preventing deletion of user's only portfolio), removing sections (with Undo support), cascading account deletion.
- [x] **Validation & Error Handling:** Client-side forms + server-side Mongoose schema validation + `express-rate-limit` on authentication endpoints.
- [x] **Database Design:** MongoDB collections with primary/foreign keys, schema-less polymorphic components, indexes, and full ERD diagram.
- [x] **UI/UX & Responsiveness:** Dark glassmorphism, responsive navigation drawer, and in-editor device viewport switcher (Desktop, Tablet, Mobile).
- [x] **Documentation:** 7 comprehensive, dedicated documentation guides covering all required rubrics.
- [x] **Demonstration Video Preparation:** 5-minute timed script with second-by-second webcam and screen recording blueprint.
