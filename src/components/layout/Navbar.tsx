'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { useLanguage } from '@/lib/context/language-context';
import { INITIAL_NOTIFICATIONS } from '@/lib/data/sample-data';
import {
  Briefcase,
  Bell,
  Menu,
  X,
  User,
  Shield,
  Building,
  LogOut,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, loginAs, logout } = useAuth();
  const { t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const navLinks = [
    { href: '/', label: t.navHome },
    { href: '/jobs', label: t.navJobs },
    { href: '/companies', label: t.navEmployers },
  ];

  const getDashboardHref = () => {
    if (role === 'admin') return '/dashboard/admin';
    if (role === 'employer') return '/dashboard/employer';
    return '/dashboard/seeker';
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Bar with Local Badge & Quick Persona Switcher */}
      <div className="bg-navy-950 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
            <MapPin className="w-3 h-3 text-emerald-400" />
            Atchuthapuram Local Jobs
          </span>
          <span className="hidden sm:inline text-slate-400">
            {t.notice}
          </span>
        </div>

        {/* Quick Demo Role Switcher */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-slate-400 hidden md:inline">Test Persona:</span>
          <button
            onClick={() => loginAs('job_seeker')}
            className={`px-2 py-0.5 rounded font-medium transition ${
              role === 'job_seeker'
                ? 'bg-blue-600 text-white'
                : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
            }`}
          >
            Seeker
          </button>
          <button
            onClick={() => loginAs('employer')}
            className={`px-2 py-0.5 rounded font-medium transition ${
              role === 'employer'
                ? 'bg-amber-600 text-white'
                : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
            }`}
          >
            Employer
          </button>
          <button
            onClick={() => loginAs('admin')}
            className={`px-2 py-0.5 rounded font-medium transition ${
              role === 'admin'
                ? 'bg-emerald-600 text-white'
                : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-md group-hover:bg-blue-700 transition">
                <Briefcase className="w-5 h-5 text-blue-400 group-hover:text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-navy-900 flex items-center gap-1">
                  ATP<span className="text-blue-600">Jobs</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                    Atchuthapuram
                  </span>
                </span>
                <p className="text-[10px] font-medium text-slate-500 leading-none">
                  {t.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      isActive
                        ? 'text-blue-700 bg-blue-50/80'
                        : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3">
            {/* Post Job Button (Direct link for Employers) */}
            <Link
              href="/dashboard/employer?tab=post-job"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-navy-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-navy-950" />
              {t.navPostJob}
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-navy-900">
                      Notifications ({unreadCount})
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-blue-600 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-xs hover:bg-slate-50 transition ${
                            !n.is_read ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="font-semibold text-slate-900 mb-0.5">
                            {n.title}
                          </div>
                          <p className="text-slate-600 line-clamp-2">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 inline-block">
                            {new Date(n.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={getDashboardHref()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-sm font-semibold text-navy-900"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold">
                    {role === 'admin' ? (
                      <Shield className="w-4 h-4 text-emerald-600" />
                    ) : role === 'employer' ? (
                      <Building className="w-4 h-4 text-amber-600" />
                    ) : (
                      <User className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <span className="hidden sm:inline max-w-[130px] truncate">
                    {user.full_name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-700">
                    {role === 'job_seeker' ? 'Seeker' : role}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title={t.navLogout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-xs font-bold text-navy-900 hover:bg-slate-100 rounded-lg transition"
                >
                  {t.navLogin}
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-2 text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 rounded-lg shadow-sm transition"
                >
                  {t.navRegister}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-navy-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard/employer?tab=post-job"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-bold text-navy-900 bg-amber-400 hover:bg-amber-300"
          >
            {t.navPostJob}
          </Link>
          {user && (
            <Link
              href={getDashboardHref()}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-bold text-blue-700 bg-blue-50"
            >
              {t.navDashboard} ({user.role})
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
