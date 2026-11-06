'use client';

import React, { useState } from 'react';
import { Job, JobReport } from '@/types';
import { submitJobReport } from '@/lib/services/job-service';
import { useAuth } from '@/lib/context/auth-context';
import { AlertTriangle, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ReportJobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportJobModal({ job, isOpen, onClose }: ReportJobModalProps) {
  const { user } = useAuth();
  const [reason, setReason] = useState<JobReport['report_reason']>('registration_fee_demanded');
  const [details, setDetails] = useState('');
  const [reporterName, setReporterName] = useState(user?.full_name || '');
  const [reporterPhone, setReporterPhone] = useState(user?.phone || '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    submitJobReport({
      job_id: job.id,
      reporter_id: user?.id,
      reporter_name: reporterName,
      reporter_phone: reporterPhone,
      report_reason: reason,
      details: details.trim(),
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-red-50 border-b border-red-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-red-950 text-base">Report Fraudulent Vacancy</h3>
              <p className="text-xs text-red-700">ATP Jobs Zero-Tolerance Fake Job Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-red-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-navy-950">Report Submitted to Moderation Desk</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you for keeping Atchuthapuram safe. Our team investigates every flagged vacancy. If fraudulent fees or false claims are verified, the employer account will be immediately banned and reported.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-navy-900 text-white text-xs font-bold rounded-xl hover:bg-navy-800 transition"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Warning Callout */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>AtchuJobs Policy:</strong> Employers are strictly prohibited from demanding registration fees, uniform charges, or training deposits.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Job
              </label>
              <div className="text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium text-slate-800">
                {job.title} — <span className="text-blue-700">{job.employer?.company_name}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reason for Reporting <span className="text-red-500">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as any)}
                className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
              >
                <option value="registration_fee_demanded">
                  Demanded registration fee / interview money / gate pass charge
                </option>
                <option value="fake_company">Fake company / ghost office / fraudulent address</option>
                <option value="misleading_salary">Misleading salary / false vacancy count</option>
                <option value="inappropriate_content">Inappropriate behavior or harassing recruiter</option>
                <option value="other">Other compliance violation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Incident Details & Evidence <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what occurred, phone numbers used, amount requested, or location of suspicious interaction..."
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="Anonymous or your name"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="+91..."
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                Submit Report to Admin
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

