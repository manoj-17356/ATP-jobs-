'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';
import { getStoredJobs } from '@/lib/services/job-service';
import { Job } from '@/types';
import { MapPin, ArrowRight, Briefcase, CheckCircle2 } from 'lucide-react';

export default function VillagesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(getStoredJobs().filter((j) => j.status === 'active'));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Atchuthapuram Local Villages Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Jobs by Village in Atchuthapuram
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Browse localized employment opportunities mapped to your home village. SEZ employers often provide dedicated shuttle bus pick-ups from these points.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ATCHUTHAPURAM_VILLAGES.map((village) => {
          const villageJobs = jobs.filter(
            (j) => j.village_name.toLowerCase() === village.name.toLowerCase()
          );

          return (
            <Link
              key={village.id}
              href={`/jobs?village=${encodeURIComponent(village.name)}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition group flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    PIN {village.pin_code}
                  </span>
                </div>

                <h3 className="font-bold text-base text-navy-950 group-hover:text-blue-600 transition">
                  {village.name}
                </h3>
                <span className="text-xs text-slate-500 block mt-1">
                  Atchuthapuram Region
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-blue-600">
                  {villageJobs.length} {villageJobs.length === 1 ? 'vacancy' : 'vacancies'}
                </span>
                <span className="text-slate-400 group-hover:text-navy-950 inline-flex items-center gap-0.5 transition">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
