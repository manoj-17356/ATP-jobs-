'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { getAdminAnalytics, AdminAnalytics } from '@/lib/services/admin-service';
import {
  getStoredJobs,
  updateJobStatus,
  getAllReports,
  updateReportStatus,
} from '@/lib/services/job-service';
import {
  getStoredEmployers,
  updateEmployerStatus,
  getStoredAuditLogs,
} from '@/lib/services/employer-service';
import { getStoredApplications } from '@/lib/services/application-service';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';
import { JOB_CATEGORIES } from '@/lib/data/categories';
import { Job, Employer, JobReport, AuditLog } from '@/types';
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  TrendingUp,
  BarChart3,
  Search,
  Filter,
  Ban,
  Eye,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'pending-jobs' | 'verify-employers' | 'reports' | 'audit-logs' | 'villages'
  >('analytics');

  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [reports, setReports] = useState<JobReport[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Action states
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const refreshAllData = () => {
    setAnalytics(getAdminAnalytics());
    setJobs(getStoredJobs());
    setEmployers(getStoredEmployers());
    setReports(getAllReports());
    setAuditLogs(getStoredAuditLogs());
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const showSuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 3000);
  };

  // Job Moderation Handlers
  const handleApproveJob = (jobId: string) => {
    updateJobStatus(jobId, 'active', reviewNote || 'Approved after mandal location & wage check.');
    refreshAllData();
    showSuccess('Job approved and published to the live portal!');
    setReviewNote('');
    setSelectedJob(null);
  };

  const handleRejectJob = (jobId: string) => {
    updateJobStatus(jobId, 'rejected', reviewNote || 'Rejected due to insufficient verification.');
    refreshAllData();
    showSuccess('Job rejected.');
    setReviewNote('');
    setSelectedJob(null);
  };

  // Employer Verification Handlers
  const handleVerifyEmployer = (empId: string) => {
    updateEmployerStatus(
      empId,
      'verified',
      'Documents and plant address inspected. Verified genuine local enterprise.',
      user?.id
    );
    refreshAllData();
    showSuccess('Employer verified with green badge!');
  };

  const handleSuspendEmployer = (empId: string, companyName: string) => {
    const reason = prompt(
      `Enter reason for suspending ${companyName} (e.g. demanding registration fee from candidates):`,
      'Fraudulent fee collection reported in Atchuthapuram Mandal'
    );
    if (!reason) return;

    updateEmployerStatus(empId, 'suspended', reason, user?.id);
    refreshAllData();
    showSuccess(`Employer ${companyName} permanently suspended and blocked!`);
  };

  // Report Resolution
  const handleResolveReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    updateReportStatus(
      reportId,
      action,
      action === 'resolved' ? 'Investigated and appropriate sanctions applied' : 'Report invalid'
    );
    refreshAllData();
    showSuccess(`Report marked as ${action}.`);
  };

  const pendingJobsList = jobs.filter((j) => j.status === 'pending_approval');
  const pendingEmployersList = employers.filter((e) => e.status === 'pending_verification');
  const pendingReportsList = reports.filter((r) => r.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">
                AtchuJobs Mandal Administration Desk
              </h1>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-2 py-0.5 rounded-full">
                Admin Control
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Atchuthapuram Mandal • Anakapalli District • Anti-Fraud & Moderation Hub
            </p>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-2">
          {pendingReportsList.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950 text-red-300 border border-red-700 rounded-xl text-xs font-bold animate-pulse">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              {pendingReportsList.length} Fake Job Report Alert
            </span>
          )}
          {pendingJobsList.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950 text-amber-300 border border-amber-700 rounded-xl text-xs font-bold">
              <Clock className="w-4 h-4 text-amber-400" />
              {pendingJobsList.length} Pending Approval
            </span>
          )}
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {actionSuccess}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs sm:text-sm font-bold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'analytics'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Real Database Analytics
        </button>

        <button
          onClick={() => setActiveTab('pending-jobs')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'pending-jobs'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Job Approvals ({pendingJobsList.length})
        </button>

        <button
          onClick={() => setActiveTab('verify-employers')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'verify-employers'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Employer Verification ({employers.length})
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'reports'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Fake Job Reports ({pendingReportsList.length})
        </button>

        <button
          onClick={() => setActiveTab('audit-logs')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'audit-logs'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Moderation & Audit Trail
        </button>

        <button
          onClick={() => setActiveTab('villages')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'villages'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Mandal Villages & Categories
        </button>
      </div>

      {/* TAB 1: ANALYTICS DASHBOARD (Actual Database Driven) */}
      {activeTab === 'analytics' && analytics && (
        <div className="space-y-6">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Total Job Seekers</span>
              <span className="text-2xl sm:text-3xl font-black text-navy-950 mt-1 block">
                {analytics.totalSeekers}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                ↑ Registered from 20 Villages
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Employers Registered</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-blue-600">
                  {analytics.totalEmployers}
                </span>
                <span className="text-xs text-emerald-700 font-bold">
                  ({analytics.verifiedEmployers} Verified)
                </span>
              </div>
              <span className="text-[10px] text-amber-600 font-semibold mt-1 block">
                {analytics.pendingEmployers} Pending Review
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Active Verified Jobs</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                  {analytics.activeJobs}
                </span>
                <span className="text-xs text-slate-500">
                  ({analytics.pendingJobs} Pending)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                100% Zero Candidate Fee
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Total Applications</span>
              <span className="text-2xl sm:text-3xl font-black text-purple-600 mt-1 block">
                {analytics.totalApplications}
              </span>
              <span className="text-[10px] text-red-600 font-semibold mt-1 block">
                {analytics.reportedJobs} Fake Job Reports
              </span>
            </div>
          </div>

          {/* Breakdown Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jobs By Category Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-sm text-navy-950 mb-4 flex items-center justify-between">
                <span>Jobs by Category</span>
                <span className="text-xs font-normal text-slate-500">12 Local Categories</span>
              </h3>
              <div className="space-y-2.5">
                {analytics.jobsByCategory.slice(0, 6).map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{cat.name}</span>
                      <span className="text-blue-600">{cat.count} jobs</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (cat.count / (analytics.activeJobs || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jobs By Village Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-sm text-navy-950 mb-4 flex items-center justify-between">
                <span>Jobs by Village</span>
                <span className="text-xs font-normal text-slate-500">Atchuthapuram Mandal</span>
              </h3>
              <div className="space-y-2.5">
                {analytics.jobsByVillage.slice(0, 6).map((vil) => (
                  <div key={vil.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{vil.name}</span>
                      <span className="text-emerald-600">{vil.count} vacancies</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (vil.count / (analytics.activeJobs || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PENDING JOB APPROVALS */}
      {activeTab === 'pending-jobs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
              Pending Job Moderation Queue ({pendingJobsList.length})
            </h2>
            <p className="text-xs text-slate-500">
              Every job posting is reviewed for genuine workplace, realistic salary, zero-fee compliance, and mandal geography.
            </p>
          </div>

          {pendingJobsList.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-navy-950 text-base">All Caught Up!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No jobs are waiting for moderation review.
              </p>
            </div>
          ) : (
            pendingJobsList.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-amber-300 p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full mb-1">
                      <Clock className="w-3 h-3 text-amber-600" /> Pending Admin Approval
                    </span>
                    <h3 className="text-base font-bold text-navy-950">{job.title}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Company: <strong>{job.employer?.company_name || 'Apex Agro & Bio-Tech'}</strong> • Location: <strong>{job.village_name}</strong>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="font-bold text-navy-900 block">
                      Salary: ₹{job.salary_min?.toLocaleString()} - ₹{job.salary_max?.toLocaleString()}
                    </span>
                    <span className="text-slate-500">
                      {job.vacancies_count} Vacancies • {job.shift_type}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {job.description}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <input
                    type="text"
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    placeholder="Enter admin feedback note..."
                    className="w-full sm:w-80 text-xs border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleRejectJob(job.id)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-xl transition"
                    >
                      Reject Vacancy
                    </button>
                    <button
                      onClick={() => handleApproveJob(job.id)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                    >
                      Approve & Publish Live
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: EMPLOYER VERIFICATION */}
      {activeTab === 'verify-employers' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
              Employer Directory & Verification Desk
            </h2>
            <p className="text-xs text-slate-500">
              Verify company legitimacy via GSTIN, PAN, and factory licenses. Suspend fraudulent recruiters.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Company Name</th>
                  <th className="px-4 py-3.5">Location & SEZ Zone</th>
                  <th className="px-4 py-3.5">Contact Person</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employers.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">{emp.company_name}</div>
                      <div className="text-[11px] text-slate-500">{emp.industry}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-800">{emp.village_name}</div>
                      <div className="text-[11px] text-slate-500">{emp.sez_zone || 'Industrial Area'}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-slate-800">{emp.contact_email}</div>
                      <div className="text-[11px] text-slate-500">{emp.contact_phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      {emp.status === 'verified' ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[10px]">
                          <ShieldCheck className="w-3 h-3 text-emerald-700" /> Verified
                        </span>
                      ) : emp.status === 'suspended' ? (
                        <span className="inline-flex items-center gap-1 font-bold text-red-800 bg-red-100 px-2.5 py-0.5 rounded-full text-[10px]">
                          <Ban className="w-3 h-3 text-red-700" /> Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full text-[10px]">
                          <Clock className="w-3 h-3 text-amber-700" /> Pending Review
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      {emp.status !== 'verified' && (
                        <button
                          onClick={() => handleVerifyEmployer(emp.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition"
                        >
                          Approve Verification
                        </button>
                      )}
                      {emp.status !== 'suspended' && (
                        <button
                          onClick={() => handleSuspendEmployer(emp.id, emp.company_name)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-xs transition"
                        >
                          Suspend Account
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: FAKE JOB REPORTS INVESTIGATION */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-red-950 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Candidate Fraud Reports & Fee Violations ({reports.length})
            </h2>
            <p className="text-xs text-slate-500">
              Investigate reports filed by job seekers in Atchuthapuram Mandal regarding fake recruiters, fee demands, or fake addresses.
            </p>
          </div>

          {reports.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-navy-950 text-base">Clean Mandal Record</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No reported violations currently pending.
              </p>
            </div>
          ) : (
            reports.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-2xl border border-red-200 p-6 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-full mb-1">
                      Violation: {rep.report_reason.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <h3 className="text-base font-bold text-navy-950">
                      Report against: {rep.job?.title || 'Solar Warehouse Helpers'}
                    </h3>
                    <div className="text-xs text-slate-500">
                      Reported by: <strong>{rep.reporter_name || 'Ramesh Varma'}</strong> ({rep.reporter_phone})
                    </div>
                  </div>

                  <div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        rep.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      Status: {rep.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-100 text-xs text-slate-800">
                  <strong>Reporter&apos;s Testimony:</strong> {rep.details}
                </div>

                {rep.status === 'pending' && (
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => handleResolveReport(rep.id, 'dismissed')}
                      className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-700"
                    >
                      Dismiss Report
                    </button>
                    <button
                      onClick={() => handleResolveReport(rep.id, 'resolved')}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                    >
                      Enforce Sanction & Resolve
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === 'audit-logs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
              Immutable Moderation & Audit Trail
            </h2>
            <p className="text-xs text-slate-500">
              Audit log of all admin approvals, suspensions, and verifications in Atchuthapuram Mandal.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-4 py-3">Admin Action</th>
                  <th className="px-4 py-3">Target Entity</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-slate-500 font-mono text-[11px]">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-[10px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 uppercase font-semibold text-blue-700">
                      {log.target_entity}
                    </td>
                    <td className="px-4 py-3 text-slate-700 max-w-xs truncate">
                      {JSON.stringify(log.details)}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                      {log.ip_address || '157.48.21.90'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: VILLAGES & CATEGORIES MASTER DATA */}
      {activeTab === 'villages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Villages List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-navy-950">
                Official Villages in Atchuthapuram Mandal ({ATCHUTHAPURAM_VILLAGES.length})
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                PIN 531011
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 text-xs">
              {ATCHUTHAPURAM_VILLAGES.map((v) => (
                <div key={v.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{v.name}</span>
                    <span className="text-slate-500 ml-2">({v.name_te})</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-navy-950">
              12 Local Job Categories
            </h3>
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 text-xs">
              {JOB_CATEGORIES.map((cat) => (
                <div key={cat.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{cat.name}</span>
                    <span className="text-slate-500 ml-2">({cat.name_te})</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{cat.slug}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
