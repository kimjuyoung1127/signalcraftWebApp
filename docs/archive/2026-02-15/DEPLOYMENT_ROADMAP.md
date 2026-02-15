# 🚀 Deployment Roadmap: Vercel (Frontend)

This document guides you through setting up **Continuous Deployment (CD)** for the SignalCraft Biz frontend using **Vercel**.

## 🎯 Objective
- **Automated Deployment:** Every time code is pushed to the `main` branch on GitHub, the live website automatically updates.
- **Team Access:** Provide a public URL (e.g., `signalcraft-app.vercel.app`) for team members to view progress.

---

## ✅ Prerequisites

1.  **GitHub Repository:** Ensure your project is pushed to GitHub.
2.  **Vercel Account:** Sign up at [vercel.com](https://vercel.com) (Log in with GitHub recommended).

---

## 🛠 Step-by-Step Setup Guide

### 1. Connect Vercel to GitHub
1.  Login to your **Vercel Dashboard**.
2.  Click **"Add New..."** -> **"Project"**.
3.  In the "Import Git Repository" section, you should see your GitHub account.
    *   *If not, click "Add GitHub Org or Account" to authorize.*
4.  Find **`signalcraftapp`** (or your repo name) and click **"Import"**.

### 2. Configure Project (Framework Preset)
Vercel usually auto-detects everything, but double-check:

*   **Framework Preset:** `Vite` (It should detect this automatically).
*   **Root Directory:** `frontend`
    *   ⚠️ **Important:** Since your actual code is inside the `frontend` folder, you MUST click "Edit" next to Root Directory and select the `frontend` folder.
*   **Build Command:** `npm run build` (default).
*   **Output Directory:** `dist` (default).

### 3. Environment Variables (Optional)
If you have `.env` variables (like Supabase keys), add them here:
*   Click **"Environment Variables"**.
*   Add keys like `VITE_SUPABASE_URL` and their values.

### 4. Deploy
*   Click **"Deploy"**.
*   Vercel will install dependencies, build the project, and assign a domain.
*   Wait for the celebration confetti! 🎉

---

## 🔄 How to Update
From now on, you **do not** need to do anything on Vercel.
1.  Edit code in VS Code.
2.  Commit and Push to GitHub.
    ```bash
    git add .
    git commit -m "Update dashboard design"
    git push origin main
    ```
3.  Vercel detects the push and **automatically redeploys** within 1-2 minutes.

---

## 🔧 Troubleshooting

### "404 Not Found" on Page Refresh
Since this is a Single Page App (SPA), refreshing a sub-page (e.g., `/report`) might cause a 404 error if not configured.
*   **Solution:** Create a `vercel.json` file in the `frontend` folder with the following content:
    ```json
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
    ```

### Build Fails
*   Check the "Logs" tab in Vercel.
*   Common error: TypeScript strict mode. Ensure `npm run build` passes on your local machine first.
