'use client';

import React from 'react';
import { JobFilters } from '@/types';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';
import { JOB_CATEGORIES } from '@/lib/data/categories';
import { useLanguage } from '@/lib/context/language-context';
import { Filter, RotateCcw, Bus, ShieldCheck } from 'lucide-react';

interface JobFilterSidebarProps {
  filters: JobFilters;
  onChange: (newFilters: JobFilters) => void;
  onReset: () => void;
  totalResults: number;
}

export default function JobFilterSidebar({
  filters,
  onChange,
  onReset,
  totalResults,
}: JobFilterSidebarProps) {
  const { language, t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-sm text-navy-950">{t.filterTitle}</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-blue-600 font-medium inline-flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          {t.filterReset}
        </button>
      </div>

      {/* Villages Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-2">
          Village in Atchuthapuram
        </label>
        <select
          value={filters.villageName}
          onChange={(e) => onChange({ ...filters, villageName: e.target.value })}
          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="all">{t.allVillages}</option>
          {ATCHUTHAPURAM_VILLAGES.map((v) => (
            <option key={v.id} value={v.name}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      {/* Categories Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-2">
          Job Category
        </label>
        <select
          value={filters.categoryId}
          onChange={(e) => onChange({ ...filters, categoryId: e.target.value })}
          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="all">{t.allCategories}</option>
          {JOB_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-2">
          {t.filterJobType}
        </label>
        <div className="space-y-1.5 text-xs text-slate-700">
          {['all', 'Full-time', 'Shift-based', 'Contract', 'Apprenticeship'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="jobType"
                checked={filters.jobType === type}
                onChange={() => onChange({ ...filters, jobType: type })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>{type === 'all' ? 'All Job Types' : type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Shift Type Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-2">
          {t.filterShiftType}
        </label>
        <div className="space-y-1.5 text-xs text-slate-700">
          {['all', 'Day', 'Night', 'Rotational 3-shift', 'General'].map((shift) => (
            <label key={shift} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shiftType"
                checked={filters.shiftType === shift}
                onChange={() => onChange({ ...filters, shiftType: shift })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>{shift === 'all' ? 'All Shifts' : shift}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Perks & Safety Toggles */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
          <input
            type="checkbox"
            checked={filters.hasBusOnly}
            onChange={(e) => onChange({ ...filters, hasBusOnly: e.target.checked })}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="flex items-center gap-1.5">
            <Bus className="w-3.5 h-3.5 text-emerald-600" />
            {t.filterBusOnly}
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {t.filterVerifiedOnly}
          </span>
        </label>
      </div>

      {/* Minimum Monthly Salary */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <label className="font-bold text-slate-800">{t.filterSalary}</label>
          <span className="font-bold text-blue-700">
            {filters.minSalary ? `₹${filters.minSalary.toLocaleString('en-IN')}+` : 'Any'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="35000"
          step="2500"
          value={filters.minSalary || 0}
          onChange={(e) => onChange({ ...filters, minSalary: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹0</span>
          <span>₹15k</span>
          <span>₹25k</span>
          <span>₹35k+</span>
        </div>
      </div>
    </div>
  );
}

