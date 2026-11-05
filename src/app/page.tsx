'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/language-context';
import { getAllActiveJobs } from '@/lib/services/job-service';
import { getStoredEmployers } from '@/lib/services/employer-service';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';
import { JOB_CATEGORIES } from '@/lib/data/categories';
import { Job, Employer } from '@/types';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import JobCard from '@/components/jobs/JobCard';
import {
  Briefcase,
  ShieldCheck,
  Building2,
  Users,
  MapPin,
  ArrowRight,
  CheckCircle,
  Factory,
  Laptop,
  Wrench,
  Pill,
  Calculator,
  Truck,
  GraduationCap,
  Stethoscope,
  Hammer,
  Sparkles,
  Award,
  AlertTriangle,
} from 'lucide-react';

const categoryIconMap: Record<string, any> = {
  Factory,
  Laptop,
  Wrench,
  Pill,
  Building2,
  Calculator,
  ShieldCheck,
  Truck,
  GraduationCap,
  Stethoscope,
  Hammer,
  Users,
};

export default function HomePage() {
  const { language, t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employers, setEmployers] = useState<Employer[]>([]);

  useEffect(() => {
    setJobs(getAllActiveJobs());
    setEmployers(getStoredEmployers().filter((e) => e.status === 'verified'));
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION (Navy Blue Gradient + Clean White Cards) */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Exclusively for Atchuthapuram Mandal, Anakapalli Dist</span>
          </div>

          {/* Heading & Tagline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
            {t.heroHeading}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubheading}
          </p>

          {/* Search Bar Component */}
          <div className="pt-4 max-w-4xl mx-auto">
            <JobSearchBar />
          </div>

          {/* Key Assurance Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Employers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Zero Registration/Interview Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>20 Mandal Villages Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE STATISTICS COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
          <div className="text-center p-3 border-r border-slate-100 last:border-none">
            <div className="text-2xl sm:text-3xl font-black text-navy-950">
              {jobs.length}+
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              {t.statJobs}
            </div>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-none">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">
              {employers.length}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              {t.statEmployers}
            </div>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-none">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              20
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              {t.statVillages}
            </div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl sm:text-3xl font-black text-amber-500">
              ₹0.00
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              {t.statZeroFee}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ZERO-FEE & FAKE JOB PREVENTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-navy-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-md">
              <Award className="w-3.5 h-3.5" />
              Mandal Candidate Protection Policy
            </div>
            <h3 className="text-xl sm:text-2xl font-bold leading-tight">
              Never Pay Any Money for Jobs in Atchuthapuram Mandal
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AtchuJobs enforces a strict zero-tolerance mandate. If any recruiter or agency asks for application fees, medical test deposits, or gate pass money, report them instantly. Our admin moderation desk investigates within 2 hours.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/jobs"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-navy-950 text-xs font-bold rounded-xl transition text-center shadow-sm"
            >
              Explore Free Jobs
            </Link>
            <Link
              href="/dashboard/employer?tab=verification"
              className="px-5 py-2.5 bg-navy-800 hover:bg-navy-700 text-white border border-slate-700 text-xs font-semibold rounded-xl transition text-center"
            >
              Employer Verification
            </Link>
          </div>
        </div>
      </section>

      {/* 4. LATEST VERIFIED JOBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              APSEZ & Local Mandal Openings
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mt-1">
              {t.secFeaturedJobs}
            </h2>
          </div>
          <Link
            href="/jobs"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 group"
          >
            <span>View all verified vacancies ({jobs.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.slice(0, 6).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-8 py-3 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            Browse All {jobs.length} Verified Jobs in Atchuthapuram &rarr;
          </Link>
        </div>
      </section>

      {/* 5. 12 LOCAL JOB CATEGORIES GRID */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Specialized Sectors
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mt-1">
              {t.secPopularCategories}
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Browse opportunities across major manufacturing, engineering, pharma, IT, and skilled labor domains.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {JOB_CATEGORIES.map((cat) => {
              const IconComponent = categoryIconMap[cat.icon] || Briefcase;
              const catJobsCount = jobs.filter((j) => j.category_id === cat.id).length;

              return (
                <Link
                  key={cat.id}
                  href={`/jobs?category=${cat.slug}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {catJobsCount} {catJobsCount === 1 ? 'Job' : 'Jobs'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-navy-950 group-hover:text-blue-600 transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {cat.name_te}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TOP VERIFIED SEZ EMPLOYERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Recruiting in Atchuthapuram
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mt-1">
              {t.secTopEmployers}
            </h2>
          </div>
          <Link
            href="/companies"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 group"
          >
            <span>View all companies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {employers.map((emp) => {
            const empJobs = jobs.filter((j) => j.employer_id === emp.id).length;
            return (
              <div
                key={emp.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden mb-3 flex items-center justify-center">
                    {emp.company_logo ? (
                      <img
                        src={emp.company_logo}
                        alt={emp.company_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-bold text-sm text-navy-950 truncate">
                      {emp.company_name}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mb-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Unit
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{emp.village_name}, {emp.sez_zone || 'Atchuthapuram'}</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {emp.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600">
                    {empJobs} Openings
                  </span>
                  <Link
                    href={`/jobs?q=${encodeURIComponent(emp.company_name)}`}
                    className="text-xs font-semibold text-slate-700 hover:text-navy-950 inline-flex items-center gap-0.5"
                  >
                    View Jobs &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. ATCHUTHAPURAM MANDAL VILLAGES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-navy-800">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Hyper-Local Mandal Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              {t.secVillagesCovered}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Candidates residing in these villages receive priority recruitment routing and bus facility matching from APSEZ and BIAC employers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {ATCHUTHAPURAM_VILLAGES.map((v) => (
              <Link
                key={v.id}
                href={`/jobs?village=${encodeURIComponent(v.name)}`}
                className="bg-navy-800/80 hover:bg-blue-600 border border-navy-700 hover:border-blue-500 rounded-xl p-3 transition group"
              >
                <div className="text-xs font-bold text-white group-hover:translate-x-0.5 transition truncate">
                  {v.name}
                </div>
                <div className="text-[11px] text-slate-400 group-hover:text-blue-100 truncate">
                  {v.name_te}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>Anakapalli District, Andhra Pradesh • PIN 531011</span>
            <Link
              href="/villages"
              className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              Explore Village Job Matrix &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 8. REGISTER / JOIN CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
            Start Your Career or Recruit Local Talent Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Join thousands of residents in Atchuthapuram Mandal who connect with verified employers without paying single rupee in fees.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register?role=job_seeker"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              Register as Job Seeker (Free)
            </Link>
            <Link
              href="/register?role=employer"
              className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              Register Company & Post Vacancy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
