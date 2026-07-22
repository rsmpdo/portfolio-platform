# Portfolio Management Platform

A MERN‑stack application that lets users build fully custom portfolio pages using a drag‑and‑drop CMS editor. Each user can create unique layouts stored as flexible JSON in MongoDB. The backend provides a secure RESTful API with JWT authentication, Cloudinary media storage, and CDN‑optimized asset delivery. The frontend is a React editor with a cyber‑punk theme, Redux Toolkit state management, and real‑time preview.

## Features
- User registration & login with email verification (Passport‑JWT)
- Role‑based access (admin & standard)
- Dynamic layout storage (array of component objects)
- Media uploads to Cloudinary, served via Cloudflare CDN
- Rate limiting, CORS, Helmet security headers
- Real‑time editor with drag‑and‑drop, theming, and preview
- Server‑side analytics collection
- CI/CD with GitHub Actions
- Deployable to Render (backend) & Vercel/Netlify (frontend)
