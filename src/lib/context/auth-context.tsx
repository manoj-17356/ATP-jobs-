'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, Employer } from '@/types';
import { SAMPLE_USERS, INITIAL_EMPLOYERS } from '@/lib/data/sample-data';
import { isSupabaseConfigured, createClient } from '@/lib/supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  employer: Employer | null;
  role: UserRole | null;
  isLoading: boolean;
  loginAs: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  registerSeeker: (data: {
    fullName: string;
    email: string;
    phone: string;
    villageName: string;
    villageId?: string;
    headline?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  registerEmployer: (data: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    industry: string;
    villageName: string;
    address: string;
    sezZone?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  updateEmployerProfile: (updatedData: Partial<Employer>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from localStorage or default to Job Seeker for testing convenience
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('atchujobs_current_user');
      const savedEmployer = localStorage.getItem('atchujobs_current_employer');

      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (savedEmployer) {
          setEmployer(JSON.parse(savedEmployer));
        }
      } else {
        // Default to seeker on first visit so user can explore dashboards easily
        setUser(SAMPLE_USERS.seeker);
        localStorage.setItem('atchujobs_current_user', JSON.stringify(SAMPLE_USERS.seeker));
      }
    } catch (err) {
      console.error('Failed to load auth state:', err);
      setUser(SAMPLE_USERS.seeker);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Quick switch for demo testing
  const loginAs = (role: UserRole) => {
    if (role === 'job_seeker') {
      setUser(SAMPLE_USERS.seeker);
      setEmployer(null);
      localStorage.setItem('atchujobs_current_user', JSON.stringify(SAMPLE_USERS.seeker));
      localStorage.removeItem('atchujobs_current_employer');
    } else if (role === 'employer') {
      setUser(SAMPLE_USERS.employer);
      const emp = INITIAL_EMPLOYERS[0];
      setEmployer(emp);
      localStorage.setItem('atchujobs_current_user', JSON.stringify(SAMPLE_USERS.employer));
      localStorage.setItem('atchujobs_current_employer', JSON.stringify(emp));
    } else if (role === 'admin') {
      setUser(SAMPLE_USERS.admin);
      setEmployer(null);
      localStorage.setItem('atchujobs_current_user', JSON.stringify(SAMPLE_USERS.admin));
      localStorage.removeItem('atchujobs_current_employer');
    }
  };

  const login = async (email: string, roleHint?: UserRole): Promise<{ success: boolean; error?: string }> => {
    // If Supabase is configured, could query auth here.
    // For local resilience and immediate testing:
    const trimmed = email.toLowerCase().trim();
    if (trimmed.includes('admin') || roleHint === 'admin') {
      loginAs('admin');
      return { success: true };
    } else if (trimmed.includes('employer') || trimmed.includes('hr') || trimmed.includes('company') || roleHint === 'employer') {
      loginAs('employer');
      return { success: true };
    } else {
      loginAs('job_seeker');
      return { success: true };
    }
  };

  const registerSeeker = async (data: {
    fullName: string;
    email: string;
    phone: string;
    villageName: string;
    villageId?: string;
    headline?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const newUser: UserProfile = {
      id: `user-seeker-${Date.now()}`,
      email: data.email,
      full_name: data.fullName,
      phone: data.phone,
      role: 'job_seeker',
      village_name: data.villageName,
      village_id: data.villageId,
      headline: data.headline || `Job Seeker from ${data.villageName}`,
      bio: `Native resident of ${data.villageName}, Atchuthapuram seeking genuine local career opportunities.`,
      skills: ['Communication', 'Teamwork', 'Local Knowledge'],
      education: [],
      experience: [],
      is_profile_public: true,
      is_suspended: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setUser(newUser);
    setEmployer(null);
    localStorage.setItem('atchujobs_current_user', JSON.stringify(newUser));
    localStorage.removeItem('atchujobs_current_employer');
    return { success: true };
  };

  const registerEmployer = async (data: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    industry: string;
    villageName: string;
    address: string;
    sezZone?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const newUserId = `user-emp-${Date.now()}`;
    const newEmployerId = `emp-${Date.now()}`;

    const newUser: UserProfile = {
      id: newUserId,
      email: data.email,
      full_name: data.contactName,
      phone: data.phone,
      role: 'employer',
      village_name: data.villageName,
      is_suspended: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newEmp: Employer = {
      id: newEmployerId,
      user_id: newUserId,
      company_name: data.companyName,
      industry: data.industry,
      company_type: 'Private Unit',
      description: `${data.companyName} based in ${data.villageName}, Atchuthapuram.`,
      contact_email: data.email,
      contact_phone: data.phone,
      address: data.address,
      village_name: data.villageName,
      sez_zone: data.sezZone || 'Atchuthapuram Industrial Area',
      pincode: '531011',
      status: 'pending_verification', // Requires admin verification before publishing
      no_fee_pledge: true,
      documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setUser(newUser);
    setEmployer(newEmp);
    localStorage.setItem('atchujobs_current_user', JSON.stringify(newUser));
    localStorage.setItem('atchujobs_current_employer', JSON.stringify(newEmp));
    
    // Also save into employers list in storage
    try {
      const rawEmps = localStorage.getItem('atchujobs_employers');
      const emps: Employer[] = rawEmps ? JSON.parse(rawEmps) : INITIAL_EMPLOYERS;
      emps.unshift(newEmp);
      localStorage.setItem('atchujobs_employers', JSON.stringify(emps));
    } catch (e) {
      console.error(e);
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setEmployer(null);
    localStorage.removeItem('atchujobs_current_user');
    localStorage.removeItem('atchujobs_current_employer');
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData, updated_at: new Date().toISOString() };
    setUser(updated);
    localStorage.setItem('atchujobs_current_user', JSON.stringify(updated));
  };

  const updateEmployerProfile = (updatedData: Partial<Employer>) => {
    if (!employer) return;
    const updated = { ...employer, ...updatedData, updated_at: new Date().toISOString() };
    setEmployer(updated);
    localStorage.setItem('atchujobs_current_employer', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        employer,
        role: user?.role || null,
        isLoading,
        loginAs,
        login,
        registerSeeker,
        registerEmployer,
        logout,
        updateProfile,
        updateEmployerProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

