'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllActiveJobs } from '@/lib/services/job-service';
import { Job, JobFilters } from '@/types';
import JobCard from '@/components/jobs/JobCard';
import JobFilterSidebar from '@/components/jobs/JobFilterSidebar';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import { useLanguage } from '@/lib/context/language-context';
import { Briefcase, SlidersHorizontal, MapPin } from 'lucide-react';

function JobsContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [filters, setFilters] = useState<JobFilters>({
    searchQuery: searchParams.get('q') || '',
    categoryId: searchParams.get('category') || 'all',
    villageName: searchParams.get('village') || 'all',
    jobType: 'all',
    shiftType: 'all',
    experienceLevel: 'all',
    minSalary: 0,
    hasBusOnly: false,
    verifiedOnly: false,
    sortBy: 'latest',
  });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with searchParams on load/navigation
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || 'all';
    const vil = searchParams.get('village') || 'all';

    setFilters((prev) => ({
      ...prev,
      searchQuery: q,
      categoryId: cat,
      villageName: vil,
    }));
  }, [searchParams]);

  // Load and filter jobs whenever filters change
  useEffect(() => {
    const result = getAllActiveJobs(filters);
    setJobs(result);
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      categoryId: 'all',
      villageName: 'all',
      jobType: 'all',
      shiftType: 'all',
      experienceLevel: 'all',
      minSalary: 0,
      hasBusOnly: false,
      verifiedOnly: false,
      sortBy: 'latest',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search Header */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Atchuthapuram Vacancies
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Explore Verified Local Jobs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Discover opportunities across industrial zones, Brandix Apparel City, Pharma cluster, and local commercial units.
          </p>
        </div>

        <JobSearchBar
          initialSearch={filters.searchQuery}
          initialVillage={filters.villageName}
          initialCategory={filters.categoryId}
          onSearch={(q, vil, cat) => {
            setFilters((prev) => ({
              ...prev,
              searchQuery: q,
              villageName: vil,
              categoryId: cat,
            }));
          }}
          isCompact
        />
      </div>

      {/* Main Grid: Filter Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <JobFilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalResults={jobs.length}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-navy-950">
            {jobs.length} Openings Found
          </span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-1">
            <JobFilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={jobs.length}
            />
          </div>
        )}

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Bar: Count & Sorting */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-700">
              Showing <strong className="text-navy-950">{jobs.length}</strong> verified vacancies
              {filters.villageName !== 'all' && ` in ${filters.villageName}`}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none"
              >
                <option value="latest">Latest Posted</option>
                <option value="salary_high">Highest Salary</option>
              </select>
            </div>
          </div>

          {/* Job Cards */}
          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy-950 text-base">
                No Vacancies Match Your Filter
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your village selection, resetting filters, or searching for other skills.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}

