import type { Metadata } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LiveActivityToasts from '@/components/ui/LiveActivityToasts';
import './globals.css';

const sans = Archivo({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Nexus Forge — Next-Gen Infrastructure, Security & Tech Talent',
  description:
    'Nexus Forge runs website and social operations for growing brands, hosts live CTF arenas, and trains, tests and places the engineers who keep systems running.',
};

// Applies the persisted theme before hydration so there is no flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('nf-theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="bg-base font-sans text-fg">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <LiveActivityToasts />
      </body>
    </html>
  );
}
