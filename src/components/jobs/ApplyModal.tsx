'use client';

import React, { useState } from 'react';
import { Job, Application } from '@/types';
import { submitApplication } from '@/lib/services/application-service';
import { useAuth } from '@/lib/context/auth-context';
import { Briefcase, X, FileText, CheckCircle2, AlertCircle, UploadCloud } from 'lucide-react';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ApplyModal({ job, isOpen, onClose, onSuccess }: ApplyModalProps) {
  const { user } = useAuth();
  const [coverNote, setCoverNote] = useState('');
  const [phone, setPhone] = useState(user?.phone || '+91 98480 12345');
  const [village, setVillage] = useState(user?.village_name || 'Haripalem');
  const [resumeType, setResumeType] = useState<'profile' | 'custom'>('profile');
  const [customResumeName, setCustomResumeName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const seekerId = user?.id || 'user-seeker-1';
    const resumeUrl = resumeType === 'profile' && user?.resume_url
      ? user.resume_url
      : `/resumes/${customResumeName || 'Ramesh_Varma_Resume.pdf'}`;

    const resumeFileName = resumeType === 'profile' && user?.resume_file_name
      ? user.resume_file_name
      : (customResumeName || 'Applicant_Resume.pdf');

    const result = submitApplication({
      jobId: job.id,
      seekerId,
      employerId: job.employer_id,
      coverNote,
      resumeUrl,
      resumeFileName,
      applicantVillage: village,
      applicantPhone: phone,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } else {
      setErrorMessage(result.error || 'Failed to submit application.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Apply for Local Vacancy</h3>
              <p className="text-xs text-blue-200">{job.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-navy-950">Application Submitted!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your profile and resume have been dispatched to <strong>{job.employer?.company_name}</strong>. You can monitor interview schedules and status updates in your Seeker Dashboard.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-navy-900 text-white text-xs font-bold rounded-xl hover:bg-navy-800 transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleApply} className="p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Zero fee reminder */}
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Application Fee. Direct employer contact for Atchuthapuram residents.</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Applicant Name
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.full_name || 'Ramesh Varma'}
                  className="w-full text-xs border border-slate-200 bg-slate-50 text-slate-700 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Area / Address (Atchuthapuram) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Atchuthapuram Center, Sector 2, Main Junction"
                className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>

            {/* Resume Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Resume Attachment <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer text-xs border-blue-500 bg-blue-50/50">
                  <input
                    type="radio"
                    name="resume"
                    checked={resumeType === 'profile'}
                    onChange={() => setResumeType('profile')}
                    className="text-blue-600"
                  />
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="truncate">
                    <span className="font-semibold text-slate-900 block">Use Saved Profile Resume</span>
                    <span className="text-slate-500 text-[10px]">
                      {user?.resume_file_name || 'Ramesh_Varma_CV_2026.pdf'} (Updated Oct 2026)
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer text-xs border-slate-200 hover:bg-slate-50">
                  <input
                    type="radio"
                    name="resume"
                    checked={resumeType === 'custom'}
                    onChange={() => setResumeType('custom')}
                    className="text-blue-600"
                  />
                  <UploadCloud className="w-4 h-4 text-slate-500 shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800 block">Upload Different Resume (PDF)</span>
                    {resumeType === 'custom' && (
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setCustomResumeName(e.target.files[0].name);
                          }
                        }}
                        className="mt-1.5 text-[11px] text-slate-600 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-blue-600 file:text-white"
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Brief Note to Employer (Optional)
              </label>
              <textarea
                rows={2}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Why you are a great fit, bus route availability, or previous experience in SEZ..."
                className="w-full text-xs border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
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
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Application...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

