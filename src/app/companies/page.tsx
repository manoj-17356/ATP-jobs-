'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredEmployers } from '@/lib/services/employer-service';
import { getStoredJobs } from '@/lib/services/job-service';
import { Employer, Job } from '@/types';
import {
  Building2,
  MapPin,
  ShieldCheck,
  Briefcase,
  ExternalLink,
  Search,
  CheckCircle2,
  Award,
} from 'lucide-react';

export default function CompaniesPage() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setEmployers(getStoredEmployers());
    setJobs(getStoredJobs());
  }, []);

  const filtered = employers.filter(
    (e) =>
      e.company_name.toLowerCase().includes(search.toLowerCase()) ||
      e.industry.toLowerCase().includes(search.toLowerCase()) ||
      e.village_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md mb-2">
            <Award className="w-3.5 h-3.5" />
            Verified Employers Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Recruiting Enterprises in Atchuthapuram
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Browse authenticated APSEZ manufacturing units, Brandix Apparel City facilities, and local enterprises certified with zero-fee compliance.
          </p>
        </div>

        {/* Search */}
        <div className="mt-6 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company name, industry, or village..."
            className="w-full text-xs bg-navy-800/90 text-white pl-10 pr-4 py-2.5 rounded-xl border border-navy-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((emp) => {
          const empJobs = jobs.filter((j) => j.employer_id === emp.id && j.status === 'active');
          return (
            <div
              key={emp.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                    {emp.company_logo ? (
                      <img
                        src={emp.company_logo}
                        alt={emp.company_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-7 h-7 text-slate-400" />
                    )}
                  </div>

                  {emp.status === 'verified' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified SEZ Unit
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-navy-950">{emp.company_name}</h3>
                <span className="text-xs font-semibold text-blue-700 block mt-0.5">
                  {emp.industry}
                </span>

                <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="truncate">{emp.address}, {emp.village_name}</span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {emp.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  <strong className="text-blue-600">{empJobs.length}</strong> active openings
                </span>
                <Link
                  href={`/jobs?q=${encodeURIComponent(emp.company_name)}`}
                  className="px-4 py-1.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl transition"
                >
                  View Jobs
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
