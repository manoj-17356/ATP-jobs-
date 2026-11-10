# 🚀 100% Free Production Deployment Guide for ATP Jobs

This single file contains the complete, step-by-step process to deploy **ATP Jobs** to the web **completely free ($0.00/month)** with zero server maintenance.

---

## 📌 Architecture: 100% Free Hosting Stack

| Component | Platform | Free Tier Inclusions | Cost |
|---|---|---|---|
| **Frontend & API Routes** | **[Vercel](https://vercel.com)** | Unlimited builds, Global Edge CDN, Free SSL (`https://`), Automated Git CI/CD, Free `*.vercel.app` domain | **$0.00** |
| **PostgreSQL & Authentication** | **[Supabase](https://supabase.com)** | 500 MB PostgreSQL database, 50,000 monthly active users, Row Level Security, Auth management | **$0.00** |
| **Source Code & Versioning** | **[GitHub](https://github.com)** | Unlimited public & private repositories, automated webhooks | **$0.00** |
| **Total Monthly Cost** | | | **$0.00 / month** |

---

## ⏱️ Quick Overview (Total Time: ~8 Minutes)

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   1. SUPABASE    │ ───> │    2. GITHUB     │ ───> │    3. VERCEL     │
│ Database & Auth  │      │ Push Source Code │      │ 1-Click Deploy   │
│   (3 Minutes)    │      │   (2 Minutes)    │      │   (3 Minutes)    │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

---

## 🟢 Step 1: Set Up Free Supabase Database & Auth (3 Minutes)

1. **Sign Up / Log In:**
   - Go to [https://supabase.com](https://supabase.com) and click **"Start your project"** (Sign in with your GitHub account).

2. **Create a New Project:**
   - Click **"New Project"**.
   - **Name:** `atp-jobs` (or `atpjobs`).
   - **Database Password:** Enter a strong password and save it securely.
   - **Region:** Select the closest region to Andhra Pradesh / India:
     - `ap-south-1` (Mumbai, India) or `ap-southeast-1` (Singapore).
   - **Pricing Plan:** Select **Free Tier ($0/month)**.
   - Click **"Create new project"** (takes ~1-2 minutes to provision).

3. **Run the Database Schema:**
   - In your Supabase project left sidebar, click the **SQL Editor** icon (`>_`).
   - Click **"New Query"**.
   - Open [supabase/schema.sql](supabase/schema.sql) from your local project repository.
   - Copy the entire SQL content and paste it into the Supabase SQL editor.
   - Click **"Run"** (or press `Ctrl + Enter`).
   - *Result:* All tables (`profiles`, `employers`, `employer_documents`, `jobs`, `applications`, `saved_jobs`, `job_reports`, `notifications`, `audit_logs`), ENUMs, triggers, and Row Level Security (RLS) policies are created instantly with seed data.

4. **Copy API Keys:**
   - In Supabase, go to **Project Settings** (gear icon in sidebar) $\rightarrow$ **API**.
   - Copy these two values into a temporary notepad:
     - **Project URL:** `https://your-project-id.supabase.co`
     - **anon / public key:** `eyJhbGciOi...` (under Project API keys)
     - **service_role key:** `eyJhbGciOi...` (click "Reveal" under Project API keys - keep this secret)

---

## 🟢 Step 2: Push Your Code to GitHub (2 Minutes)

1. **Create a Free GitHub Repository:**
   - Go to [https://github.com/new](https://github.com/new).
   - **Repository name:** `atp-jobs`
   - **Visibility:** Public or Private (both work 100% free with Vercel).
   - Leave "Initialize with README", ".gitignore", and "license" **unchecked** (our project already has them).
   - Click **"Create repository"**.

2. **Push Local Code from Your Terminal:**
   Open PowerShell in the project directory (`d:\AntiGravity\Antigravity\ATP local jobs`) and run:

   ```powershell
   # 1. Ensure all latest changes are committed
   git add -A
   git commit -m "feat: complete production ready ATP Jobs portal"

   # 2. Set default branch to main
   git branch -M main

   # 3. Add your GitHub repository URL (replace with your actual GitHub username)
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/atp-jobs.git

   # 4. Push code
   git push -u origin main
   ```

---

## 🟢 Step 3: Deploy to Vercel for Free (3 Minutes)

1. **Sign Up / Log In to Vercel:**
   - Go to [https://vercel.com/signup](https://vercel.com/signup).
   - Click **"Continue with GitHub"** to link your account.

2. **Import Your Repository:**
   - In your Vercel Dashboard, click **"Add New..."** $\rightarrow$ **"Project"**.
   - Under "Import Git Repository", find `atp-jobs` and click **"Import"**.

3. **Configure Project & Environment Variables:**
   - **Framework Preset:** `Next.js` (detected automatically).
   - **Root Directory:** `./` (default).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** `.next` (default).
   - Expand the **"Environment Variables"** section and add the following 4 variables:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` *(from Step 1)* |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-public-key` *(from Step 1)* |
   | `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` *(from Step 1)* |
   | `NEXT_PUBLIC_APP_URL` | `https://atp-jobs.vercel.app` *(or your project's Vercel domain)* |

4. **Click Deploy:**
   - Click the blue **"Deploy"** button.
   - Vercel will clone the repo, install dependencies, compile the TypeScript code, optimize static pages, and deploy globally across Edge CDN.
   - Within **60–90 seconds**, you will see confetti 🎉 and a live production preview!
   - Your live URL will be: `https://atp-jobs.vercel.app` (or similar).

---

## 🟢 Step 4: Configure Supabase Auth Redirect URLs (1 Minute)

To ensure login and signups redirect properly in production:
1. Open your [Supabase Dashboard](https://supabase.com).
2. Go to **Authentication** $\rightarrow$ **URL Configuration**.
3. Set **Site URL** to your live Vercel URL:
   ```
   https://atp-jobs.vercel.app
   ```
4. Under **Redirect URLs**, add:
   ```
   https://atp-jobs.vercel.app/**
   http://localhost:3000/**
   ```
5. Click **"Save"**.

---

## 🌐 Optional: Add a 100% Free Custom Domain

If you own a custom domain (like `atpjobs.in`, `atpjobs.org`, or `atpjobs.com`):
1. In Vercel, go to your project $\rightarrow$ **Settings** $\rightarrow$ **Domains**.
2. Type your domain (e.g. `atpjobs.in`) and click **"Add"**.
3. Follow the DNS instructions (add a `CNAME` or `A` record in your domain registrar like Cloudflare, GoDaddy, or Namecheap).
4. Vercel automatically generates and renews a free **SSL certificate (HTTPS)** with zero configuration!

---

## 🔄 Alternative 100% Free Hosting Platform: Netlify

If you ever want an alternative to Vercel:
1. Go to [https://www.netlify.com](https://www.netlify.com) and sign in with GitHub.
2. Click **"Add new site"** $\rightarrow$ **"Import an existing project"**.
3. Select `atp-jobs`.
4. Netlify will auto-detect Next.js via the `@netlify/plugin-nextjs`.
5. Under **Environment variables**, add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_APP_URL`.
6. Click **"Deploy atp-jobs"**.

---

## 🧪 Post-Deployment Live Verification Checklist

Once deployed, visit your live URL (`https://atp-jobs.vercel.app`) and verify:

- [ ] **Homepage (`/`):** Hero section, search bar, active statistics counters, and featured jobs render with clean Navy Blue corporate theme.
- [ ] **Persona Switcher:** Test switching between **Seeker**, **Employer**, and **Admin** in the top bar.
- [ ] **Job Seeker Flow:**
  - Search and filter jobs on `/jobs`.
  - Open a job detail page (`/jobs/...`), click **"Apply Now"**, enter contact details, attach resume, and submit.
  - Verify application progression on `/dashboard/seeker`.
- [ ] **Employer Flow:**
  - Open `/dashboard/employer?tab=post-job`.
  - Click any **1-Click Template** (e.g. *🏭 Machine Operator* or *🧪 QC Chemist*).
  - Click **"Publish Job Vacancy Instantly"** and confirm the job appears live.
- [ ] **Admin Flow:**
  - Open `/dashboard/admin`.
  - Verify live database KPI cards, job approvals queue, employer verification badges, and audit log history.
- [ ] **Anti-Fraud Reporting:**
  - Click **"Report Job"** on any job card.
  - Submit a test fraud report (e.g. *demand for registration deposit*).
  - Verify it appears in the Admin moderation queue instantly.

---

## 💡 Keeping Your Free Tier Active & Healthy

- **Zero Sleep Mode:** Vercel serverless functions never expire and respond instantly worldwide.
- **Supabase Free Tier Inactivity Notice:** Supabase pauses free databases if there is zero traffic for over 7 consecutive days. To prevent pausing, simply visit your website once a week, or set up a free uptime monitor (like [UptimeRobot](https://uptimerobot.com) - 100% free) to ping your site every 24 hours.
- **Automated CI/CD:** Every time you run `git push origin main`, Vercel automatically rebuilds and deploys your changes in ~60 seconds with zero downtime!

---

🎉 **Congratulations! Your ATP Jobs portal is now live on the internet, completely free!**

