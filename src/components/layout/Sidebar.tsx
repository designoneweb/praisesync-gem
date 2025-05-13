'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarIcon,
  MusicNoteIcon,
  DocumentTextIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  CreditCardIcon,
  HomeIcon,
} from '@/components/icons';

interface NavItem {
  name: string;
  icon: React.ReactElement;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: <HomeIcon />, href: '/' },
  { name: 'Schedule', icon: <CalendarIcon />, href: '/schedule' },
  { name: 'Set Lists', icon: <MusicNoteIcon />, href: '/setlists' },
  { name: 'Bulletins', icon: <DocumentTextIcon />, href: '/bulletins' },
  { name: 'Team', icon: <UsersIcon />, href: '/team' },
  { name: 'Reports', icon: <ChartBarIcon />, href: '/reports' },
  { name: 'CCLI Settings', icon: <CogIcon />, href: '/ccli' },
  { name: 'Billing', icon: <CreditCardIcon />, href: '/billing' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-navy text-white p-5 flex flex-col fixed">
      <div className="text-2xl font-bold text-gold mb-10">PraiseSync</div>
      <nav>
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center w-full py-2 px-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#2A3B70] text-gold'
                      : 'hover:bg-[#2A3B70] hover:text-gold'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto text-xs text-gray-400">
        <p>&copy; 2025 PraiseSync</p>
        <p>Version 0.1.0</p>
      </div>
    </div>
  );
}
