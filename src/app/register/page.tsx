'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';
import { Briefcase, User, Building2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { registerSeeker, registerEmployer } = useAuth();

  const initialRole = searchParams.get('role') === 'employer' ? 'employer' : 'job_seeker';
  const [role, setRole] = useState<'job_seeker' | 'employer'>(initialRole);

  // Seeker State
  const [fullName, setFullName] = useState('');
  const [seekerEmail, setSeekerEmail] = useState('');
  const [seekerPhone, setSeekerPhone] = useState('');
  const [seekerVillage, setSeekerVillage] = useState('Haripalem');
  const [seekerHeadline, setSeekerHeadline] = useState('');

  // Employer State
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [employerEmail, setEmployerEmail] = useState('');
  const [employerPhone, setEmployerPhone] = useState('');
  const [industry, setIndustry] = useState('Manufacturing / SEZ');
  const [employerVillage, setEmployerVillage] = useState('Atchuthapuram');
  const [address, setAddress] = useState('');
  const [sezZone, setSezZone] = useState('APSEZ Atchuthapuram Sector 2');
  const [agreedNoFee, setAgreedNoFee] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSeekerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await registerSeeker({
      fullName,
      email: seekerEmail,
      phone: seekerPhone,
      villageName: seekerVillage,
      headline: seekerHeadline,
    });
    setIsSubmitting(false);
    router.push('/dashboard/seeker');
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedNoFee) {
      alert('You must accept the Zero-Fee Candidate Policy to post jobs on AtchuJobs.');
      return;
    }
    setIsSubmitting(true);
    await registerEmployer({
      companyName,
      contactName,
      email: employerEmail,
      phone: employerPhone,
      industry,
      villageName: employerVillage,
      address,
      sezZone,
    });
    setIsSubmitting(false);
    router.push('/dashboard/employer');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white flex items-center justify-center mx-auto shadow-md">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-black text-navy-950">
            Create an AtchuJobs Account
          </h2>
          <p className="text-xs text-slate-500">
            Connect directly with verified local opportunities in Atchuthapuram Mandal
          </p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('job_seeker')}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              role === 'job_seeker'
                ? 'bg-white text-navy-950 shadow-xs'
                : 'text-slate-600 hover:text-navy-950'
            }`}
          >
            <User className="w-4 h-4 text-blue-600" />
            Job Seeker (Candidate)
          </button>
          <button
            type="button"
            onClick={() => setRole('employer')}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              role === 'employer'
                ? 'bg-white text-navy-950 shadow-xs'
                : 'text-slate-600 hover:text-navy-950'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-600" />
            Employer (Recruiter)
          </button>
        </div>

        {/* JOB SEEKER REGISTRATION FORM */}
        {role === 'job_seeker' ? (
          <form onSubmit={handleSeekerSubmit} className="space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Free registration. Free application access across all mandal employers.</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Varma"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={seekerPhone}
                  onChange={(e) => setSeekerPhone(e.target.value)}
                  placeholder="+91 98480..."
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={seekerEmail}
                  onChange={(e) => setSeekerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Home Village (Atchuthapuram Mandal) <span className="text-red-500">*</span>
                </label>
                <select
                  value={seekerVillage}
                  onChange={(e) => setSeekerVillage(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 bg-white font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  {ATCHUTHAPURAM_VILLAGES.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name} ({v.name_te})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Headline / Current Role / Qualification
              </label>
              <input
                type="text"
                value={seekerHeadline}
                onChange={(e) => setSeekerHeadline(e.target.value)}
                placeholder="e.g. ITI Fitter • Looking for SEZ Manufacturing Shift Work"
                className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Creating Profile...' : 'Complete Seeker Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* EMPLOYER REGISTRATION FORM */
          <form onSubmit={handleEmployerSubmit} className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Verification Mandate:</strong> After registration, you will need to submit GSTIN, PAN, or Factory License in your dashboard before posting vacancies.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Factory Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Coastal Bio-Energy Pvt Ltd"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Authorized HR / Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. K. Narayana Rao"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={employerEmail}
                  onChange={(e) => setEmployerEmail(e.target.value)}
                  placeholder="hr@company.com"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={employerPhone}
                  onChange={(e) => setEmployerPhone(e.target.value)}
                  placeholder="+91..."
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Industry Sector <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Pharma, Apparel, Engineering, Logistics..."
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Village / Location in Mandal
                </label>
                <select
                  value={employerVillage}
                  onChange={(e) => setEmployerVillage(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 bg-white font-medium"
                >
                  {ATCHUTHAPURAM_VILLAGES.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name} ({v.name_te})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                SEZ Zone / Industrial Park
              </label>
              <input
                type="text"
                value={sezZone}
                onChange={(e) => setSezZone(e.target.value)}
                placeholder="e.g. APSEZ Sector 2 / BIAC / Industrial Area"
                className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Plant / Office Physical Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Plot No., Survey No., Road name, Atchuthapuram Mandal"
                className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
              />
            </div>

            {/* Anti-fraud agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={agreedNoFee}
                  onChange={(e) => setAgreedNoFee(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>
                  I legally pledge that our company <strong>will never charge any candidate fees</strong> (registration, interview, training, uniform, or security deposit) as per AtchuJobs Anti-Fraud Regulations.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Registering Company...' : 'Register Company Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500 pt-2">
          Already registered?{' '}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-xs">Loading registration...</div>}>
      <RegisterForm />
    </React.Suspense>
  );
}
