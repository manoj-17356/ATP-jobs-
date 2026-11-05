import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/context/auth-context';
import { LanguageProvider } from '@/lib/context/language-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AtchuJobs – Local Jobs. Local Opportunities. (Atchuthapuram Mandal)',
  description:
    'Dedicated job portal exclusively for Atchuthapuram Mandal, Anakapalli District, Andhra Pradesh. Genuine verified vacancies from APSEZ, Brandix Apparel City, and local industrial units.',
  keywords: [
    'Atchuthapuram jobs',
    'APSEZ jobs',
    'Brandix India Apparel City careers',
    'Anakapalli district employment',
    'Atchuthapuram mandal vacancies',
    'Pharma jobs Atchuthapuram',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
