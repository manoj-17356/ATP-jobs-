'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/language-context';
import { Briefcase, ShieldCheck, MapPin, Phone, Mail, AlertTriangle } from 'lucide-react';
import { ATCHUTHAPURAM_VILLAGES } from '@/lib/data/villages';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      {/* Anti-Fraud Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-navy-900 to-red-950/80 border-b border-red-900/50 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-red-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>{t.zeroFeeNoticeTitle}:</strong> {t.zeroFeeNoticeText}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                Atchu<span className="text-blue-400">Jobs</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Dedicated local employment portal exclusively for Atchuthapuram. Connecting local talent with SEZ manufacturing units, Brandix Apparel City, Pharma clusters, and regional commercial enterprises.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/50 border border-emerald-800/60 p-2 rounded-lg max-w-sm">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Mandatory employer verification & 100% zero-fee guarantee.</span>
            </div>
          </div>

          {/* Key Villages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Key Local Villages
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {ATCHUTHAPURAM_VILLAGES.slice(0, 6).map((v) => (
                <li key={v.id}>
                  <Link
                    href={`/jobs?village=${encodeURIComponent(v.name)}`}
                    className="hover:text-blue-400 transition"
                  >
                    {v.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/villages" className="text-blue-400 font-medium hover:underline">
                  View all 20 villages &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Portals & Roles
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link href="/dashboard/seeker" className="hover:text-blue-400 transition">
                  Job Seeker Profile & Resumes
                </Link>
              </li>
              <li>
                <Link href="/dashboard/employer" className="hover:text-blue-400 transition">
                  Employer Verification & Postings
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-blue-400 transition">
                  Admin Moderation Desk
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-blue-400 transition">
                  Verified Companies Directory
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-blue-400 transition">
                  Browse Active Vacancies
                </Link>
              </li>
            </ul>
          </div>

          {/* Office & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Local Office Desk
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Atchuthapuram Main Road - 531011</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>support@atchujobs.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+91 (08924) 255100</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-navy-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AtchuJobs. All rights reserved. Exclusively for Atchuthapuram.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Security & Privacy First</span>
            <span>•</span>
            <span className="text-slate-400">Strict Anti-Fraud Guarantee</span>
            <span>•</span>
            <span className="text-slate-400">Local Employment Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
