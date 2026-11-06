'use client';

import React, { createContext, useContext } from 'react';

export type Language = 'en';

interface Translations {
  brandName: string;
  tagline: string;
  notice: string;
  navHome: string;
  navJobs: string;
  navCategories: string;
  navVillages: string;
  navEmployers: string;
  navPostJob: string;
  navLogin: string;
  navRegister: string;
  navDashboard: string;
  navLogout: string;
  
  // Hero
  heroHeading: string;
  heroSubheading: string;
  searchPlaceholder: string;
  allVillages: string;
  allCategories: string;
  searchBtn: string;
  
  // Stats
  statJobs: string;
  statEmployers: string;
  statVillages: string;
  statZeroFee: string;
  
  // Badges
  badgeVerifiedEmployer: string;
  badgeZeroFee: string;
  badgeApprovedJob: string;
  badgeGovtApproved: string;
  
  // Actions
  btnApply: string;
  btnApplied: string;
  btnSave: string;
  btnSaved: string;
  btnReport: string;
  btnShare: string;
  btnViewDetails: string;
  
  // Anti-fraud
  zeroFeeNoticeTitle: string;
  zeroFeeNoticeText: string;
  
  // Section Titles
  secFeaturedJobs: string;
  secPopularCategories: string;
  secTopEmployers: string;
  secWhyAtchuJobs: string;
  secVillagesCovered: string;
  
  // Filter labels
  filterTitle: string;
  filterJobType: string;
  filterShiftType: string;
  filterSalary: string;
  filterBusOnly: string;
  filterVerifiedOnly: string;
  filterReset: string;
}

const translations: Translations = {
  brandName: 'ATP Jobs',
  tagline: 'Local Jobs. Local Opportunities.',
  notice: 'Exclusively for Atchuthapuram',
  navHome: 'Home',
  navJobs: 'Find Jobs',
  navCategories: 'Categories',
  navVillages: 'Atchuthapuram',
  navEmployers: 'Companies',
  navPostJob: 'Post a Job',
  navLogin: 'Login',
  navRegister: 'Register',
  navDashboard: 'Dashboard',
  navLogout: 'Sign Out',
  
  heroHeading: 'Find Verified Jobs in Atchuthapuram',
  heroSubheading: 'Direct recruitment from industrial units, Brandix Apparel City, Pharma cluster, and local commercial enterprises. 100% Zero-fee guarantee.',
  searchPlaceholder: 'Job title, skill (e.g. QC Chemist, CNC Operator, Tally)',
  allVillages: 'Atchuthapuram (All Areas)',
  allCategories: 'All Job Categories',
  searchBtn: 'Search Jobs',
  
  statJobs: 'Active Verified Jobs',
  statEmployers: 'Verified Employers',
  statVillages: 'Atchuthapuram Focused',
  statZeroFee: 'Zero Candidate Fee',
  
  badgeVerifiedEmployer: 'Verified Employer',
  badgeZeroFee: '100% Free - No Fees',
  badgeApprovedJob: 'Admin Approved',
  badgeGovtApproved: 'Verified Local Unit',
  
  btnApply: 'Apply Now',
  btnApplied: 'Applied',
  btnSave: 'Save Job',
  btnSaved: 'Saved',
  btnReport: 'Report Job',
  btnShare: 'Share',
  btnViewDetails: 'View Details',
  
  zeroFeeNoticeTitle: 'Zero-Tolerance Anti-Fraud Guarantee',
  zeroFeeNoticeText: 'ATP Jobs strictly prohibits any employer from charging application fees, uniform deposits, or training charges. Every posting is reviewed by our moderation desk.',
  
  secFeaturedJobs: 'Latest Verified Local Vacancies',
  secPopularCategories: 'Explore Jobs by Category',
  secTopEmployers: 'Prominent Employers in Atchuthapuram',
  secWhyAtchuJobs: 'Why Job Seekers & Employers Trust ATP Jobs',
  secVillagesCovered: 'Jobs in Atchuthapuram',
  
  filterTitle: 'Filter Opportunities',
  filterJobType: 'Job Type',
  filterShiftType: 'Shift Type',
  filterSalary: 'Min Monthly Salary',
  filterBusOnly: 'Free Bus Transportation Available',
  filterVerifiedOnly: 'Verified Employers Only',
  filterReset: 'Reset Filters',
};

interface LanguageContextType {
  language: 'en';
  setLanguage: (lang: 'en') => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider
      value={{
        language: 'en',
        setLanguage: () => {},
        t: translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
