# JELVAN® Corporate Systems & Portfolio Ecosystem
> **Professional digital architectures bridging the frontier of Full-Stack Systems Development, Workflow Automation, and Strategic Human Capital Engineering.**

[![Platform Compatibility](https://img.shields.io/badge/Stack-React_19_|_Express_|_TypeScript-0F62FE?style=flat-sharp)](https://react.dev)
[![Deployment Guide](https://img.shields.io/badge/Deployment-Cloudflare_Pages_--_Cloud_Run-active?style=flat-sharp)](https://pages.cloudflare.com)
[![Code Integrity](https://img.shields.io/badge/Build-Verified_&_Linted-009EDB?style=flat-sharp)](https://vite.dev)

Welcome to the central software warehouse of **Jelvan Ricolcol**. This application is structured as a professional, reactive, high-density full-stack system designed to demonstrate how enterprise personnel management, custom automated business pipelines, and AI-driven predictive systems collaborate in modern corporate environments.

---

## 🏛️ Digital Systems Architecture

This workspace is structured as a robust **Full-Stack (Client + Server)** application using the latest edge runtimes and modern specifications:

```
├── server.ts              # Express API Server with custom Vite Middleware Router
├── src/
│   ├── main.tsx           # Standard React 19 Client Entrypoint
│   ├── App.tsx            # Main multi-level layout, Workspace gateway, Router state
│   ├── types.ts           # Unified TypeScript Type Declarations (strictly typed)
│   ├── data.ts            # Central data module for Systems, Experiences, and Credentials
│   ├── components/
│   │   ├── LandingView.tsx        # High-whitespace minimalist branding gateway
│   │   ├── DashboardHome.tsx      # Real-time metrics widgets & verified credentials audit console
│   │   ├── DeveloperWorkspace.tsx # Custom developer CLI interactive terminal & Sandbox agent
│   │   ├── SaasDashboardMode.tsx  # Interactive high-attrition prediction simulation
│   │   ├── CreativeMode.tsx       # Horizontal project exploration deck with simulated details
│   │   └── MinimalOnePageView.tsx # Print-ready high-contrast curriculum layout
```

### Key Technical Integrations
*   **Vite 6 & React 19 Client Suite**: Fast, modular components using Tailwind CSS CSS variables theme values.
*   **High-Performance Express Backend**: Mounts APIs for AI services and handles static asset routing.
*   **Gemini SDK Integration (`@google/genai`)**: Fully integrated into backend proxy endpoints to keep API keys isolated from client bundles (leveraging the cutting-edge Google GenAI SDK).
*   **Interactive Predictive Modeling**: Simulates ML-driven risk evaluations for workforce stability analysis (Attrition Scorecard).

---

## 🌐 Live Credentials & Verification Hub

This system features a built-in **Verified Credentials Audit Console** (rendered dynamically on the home dashboard and print curriculum view), tracking a total of **24 Professional Certifications and Academic Degrees** from the world's leading academies:

*   **IBM Specialist Credentials**: Full-Stack Software Engineering, Capstone Architect, and professional assessment systems.
*   **Technical & Strategic Credentials**: SHRM, Project Management Institute (PMI), United Nations (UN) Responsible AI, AWS, Microsoft, NASBA (LSS Black Belt), and more.
*   **Direct Authentication Linkages**: Each key certification in the dashboard includes an embedded **`Verify ↗`** hyperlink pointing to verified registries (such as Coursera Accomplishments, Credly badging, internal database tracking boards, or WARD/HAIENGLISH portals).

---

## ⚡ Deployment & Ingress Showcase Guide

This repository contains robust configurations making it ready for production deployment across leading cloud networks.

### Recipe 1: Cloudflare Pages & Workers Deployments
Cloudflare offers unmatched edge speeds. Because this application contains both client-side static pages and Express server APIs, it can be deployed on Cloudflare in two paths:

#### Option A: Frontend Showcase (Cloudflare Pages Static SPA)
Ideal for showcasing the portfolio frontend directly from your GitHub repository:
1.  **Connect GitHub to Cloudflare**: Log into the [Cloudflare Pages Dashboard](https://dash.cloudflare.com).
2.  **Create Custom Project**: Click `Create a Static Project` and select your imported GitHub repository.
3.  **Specify Build Parameters**:
    *   **Framework Preset**: `Vite` OR `None / Custom`
    *   **Build Command**: `vite build`
    *   **Build Output Directory**: `dist`
4.  **Enforce URL Routing (Static SPA fallback)**:
    Create a file named `_redirects` inside the `public/` folder with the following statement so pages resolve correctly upon browser refresh:
    ```text
    /*  /index.html  200
    ```
5.  **Click Deploy**: Cloudflare will compile and distribute the static SPA globally instantly.

#### Option B: Full Stack Proxy (Cloudflare Pages + Workers Functions)
To run backend endpoints (mocking Express routers or calling the Gemini API):
1.  Convert Express route handlers into serverless Cloudflare Workers inside a `/functions/api` directory.
2.  Store sensitive credentials (like `GEMINI_API_KEY`) via Cloudflare dashboard's **Settings -> Environment Variables** panel securely.

---

### Recipe 2: Google Cloud Run Deployment (Native Containerization)
This project is already pre-configured to build a bundled server package. To launch on a secure scalable container engine like Google Cloud Run:

1.  **Build Docker Container**: Create a standard `Dockerfile` in the root:
    ```dockerfile
    FROM node:18-alpine-slim
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci --omit=dev
    COPY . .
    RUN npm run build
    EXPOSE 3000
    ENV NODE_ENV=production
    CMD ["npm", "start"]
    ```
2.  **Submit to Cloud Build**:
    ```bash
    gcloud builds submit --tag gcr.io/your-project/jelvan-portfolio
    ```
3.  **Deploy on Cloud Run**:
    ```bash
    gcloud run deploy jelvan-portfolio \
      --image gcr.io/your-project/jelvan-portfolio \
      --platform managed \
      --port 3000 \
      --set-env-vars="GEMINI_API_KEY=your_key" \
      --allow-unauthenticated
    ```

---

## 🚀 Local Installation & Developer Access

To execute or debug this system locally on your computer:

### 1. Prerequisite Installations
Ensure Node.js v18 or later is installed.

### 2. Clone the Repository & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/jelvan-ecosystem.git
cd jelvan-ecosystem

# Install required modules
npm install
```

### 3. Setup Secret Variables
Create a `.env` configuration file in the workspace directory (refer directly to `.env.example` file):
```env
GEMINI_API_KEY=your_secured_gemini_api_key
```

### 4. Execute Interactive Development Environment
```bash
# Deploys Vite development server via node tsx wrapper on secure port 3000
npm run dev
```
Open your internet browser and visit: `http://localhost:3000`

### 5. Compile Clean Build & Verify Integrity
```bash
# Build frontend static files & Bundle node server onto self-contained common-js (dist/server.cjs)
npm run build

# Start production server
npm start
```

---

## 🔒 Professional Identity Registry
*   **Specialist**: Jelvan Ricolcol
*   **Corporate Focus**: Strategic HR & Digital Transformation Systems Architecture
*   **Verification Contact**: [hireme@jelvan.pro](mailto:hireme@jelvan.pro)
*   **System Inbound Port**: +60 11-2427 6076
*   **Main Operations Gateway**: [www.jelvanricolcol.pro](https://www.jelvanricolcol.pro)

*Developed with the highest standard in visualWhitespace, architectural stability, and compliance safety.*
