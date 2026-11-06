# 🏢 ATP Jobs – Local Job Portal
### *Local Jobs. Local Opportunities.*
**Exclusively focused on Atchuthapuram**

---

## 📌 Executive Summary

**ATP Jobs** is a modern, responsive, production-ready employment platform built exclusively for **Atchuthapuram**. It connects local job seekers directly with verified employers across the industrial corridor, Brandix Apparel City, pharma & chemical clusters, engineering fabrication plants, and local commercial establishments.

Inspired by LinkedIn, Naukri, and Indeed, ATP Jobs features an original design with a **clean white background and navy blue corporate theme**, English language interface, an anti-fraud verification system, streamlined 1-click vacancy posting for businesses, and a **strict Zero-Tolerance Fake Job & Fee Prevention policy**.

---

## 🛠️ Technology Stack

- **Frontend & Full-stack Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & UI:** Tailwind CSS (Navy Blue Corporate Theme, White Background, Custom Badges, Responsive Layouts)
- **Icons:** Lucide React
- **Backend & Database:** Next.js API Routes / Server Actions + Supabase PostgreSQL
- **Security:** Supabase Row Level Security (RLS) policies, Role-Based Access Control (RBAC)
- **Deployment Ready:** Vercel & GitHub Ready

---

## 👥 Three Complete User Roles

### 1. 👨‍💼 Job Seekers
- **Registration & Profile:** Create professional profile with name, phone, location in Atchuthapuram, headline, bio, education, experience, and skills chips.
- **Resume Management:** Upload PDF resume, preview CV, and attach to applications.
- **Search & Filters:** Search jobs by keywords, popular roles, category, salary, job type, and shift type.
- **Workplace Perks Filtering:** Filter jobs that offer **Free Bus Transportation** across local routes or subsidized canteen facilities.
- **Saved Jobs:** Bookmark interesting vacancies to apply later.
- **Application Status Lifecycle:** Track live status progression across all stages:
  $$\text{Submitted} \longrightarrow \text{Under Review} \longrightarrow \text{Shortlisted} \longrightarrow \text{Interview Scheduled} \longrightarrow \text{Selected / Rejected}$$
- **Interview Notifications:** View interview date, venue, gate pass instructions, and contact details directly in the dashboard.

### 2. 🏭 Employers (Reduced Job Post Difficulty)
- **1-Click Popular Job Templates:** Instantly pre-fill the entire posting form with 1 click for:
  - 🏭 *Machine Operator*
  - 🧪 *QC Chemist*
  - 🛡️ *Security Guard*
  - 📊 *Accountant / Tally Executive*
  - ⚡ *Electrician / Maintenance Technician*
- **Auto-Generate Job Descriptions:** Single-click auto-generation of professional job specifications and responsibilities.
- **Instant Live Publishing:** Verified employers can publish vacancies live in under 1 minute.
- **Company Profile & Documents:** Register business name, plant address, upload GSTIN or Factory License for green verified badge.
- **Applicant Pipeline:** Review candidate profiles and PDF resumes.
- **Status Management & Interview Scheduling:** Shortlist candidates, reject with feedback, or open the **Interview Scheduler Modal** to assign interview date/time, security gate pass instructions, and plant venue.

### 3. 🛡️ Admin
- **Live Database KPIs:** Real-time analytics for total job seekers, registered employers, verified vs pending employers, active jobs, pending jobs, reported fake jobs, and total applications.
- **Interactive Visualizations:** Jobs breakdown by **12 local categories** and Atchuthapuram industrial areas.
- **Company Verification:** Inspect uploaded business documents (GSTIN/Factory License) and approve verification (granting the green verified badge) or reject.
- **Job Approval Queue:** Review vacancies for realistic salary, genuine factory address, and zero-fee compliance.
- **Fake Job Investigation:** Investigate reports filed by job seekers (e.g. demands for registration deposits, fake company claims). One-click **suspend fraudulent employer** and blacklist accounts.
- **Categories & Scope Desk:** Manage official 12 categories and local operational boundaries.
- **Immutable Audit Trail:** Complete audit logs recording all admin approvals, suspensions, and verifications with timestamps and IP records.

---

## 🛡️ Fake Job Prevention & Zero-Fee Guarantee

1. **Mandatory Employer Verification:** Employers submit business registration proof (GSTIN/Factory license) before long-term vacancy posting.
2. **Every Vacancy Moderated:** All job postings undergo review by the moderation desk.
3. **Dual Verification Badges:**
   - 🛡️ **Verified Employer Badge:** Indicates corporate GSTIN/Factory registration has been validated.
   - 📋 **Admin Approved Vacancy Badge:** Indicates work location, salary realism, and job description have passed administrative scrutiny.
4. **Report Fraudulent Vacancy Button:** On every job card and job detail page, candidates can flag suspicious recruiters for:
   - Demanding registration fees, uniform deposits, or interview fees.
   - Ghost company or fake address.
   - Misleading salary or vacancy numbers.
5. **Zero-Fee Candidate Policy:** Prominent warning banners throughout the site remind local youth that **charging any application or interview fees is strictly prohibited**.

---

## 📍 Local Operating Areas in Atchuthapuram

ATP Jobs focuses on the key employment hubs across Atchuthapuram (PIN: 531011):
- **Industrial Corridor:** Heavy engineering, fabrication, and manufacturing facilities.
- **Brandix Apparel City (BIAC):** Garment production, sewing, QA, and logistics.
- **Pharma Cluster:** Active pharmaceutical ingredient (API) synthesis, QA/QC, and chemical processing.
- **Central Town & Commercial Junction:** Retail, clinics, billing, transport, and office administration.

---

## 📂 12 Local Job Categories

1. **Manufacturing:** Assembly operators, line supervisors, packing technicians.
2. **IT and Computer:** Desktop support, network technicians, data entry.
3. **Engineering:** CNC/VMC operators, mechanical, electrical, and chemical engineers.
4. **Pharma:** Quality Control (QC), QA, HPLC analysts, bulk drug formulation.
5. **Office Administration:** Front desk, HR assistants, store documentation.
6. **Accounting:** Tally Prime operators, GST billing clerks.
7. **Security:** Plant security guards, gate controllers, CCTV monitors.
8. **Transportation:** Heavy vehicle drivers, local bus drivers, forklift operators.
9. **Education:** Local school teachers, industrial training instructors.
10. **Healthcare:** Staff nurses, plant first aid attendants, lab technicians.
11. **Skilled Workers:** Electricians, fitters, welders, machinists.
12. **General Labour:** Warehouse helpers, dispatch assistants.

---

## 🚀 Quick Start Guide (Testing Locally)

### 1. Prerequisites
- **Node.js:** v18 or later (Tested on Node v24)
- **NPM:** 9+

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build Production Application
```bash
npm run build
npm start
```

---

## 🧪 Step-by-Step Testing Guide

ATP Jobs includes a **Quick Persona Switcher** in the top navigation bar, allowing you to instantaneously switch between all 3 roles without relogging!

### Test Scenario 1: Job Seeker Journey (👨‍💼 Ramesh Varma)
1. In the top bar, click **"Seeker"** (or login at `/login` using the one-click *Job Seeker* button).
2. Visit the **Home Page (`/`)** and use the **Job Search Bar**:
   - Filter by Area: select **"Industrial Corridor"** or **"Atchuthapuram (All Areas)"**.
   - Filter by Category: select **"Pharma"** or **"Manufacturing"**.
   - Try the popular search tags: click **"Machine Operator"** or **"QC Chemist"**.
3. On a Job Card:
   - Click the **Bookmark** icon to save the vacancy.
   - Click **"View Details"** to review the full job specifications.
   - Click **"Apply Now"**: confirm candidate phone, enter location in Atchuthapuram, attach resume, and submit.
4. Navigate to **"Dashboard"** (`/dashboard/seeker`):
   - In **My Applications**, observe the lifecycle progress bar (*Submitted $\rightarrow$ Shortlisted $\rightarrow$ Interview*).
   - Review the scheduled interview for *Laurus Bio-Pharma* with security gate pass instructions.
   - Switch to **Resume & Credentials** tab: click *Edit Credentials*, add a new skill chip (e.g. *CNC Machining*), update phone, and click *Save Profile Changes*.
   - Switch to **Saved Jobs** tab to view bookmarked positions.

### Test Scenario 2: Employer Journey with Streamlined Job Posting (🏭 Laurus Bio-Pharma / HR)
1. In the top bar, click **"Employer"** (or login as Employer).
2. Navigate to **Employer Dashboard (`/dashboard/employer`)**:
   - Click **"Post Vacancy"** tab (`/dashboard/employer?tab=post-job`).
   - Notice the **1-Click Job Templates** at the top:
     - Click **"🏭 Machine Operator"** or **"🧪 QC Chemist"**.
     - Notice how the entire form (title, category, shift, salary range ₹18k-₹24k, vacancies, perks, description, skills) is instantly pre-filled!
   - Click **"Publish Job Vacancy Instantly"**: notice the job is published live immediately with a green confirmation banner!
   - Switch to **Manage Vacancies tab:** view the newly posted vacancy active and accepting applications.
   - Switch to **Applicant Pipeline tab:** filter by job title; view candidate profiles.
   - Change application status using the dropdown: select **"Schedule Interview 🗓️"**.
   - In the modal, select date/time, plant venue, and security gate instructions, then confirm. The candidate's dashboard updates immediately.
   - **Business Verification Documents tab:** view approved GSTIN document and submit a new Factory License document.

### Test Scenario 3: Admin Journey (🛡️ Moderation Admin)
1. In the top bar, click **"Admin"** (or login as Admin).
2. Navigate to **Admin Dashboard (`/dashboard/admin`)**:
   - **Real Database Analytics tab:** view live metrics for Seekers, Employers, Active Jobs, Category distribution, and Atchuthapuram area breakdown.
   - **Job Approvals tab:** inspect pending jobs. Test approving or rejecting with feedback notes.
   - **Employer Verification tab:** review registered companies. Test approving pending employers or clicking **"Suspend Account"** to blacklist fraudulent agencies.
   - **Fake Job Reports tab:** review reports filed by candidates. Examine details and test *Enforce Sanction & Resolve*.
   - **Moderation & Audit Trail tab:** inspect immutable audit logs of all actions, targets, admin IDs, and IP addresses.
   - **Job Categories & Scope tab:** review the 12 categories and local operational boundaries.

### Test Scenario 4: Anti-Fraud Fake Job Reporting
1. Visit `/jobs`.
2. On any job card, click the **"Report Job"** button (red alert icon).
3. Select a reason: *Demanded registration fee / interview deposit*.
4. Enter incident details (e.g. *Recruiter asked for Rs 500 gate pass deposit*) and submit.
5. Switch to **Admin Dashboard $\rightarrow$ Fake Job Reports** to verify the report appears instantly in the moderation queue!

---

## 🗄️ Supabase PostgreSQL Integration Guide

The project includes the complete database schema in `supabase/schema.sql`.

### 1. Run Schema in Supabase
1. Open your [Supabase Dashboard](https://supabase.com).
2. Go to **SQL Editor** $\rightarrow$ **New Query**.
3. Copy and paste the entire contents of `supabase/schema.sql`.
4. Click **Run**. This will create:
   - All ENUMs (`user_role`, `employer_status`, `job_status`, `application_status`, `report_status`)
   - Tables: `villages`, `job_categories`, `profiles`, `employers`, `employer_documents`, `jobs`, `applications`, `saved_jobs`, `job_reports`, `notifications`, `audit_logs`
   - Complete Row Level Security (RLS) policies
   - Automatic profile creation triggers linked to `auth.users`
   - Seed data for Atchuthapuram and 12 categories

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: If left empty, the application automatically runs in zero-friction Local Demo Mode with persistent storage, allowing complete testing immediately without database setup!)*

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/atpjobs.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import the `atpjobs` GitHub repository.
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel production domain)
5. Click **Deploy**. Vercel will build the Next.js application with zero errors!

---

## 🏛️ Project Directory Structure

```
├── .env.example              # Sample environment configuration
├── package.json              # Project dependencies and build scripts
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind theme with Navy Blue colors
├── tsconfig.json             # TypeScript configuration
├── supabase/
│   └── schema.sql            # Complete PostgreSQL schema, RLS, functions & seed data
├── src/
│   ├── types/
│   │   └── index.ts          # Unified TypeScript interfaces for jobs, users, apps
│   ├── lib/
│   │   ├── context/
│   │   │   ├── auth-context.tsx       # Auth provider & demo role switcher
│   │   │   └── language-context.tsx   # Language context (English)
│   │   ├── data/
│   │   │   ├── categories.ts          # 12 local job categories
│   │   │   └── sample-data.ts         # Authentic local sample employers & jobs
│   │   ├── services/
│   │   │   ├── job-service.ts         # Job queries, filtering, reporting, bookmarks
│   │   │   ├── application-service.ts # Applications pipeline & interview scheduler
│   │   │   ├── employer-service.ts    # Employer verification & audit logging
│   │   │   └── admin-service.ts       # Real-time database metrics & KPI aggregations
│   │   └── supabase/
│   │       └── client.ts              # Resilient Supabase browser client
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # ATP Jobs navy blue navigation & persona switcher
│   │   │   └── Footer.tsx             # Local contacts & zero-fee warning
│   │   └── jobs/
│   │       ├── JobCard.tsx            # Verified job card with perks chips
│   │       ├── JobSearchBar.tsx       # Keyword & category search + popular tags
│   │       ├── JobFilterSidebar.tsx   # Multi-facet filters (bus, shift, salary)
│   │       ├── ApplyModal.tsx         # Fast application modal with resume select
│   │       └── ReportJobModal.tsx     # Fake job reporting modal
│   └── app/
│       ├── layout.tsx                 # Root layout with font & providers
│       ├── globals.css                # Tailwind global styles
│       ├── page.tsx                   # Homepage (Hero, Stats, Verified Jobs, Local Units)
│       ├── jobs/
│       │   ├── page.tsx               # Job listings with filter sidebar
│       │   └── [id]/page.tsx          # Full job specifications & application CTA
│       ├── companies/
│       │   └── page.tsx               # Verified companies directory
│       ├── villages/
│       │   └── page.tsx               # Redirect to /jobs
│       ├── login/
│       │   └── page.tsx               # 1-click test login & auth forms
│       ├── register/
│       │   └── page.tsx               # Dual registration with anti-fraud pledge
│       └── dashboard/
│           ├── seeker/page.tsx        # Seeker dashboard (profile, pipeline, saved)
│           ├── employer/page.tsx      # Employer dashboard (post job with 1-click templates)
│           └── admin/page.tsx         # Admin desk (real KPIs, queue, reports, audit)
└── README.md                 # Complete system documentation & testing guide
```

---

## 🏆 Final Verification

- ✅ Next.js 14 production build compiled with zero errors.
- ✅ All routes (`/`, `/jobs`, `/companies`, `/dashboard/seeker`, `/dashboard/employer`, `/dashboard/admin`, etc.) return **HTTP 200 OK**.
- ✅ Clean Git repository initialized with commits.
- ✅ 100% compliant with ATP Jobs and Atchuthapuram local specifications.
