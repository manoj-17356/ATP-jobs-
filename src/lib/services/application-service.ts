import { Application, ApplicationStatus } from '@/types';
import { INITIAL_APPLICATIONS, SAMPLE_USERS, INITIAL_EMPLOYERS } from '@/lib/data/sample-data';
import { getJobById, getStoredJobs, saveStoredJobs } from './job-service';

const APPLICATIONS_KEY = 'atpjobs_applications';

export function getStoredApplications(): Application[] {
  if (typeof window === 'undefined') return INITIAL_APPLICATIONS;
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY) || localStorage.getItem('atchujobs_applications');
    if (!raw) {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse applications:', err);
    return INITIAL_APPLICATIONS;
  }
}

export function saveStoredApplications(apps: Application[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}

export function populateApplication(app: Application): Application {
  const job = getJobById(app.job_id);
  const employers = typeof window !== 'undefined'
    ? (JSON.parse(localStorage.getItem('atpjobs_employers') || localStorage.getItem('atchujobs_employers') || 'null') || INITIAL_EMPLOYERS)
    : INITIAL_EMPLOYERS;
  const employer = employers.find((e: any) => e.id === app.employer_id) || job?.employer;
  const seeker = SAMPLE_USERS.seeker; // Seeker profile

  return {
    ...app,
    job: job || undefined,
    employer: employer || undefined,
    seeker,
  };
}

export function getApplicationsForSeeker(seekerId: string): Application[] {
  const all = getStoredApplications();
  return all
    .filter((a) => a.seeker_id === seekerId)
    .map(populateApplication)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getApplicationsForEmployer(employerId: string): Application[] {
  const all = getStoredApplications();
  return all
    .filter((a) => a.employer_id === employerId)
    .map(populateApplication)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getAllApplications(): Application[] {
  const all = getStoredApplications();
  return all.map(populateApplication);
}

export function submitApplication(data: {
  jobId: string;
  seekerId: string;
  employerId: string;
  coverNote?: string;
  resumeUrl: string;
  resumeFileName?: string;
  applicantVillage?: string;
  applicantPhone?: string;
}): { success: boolean; application?: Application; error?: string } {
  const all = getStoredApplications();

  // Check if already applied
  const existing = all.find((a) => a.job_id === data.jobId && a.seeker_id === data.seekerId);
  if (existing) {
    return { success: false, error: 'You have already applied for this position.' };
  }

  const newApp: Application = {
    id: `app-${Date.now()}`,
    job_id: data.jobId,
    seeker_id: data.seekerId,
    employer_id: data.employerId,
    status: 'submitted',
    cover_note: data.coverNote,
    resume_url: data.resumeUrl,
    resume_file_name: data.resumeFileName || 'Resume.pdf',
    applicant_village: data.applicantVillage || 'Atchuthapuram',
    applicant_phone: data.applicantPhone,
    status_updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  all.unshift(newApp);
  saveStoredApplications(all);

  // Increment application count on the job
  const allJobs = getStoredJobs();
  const jobIdx = allJobs.findIndex((j) => j.id === data.jobId);
  if (jobIdx >= 0) {
    allJobs[jobIdx].applications_count = (allJobs[jobIdx].applications_count || 0) + 1;
    saveStoredJobs(allJobs);
  }

  return { success: true, application: populateApplication(newApp) };
}

export function updateApplicationStatus(
  applicationId: string,
  newStatus: ApplicationStatus,
  details?: {
    employerNotes?: string;
    interviewDate?: string;
    interviewLocation?: string;
    interviewInstructions?: string;
  }
): boolean {
  const all = getStoredApplications();
  const index = all.findIndex((a) => a.id === applicationId);
  if (index === -1) return false;

  all[index].status = newStatus;
  all[index].status_updated_at = new Date().toISOString();
  all[index].updated_at = new Date().toISOString();

  if (details) {
    if (details.employerNotes !== undefined) all[index].employer_notes = details.employerNotes;
    if (details.interviewDate !== undefined) all[index].interview_date = details.interviewDate;
    if (details.interviewLocation !== undefined) all[index].interview_location = details.interviewLocation;
    if (details.interviewInstructions !== undefined) all[index].interview_instructions = details.interviewInstructions;
  }

  saveStoredApplications(all);
  return true;
}

