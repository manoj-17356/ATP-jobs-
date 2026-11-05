-- ====================================================================
-- AtchuJobs Database Schema (Supabase PostgreSQL)
-- Atchuthapuram Mandal, Anakapalli District, Andhra Pradesh
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Custom ENUM Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('job_seeker', 'employer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE employer_status AS ENUM ('pending_verification', 'verified', 'rejected', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_status AS ENUM ('pending_approval', 'active', 'rejected', 'expired', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM (
        'submitted',
        'under_review',
        'shortlisted',
        'interview_scheduled',
        'selected',
        'rejected'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status AS ENUM ('pending', 'investigating', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ====================================================================
-- 3. Master Data Tables: Villages & Job Categories
-- ====================================================================

-- Villages in Atchuthapuram Mandal
CREATE TABLE IF NOT EXISTS public.villages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    name_te VARCHAR(100) NOT NULL,
    mandal VARCHAR(100) DEFAULT 'Atchuthapuram',
    district VARCHAR(100) DEFAULT 'Anakapalli',
    pin_code VARCHAR(10) DEFAULT '531011',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Job Categories
CREATE TABLE IF NOT EXISTS public.job_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    name_te VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'Briefcase',
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- 4. User Profiles Table (Linked to Supabase Auth.users)
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    role user_role DEFAULT 'job_seeker' NOT NULL,
    avatar_url TEXT,
    village_id UUID REFERENCES public.villages(id) ON DELETE SET NULL,
    village_name VARCHAR(100),
    mandal VARCHAR(100) DEFAULT 'Atchuthapuram',
    district VARCHAR(100) DEFAULT 'Anakapalli',
    
    -- Seeker specific fields
    headline VARCHAR(200),
    bio TEXT,
    skills TEXT[],
    education JSONB DEFAULT '[]'::jsonb, -- [{ institution, degree, year, field }]
    experience JSONB DEFAULT '[]'::jsonb, -- [{ company, role, duration, description }]
    resume_url TEXT,
    resume_file_name VARCHAR(255),
    resume_updated_at TIMESTAMP WITH TIME ZONE,
    is_profile_public BOOLEAN DEFAULT TRUE,
    
    -- Status & Timestamps
    is_suspended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- 5. Employers & Verification
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.employers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    company_logo TEXT,
    industry VARCHAR(100) NOT NULL,
    company_type VARCHAR(100) DEFAULT 'Private Limited', -- e.g. SEZ Unit, Private Ltd, Partnership, Proprietorship
    description TEXT,
    website VARCHAR(255),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    
    -- Physical location in Atchuthapuram / SEZ
    address TEXT NOT NULL,
    village_id UUID REFERENCES public.villages(id) ON DELETE SET NULL,
    village_name VARCHAR(100) NOT NULL,
    sez_zone VARCHAR(150), -- e.g., 'APSEZ Atchuthapuram Sector 2', 'Brandix India Apparel City'
    pincode VARCHAR(10) DEFAULT '531011',
    
    -- Verification details
    status employer_status DEFAULT 'pending_verification' NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    verification_notes TEXT,
    
    -- Zero Fee Pledge
    no_fee_pledge BOOLEAN DEFAULT TRUE NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Employer Verification Documents (Private storage)
CREATE TABLE IF NOT EXISTS public.employer_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID NOT NULL REFERENCES public.employers(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'gstin', 'pan', 'incorporation_certificate', 'trade_license', 'factory_license'
    document_number VARCHAR(100),
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- 6. Jobs Postings
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID NOT NULL REFERENCES public.employers(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.job_categories(id) ON DELETE RESTRICT,
    village_id UUID NOT NULL REFERENCES public.villages(id) ON DELETE RESTRICT,
    
    title VARCHAR(200) NOT NULL,
    title_te VARCHAR(200),
    description TEXT NOT NULL,
    responsibilities TEXT[],
    requirements TEXT[],
    skills_required TEXT[],
    
    -- Job Type & Shift Details
    job_type VARCHAR(50) DEFAULT 'Full-time' NOT NULL, -- 'Full-time', 'Shift-based', 'Contract', 'Part-time', 'Apprenticeship'
    shift_type VARCHAR(50) DEFAULT 'General', -- 'Day', 'Night', 'Rotational 3-shift', 'General'
    vacancies_count INT DEFAULT 1 NOT NULL,
    experience_level VARCHAR(50) DEFAULT 'Freshers Welcome', -- 'Freshers Welcome', '1-2 Years', '3-5 Years', '5+ Years'
    education_required VARCHAR(100) DEFAULT 'Any Graduate / 10th / Intermediate',
    
    -- Compensation & Local Perks
    salary_min INT,
    salary_max INT,
    salary_type VARCHAR(20) DEFAULT 'monthly', -- 'monthly', 'daily', 'yearly'
    salary_negotiable BOOLEAN DEFAULT FALSE,
    has_bus_facility BOOLEAN DEFAULT FALSE, -- Crucial for Atchuthapuram SEZ workers
    has_canteen_facility BOOLEAN DEFAULT FALSE,
    has_esi_pf BOOLEAN DEFAULT TRUE,
    has_accommodation BOOLEAN DEFAULT FALSE,
    
    -- Location details
    work_location VARCHAR(255) NOT NULL,
    village_name VARCHAR(100) NOT NULL,
    
    -- Status & Moderation
    status job_status DEFAULT 'pending_approval' NOT NULL,
    admin_review_notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Anti-fraud guarantee
    zero_fee_verified BOOLEAN DEFAULT TRUE NOT NULL,
    views_count INT DEFAULT 0,
    applications_count INT DEFAULT 0,
    
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- 7. Job Applications
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    seeker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    employer_id UUID NOT NULL REFERENCES public.employers(id) ON DELETE CASCADE,
    
    status application_status DEFAULT 'submitted' NOT NULL,
    cover_note TEXT,
    resume_url TEXT NOT NULL,
    resume_file_name VARCHAR(255),
    applicant_village VARCHAR(100),
    applicant_phone VARCHAR(20),
    
    -- Employer / Interview Actions
    status_updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    employer_notes TEXT,
    interview_date TIMESTAMP WITH TIME ZONE,
    interview_location TEXT,
    interview_instructions TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    UNIQUE(job_id, seeker_id)
);

-- ====================================================================
-- 8. Saved Jobs (Bookmarks)
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.saved_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seeker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(seeker_id, job_id)
);

-- ====================================================================
-- 9. Job Reports (Fake Job Prevention & Moderation)
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.job_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reporter_name VARCHAR(150),
    reporter_phone VARCHAR(20),
    
    report_reason VARCHAR(100) NOT NULL, -- 'registration_fee_demanded', 'fake_company', 'misleading_salary', 'inappropriate_content', 'other'
    details TEXT NOT NULL,
    evidence_url TEXT,
    status report_status DEFAULT 'pending' NOT NULL,
    admin_notes TEXT,
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- 10. Notifications
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    title_te VARCHAR(200),
    message TEXT NOT NULL,
    message_te TEXT,
    type VARCHAR(50) DEFAULT 'general', -- 'application_update', 'interview_scheduled', 'job_approved', 'job_rejected', 'employer_verified', 'report_update'
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- 11. Moderation & Audit Logs
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- 'VERIFY_EMPLOYER', 'REJECT_EMPLOYER', 'APPROVE_JOB', 'REJECT_JOB', 'SUSPEND_EMPLOYER', 'RESOLVE_REPORT'
    target_entity VARCHAR(50) NOT NULL, -- 'employer', 'job', 'user', 'report'
    target_id UUID NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- 12. Row Level Security (RLS) Policies
-- ====================================================================

ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Villages & Categories: Public read, Admin write
CREATE POLICY "Public can view active villages" ON public.villages
    FOR SELECT USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admin manage villages" ON public.villages
    FOR ALL USING (public.is_admin());

CREATE POLICY "Public can view active categories" ON public.job_categories
    FOR SELECT USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admin manage categories" ON public.job_categories
    FOR ALL USING (public.is_admin());

-- Profiles Policies
CREATE POLICY "Users can view own profile or public profiles" ON public.profiles
    FOR SELECT USING (id = auth.uid() OR is_profile_public = TRUE OR public.is_admin());

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "Admin full manage profiles" ON public.profiles
    FOR ALL USING (public.is_admin());

-- Employers Policies
CREATE POLICY "Public can view verified employers" ON public.employers
    FOR SELECT USING (status = 'verified' OR user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Employers can insert profile" ON public.employers
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Employers can update own profile" ON public.employers
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admin full manage employers" ON public.employers
    FOR ALL USING (public.is_admin());

-- Jobs Policies
CREATE POLICY "Public can view active approved jobs" ON public.jobs
    FOR SELECT USING (
        status = 'active'
        OR employer_id IN (SELECT id FROM public.employers WHERE user_id = auth.uid())
        OR public.is_admin()
    );

CREATE POLICY "Verified employers can insert jobs" ON public.jobs
    FOR INSERT WITH CHECK (
        employer_id IN (
            SELECT id FROM public.employers 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Employers can update own jobs" ON public.jobs
    FOR UPDATE USING (
        employer_id IN (SELECT id FROM public.employers WHERE user_id = auth.uid())
        OR public.is_admin()
    );

CREATE POLICY "Admin can delete jobs" ON public.jobs
    FOR DELETE USING (public.is_admin());

-- Applications Policies
CREATE POLICY "Job seekers can view own applications" ON public.applications
    FOR SELECT USING (
        seeker_id = auth.uid()
        OR employer_id IN (SELECT id FROM public.employers WHERE user_id = auth.uid())
        OR public.is_admin()
    );

CREATE POLICY "Job seekers can submit application" ON public.applications
    FOR INSERT WITH CHECK (seeker_id = auth.uid());

CREATE POLICY "Employers can update application status" ON public.applications
    FOR UPDATE USING (
        employer_id IN (SELECT id FROM public.employers WHERE user_id = auth.uid())
        OR public.is_admin()
    );

-- Saved Jobs Policies
CREATE POLICY "Seekers manage own saved jobs" ON public.saved_jobs
    FOR ALL USING (seeker_id = auth.uid());

-- Job Reports Policies
CREATE POLICY "Anyone can report a job" ON public.job_reports
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admin can view and update reports" ON public.job_reports
    FOR ALL USING (public.is_admin());

-- Notifications Policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can mark own notifications read" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid());

-- Audit Logs Policies
CREATE POLICY "Admin can view audit logs" ON public.audit_logs
    FOR SELECT USING (public.is_admin());

CREATE POLICY "System can create audit logs" ON public.audit_logs
    FOR INSERT WITH CHECK (public.is_admin());

-- ====================================================================
-- 13. Automatic Profile Creation Trigger on Auth Signup
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        role,
        avatar_url
    ) VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        COALESCE((new.raw_user_meta_data->>'role')::user_role, 'job_seeker'::user_role),
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- 14. SEED DATA FOR ATCHUTHAPURAM MANDAL
-- ====================================================================

-- Insert Official Villages in Atchuthapuram Mandal
INSERT INTO public.villages (name, name_te, mandal, district, pin_code) VALUES
('Atchuthapuram', 'అచ్యుతాపురం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Haripalem', 'హరిపాలెం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Duppituru', 'దుప్పిటూరు', 'Atchuthapuram', 'Anakapalli', '531011'),
('Kondakarla', 'కొండకర్ల', 'Atchuthapuram', 'Anakapalli', '531033'),
('Maduturu', 'మడుతూరు', 'Atchuthapuram', 'Anakapalli', '531011'),
('Pudimadaka', 'పూడిమడక', 'Atchuthapuram', 'Anakapalli', '531011'),
('Veduruvada', 'వెదురువాడ', 'Atchuthapuram', 'Anakapalli', '531011'),
('Somavaram', 'సోమవరం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Thimmarajupeta', 'తిమ్మరాజుపేట', 'Atchuthapuram', 'Anakapalli', '531011'),
('Yellapuvanipalem', 'ఎల్లపువానిపాలెం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Dibbapalem', 'దిబ్బపాలెం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Dosuru', 'దోసూరు', 'Atchuthapuram', 'Anakapalli', '531011'),
('Ugginapalem', 'ఉగ్గినపాలెం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Moturupalem', 'మోటురుపాలెం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Nukalapalem', 'నూకాలపాలెం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Tantadi', 'తంతడి', 'Atchuthapuram', 'Anakapalli', '531011'),
('Pedapadu', 'పెదపాడు', 'Atchuthapuram', 'Anakapalli', '531011'),
('Chodapalle', 'చోడపల్లె', 'Atchuthapuram', 'Anakapalli', '531011'),
('Rayavaram', 'రాయవరం', 'Atchuthapuram', 'Anakapalli', '531011'),
('Jaggannapeta', 'జగ్గన్నపేట', 'Atchuthapuram', 'Anakapalli', '531011')
ON CONFLICT (name) DO NOTHING;

-- Insert 12 Local Job Categories
INSERT INTO public.job_categories (slug, name, name_te, description, icon, display_order) VALUES
('manufacturing', 'Manufacturing', 'తయారీ రంగం', 'Factory production, machine operators, assembly line, SEZ manufacturing', 'Factory', 1),
('it-computer', 'IT and Computer', 'ఐటీ మరియు కంప్యూటర్', 'Data entry, software support, network technician, IT operations', 'Laptop', 2),
('engineering', 'Engineering', 'ఇంజనీరింగ్', 'Mechanical, Electrical, Instrumentation, Chemical engineers', 'Wrench', 3),
('pharma', 'Pharma', 'ఫార్మా రంగం', 'Quality Control, QA, Formulation, Chemical synthesis in APSEZ Pharma cluster', 'Pill', 4),
('office-administration', 'Office Administration', 'ఆఫీస్ అడ్మినిస్ట్రేషన్', 'Back office, front desk, HR coordinators, file managers', 'Building2', 5),
('accounting', 'Accounting', 'ఖాతాలు మరియు అకౌంటింగ్', 'Tally operators, billing clerks, tax assistants, store bookkeepers', 'Calculator', 6),
('security', 'Security', 'సెక్యూరిటీ మరియు భద్రత', 'Industrial security guards, supervisors, CCTV surveillance', 'ShieldCheck', 7),
('transportation', 'Transportation', 'రవాణా మరియు లాజిస్టిక్స్', 'Heavy vehicle drivers, forklift operators, dispatch coordinators', 'Truck', 8),
('education', 'Education', 'విద్య మరియు శిక్షణ', 'Local school teachers, tutors, industrial training apprentices', 'GraduationCap', 9),
('healthcare', 'Healthcare', 'వైద్యం మరియు ఆరోగ్య సంరక్షణ', 'Staff nurses, lab technicians, pharmacy assistants, first aid responders', 'Stethoscope', 10),
('skilled-workers', 'Skilled Workers', 'నైపుణ్యం కలిగిన కార్మికులు', 'Electricians, fitters, welders, CNC machinists, plumbers', 'Hammer', 11),
('general-labour', 'General Labour', 'జనరల్ లేబర్', 'Packaging workers, warehouse helpers, loading/unloading staff', 'Users', 12)
ON CONFLICT (slug) DO NOTHING;
