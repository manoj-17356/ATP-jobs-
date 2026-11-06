import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/context/auth-context';
import { LanguageProvider } from '@/lib/context/language-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'ATP Jobs – Local Jobs. Local Opportunities. (Atchuthapuram)',
  description:
    'Dedicated job portal exclusively for Atchuthapuram. Genuine verified vacancies from industrial parks, Brandix Apparel City, and local enterprises.',
  keywords: [
    'ATP jobs',
    'Atchuthapuram jobs',
    'Brandix India Apparel City careers',
    'Atchuthapuram vacancies',
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
