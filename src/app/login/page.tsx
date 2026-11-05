'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { useLanguage } from '@/lib/context/language-context';
import { Briefcase, User, Building2, Shield, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAs } = useAuth();
  const { language, t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'job_seeker' | 'employer' | 'admin'>('job_seeker');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, selectedRole);
    if (selectedRole === 'admin') router.push('/dashboard/admin');
    else if (selectedRole === 'employer') router.push('/dashboard/employer');
    else router.push('/dashboard/seeker');
  };

  const handleQuickLogin = (role: 'job_seeker' | 'employer' | 'admin') => {
    loginAs(role);
    if (role === 'admin') router.push('/dashboard/admin');
    else if (role === 'employer') router.push('/dashboard/employer');
    else router.push('/dashboard/seeker');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white flex items-center justify-center mx-auto shadow-md">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-black text-navy-950">
            Sign In to AtchuJobs
          </h2>
          <p className="text-xs text-slate-500">
            Atchuthapuram Local Employment Portal
          </p>
        </div>

        {/* 1-Click Fast Tester Login Personas */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <span className="text-[11px] font-bold text-slate-600 block uppercase tracking-wider text-center">
            One-Click Quick Test Accounts
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('job_seeker')}
              className="p-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl text-center transition flex flex-col items-center justify-center"
            >
              <User className="w-4 h-4 text-blue-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">Job Seeker</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('employer')}
              className="p-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl text-center transition flex flex-col items-center justify-center"
            >
              <Building2 className="w-4 h-4 text-amber-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">Employer</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="p-2 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 rounded-xl text-center transition flex flex-col items-center justify-center"
            >
              <Shield className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">Admin</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              <label
                className={`p-2 border rounded-xl text-center cursor-pointer transition ${
                  selectedRole === 'job_seeker'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  className="hidden"
                  checked={selectedRole === 'job_seeker'}
                  onChange={() => setSelectedRole('job_seeker')}
                />
                Seeker
              </label>
              <label
                className={`p-2 border rounded-xl text-center cursor-pointer transition ${
                  selectedRole === 'employer'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  className="hidden"
                  checked={selectedRole === 'employer'}
                  onChange={() => setSelectedRole('employer')}
                />
                Employer
              </label>
              <label
                className={`p-2 border rounded-xl text-center cursor-pointer transition ${
                  selectedRole === 'admin'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  className="hidden"
                  checked={selectedRole === 'admin'}
                  onChange={() => setSelectedRole('admin')}
                />
                Admin
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          New to AtchuJobs?{' '}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Register Here (Free)
          </Link>
        </div>
      </div>
    </div>
  );
}

