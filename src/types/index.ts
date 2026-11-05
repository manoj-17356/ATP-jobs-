export type UserRole = 'job_seeker' | 'employer' | 'admin';

export type EmployerStatus = 'pending_verification' | 'verified' | 'rejected' | 'suspended';

export type JobStatus = 'pending_approval' | 'active' | 'rejected' | 'expired' | 'closed';

export type ApplicationStatus =
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'selected'
  | 'rejected';

export type ReportStatus = 'pending' | 'investigating' | 'resolved' | 'dismissed';

export type ShiftType = 'Day' | 'Night' | 'Rotational 3-shift' | 'General';

export type JobType = 'Full-time' | 'Shift-based' | 'Contract' | 'Part-time' | 'Apprenticeship';

export interface Village {
  id: string;
  name: string;
  name_te: string;
  mandal: string;
  district: string;
  pin_code: string;
  is_active: boolean;
}

export interface JobCategory {
  id: string;
  slug: string;
  name: string;
  name_te: string;
  description: string;
  icon: string;
  is_active: boolean;
  display_order: number;
}

export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
  field: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  village_id?: string;
  village_name?: string;
  mandal?: string;
  district?: string;
  
  // Job seeker profile fields
  headline?: string;
  bio?: string;
  skills?: string[];
  education?: EducationItem[];
  experience?: ExperienceItem[];
  resume_url?: string;
  resume_file_name?: string;
  resume_updated_at?: string;
  is_profile_public?: boolean;
  
  is_suspended?: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmployerDocument {
  id: string;
  employer_id: string;
  document_type: 'gstin' | 'pan' | 'incorporation_certificate' | 'trade_license' | 'factory_license';
  document_number?: string;
  file_url: string;
  file_name: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Employer {
  id: string;
  user_id: string;
  company_name: string;
  company_logo?: string;
  industry: string;
  company_type: string;
  description: string;
  website?: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  village_id?: string;
  village_name: string;
  sez_zone?: string;
  pincode: string;
  status: EmployerStatus;
  verified_at?: string;
  verified_by?: string;
  verification_notes?: string;
  no_fee_pledge: boolean;
  documents?: EmployerDocument[];
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  employer_id: string;
  category_id: string;
  village_id: string;
  title: string;
  title_te?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills_required: string[];
  job_type: JobType;
  shift_type: ShiftType;
  vacancies_count: number;
  experience_level: string;
  education_required: string;
  salary_min?: number;
  salary_max?: number;
  salary_type: 'monthly' | 'daily' | 'yearly';
  salary_negotiable: boolean;
  has_bus_facility: boolean;
  has_canteen_facility: boolean;
  has_esi_pf: boolean;
  has_accommodation: boolean;
  work_location: string;
  village_name: string;
  status: JobStatus;
  admin_review_notes?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  zero_fee_verified: boolean;
  views_count: number;
  applications_count: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
  
  // Joined fields for display
  employer?: Employer;
  category?: JobCategory;
  village?: Village;
}

export interface Application {
  id: string;
  job_id: string;
  seeker_id: string;
  employer_id: string;
  status: ApplicationStatus;
  cover_note?: string;
  resume_url: string;
  resume_file_name?: string;
  applicant_village?: string;
  applicant_phone?: string;
  status_updated_at?: string;
  employer_notes?: string;
  interview_date?: string;
  interview_location?: string;
  interview_instructions?: string;
  created_at: string;
  updated_at: string;
  
  // Joined fields
  job?: Job;
  seeker?: UserProfile;
  employer?: Employer;
}

export interface SavedJob {
  id: string;
  seeker_id: string;
  job_id: string;
  created_at: string;
  job?: Job;
}

export interface JobReport {
  id: string;
  job_id: string;
  reporter_id?: string;
  reporter_name?: string;
  reporter_phone?: string;
  report_reason:
    | 'registration_fee_demanded'
    | 'fake_company'
    | 'misleading_salary'
    | 'inappropriate_content'
    | 'other';
  details: string;
  evidence_url?: string;
  status: ReportStatus;
  admin_notes?: string;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
  job?: Job;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  title_te?: string;
  message: string;
  message_te?: string;
  type:
    | 'general'
    | 'application_update'
    | 'interview_scheduled'
    | 'job_approved'
    | 'job_rejected'
    | 'employer_verified'
    | 'report_update';
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  admin_id?: string;
  action: string;
  target_entity: 'employer' | 'job' | 'user' | 'report' | 'village' | 'category';
  target_id: string;
  details: Record<string, any>;
  ip_address?: string;
  created_at: string;
  admin_name?: string;
}

export interface JobFilters {
  searchQuery: string;
  categoryId: string;
  villageName: string;
  jobType: string;
  shiftType: string;
  experienceLevel: string;
  minSalary?: number;
  hasBusOnly: boolean;
  verifiedOnly: boolean;
  sortBy: 'latest' | 'salary_high' | 'urgency';
}
