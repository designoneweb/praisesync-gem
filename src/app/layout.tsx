import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PraiseSync - Sunday Service Toolkit',
  description: 'Plan worship, sync CCLI usage, schedule volunteers, and produce bulletins',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-off-white">
          <Sidebar />
          <div className="flex-1 flex flex-col ml-64">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
