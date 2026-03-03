# 🚀 Deployment Roadmap

This document guides you through setting up **Continuous Deployment (CD)** for the SignalCraft Biz application.
The application uses a split deployment model:
- **Frontend**: Vercel
- **Backend**: Railway

## 🎯 Objective
- **Automated Deployment:** Every time code is pushed to the `main` branch on GitHub, both the frontend and backend automatically update.

---

## 🚂 Backend Deployment (Railway)

We use Railway to reliably host our FastAPI Python backend using Nixpacks.

### Setup Guide
1. Create an account on [Railway.app](https://railway.app).
2. Click **New Project** -> **Deploy from GitHub repo** and select `signalcraftWebApp`.
3. Railway will automatically detect the `railway.toml` file in the root directory and configure the build for the `backend/` folder.
4. Go to the newly created service's **Settings** -> **Variables** and add your environment variables (e.g., `DATABASE_URL`, `CORS_ORIGINS`).
5. Go to **Networking** and click **Generate Domain**.
6. Copy this domain (e.g., `https://signalcraft-production.up.railway.app`) to use as the `VITE_API_URL` in the frontend setup.

---

## ⚡ Frontend Deployment (Vercel)

### Setup Guide
1. Login to your **Vercel Dashboard**.
2. Click **"Add New..."** -> **"Project"** and import `signalcraftWebApp`.
3. Configure the Project:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Edit and select `frontend`.
4. Environment Variables:
   - Key: `VITE_API_URL`
   - Value: The Railway domain generated in the previous step.
5. Click **Deploy**.

### 🔧 Troubleshooting Frontend (Vercel)
**"404 Not Found" on Page Refresh**
Since this is a Single Page App (SPA), refreshing a sub-page might cause a 404 error.
*   **Solution:** Create a `vercel.json` file in the `frontend` folder with the following content:
    ```json
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
    ```
