import { Job, JobFilters, JobReport, SavedJob } from '@/types';
import { INITIAL_JOBS, INITIAL_EMPLOYERS, INITIAL_REPORTS } from '@/lib/data/sample-data';
import { JOB_CATEGORIES } from '@/lib/data/categories';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';

const JOBS_STORAGE_KEY = 'atchujobs_jobs_list';
const SAVED_JOBS_KEY = 'atchujobs_saved_jobs';
const REPORTS_STORAGE_KEY = 'atchujobs_job_reports';

export function getStoredJobs(): Job[] {
  if (typeof window === 'undefined') return INITIAL_JOBS;
  try {
    const raw = localStorage.getItem(JOBS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse stored jobs:', err);
    return INITIAL_JOBS;
  }
}

export function saveStoredJobs(jobs: Job[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
}

export function getJobWithDetails(job: Job): Job {
  const employers = typeof window !== 'undefined' 
    ? (JSON.parse(localStorage.getItem('atchujobs_employers') || 'null') || INITIAL_EMPLOYERS)
    : INITIAL_EMPLOYERS;

  const employer = employers.find((e: any) => e.id === job.employer_id) || INITIAL_EMPLOYERS[0];
  const category = JOB_CATEGORIES.find((c) => c.id === job.category_id);
  const village = ATCHUTHAPURAM_VILLAGES.find((v) => v.id === job.village_id || v.name === job.village_name);

  return {
    ...job,
    employer,
    category,
    village,
  };
}

export function getAllActiveJobs(filters?: Partial<JobFilters>): Job[] {
  const allJobs = getStoredJobs().map(getJobWithDetails);
  
  // Filter for active status
  let filtered = allJobs.filter((j) => j.status === 'active');

  if (!filters) return filtered;

  if (filters.searchQuery?.trim()) {
    const q = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        (j.title_te && j.title_te.toLowerCase().includes(q)) ||
        j.description.toLowerCase().includes(q) ||
        j.employer?.company_name.toLowerCase().includes(q) ||
        j.skills_required.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (filters.categoryId && filters.categoryId !== 'all') {
    const catId = filters.categoryId;
    filtered = filtered.filter((j) => j.category_id === catId || j.category?.slug === catId);
  }

  if (filters.villageName && filters.villageName !== 'all') {
    const vName = filters.villageName.toLowerCase();
    filtered = filtered.filter((j) => j.village_name.toLowerCase() === vName);
  }

  if (filters.jobType && filters.jobType !== 'all') {
    filtered = filtered.filter((j) => j.job_type === filters.jobType);
  }

  if (filters.shiftType && filters.shiftType !== 'all') {
    filtered = filtered.filter((j) => j.shift_type === filters.shiftType);
  }

  if (filters.minSalary && filters.minSalary > 0) {
    filtered = filtered.filter((j) => (j.salary_max || j.salary_min || 0) >= filters.minSalary!);
  }

  if (filters.hasBusOnly) {
    filtered = filtered.filter((j) => j.has_bus_facility);
  }

  if (filters.verifiedOnly) {
    filtered = filtered.filter((j) => j.employer?.status === 'verified');
  }

  if (filters.sortBy === 'salary_high') {
    filtered.sort((a, b) => (b.salary_max || b.salary_min || 0) - (a.salary_max || a.salary_min || 0));
  } else {
    // Default latest
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return filtered;
}

export function getJobById(id: string): Job | null {
  const jobs = getStoredJobs();
  const job = jobs.find((j) => j.id === id);
  if (!job) return null;
  return getJobWithDetails(job);
}

export function createJobPosting(data: Omit<Job, 'id' | 'views_count' | 'applications_count' | 'created_at' | 'updated_at'>): Job {
  const allJobs = getStoredJobs();
  const newJob: Job = {
    ...data,
    id: `job-${Date.now()}`,
    views_count: 1,
    applications_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  allJobs.unshift(newJob);
  saveStoredJobs(allJobs);
  return getJobWithDetails(newJob);
}

export function updateJobStatus(jobId: string, status: Job['status'], adminNotes?: string): boolean {
  const allJobs = getStoredJobs();
  const index = allJobs.findIndex((j) => j.id === jobId);
  if (index === -1) return false;

  allJobs[index].status = status;
  if (adminNotes) {
    allJobs[index].admin_review_notes = adminNotes;
  }
  if (status === 'active') {
    allJobs[index].reviewed_at = new Date().toISOString();
  }
  allJobs[index].updated_at = new Date().toISOString();
  saveStoredJobs(allJobs);
  return true;
}

// Job Saved / Bookmark system
export function getSavedJobIds(seekerId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY);
    if (!raw) return [];
    const saved: SavedJob[] = JSON.parse(raw);
    return saved.filter((s) => s.seeker_id === seekerId).map((s) => s.job_id);
  } catch {
    return [];
  }
}

export function toggleSaveJob(seekerId: string, jobId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY);
    let saved: SavedJob[] = raw ? JSON.parse(raw) : [];
    const existsIndex = saved.findIndex((s) => s.seeker_id === seekerId && s.job_id === jobId);

    if (existsIndex >= 0) {
      saved.splice(existsIndex, 1);
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(saved));
      return false; // Now un-saved
    } else {
      saved.push({
        id: `save-${Date.now()}`,
        seeker_id: seekerId,
        job_id: jobId,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(saved));
      return true; // Now saved
    }
  } catch {
    return false;
  }
}

// Job Reports for Fake Job Prevention
export function submitJobReport(report: Omit<JobReport, 'id' | 'status' | 'created_at'>): JobReport {
  let reports: JobReport[] = INITIAL_REPORTS;
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (raw) reports = JSON.parse(raw);
  }

  const newReport: JobReport = {
    ...report,
    id: `rep-${Date.now()}`,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  reports.unshift(newReport);
  if (typeof window !== 'undefined') {
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
  }
  return newReport;
}

export function getAllReports(): JobReport[] {
  if (typeof window === 'undefined') return INITIAL_REPORTS;
  try {
    const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
      return INITIAL_REPORTS;
    }
    const reports: JobReport[] = JSON.parse(raw);
    return reports.map((r) => {
      const job = getJobById(r.job_id);
      return { ...r, job: job || undefined };
    });
  } catch {
    return INITIAL_REPORTS;
  }
}

export function updateReportStatus(reportId: string, status: JobReport['status'], adminNotes?: string) {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
  if (!raw) return;
  const reports: JobReport[] = JSON.parse(raw);
  const idx = reports.findIndex((r) => r.id === reportId);
  if (idx >= 0) {
    reports[idx].status = status;
    if (adminNotes) reports[idx].admin_notes = adminNotes;
    reports[idx].resolved_at = new Date().toISOString();
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
  }
}
