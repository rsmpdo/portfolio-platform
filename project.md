FolioCraft: MERN Stack Portfolio Management Platform
Prepared By: Ranaweerage Shashika Madhusankha Priyanath
University of Ruhuna, Faculty of Engineering
Date: June 11, 2026

1. Executive Summary

This proposal outlines the technical architecture, development roadmap, and resource requirements for building a comprehensive Portfolio Management Platform utilizing the MERN stack (MongoDB, Express.js, React.js, Node.js). Designed to function similarly to industry leaders like Adobe Portfolio, the application will provide users with an intuitive, component-based editor to design, customize, and publish professional web portfolios without requiring coding knowledge. By leveraging a non-relational database for flexible layout storage and a modern JavaScript-driven frontend, the platform guarantees exceptional scalability and a highly responsive user experience.

2. Project Scope & Core Features

2.1. User Authentication & Dashboard

Secure user registration, login, and session management using JWT. The dashboard will allow users to manage multiple portfolio projects, track analytics, and adjust global account settings.

2.2. Interactive Portfolio Editor (CMS)

A React-driven interface where users can add, delete, and reorder content blocks (e.g., hero banners, project grids, rich text sections, contact forms). Real-time preview capabilities will ensure users see layout changes instantly before publishing.

2.3. Dynamic Rendering Engine

The public-facing portfolio viewer that retrieves the user's custom layout JSON from MongoDB and renders the appropriate React components dynamically. It will support custom routing identifiers (e.g., platform.com/username).

2.4. Asset & Media Management

Integration with cloud storage (Cloudinary or AWS S3) to handle user image and video uploads efficiently, ensuring optimized asset delivery via CDN.

3. Proposed Technical Architecture

Frontend (Client-Side):
• React.js with Redux Toolkit or React Context API for complex state management of the builder UI.
• Tailwind CSS or Styled Components to support dynamic, user-selected themes and global style variables.

Backend API (Server-Side):
• Node.js & Express.js serving as the RESTful API gateway.
• Middleware for authentication (Passport.js/JWT) and multipart file upload parsing (Multer).

Database (Data Layer):
• MongoDB paired with Mongoose ODM to store flexible, schema-less layout documents. This is critical for storing dynamic arrays of components, as every user's page structure will be entirely unique.

Infrastructure & Hosting:
• Vercel or Netlify for high-performance frontend hosting.
• Render, AWS EC2, or DigitalOcean for the backend server environment.
• MongoDB Atlas for secure, managed database clusters.

4. Development Roadmap & Timeline

Phase 1: Planning & Setup	UI/UX wireframing, database schema design, and initial repository configuration.	2 Weeks
Phase 2: Backend & Data Layer	REST API development, JWT Authentication, MongoDB integration, and S3/Cloudinary media setup.	3 Weeks
Phase 3: Frontend CMS Editor	Building the React-based block editor, drag-and-drop functionality, and layout state management.	4 Weeks
Phase 4: Rendering & Public Views	Dynamic parsing of MongoDB JSON configurations into live React pages, implementing routing.	2 Weeks
Phase 5: Testing & Launch	End-to-end testing, security patching, CI/CD pipeline setup, and production deployment.	2 Weeks

5. Security & Scalability Considerations

• Input Validation & Sanitization: Preventing Cross-Site Scripting (XSS) attacks is crucial, as users will submit custom text and configurations rendered on public web pages.
• Rate Limiting & API Security: Implementing Express rate limiters and CORS policies to prevent DDoS and unauthorized API access.
• Database Indexing: Optimizing MongoDB queries for fast layout retrieval, ensuring public portfolios achieve near-instant load times.
• Component Code Splitting: Utilizing React.lazy to ensure the heavy builder JavaScript payload is only loaded for authenticated users, keeping public portfolio views lightweight and performant.
