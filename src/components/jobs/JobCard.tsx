'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Job } from '@/types';
import { useAuth } from '@/lib/context/auth-context';
import { useLanguage } from '@/lib/context/language-context';
import { toggleSaveJob, getSavedJobIds } from '@/lib/services/job-service';
import ApplyModal from './ApplyModal';
import ReportJobModal from './ReportJobModal';
import {
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  Bookmark,
  Bus,
  Utensils,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Share2,
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onSaveToggle?: (jobId: string, isSaved: boolean) => void;
}

export default function JobCard({ job, isSaved: initialSaved, onSaveToggle }: JobCardProps) {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean>(() => {
    if (initialSaved !== undefined) return initialSaved;
    if (user?.id) {
      return getSavedJobIds(user.id).includes(job.id);
    }
    return false;
  });

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const seekerId = user?.id || 'user-seeker-1';
    const newState = toggleSaveJob(seekerId, job.id);
    setIsSaved(newState);
    if (onSaveToggle) onSaveToggle(job.id, newState);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/jobs/${job.id}`);
      alert('Job link copied to clipboard!');
    }
  };

  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) {
      return 'Salary as per standards';
    }
    const min = job.salary_min ? `₹${job.salary_min.toLocaleString('en-IN')}` : '';
    const max = job.salary_max ? `₹${job.salary_max.toLocaleString('en-IN')}` : '';

    if (min && max) {
      return `${min} - ${max} / ${job.salary_type || 'month'}`;
    }
    return `${min || max} / ${job.salary_type || 'month'}`;
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between group relative">
        {/* Top Header: Company Info & Action Badges */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-navy-800 font-bold text-lg overflow-hidden shrink-0 group-hover:scale-105 transition">
                {job.employer?.company_logo ? (
                  <img
                    src={job.employer.company_logo}
                    alt={job.employer.company_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-6 h-6 text-slate-500" />
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-navy-950 group-hover:text-blue-600 transition leading-snug">
                  {language === 'te' && job.title_te ? job.title_te : job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <span className="text-xs font-semibold text-slate-800">
                    {job.employer?.company_name || 'Verified SEZ Unit'}
                  </span>

                  {/* Verified Employer Shield */}
                  {job.employer?.status === 'verified' && (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"
                      title="Company verified by Mandal Moderation Desk"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {t.badgeVerifiedEmployer}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bookmark & Share Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition"
                title="Share vacancy"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleSaveToggle}
                className={`p-1.5 rounded-lg transition ${
                  isSaved
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save vacancy'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Key Location & Attributes Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {job.village_name}, Atchuthapuram Mandal
            </span>

            <span className="inline-flex items-center gap-1 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {job.job_type} • {job.shift_type}
            </span>

            <span className="inline-flex items-center gap-1 font-bold text-navy-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              {formatSalary()}
            </span>
          </div>

          {/* Local Facilities / SEZ Perks */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[11px]">
            {job.has_bus_facility && (
              <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50/80 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                <Bus className="w-3 h-3 text-emerald-600" />
                Free Bus Route
              </span>
            )}
            {job.has_canteen_facility && (
              <span className="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                <Utensils className="w-3 h-3 text-slate-500" />
                Canteen Facility
              </span>
            )}
            {job.has_esi_pf && (
              <span className="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                <CheckCircle className="w-3 h-3 text-blue-500" />
                ESI & PF Included
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md font-semibold">
              {job.vacancies_count} {job.vacancies_count > 1 ? 'Vacancies' : 'Vacancy'}
            </span>
          </div>

          {/* Short Description */}
          <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          {/* Skills tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.skills_required.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
            {job.skills_required.length > 4 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{job.skills_required.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Zero fee banner, Report Job, Apply button */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Zero fee anti-fraud label */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              {t.badgeZeroFee}
            </span>

            <button
              onClick={() => setIsReportOpen(true)}
              className="text-[11px] text-slate-400 hover:text-red-600 font-medium inline-flex items-center gap-1 transition"
              title="Report fraudulent listing or fee demand"
            >
              <AlertTriangle className="w-3 h-3 text-slate-400 group-hover:text-red-500" />
              <span className="hidden sm:inline">{t.btnReport}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href={`/jobs/${job.id}`}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-navy-900 hover:bg-slate-100 rounded-xl transition inline-flex items-center gap-1"
            >
              {t.btnViewDetails}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsApplyOpen(true)}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition"
            >
              {t.btnApply}
            </button>
          </div>
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
    </>
  );
}
