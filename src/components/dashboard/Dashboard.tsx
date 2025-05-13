'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Service, Song } from '@/types';
import { formatDate } from '@/lib/utils';
import { MusicNoteIcon, CalendarIcon, DocumentTextIcon, UsersIcon } from '@/components/icons';

interface DashboardProps {
  services: Service[];
  songs: Song[];
}

export default function Dashboard({ services, songs }: DashboardProps) {
  const nextService = services.length > 0 
    ? services.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .find(s => new Date(s.date) >= new Date()) 
    : null;
  
  const upcomingServices = services
    .filter(s => new Date(s.date) >= new Date())
    .slice(0, 3);

  return (
    <div className="p-6 bg-off-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* KPI: Next Service Date */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Next Service</h3>
          {nextService ? (
            <>
              <p className="text-2xl font-semibold text-navy">{formatDate(nextService.date)}</p>
              <p className="text-sm text-gray-600">{nextService.theme}</p>
            </>
          ) : (
            <p className="text-2xl font-semibold text-navy">No upcoming services</p>
          )}
        </div>

        {/* KPI: Bulletin Ready? */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Next Bulletin Status</h3>
          {nextService ? (
            <p className={`text-2xl font-semibold ${nextService.bulletinReady ? 'text-green-500' : 'text-yellow-500'}`}>
              {nextService.bulletinReady ? 'Ready' : 'Pending'}
            </p>
          ) : (
            <p className="text-2xl font-semibold text-gray-400">N/A</p>
          )}
          <Link
            href="/bulletins"
            className="mt-2 text-sm text-gold hover:underline"
          >
            View Bulletins
          </Link>
        </div>

        {/* KPI: CCLI Status */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">CCLI Reporting</h3>
          {nextService ? (
            <p className={`text-2xl font-semibold ${nextService.ccliStatus === 'Reported' ? 'text-green-500' : 'text-orange-500'}`}>
              {nextService.ccliStatus}
            </p>
          ) : (
            <p className="text-2xl font-semibold text-gray-400">N/A</p>
          )}
          <Link
            href="/ccli"
            className="mt-2 text-sm text-gold hover:underline"
          >
            Manage CCLI
          </Link>
        </div>
      </div>

      {/* Prepare Sunday Button */}
      <div className="mb-8 text-center">
        <button 
          onClick={() => alert('Prepare Sunday Wizard (not implemented yet)')}
          className="bg-gold text-navy font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition-colors text-lg"
        >
          Prepare Sunday
        </button>
      </div>
      
      {/* Upcoming Services Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-navy mb-4">Upcoming Services</h2>
        {upcomingServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingServices.map(service => (
              <div key={service.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-navy">{formatDate(service.date)} - {service.time}</h3>
                <p className="text-sm text-gray-700">{service.theme}</p>
                <div className="mt-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    service.bulletinReady ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    Bulletin: {service.bulletinReady ? 'Ready' : 'Pending'}
                  </span>
                </div>
                <Link 
                  href="/schedule"
                  className="mt-3 text-sm text-gold hover:underline"
                >
                  View Plan
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming services scheduled.</p>
        )}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/setlists"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-navy hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <MusicNoteIcon />
            <span className="mt-1 text-sm font-medium">New Set List</span>
          </Link>
          <Link 
            href="/schedule"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-navy hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <CalendarIcon />
            <span className="mt-1 text-sm font-medium">Schedule Team</span>
          </Link>
          <Link 
            href="/bulletins"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-navy hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <DocumentTextIcon />
            <span className="mt-1 text-sm font-medium">Create Bulletin</span>
          </Link>
          <Link 
            href="/team"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-navy hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <UsersIcon />
            <span className="mt-1 text-sm font-medium">Manage Team</span>
          </Link>
        </div>
      </div>
      
      {/* PraiseSync Tips - Placeholder */}
      <div className="bg-[#e9e4dd] p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-navy mb-2">PraiseSync Tips ✨</h3>
        <p className="text-sm text-gray-700">
          Tip: You can quickly add songs to a set list by dragging them from your song library!
          Need help? Check out our <a href="#" className="text-gold hover:underline">support docs</a>.
        </p>
      </div>
    </div>
  );
}
