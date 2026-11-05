# 🏢 AtchuJobs – Local Job Portal
### *Local Jobs. Local Opportunities.*
**Exclusively focused on Atchuthapuram Mandal, Anakapalli District, Andhra Pradesh**

---

## 📌 Executive Summary

**AtchuJobs** is a modern, responsive, production-ready employment platform built exclusively for **Atchuthapuram Mandal, Anakapalli District, Andhra Pradesh**. It connects local job seekers with verified employers across the **APSEZ (Andhra Pradesh Special Economic Zone) industrial corridor**, **Brandix India Apparel City (BIAC)**, Pharma & Chemical clusters, engineering fabrication units, and local commercial establishments.

Inspired by LinkedIn, Naukri, and Indeed, AtchuJobs features an original design with a **clean white background and navy blue corporate theme**, **dual-language support (English and Telugu / తెలుగు)**, an anti-fraud verification system, and a **strict Zero-Tolerance Fake Job & Fee Prevention policy**.

---

## 🛠️ Technology Stack

- **Frontend & Full-stack Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & UI:** Tailwind CSS (Navy Blue Theme, Custom Badges, Responsive Layouts)
- **Icons:** Lucide React
- **Backend & Database:** Next.js API Routes / Server Actions + Supabase PostgreSQL
- **Security:** Supabase Row Level Security (RLS) policies, Role-Based Access Control (RBAC)
- **Deployment Ready:** Vercel & GitHub Ready

---

## 👥 Three Complete User Roles

### 1. 👨‍💼 Job Seekers
- **Registration & Profile:** Create professional profile with name, phone, native village in Atchuthapuram Mandal, headline, bio, education, experience, and skills chips.
- **Resume Management:** Upload PDF resume, preview CV, and attach to applications.
- **Search & Filters:** Search jobs by keywords, skills, salary, job type, shift type, and **native village filter (all 20 villages in Atchuthapuram Mandal)**.
- **SEZ Perks Filtering:** Filter jobs that offer **Free Bus Transportation** across mandal villages or subsidized canteen facilities.
- **Saved Jobs:** Bookmark interesting vacancies to apply later.
- **Application Status Lifecycle:** Track live status progression across all stages:
  $$\text{Submitted} \longrightarrow \text{Under Review} \longrightarrow \text{Shortlisted} \longrightarrow \text{Interview Scheduled} \longrightarrow \text{Selected / Rejected}$$
- **Interview Notifications:** View interview date, venue, gate pass instructions, and contact details directly in the dashboard.

### 2. 🏭 Employers
- **Company Profile:** Register legal business name, factory location, SEZ zone (e.g. APSEZ Sector 1/2, Brandix India Apparel City), website, contact info, and logo.
- **Business Verification:** Mandatory upload of **GSTIN**, **PAN**, **AP Factory License**, or Trade License. Unverified employers cannot publish live vacancies until admin clearance.
- **Post Vacancies:** Complete posting form specifying shift type (General, Day, Night, Rotational 3-shift), vacancy count, education, salary range, bus facility routes, and **mandatory zero-fee pledge**.
- **Applicant Pipeline:** Review candidate profiles, native village, and PDF resumes.
- **Status Management:** Shortlist candidates, reject with feedback, or open the **Interview Scheduler Modal** to assign interview date/time, security gate pass instructions, and plant venue.

### 3. 🛡️ Mandal Admin
- **Live Database KPIs:** Real-time analytics for total job seekers, registered employers, verified vs pending employers, active jobs, pending jobs, reported fake jobs, and total applications.
- **Interactive Visualizations:** Jobs breakdown by **12 local categories** and **20 Atchuthapuram villages**.
- **Company Verification:** Inspect uploaded business documents (GSTIN/Factory License) and approve verification (granting the green verified badge) or reject.
- **Job Approval Queue:** Review every vacancy for realistic salary, genuine factory address, and zero-fee compliance before publishing live.
- **Fake Job Investigation:** Investigate reports filed by job seekers (e.g. demands for registration deposits, fake company claims). One-click **suspend fraudulent employer** and blacklist accounts.
- **Master Data Desk:** View and manage official Atchuthapuram villages and categories.
- **Immutable Audit Trail:** Complete audit logs recording all admin approvals, suspensions, and verifications with timestamps and IP records.

---

## 🛡️ Fake Job Prevention & Zero-Fee Guarantee

1. **Mandatory Employer Verification:** Employers must submit valid business registration proof before their vacancies are published to the public.
2. **Every Vacancy Moderated:** All job postings undergo review by the mandal admin desk.
3. **Dual Verification Badges:**
   - 🛡️ **Verified Employer Badge:** Indicates corporate GSTIN/Factory registration has been validated.
   - 📋 **Admin Approved Vacancy Badge:** Indicates work location, salary realism, and job description have passed mandal scrutiny.
4. **Report Fraudulent Vacancy Button:** On every job card and job detail page, candidates can flag suspicious recruiters for:
   - Demanding registration fees, uniform deposits, or interview fees.
   - Ghost company or fake address.
   - Misleading salary or vacancy numbers.
5. **Zero-Fee Candidate Policy:** Prominent warning banners throughout the site remind local youth that **charging any application or interview fees is strictly prohibited**.

---

## 🌐 20 Official Villages in Atchuthapuram Mandal

AtchuJobs natively supports all official villages in Atchuthapuram Mandal (PIN: 531011 & 531033), Anakapalli District:
1. **Atchuthapuram (అచ్యుతాపురం)**
2. **Haripalem (హరిపాలెం)**
3. **Duppituru (దుప్పిటూరు)**
4. **Kondakarla (కొండకర్ల)**
5. **Maduturu (మడుతూరు)**
6. **Pudimadaka (పూడిమడక)**
7. **Veduruvada (వెదురువాడ)**
8. **Somavaram (సోమవరం)**
9. **Thimmarajupeta (తిమ్మరాజుపేట)**
10. **Yellapuvanipalem (ఎల్లపువానిపాలెం)**
11. **Dibbapalem (దిబ్బపాలెం)**
12. **Dosuru (దోసూరు)**
13. **Ugginapalem (ఉగ్గినపాలెం)**
14. **Moturupalem (మోటురుపాలెం)**
15. **Nukalapalem (నూకాలపాలెం)**
16. **Tantadi (తంతడి)**
17. **Pedapadu (పెదపాడు)**
18. **Chodapalle (చోడపల్లె)**
19. **Rayavaram (రాయవరం)**
20. **Jaggannapeta (జగ్గన్నపేట)**

---

## 📂 12 Local Job Categories

1. **Manufacturing (తయారీ రంగం):** Assembly operators, line supervisors, packing technicians.
2. **IT and Computer (ఐటీ మరియు కంప్యూటర్):** Desktop support, network technicians, data entry.
3. **Engineering (ఇంజనీరింగ్):** CNC/VMC operators, mechanical, electrical, and chemical engineers.
4. **Pharma (ఫార్మా రంగం):** Quality Control (QC), QA, HPLC analysts, bulk drug formulation in APSEZ.
5. **Office Administration (ఆఫీస్ అడ్మినిస్ట్రేషన్):** Front desk, HR assistants, store documentation.
6. **Accounting (ఖాతాలు మరియు అకౌంటింగ్):** Tally Prime operators, GST billing clerks.
7. **Security (సెక్యూరిటీ మరియు భద్రత):** Plant security guards, gate controllers, CCTV monitors.
8. **Transportation (రవాణా మరియు లాజిస్టిక్స్):** Heavy vehicle drivers, SEZ bus drivers, forklift operators.
9. **Education (విద్య మరియు శిక్షణ):** Local school teachers, industrial training instructors.
10. **Healthcare (వైద్యం మరియు ఆరోగ్య సంరక్షణ):** Staff nurses, plant first aid attendants, lab technicians.
11. **Skilled Workers (నైపుణ్యం కలిగిన కార్మికులు):** Electricians, fitters, welders, machinists.
12. **General Labour (జనరల్ లేబర్):** Warehouse helpers, dispatch assistants.

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

AtchuJobs includes a **Quick Persona Switcher** in the top navigation bar, allowing you to instantaneously switch between all 3 roles without relogging!

### Test Scenario 1: Job Seeker Journey (👨‍💼 Ramesh Varma)
1. In the top bar, click **"Seeker"** (or login at `/login` using the one-click *Job Seeker* button).
2. Visit the **Home Page (`/`)** and use the **Job Search Bar**:
   - Filter by Village: select **"Haripalem"** or **"Atchuthapuram"**.
   - Filter by Category: select **"Pharma"** or **"Manufacturing"**.
3. On a Job Card:
   - Click the **Bookmark** icon to save the vacancy.
   - Click **"View Details"** to review the full job specifications.
   - Click **"Apply Now"**: confirm candidate phone, select native village, attach resume, and submit.
4. Navigate to **"Dashboard"** (`/dashboard/seeker`):
   - In **My Applications**, observe the lifecycle progress bar (*Submitted $\rightarrow$ Shortlisted $\rightarrow$ Interview*).
   - Review the scheduled interview for *Laurus Bio-Pharma* with APSEZ gate pass instructions.
   - Switch to **Resume & Credentials** tab: click *Edit Credentials*, add a new skill chip (e.g. *CNC Machining*), update phone, and click *Save Profile Changes*.
   - Switch to **Saved Jobs** tab to view bookmarked positions.

### Test Scenario 2: Employer Journey (🏭 Laurus Bio-Pharma / HR)
1. In the top bar, click **"Employer"** (or login as Employer).
2. Navigate to **Employer Dashboard (`/dashboard/employer`)**:
   - **Manage Vacancies tab:** view active jobs, applicants count, and closing controls.
   - **Applicant Pipeline tab:** filter by job title; see *Ramesh Varma* from Haripalem.
   - Change application status using the dropdown: select **"Schedule Interview 🗓️"**.
   - In the modal, select date/time, plant venue, and security gate instructions, then confirm. Notice the candidate is immediately updated!
   - **Create Job Posting tab:** fill out the vacancy form with shift type, salary range, free bus toggle, and publish.
   - **Business Verification Documents tab:** view approved GSTIN document and submit a new Factory License document.

### Test Scenario 3: Admin Journey (🛡️ Mandal Moderation Admin)
1. In the top bar, click **"Admin"** (or login as Admin).
2. Navigate to **Admin Dashboard (`/dashboard/admin`)**:
   - **Real Database Analytics tab:** view live metrics for Seekers, Employers, Active Jobs, Category distribution, and Village breakdown.
   - **Job Approvals tab:** inspect pending jobs (e.g. *Solar Panel Warehouse Helpers*). Test approving or rejecting with feedback notes.
   - **Employer Verification tab:** review registered companies. Test approving pending employers or clicking **"Suspend Account"** to blacklist fraudulent agencies.
   - **Fake Job Reports tab:** review reports filed by candidates. Examine details and test *Enforce Sanction & Resolve*.
   - **Moderation & Audit Trail tab:** inspect immutable audit logs of all actions, targets, admin IDs, and IP addresses.
   - **Mandal Villages & Categories tab:** review the 20 official villages and 12 categories.

### Test Scenario 4: Anti-Fraud Fake Job Reporting
1. Visit `/jobs`.
2. On any job card, click the **"Report Job"** button (red triangle alert).
3. Select a reason: *Demanded registration fee / interview deposit*.
4. Enter incident details (e.g. *Recruiter asked for Rs 500 gate pass deposit*) and submit.
5. Switch to **Admin Dashboard $\rightarrow$ Fake Job Reports** to verify the report appears instantly in the moderation queue!

### Test Scenario 5: Telugu Language Toggle (తెలుగు)
1. In the top bar, click **"తెలుగు"**.
2. Notice all navigation items, headings, taglines, village names, category labels, badges, and anti-fraud warnings update to clear Telugu!
3. Click **"English"** to toggle back seamlessly.

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
   - Seed data for 20 villages and 12 categories

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: If left empty, the application automatically runs in zero-friction Local Demo Mode with persistent localStorage, allowing complete testing immediately without database setup!)*

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/atchujobs.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import the `atchujobs` GitHub repository.
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
│   │   │   └── language-context.tsx   # Dual language (English & Telugu) system
│   │   ├── data/
│   │   │   ├── villages.ts            # 20 official Atchuthapuram Mandal villages
│   │   │   ├── categories.ts          # 12 local job categories
│   │   │   └── sample-data.ts         # Authentic APSEZ sample employers & jobs
│   │   ├── services/
│   │   │   ├── job-service.ts         # Job queries, filtering, reporting, bookmarks
│   │   │   ├── application-service.ts # Applications pipeline & interview scheduler
│   │   │   ├── employer-service.ts    # Employer verification & audit logging
│   │   │   └── admin-service.ts       # Real-time database metrics & KPI aggregations
│   │   └── supabase/
│   │       └── client.ts              # Resilient Supabase browser client
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Navy blue navigation & persona switcher
│   │   │   └── Footer.tsx             # Mandal office contacts & zero-fee warning
│   │   └── jobs/
│   │       ├── JobCard.tsx            # Verified job card with perks chips
│   │       ├── JobSearchBar.tsx       # Keyword, village & category search
│   │       ├── JobFilterSidebar.tsx   # Multi-facet filters (bus, shift, salary)
│   │       ├── ApplyModal.tsx         # Fast application modal with resume select
│   │       └── ReportJobModal.tsx     # Fake job reporting modal
│   └── app/
│       ├── layout.tsx                 # Root layout with font & providers
│       ├── globals.css                # Tailwind global styles
│       ├── page.tsx                   # Homepage (Hero, Stats, Verified Jobs, SEZ Units)
│       ├── jobs/
│       │   ├── page.tsx               # Job listings with filter sidebar
│       │   └── [id]/page.tsx          # Full job specifications & application CTA
│       ├── companies/
│       │   └── page.tsx               # Verified SEZ companies directory
│       ├── villages/
│       │   └── page.tsx               # 20 Atchuthapuram villages job directory
│       ├── login/
│       │   └── page.tsx               # 1-click test login & auth forms
│       ├── register/
│       │   └── page.tsx               # Dual registration with anti-fraud pledge
│       └── dashboard/
│           ├── seeker/page.tsx        # Seeker dashboard (profile, pipeline, saved)
│           ├── employer/page.tsx      # Employer dashboard (post job, pipeline, verify)
│           └── admin/page.tsx         # Admin desk (real KPIs, queue, reports, audit)
└── README.md                 # Complete system documentation & testing guide
```

---

## 🏆 Final Verification

- ✅ Next.js 14 production build compiled with zero errors.
- ✅ All 7 routes (`/`, `/jobs`, `/companies`, `/villages`, `/dashboard/seeker`, `/dashboard/employer`, `/dashboard/admin`) return **HTTP 200 OK**.
- ✅ Clean Git repository initialized with initial commit.
- ✅ 100% compliant with Atchuthapuram Mandal geographic and industrial specifications.
