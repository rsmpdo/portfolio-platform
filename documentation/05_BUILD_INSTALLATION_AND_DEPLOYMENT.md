# Build, Installation & Deployment Guide

**Course:** EC4307 Web Application Development Mini Project  
**Author:** Ranaweerage Shashika Madhusankha Priyanath  
**Application Title:** PortfolioCraft  

---

## 1. System Requirements & Prerequisites

Before running or building PortfolioCraft, ensure your environment meets the following specifications:

| Component | Minimum Required Version | Recommended Version |
| :--- | :--- | :--- |
| **Node.js** | `v18.0.0` (LTS) | `v20.10.0+` (LTS) |
| **npm** | `v9.0.0` | `v10.0.0+` |
| **MongoDB** | `v6.0.0` | MongoDB Atlas (Cloud) or Local `v7.0` |
| **Git** | `v2.30.0` | `v2.40.0+` |

---

## 2. Environment Variables Configuration

Both the frontend and backend require dedicated `.env` configuration files.

### 2.1. Backend Environment Setup (`backend/.env`)
Create a file named `.env` in the `backend/` directory based on the following template:

```env
# Server Runtime
PORT=5000
NODE_ENV=development

# Database Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/portfoliocraft?retryWrites=true&w=majority

# Authentication Security
JWT_SECRET=your_super_secret_jwt_cryptographic_key_32_chars_long
JWT_EXPIRE=30d

# Administrator Elevation Secret
ADMIN_SECRET_CODE=ADMIN_DEMO_2026

# Cloudinary Cloud Storage (Optional for local dev, required for live uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Transactional Email (Resend or SMTP)
EMAIL_SERVICE=smtp
EMAIL_USER=support@portfoliocraft.io
EMAIL_PASS=your_email_password_or_api_key
EMAIL_FROM="PortfolioCraft <support@portfoliocraft.io>"

# Client Domain (Canonical production URL for outgoing emails)
CLIENT_URL=https://portfoliocraftlk.vercel.app
```

### 2.2. Frontend Environment Setup (`frontend/.env`)
Create a file named `.env` in the `frontend/` directory (optional in development due to Vite proxy):

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 3. Local Development Installation

Follow these steps to run the complete MERN application locally:

### Step 1: Clone the Repository
```bash
git clone https://github.com/rsmpdo/portfolio-platform.git
cd portfolio-platform
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Populate Database with Seed Data
To immediately test the application with realistic creators, rich templates, showcase portfolios, and administrative messages, run the built-in database seeder:
```bash
npm run seed
```
*This populates test accounts (including admin credentials, showcase portfolios `/p/alex-morgan`, `/p/elena-rostova`, `/p/marcus-vance`, and template configurations).*

### Step 4: Start the Backend API Server
```bash
# Production mode
npm start

# OR Development auto-reload mode
npm run dev
```
*The server will start at `http://localhost:5000` with connected MongoDB logs.*

### Step 5: Install Frontend Dependencies & Start Vite Server
Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Vite will start the client interface at `http://localhost:5173` (or the next available port).*

---

## 4. Production Build Process

PortfolioCraft utilizes optimized Vite rollups for production deployment:

### 4.1. Building the Frontend
In the `frontend/` directory, execute:
```bash
npm run build
```
This triggers Vite's build pipeline:
1. Transforms JSX and ES modules.
2. Applies PostCSS and Tailwind CSS purging, discarding unused utility classes.
3. Chunks vendor libraries (`vendor-react`, `vendor-ui`, `vendor-state`) for optimal browser caching.
4. Generates an optimized production bundle in `frontend/dist/`.

### 4.2. Previewing the Production Build Locally
```bash
npm run preview
```

---

## 5. Production Cloud Deployment Architecture

```
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│       FRONTEND (Vercel)         │           │        BACKEND (Render)         │
│  - Hosted on Global Edge CDN    │  HTTPS    │  - Node.js LTS Container        │
│  - Automated CI/CD from 'main'  │──────────▶│  - Express REST API Gateway     │
│  - Single-Page App rewrites     │   JSON    │  - Reverse Proxy (trust proxy:1)│
└─────────────────────────────────┘           └────────────────┬────────────────┘
                                                               │
                                                               ▼
                                              ┌─────────────────────────────────┐
                                              │    DATABASE (MongoDB Atlas)     │
                                              │  - Dedicated M0/M10 Cluster     │
                                              │  - Automated Daily Backups      │
                                              │  - Whitelisted Server IPs       │
                                              └─────────────────────────────────┘
```

### 5.1. Frontend Deployment (Vercel / Netlify)
1. Link your GitHub repository `https://github.com/rsmpdo/portfolio-platform.git` to **Vercel**.
2. Set Root Directory to `frontend`.
3. Set Build Command to `npm run build`.
4. Set Output Directory to `dist`.
5. Add single-page application rewrite rule in `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 5.2. Backend Deployment (Render / AWS / DigitalOcean)
1. Deploy as a Web Service on **Render** (or AWS App Runner / EC2).
2. Set Root Directory to `backend`.
3. Set Build Command to `npm install`.
4. Set Start Command to `node server.js`.
5. In Render Environment Settings, input all variables from `backend/.env`.
6. Ensure `NODE_ENV=production` is set so Express activates rate limiters and secure cookies.
