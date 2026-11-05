'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getJobById, getAllActiveJobs, toggleSaveJob, getSavedJobIds } from '@/lib/services/job-service';
import { Job } from '@/types';
import { useAuth } from '@/lib/context/auth-context';
import { useLanguage } from '@/lib/context/language-context';
import ApplyModal from '@/components/jobs/ApplyModal';
import ReportJobModal from '@/components/jobs/ReportJobModal';
import {
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  Bookmark,
  Bus,
  Utensils,
  Share2,
  ChevronLeft,
  Calendar,
  GraduationCap,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
} from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const [job, setJob] = useState<Job | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (params.id) {
      const found = getJobById(params.id as string);
      setJob(found);
      if (user?.id && found) {
        setIsSaved(getSavedJobIds(user.id).includes(found.id));
      }
    }
  }, [params.id, user]);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-950">Job Not Found</h2>
        <p className="text-xs text-slate-500">
          This vacancy might have expired or been removed by the employer or admin.
        </p>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Jobs
        </Link>
      </div>
    );
  }

  const handleSaveToggle = () => {
    const seekerId = user?.id || 'user-seeker-1';
    const newState = toggleSaveJob(seekerId, job.id);
    setIsSaved(newState);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Job URL copied to clipboard!');
    }
  };

  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return 'Best in Industry';
    const min = job.salary_min ? `₹${job.salary_min.toLocaleString('en-IN')}` : '';
    const max = job.salary_max ? `₹${job.salary_max.toLocaleString('en-IN')}` : '';
    return `${min} - ${max} / ${job.salary_type || 'month'}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-950 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to listings
      </button>

      {/* Main Vacancy Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
              {job.employer?.company_logo ? (
                <img
                  src={job.employer.company_logo}
                  alt={job.employer.company_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-8 h-8 text-slate-400" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-700">
                  {job.employer?.company_name}
                </span>
                {job.employer?.status === 'verified' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Employer
                  </span>
                )}
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Admin Approved Vacancy
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-navy-950 leading-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {job.village_name}, Atchuthapuram
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Posted {new Date(job.created_at).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>{job.applications_count} applicants</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setIsApplyOpen(true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition text-center"
            >
              {t.btnApply}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToggle}
                className={`p-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition ${
                  isSaved
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Monthly Compensation</span>
            <span className="font-bold text-navy-950 text-sm">{formatSalary()}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Job & Shift Type</span>
            <span className="font-bold text-navy-950 text-sm">
              {job.job_type} • {job.shift_type}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Experience Required</span>
            <span className="font-bold text-navy-950 text-sm">{job.experience_level}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Open Vacancies</span>
            <span className="font-bold text-blue-700 text-sm">
              {job.vacancies_count} {job.vacancies_count > 1 ? 'positions' : 'position'}
            </span>
          </div>
        </div>

        {/* Benefits & SEZ Perks */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Local Work Amenities & Benefits
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {job.has_bus_facility && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-semibold">
                <Bus className="w-4 h-4 text-emerald-600" />
                Free Bus Route (Atchuthapuram Local Routes)
              </span>
            )}
            {job.has_canteen_facility && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-xl font-medium">
                <Utensils className="w-4 h-4 text-slate-500" />
                Subsidized Canteen / Meals
              </span>
            )}
            {job.has_esi_pf && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-xl font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                ESI Healthcare & PF Benefits
              </span>
            )}
            {job.has_accommodation && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-xl font-medium">
                Company Hostel / Accommodation
              </span>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
            Job Description
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Key Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
              Key Responsibilities
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700">
              {job.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
              Candidate Requirements & Qualifications
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {job.skills_required && job.skills_required.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills_required.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Factory / Work Location */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider">
            Workplace & Interview Location
          </h3>
          <p className="text-xs text-slate-700 font-medium">
            {job.work_location}
          </p>
          <div className="text-[11px] text-slate-500">
            Village: <strong>{job.village_name}</strong> • Location: <strong>Atchuthapuram</strong>
          </div>
        </div>

        {/* Zero-fee anti fraud callout & Report button */}
        <div className="p-4 bg-red-50/60 border border-red-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-950">
              <strong>AtchuJobs Fraud Protection Guarantee:</strong> Never pay money for job offers, interview passes, or registrations.
              If anyone asks for payments, report them immediately.
            </div>
          </div>
          <button
            onClick={() => setIsReportOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shrink-0 transition"
          >
            Report This Vacancy
          </button>
        </div>
      </div>

      {/* Modals */}
      <ApplyModal
        job={job}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

      <ReportJobModal
        job={job}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}

