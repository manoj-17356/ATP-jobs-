'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { useLanguage } from '@/lib/context/language-context';
import { getStoredJobs, createJobPosting, updateJobStatus } from '@/lib/services/job-service';
import {
  getStoredEmployers,
  getEmployerById,
  addEmployerDocument,
  getEmployerByUserId,
} from '@/lib/services/employer-service';
import {
  getApplicationsForEmployer,
  updateApplicationStatus,
} from '@/lib/services/application-service';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';
import { JOB_CATEGORIES } from '@/lib/data/categories';
import { Job, Application, Employer, EmployerDocument } from '@/types';
import {
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  AlertTriangle,
  Plus,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  X,
  UploadCloud,
  ChevronDown,
  Eye,
  Bus,
  FileCheck,
} from 'lucide-react';

export default function EmployerDashboardPage() {
  const { user, employer, updateEmployerProfile, loginAs } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'jobs' | 'applicants' | 'post-job' | 'verification'>(
    'jobs'
  );

  const [currentEmp, setCurrentEmp] = useState<Employer | null>(employer);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('all');

  // Interview Schedule Modal State
  const [schedulingApp, setSchedulingApp] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewLocation, setInterviewLocation] = useState('');
  const [interviewInstructions, setInterviewInstructions] = useState('');

  // Post Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTitleTe, setNewTitleTe] = useState('');
  const [newCategoryId, setNewCategoryId] = useState(JOB_CATEGORIES[0].id);
  const [newVillageName, setNewVillageName] = useState('Haripalem');
  const [newJobType, setNewJobType] = useState<Job['job_type']>('Full-time');
  const [newShiftType, setNewShiftType] = useState<Job['shift_type']>('Rotational 3-shift');
  const [newVacancies, setNewVacancies] = useState(3);
  const [newExperience, setNewExperience] = useState('1-2 Years');
  const [newEducation, setNewEducation] = useState('B.Sc / ITI / Diploma');
  const [newSalaryMin, setNewSalaryMin] = useState(18000);
  const [newSalaryMax, setNewSalaryMax] = useState(25000);
  const [newHasBus, setNewHasBus] = useState(true);
  const [newHasCanteen, setNewHasCanteen] = useState(true);
  const [newHasEsiPf, setNewHasEsiPf] = useState(true);
  const [newWorkLocation, setNewWorkLocation] = useState(
    'Atchuthapuram Industrial Corridor'
  );
  const [newDescription, setNewDescription] = useState('');
  const [newSkills, setNewSkills] = useState('Machine Operation, Safety Protocols, Quality Inspection');
  const [jobCreatedSuccess, setJobCreatedSuccess] = useState(false);

  // Document Upload State
  const [docType, setDocType] = useState<EmployerDocument['document_type']>('gstin');
  const [docNumber, setDocNumber] = useState('');
  const [docFileName, setDocFileName] = useState('');
  const [docUploadSuccess, setDocUploadSuccess] = useState(false);

  // Refresh data
  const refreshData = () => {
    const allEmps = getStoredEmployers();
    const activeEmp = currentEmp || allEmps[0];
    setCurrentEmp(activeEmp);

    if (activeEmp) {
      const allJobs = getStoredJobs();
      const empJobs = allJobs.filter((j) => j.employer_id === activeEmp.id);
      setJobs(empJobs);

      const apps = getApplicationsForEmployer(activeEmp.id);
      setApplications(apps);
    }
  };

  useEffect(() => {
    refreshData();
  }, [user, employer]);

  // Handle Post Job Submit
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmp) return;

    const skillsArray = newSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const isVerified = currentEmp.status === 'verified';

    const created = createJobPosting({
      employer_id: currentEmp.id,
      category_id: newCategoryId,
      village_id: 'v-1',
      title: newTitle,
      title_te: newTitleTe,
      description: newDescription,
      responsibilities: [
        'Adhere to factory safety and production schedules',
        'Maintain daily logs and coordinate with shift supervisor',
        'Ensure clean work practices within the plant',
      ],
      requirements: [
        `Education: ${newEducation}`,
        `Experience: ${newExperience}`,
        'Preference for residents of Atchuthapuram',
      ],
      skills_required: skillsArray,
      job_type: newJobType,
      shift_type: newShiftType,
      vacancies_count: Number(newVacancies),
      experience_level: newExperience,
      education_required: newEducation,
      salary_min: Number(newSalaryMin),
      salary_max: Number(newSalaryMax),
      salary_type: 'monthly',
      salary_negotiable: false,
      has_bus_facility: newHasBus,
      has_canteen_facility: newHasCanteen,
      has_esi_pf: newHasEsiPf,
      has_accommodation: false,
      work_location: newWorkLocation,
      village_name: newVillageName,
      status: isVerified ? 'active' : 'pending_approval', // Verified employers can publish, others pending
      zero_fee_verified: true,
      expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    });

    setJobCreatedSuccess(true);
    refreshData();
    setTimeout(() => {
      setJobCreatedSuccess(false);
      setActiveTab('jobs');
    }, 1500);
  };

  // Handle Application Status Update
  const handleStatusChange = (appId: string, newStatus: Application['status']) => {
    if (newStatus === 'interview_scheduled') {
      const app = applications.find((a) => a.id === appId);
      if (app) {
        setSchedulingApp(app);
        setInterviewLocation(
          `${currentEmp?.company_name}, ${currentEmp?.address || 'Atchuthapuram Sector 2'}`
        );
        return;
      }
    }

    updateApplicationStatus(appId, newStatus);
    refreshData();
  };

  // Submit Scheduled Interview
  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingApp) return;

    updateApplicationStatus(schedulingApp.id, 'interview_scheduled', {
      interviewDate,
      interviewLocation,
      interviewInstructions,
    });

    setSchedulingApp(null);
    setInterviewDate('');
    refreshData();
  };

  // Submit Business Document
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmp || !docNumber) return;

    addEmployerDocument(currentEmp.id, {
      document_type: docType,
      document_number: docNumber,
      file_name: docFileName || `${docType.toUpperCase()}_Document.pdf`,
    });

    setDocUploadSuccess(true);
    setDocNumber('');
    setDocFileName('');
    refreshData();
    setTimeout(() => setDocUploadSuccess(false), 3000);
  };

  const filteredApplications =
    selectedJobId === 'all'
      ? applications
      : applications.filter((a) => a.job_id === selectedJobId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner: Company Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 font-bold text-xl flex items-center justify-center shrink-0">
            <Building2 className="w-8 h-8 text-amber-700" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-navy-950">
                {currentEmp?.company_name || 'Laurus Bio-Pharma SEZ Unit'}
              </h1>
              {currentEmp?.status === 'verified' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Verified Employer Badge Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  Verification Documents Under Review
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              {currentEmp?.industry || 'Pharmaceutical Manufacturing'} •{' '}
              {currentEmp?.sez_zone || 'Atchuthapuram Industrial Area'}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {currentEmp?.address}, {currentEmp?.village_name}
              </span>
              <span>•</span>
              <span>GSTIN: 37AAACL1234E1ZR</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Zero Candidate Fee Pledge Signed</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('post-job')}
            className="flex-1 md:flex-initial px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Post New Vacancy
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'jobs'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Manage Vacancies ({jobs.length})
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'applicants'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Users className="w-4 h-4" />
          Applicant Pipeline ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab('post-job')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'post-job'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Plus className="w-4 h-4" />
          Create Job Posting
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'verification'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Business Verification Documents
        </button>
      </div>

      {/* TAB 1: MANAGE POSTED JOBS */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-navy-950 text-base">No Vacancies Posted Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Reach genuine local candidates across Atchuthapuram.
              </p>
              <button
                onClick={() => setActiveTab('post-job')}
                className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                Create First Vacancy
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Job Title</th>
                    <th className="px-4 py-3.5">Village & Shift</th>
                    <th className="px-4 py-3.5">Vacancies</th>
                    <th className="px-4 py-3.5">Applicants</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 text-sm">{job.title}</div>
                        <div className="text-[11px] text-slate-500">
                          Expires: {new Date(job.expires_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-slate-800">{job.village_name}</span>
                        <div className="text-[11px] text-slate-500">
                          {job.job_type} • {job.shift_type}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-slate-800">
                        {job.vacancies_count}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                          {job.applications_count}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {job.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[10px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Active
                          </span>
                        ) : job.status === 'pending_approval' ? (
                          <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full text-[10px]">
                            <Clock className="w-3 h-3 text-amber-700" /> Pending Admin Approval
                          </span>
                        ) : (
                          <span className="font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full text-[10px]">
                            {job.status}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedJobId(job.id);
                            setActiveTab('applicants');
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition"
                        >
                          View Applicants
                        </button>
                        {job.status === 'active' && (
                          <button
                            onClick={() => {
                              updateJobStatus(job.id, 'closed');
                              refreshData();
                            }}
                            className="px-2.5 py-1.5 text-slate-500 hover:text-red-600 text-xs transition"
                          >
                            Close
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: APPLICANTS PIPELINE */}
      {activeTab === 'applicants' && (
        <div className="space-y-4">
          {/* Job Filter Pill Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
            <span className="text-slate-500 font-bold shrink-0">Filter by Vacancy:</span>
            <button
              onClick={() => setSelectedJobId('all')}
              className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition ${
                selectedJobId === 'all'
                  ? 'bg-navy-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              All Vacancies ({applications.length})
            </button>
            {jobs.map((j) => (
              <button
                key={j.id}
                onClick={() => setSelectedJobId(j.id)}
                className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition ${
                  selectedJobId === j.id
                    ? 'bg-navy-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {j.title} ({applications.filter((a) => a.job_id === j.id).length})
              </button>
            ))}
          </div>

          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-navy-950 text-base">No Applications Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Applications submitted by local seekers will appear here for review, shortlisting, and interview scheduling.
              </p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-slate-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shrink-0">
                      {app.seeker?.full_name?.charAt(0) || 'R'}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-950">
                        {app.seeker?.full_name || 'Ramesh Varma Chekuri'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-800">
                          Applied for: {app.job?.title || 'QC Chemist'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          Native Village: <strong>{app.applicant_village || 'Haripalem'}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Selector Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Status:</span>
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                      className="text-xs font-bold border border-slate-300 rounded-xl px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="submitted">Submitted</option>
                      <option value="under_review">Under Review</option>
                      <option value="shortlisted">Shortlist Candidate</option>
                      <option value="interview_scheduled">Schedule Interview 🗓️</option>
                      <option value="selected">Offer / Selected</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </div>
                </div>

                {/* Candidate Summary & Cover Note */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-semibold text-slate-800">
                      Phone: <span className="text-blue-700">{app.applicant_phone || app.seeker?.phone}</span>
                    </div>
                    <div className="text-slate-500">
                      Applied on {new Date(app.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {app.cover_note && (
                    <p className="text-slate-700 italic border-l-2 border-blue-500 pl-3 py-1">
                      &quot;{app.cover_note}&quot;
                    </p>
                  )}

                  {/* Resume preview link */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Attached Resume: <strong>{app.resume_file_name || 'Resume.pdf'}</strong>
                    </span>
                    <button
                      onClick={() => alert(`Reviewing candidate resume for ${app.seeker?.full_name}`)}
                      className="px-3 py-1 bg-white border border-slate-300 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-bold rounded-lg transition"
                    >
                      View Full Resume
                    </button>
                  </div>
                </div>

                {/* Interview Information Banner if scheduled */}
                {app.status === 'interview_scheduled' && app.interview_date && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Calendar className="w-4 h-4 text-emerald-700" />
                      Interview Scheduled: {new Date(app.interview_date).toLocaleString()}
                    </div>
                    <div>
                      <strong>Location / Gate:</strong> {app.interview_location}
                    </div>
                    {app.interview_instructions && (
                      <div className="text-slate-600">
                        <strong>Instructions:</strong> {app.interview_instructions}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: CREATE JOB POSTING */}
      {activeTab === 'post-job' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-navy-950">
              Post Vacancy in Atchuthapuram
            </h2>
            <p className="text-xs text-slate-500">
              Reach local village residents. All postings undergo review by the moderation desk.
            </p>
          </div>

          {jobCreatedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Vacancy published successfully! Redirecting to management tab...
            </div>
          )}

          <form onSubmit={handlePostJob} className="space-y-5">
            {/* Zero fee anti-fraud pledge banner */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Zero-Fee Compliance Pledge:</strong> By posting this vacancy on AtchuJobs, you certify that no application fee, uniform charge, interview fee, or training security deposit will be charged to candidates at any stage.
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Senior QC Chemist / CNC Machine Operator"
                className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 bg-white font-medium"
                >
                  {JOB_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Location / Village <span className="text-red-500">*</span>
                </label>
                <select
                  value={newVillageName}
                  onChange={(e) => setNewVillageName(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 bg-white font-medium"
                >
                  {ATCHUTHAPURAM_VILLAGES.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Job Type & Shift
                </label>
                <select
                  value={newShiftType}
                  onChange={(e) => setNewShiftType(e.target.value as any)}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 bg-white font-medium"
                >
                  <option value="General">General Shift (9 AM - 6 PM)</option>
                  <option value="Day">Day Shift</option>
                  <option value="Night">Night Shift</option>
                  <option value="Rotational 3-shift">Rotational 3-shift (SEZ Standard)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Vacancies Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={newVacancies}
                  onChange={(e) => setNewVacancies(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Monthly Salary Min (₹)
                </label>
                <input
                  type="number"
                  value={newSalaryMin}
                  onChange={(e) => setNewSalaryMin(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Monthly Salary Max (₹)
                </label>
                <input
                  type="number"
                  value={newSalaryMax}
                  onChange={(e) => setNewSalaryMax(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
                />
              </div>
            </div>

            {/* Local Perks Toggles */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Local SEZ Facilities & Perks Provided
              </label>
              <div className="flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={newHasBus}
                    onChange={(e) => setNewHasBus(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Free Bus Service (Local routes)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={newHasCanteen}
                    onChange={(e) => setNewHasCanteen(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Subsidized Canteen Meals</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={newHasEsiPf}
                    onChange={(e) => setNewHasEsiPf(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>ESI Healthcare & Provident Fund (PF)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Detailed Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Explain the work responsibilities, plant safety, shift expectations..."
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Required Skills (Comma separated)
              </label>
              <input
                type="text"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                placeholder="e.g. HPLC, Titration, Quality Control, Good Documentation"
                className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Plant / Office Location in Atchuthapuram
              </label>
              <input
                type="text"
                value={newWorkLocation}
                onChange={(e) => setNewWorkLocation(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setActiveTab('jobs')}
                className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
              >
                Publish Job Vacancy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: VERIFICATION DOCUMENTS */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-navy-950">
              Employer Verification & Document Vault
            </h2>
            <p className="text-xs text-slate-500">
              To eliminate fake jobs, every employer must submit proof of incorporation, GST, or factory license before posting public vacancies.
            </p>
          </div>

          {docUploadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Document uploaded! Moderation desk will review within 24 hours.
            </div>
          )}

          {/* Current Documents Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Submitted Business Documents
            </h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Document Type</th>
                    <th className="px-4 py-3">Registration Number</th>
                    <th className="px-4 py-3">File Name</th>
                    <th className="px-4 py-3">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(currentEmp?.documents && currentEmp.documents.length > 0 ? currentEmp.documents : [
                    {
                      id: 'doc-default',
                      document_type: 'gstin',
                      document_number: '37AAACL1234E1ZR',
                      file_name: 'Laurus_Pharma_GST_Certificate.pdf',
                      status: 'approved',
                    },
                  ]).map((doc: any) => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 uppercase font-bold text-slate-900">
                        {doc.document_type}
                      </td>
                      <td className="px-4 py-3 font-mono font-medium text-slate-800">
                        {doc.document_number}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {doc.file_name}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                          <ShieldCheck className="w-3 h-3 text-emerald-700" /> Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload New Document Form */}
          <form onSubmit={handleAddDocument} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Upload Additional Verification Proof
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 bg-white font-medium"
                >
                  <option value="gstin">GSTIN Certificate (Goods & Service Tax)</option>
                  <option value="pan">Company PAN Card</option>
                  <option value="factory_license">Factory Inspectorate License</option>
                  <option value="incorporation_certificate">Certificate of Incorporation</option>
                  <option value="trade_license">Local Panchayat Trade License</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document ID / Number
                </label>
                <input
                  type="text"
                  required
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="e.g. 37AAACL1234E1ZR or FAC-2026-99"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select PDF File
              </label>
              <input
                type="file"
                accept=".pdf,.png,.jpg"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setDocFileName(e.target.files[0].name);
                  }
                }}
                className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                Upload Document for Verification
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {schedulingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-navy-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Schedule Candidate Interview</h3>
              </div>
              <button
                onClick={() => setSchedulingApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmSchedule} className="p-6 space-y-4">
              <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                Candidate: <strong>{schedulingApp.seeker?.full_name || 'Ramesh Varma'}</strong> (
                {schedulingApp.applicant_village || 'Haripalem'})
                <div className="text-slate-500 mt-0.5">
                  Job: {schedulingApp.job?.title}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Interview Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Interview Venue / Gate Pass Instructions <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  placeholder="e.g. Sector 2 Plant, Gate 1 Security Desk"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Special Instructions for Candidate
                </label>
                <textarea
                  rows={2}
                  value={interviewInstructions}
                  onChange={(e) => setInterviewInstructions(e.target.value)}
                  placeholder="e.g. Bring original certificates, Aadhaar card, and passport photos. Safety shoes provided at gate."
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSchedulingApp(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Confirm & Notify Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
