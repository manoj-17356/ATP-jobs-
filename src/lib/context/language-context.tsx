'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te';

interface Translations {
  brandName: string;
  tagline: string;
  mandalNotice: string;
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

const translations: Record<Language, Translations> = {
  en: {
    brandName: 'AtchuJobs',
    tagline: 'Local Jobs. Local Opportunities.',
    mandalNotice: 'Exclusively for Atchuthapuram Mandal & Anakapalli District, AP',
    navHome: 'Home',
    navJobs: 'Find Jobs',
    navCategories: 'Categories',
    navVillages: 'Villages',
    navEmployers: 'Companies',
    navPostJob: 'Post a Job',
    navLogin: 'Login',
    navRegister: 'Register',
    navDashboard: 'Dashboard',
    navLogout: 'Sign Out',
    
    heroHeading: 'Find Verified Jobs in Atchuthapuram Mandal',
    heroSubheading: 'Direct recruitment from APSEZ manufacturing units, Brandix Apparel City, Pharma SEZ, and local commercial enterprises. 100% Zero-fee guarantee.',
    searchPlaceholder: 'Job title, skill (e.g. QC Chemist, CNC Operator, Tally)',
    allVillages: 'All Villages in Mandal',
    allCategories: 'All Job Categories',
    searchBtn: 'Search Jobs',
    
    statJobs: 'Active Verified Jobs',
    statEmployers: 'Verified SEZ & Local Units',
    statVillages: 'Villages Covered',
    statZeroFee: 'Zero Candidate Fee',
    
    badgeVerifiedEmployer: 'Verified Employer',
    badgeZeroFee: '100% Free - No Fees',
    badgeApprovedJob: 'Admin Approved',
    badgeGovtApproved: 'SEZ / Local Unit',
    
    btnApply: 'Apply Now',
    btnApplied: 'Applied',
    btnSave: 'Save Job',
    btnSaved: 'Saved',
    btnReport: 'Report Job',
    btnShare: 'Share',
    btnViewDetails: 'View Details',
    
    zeroFeeNoticeTitle: 'Zero-Tolerance Anti-Fraud Guarantee',
    zeroFeeNoticeText: 'AtchuJobs strictly prohibits any employer from charging application fees, uniform deposits, or training charges. Every posting is reviewed by our mandal moderation desk.',
    
    secFeaturedJobs: 'Latest Verified Local Vacancies',
    secPopularCategories: 'Explore Jobs by Category',
    secTopEmployers: 'Prominent Employers in Atchuthapuram',
    secWhyAtchuJobs: 'Why Job Seekers & Employers Trust AtchuJobs',
    secVillagesCovered: 'Villages Covered in Atchuthapuram Mandal',
    
    filterTitle: 'Filter Opportunities',
    filterJobType: 'Job Type',
    filterShiftType: 'Shift Type',
    filterSalary: 'Min Monthly Salary',
    filterBusOnly: 'Free Bus Transportation Available',
    filterVerifiedOnly: 'Verified Employers Only',
    filterReset: 'Reset Filters',
  },
  te: {
    brandName: 'అచ్చుజాబ్స్',
    tagline: 'స్థానిక ఉద్యోగాలు. స్థానిక అవకాశాలు.',
    mandalNotice: 'అచ్యుతాపురం మండలం & అనకాపల్లి జిల్లా కొరకు ప్రత్యేక పోర్టల్',
    navHome: 'హోమ్',
    navJobs: 'ఉద్యోగాలు',
    navCategories: 'విభాగాలు',
    navVillages: 'గ్రామాలు',
    navEmployers: 'సంస్థలు',
    navPostJob: 'ఉద్యోగం ప్రకటించండి',
    navLogin: 'లాగిన్',
    navRegister: 'రిజిస్టర్',
    navDashboard: 'డాష్‌బోర్డ్',
    navLogout: 'లాగౌట్',
    
    heroHeading: 'అచ్యుతాపురం మండలంలో ధృవీకరించిన ఉద్యోగాలను పొందండి',
    heroSubheading: 'ఏపీ సెజ్ (APSEZ), బ్రాండిక్స్ అపారెల్ సిటీ, ఫార్మా కంపెనీలు మరియు స్థానిక సంస్థల్లో ప్రత్యక్ష ఉద్యోగ అవకాశాలు. ఎటువంటి ఫీజులు లేకుండా ఉచితం.',
    searchPlaceholder: 'ఉద్యోగం లేదా నైపుణ్యం (ఉదా: క్వాలిటీ కంట్రోల్, సీఎన్‌సీ, డ్రైవర్, ట్యాలీ)',
    allVillages: 'మండలంలోని అన్ని గ్రామాలు',
    allCategories: 'అన్ని విభాగాలు',
    searchBtn: 'వెతకండి',
    
    statJobs: 'యాక్టివ్ ఉద్యోగాలు',
    statEmployers: 'ధృవీకరించిన కంపెనీలు',
    statVillages: 'మండల గ్రామాలు',
    statZeroFee: 'ఉచిత సేవ (0 ఫీజు)',
    
    badgeVerifiedEmployer: 'ధృవీకరించిన సంస్థ',
    badgeZeroFee: '100% ఉచితం - ఫీజు లేదు',
    badgeApprovedJob: 'అడ్మిన్ ఆమోదితం',
    badgeGovtApproved: 'సెజ్ / స్థానిక యూనిట్',
    
    btnApply: 'దరఖాస్తు చేయండి',
    btnApplied: 'దరఖాస్తు చేసారు',
    btnSave: 'సేవ్ చేయండి',
    btnSaved: 'సేవ్ అయింది',
    btnReport: 'ఫిర్యాదు చేయండి',
    btnShare: 'షేర్ చేయండి',
    btnViewDetails: 'వివరాలు చూడండి',
    
    zeroFeeNoticeTitle: 'మోసపూరిత ఉద్యోగాల నివారణ హామీ',
    zeroFeeNoticeText: 'అచ్చుజాబ్స్ లో ఉద్యోగార్ధుల నుండి రిజిస్ట్రేషన్ లేదా ఇంటర్వ్యూ పేరిట ఎటువంటి ఫీజులు వసూలు చేయుట చట్టరీత్యా నేరం. ప్రతి ఉద్యోగ ప్రకటన అడ్మిన్ ద్వారా క్షుణ్ణంగా తనిఖీ చేయబడుతుంది.',
    
    secFeaturedJobs: 'తాజా ధృవీకరించిన స్థానిక ఉద్యోగాలు',
    secPopularCategories: 'విభాగాల వారీగా ఉద్యోగాలు',
    secTopEmployers: 'అచ్యుతాపురంలోని ప్రముఖ కంపెనీలు',
    secWhyAtchuJobs: 'అచ్చుజాబ్స్ ఎందుకు ప్రత్యేకమైనది?',
    secVillagesCovered: 'అచ్యుతాపురం మండల పరిధిలోని గ్రామాలు',
    
    filterTitle: 'ఫిల్టర్లు',
    filterJobType: 'ఉద్యోగ రకం',
    filterShiftType: 'షిఫ్ట్ రకం',
    filterSalary: 'కనిష్ట నెలవారీ వేతనం',
    filterBusOnly: 'ఉచిత బస్సు రవాణా సదుపాయం కలదు',
    filterVerifiedOnly: 'ధృవీకరించిన సంస్థలు మాత్రమే',
    filterReset: 'రీసెట్ చేయండి',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('atchujobs_lang') as Language;
    if (saved && (saved === 'en' || saved === 'te')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('atchujobs_lang', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
