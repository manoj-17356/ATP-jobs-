'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { useLanguage } from '@/lib/context/language-context';
import { getApplicationsForSeeker } from '@/lib/services/application-service';
import { getStoredJobs, getSavedJobIds, toggleSaveJob } from '@/lib/services/job-service';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';
import { Application, Job, UserProfile } from '@/types';
import JobCard from '@/components/jobs/JobCard';
import {
  User,
  FileText,
  Briefcase,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  Trash2,
  UploadCloud,
  ChevronRight,
  AlertCircle,
  Building2,
  Eye,
  ShieldCheck,
} from 'lucide-react';

export default function SeekerDashboardPage() {
  const { user, updateProfile, loginAs } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'applications' | 'profile' | 'saved'>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile Form State
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [villageName, setVillageName] = useState(user?.village_name || 'Haripalem');
  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [resumeFileName, setResumeFileName] = useState(user?.resume_file_name || 'Ramesh_Varma_CV_2026.pdf');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Load applications and saved jobs
  useEffect(() => {
    const seekerId = user?.id || 'user-seeker-1';
    const apps = getApplicationsForSeeker(seekerId);
    setApplications(apps);

    const savedIds = getSavedJobIds(seekerId);
    const allJobs = getStoredJobs();
    const filteredSaved = allJobs.filter((j) => savedIds.includes(j.id));
    setSavedJobs(filteredSaved);
  }, [user]);

  // Sync profile fields if user changes
  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setHeadline(user.headline || '');
      setPhone(user.phone || '');
      setVillageName(user.village_name || 'Haripalem');
      setBio(user.bio || '');
      setSkills(user.skills || []);
      setResumeFileName(user.resume_file_name || 'Ramesh_Varma_CV_2026.pdf');
    }
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      headline,
      phone,
      village_name: villageName,
      bio,
      skills,
      resume_file_name: resumeFileName,
      resume_updated_at: new Date().toISOString(),
    });
    setIsEditingProfile(false);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" /> Submitted
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" /> Under Review
          </span>
        );
      case 'shortlisted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            <CheckCircle2 className="w-3 h-3 text-purple-600" /> Shortlisted
          </span>
        );
      case 'interview_scheduled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 animate-pulse">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Interview Scheduled
          </span>
        );
      case 'selected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-200 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Selected / Offer Made
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            Not Selected
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner with Seeker Bio */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 font-bold text-xl flex items-center justify-center shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-navy-950">
                {user?.full_name || 'Ramesh Varma'}
              </h1>
              <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                Job Seeker
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              {user?.headline || 'B.Sc Chemistry • Resident of Haripalem, Atchuthapuram'}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {user?.village_name || 'Haripalem'}, Atchuthapuram
              </span>
              <span>•</span>
              <span>{user?.phone || '+91 98480 12345'}</span>
              <span>•</span>
              <span>{user?.email || 'ramesh.seeker@atchujobs.in'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab('profile');
              setIsEditingProfile(true);
            }}
            className="flex-1 md:flex-initial px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition"
          >
            Edit Profile
          </button>
          <Link
            href="/jobs"
            className="flex-1 md:flex-initial px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition text-center"
          >
            Find New Jobs
          </Link>
        </div>
      </div>

      {saveSuccessNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Profile updated successfully!
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          My Applications ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <User className="w-4 h-4" />
          Resume & Credentials
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-950'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Saved Jobs ({savedJobs.length})
        </button>
      </div>

      {/* TAB 1: APPLICATIONS TRACKER */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-navy-950 text-base">No Applications Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore verified vacancies in Atchuthapuram SEZ and apply directly without any fees.
              </p>
              <Link
                href="/jobs"
                className="inline-block px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                Explore Jobs
              </Link>
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      {app.employer?.company_name || 'Verified Company'}
                    </span>
                    <h3 className="text-base font-bold text-navy-950">
                      {app.job?.title || 'Open Vacancy'}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>{app.applicant_village}, Atchuthapuram</span>
                      <span>•</span>
                      <span>Applied {new Date(app.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div>{getStatusBadge(app.status)}</div>
                </div>

                {/* Progress Bar Stages */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-bold text-slate-600 mb-2">
                    Application Lifecycle:
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
                    <div className="p-1.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                      1. Submitted
                    </div>
                    <div
                      className={`p-1.5 rounded ${
                        ['under_review', 'shortlisted', 'interview_scheduled', 'selected'].includes(
                          app.status
                        )
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      2. Under Review
                    </div>
                    <div
                      className={`p-1.5 rounded ${
                        ['shortlisted', 'interview_scheduled', 'selected'].includes(app.status)
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      3. Shortlisted
                    </div>
                    <div
                      className={`p-1.5 rounded ${
                        ['interview_scheduled', 'selected'].includes(app.status)
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      4. Interview
                    </div>
                  </div>
                </div>

                {/* Scheduled Interview Details Card (If Interview Scheduled) */}
                {app.status === 'interview_scheduled' && (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                      <Calendar className="w-4 h-4 text-emerald-700" />
                      Interview Scheduled by Employer!
                    </div>
                    {app.interview_date && (
                      <div className="text-xs text-slate-800">
                        <strong>Date & Time:</strong>{' '}
                        {new Date(app.interview_date).toLocaleString()}
                      </div>
                    )}
                    {app.interview_location && (
                      <div className="text-xs text-slate-800">
                        <strong>Venue / Gate Instructions:</strong> {app.interview_location}
                      </div>
                    )}
                    {app.interview_instructions && (
                      <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                        <strong>Instructions:</strong> {app.interview_instructions}
                      </div>
                    )}
                  </div>
                )}

                {/* Notes from Employer */}
                {app.employer_notes && app.status !== 'interview_scheduled' && (
                  <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong>Employer Notes:</strong> {app.employer_notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: PROFILE & RESUME */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-navy-950">
                Professional Profile & Local Credentials
              </h2>
              <p className="text-xs text-slate-500">
                Employers in Atchuthapuram SEZ prioritize complete local profiles.
              </p>
            </div>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-100 transition"
            >
              {isEditingProfile ? 'Cancel' : 'Edit Credentials'}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Village in Atchuthapuram
                  </label>
                  <select
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 bg-white focus:ring-2 focus:ring-blue-600 font-semibold"
                  >
                    {ATCHUTHAPURAM_VILLAGES.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Headline / Specialization
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. B.Sc Chemistry Graduate | 2 Yrs QC Exp"
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Professional Summary / Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Skills Editor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Skills & Qualifications
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g. Tally Prime, CNC, HPLC, First Aid)"
                    className="flex-1 text-xs border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-lg border border-blue-200"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-600"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Resume File Upload Simulation */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Attached Resume PDF
                </label>
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600 shrink-0" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setResumeFileName(e.target.files[0].name);
                      }
                    }}
                    className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Current file: <strong>{resumeFileName}</strong>
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 text-xs sm:text-sm">
              {/* Summary */}
              <div>
                <h4 className="font-bold text-navy-950 text-xs uppercase tracking-wider mb-1">
                  About Me
                </h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {user?.bio || 'Native resident of Atchuthapuram seeking genuine local career opportunities.'}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-bold text-navy-950 text-xs uppercase tracking-wider mb-2">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(user?.skills || ['Communication', 'Local Knowledge']).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="font-bold text-navy-950 text-xs uppercase tracking-wider mb-2">
                  Education & Qualifications
                </h4>
                <div className="space-y-2">
                  {(user?.education && user.education.length > 0 ? user.education : [
                    {
                      institution: 'Govt Degree College',
                      degree: 'B.Sc Chemistry',
                      year: '2022',
                      field: 'Chemistry & Biology',
                    },
                  ]).map((edu, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-xs text-slate-600">{edu.institution} • {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Preview */}
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">
                      {user?.resume_file_name || 'Ramesh_Varma_CV_2026.pdf'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Standard PDF Resume • Verified Candidate
                    </span>
                  </div>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Previewing ${user?.resume_file_name || 'Resume'}: Clean, verified PDF format.`);
                  }}
                  className="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-50 transition"
                >
                  Preview Resume
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED JOBS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-navy-950 text-base">No Saved Jobs</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Bookmark interesting vacancies to compare and apply later.
              </p>
              <Link
                href="/jobs"
                className="inline-block px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                Browse Vacancies
              </Link>
            </div>
          ) : (
            savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={true}
                onSaveToggle={(jobId, isSaved) => {
                  if (!isSaved) {
                    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
                  }
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

