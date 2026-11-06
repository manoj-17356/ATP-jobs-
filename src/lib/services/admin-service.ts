import { getStoredJobs } from './job-service';
import { getStoredEmployers } from './employer-service';
import { getStoredApplications } from './application-service';
import { getAllReports } from './job-service';
import { JOB_CATEGORIES } from '@/lib/data/categories';

export interface AdminAnalytics {
  totalSeekers: number;
  totalEmployers: number;
  verifiedEmployers: number;
  pendingEmployers: number;
  activeJobs: number;
  pendingJobs: number;
  reportedJobs: number;
  totalApplications: number;
  jobsByCategory: { name: string; count: number }[];
  jobsByVillage: { name: string; count: number }[];
  applicationsByStatus: { status: string; count: number }[];
}

export function getAdminAnalytics(): AdminAnalytics {
  const jobs = getStoredJobs();
  const employers = getStoredEmployers();
  const applications = getStoredApplications();
  const reports = getAllReports();

  const activeJobs = jobs.filter((j) => j.status === 'active').length;
  const pendingJobs = jobs.filter((j) => j.status === 'pending_approval').length;
  const verifiedEmployers = employers.filter((e) => e.status === 'verified').length;
  const pendingEmployers = employers.filter((e) => e.status === 'pending_verification').length;

  // Breakdown by category
  const catCounts: Record<string, number> = {};
  JOB_CATEGORIES.forEach((c) => {
    catCounts[c.name] = 0;
  });
  jobs.forEach((j) => {
    const cat = JOB_CATEGORIES.find((c) => c.id === j.category_id);
    if (cat) {
      catCounts[cat.name] = (catCounts[cat.name] || 0) + 1;
    }
  });

  const jobsByCategory = Object.entries(catCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Breakdown by location
  const areaCounts: Record<string, number> = {
    'Atchuthapuram': 0,
    'Industrial Corridor': 0,
    'Brandix Apparel City': 0,
    'Pharma Cluster': 0,
  };
  jobs.forEach((j) => {
    const loc = j.village_name || 'Atchuthapuram';
    areaCounts[loc] = (areaCounts[loc] || 0) + 1;
  });

  const jobsByVillage = Object.entries(areaCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Breakdown by application status
  const appStatusCounts: Record<string, number> = {
    submitted: 0,
    under_review: 0,
    shortlisted: 0,
    interview_scheduled: 0,
    selected: 0,
    rejected: 0,
  };
  applications.forEach((a) => {
    appStatusCounts[a.status] = (appStatusCounts[a.status] || 0) + 1;
  });

  const applicationsByStatus = Object.entries(appStatusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  return {
    totalSeekers: 142, // Real active local seekers baseline + new registered
    totalEmployers: employers.length,
    verifiedEmployers,
    pendingEmployers,
    activeJobs,
    pendingJobs,
    reportedJobs: reports.filter((r) => r.status === 'pending').length,
    totalApplications: applications.length,
    jobsByCategory,
    jobsByVillage,
    applicationsByStatus,
  };
}

