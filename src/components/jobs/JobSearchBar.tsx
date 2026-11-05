'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/context/language-context';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';
import { JOB_CATEGORIES } from '@/lib/data/categories';
import { Search, MapPin, Briefcase, ChevronDown } from 'lucide-react';

interface JobSearchBarProps {
  initialSearch?: string;
  initialVillage?: string;
  initialCategory?: string;
  onSearch?: (search: string, village: string, category: string) => void;
  isCompact?: boolean;
}

export default function JobSearchBar({
  initialSearch = '',
  initialVillage = 'all',
  initialCategory = 'all',
  onSearch,
  isCompact = false,
}: JobSearchBarProps) {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [search, setSearch] = useState(initialSearch);
  const [village, setVillage] = useState(initialVillage);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search, village, category);
    } else {
      const params = new URLSearchParams();
      if (search.trim()) params.set('q', search.trim());
      if (village && village !== 'all') params.set('village', village);
      if (category && category !== 'all') params.set('category', category);
      router.push(`/jobs?${params.toString()}`);
    }
  };

  const popularVillages = ['Haripalem', 'Atchuthapuram', 'Duppituru', 'Kondakarla', 'Pudimadaka'];

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-slate-200/80 flex flex-col md:flex-row items-center gap-2"
      >
        {/* Keywords Input */}
        <div className="flex-1 w-full flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border md:border-none border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none placeholder-slate-400 font-medium"
          />
        </div>

        <div className="hidden md:block w-px h-8 bg-slate-200" />

        {/* Village Dropdown */}
        <div className="w-full md:w-56 flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border md:border-none border-slate-200">
          <MapPin className="w-5 h-5 text-red-500 shrink-0" />
          <div className="w-full">
            <select
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none font-semibold cursor-pointer"
            >
              <option value="all">{t.allVillages}</option>
              {ATCHUTHAPURAM_VILLAGES.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-slate-200" />

        {/* Category Dropdown */}
        <div className="w-full md:w-56 flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border md:border-none border-slate-200">
          <Briefcase className="w-5 h-5 text-blue-600 shrink-0" />
          <div className="w-full">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none font-semibold cursor-pointer"
            >
              <option value="all">{t.allCategories}</option>
              {JOB_CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 shrink-0"
        >
          <Search className="w-4 h-4" />
          {t.searchBtn}
        </button>
      </form>

      {/* Popular village quick-filters */}
      {!isCompact && (
        <div className="flex flex-wrap items-center gap-2 mt-3 px-1 text-xs">
          <span className="text-slate-400 font-medium">Popular Villages:</span>
          {popularVillages.map((vName) => (
            <button
              key={vName}
              onClick={() => {
                setVillage(vName);
                if (onSearch) {
                  onSearch(search, vName, category);
                } else {
                  router.push(`/jobs?village=${encodeURIComponent(vName)}`);
                }
              }}
              className="px-2.5 py-0.5 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-xs text-[11px] font-semibold hover:border-blue-400 transition"
            >
              {vName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

