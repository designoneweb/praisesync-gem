'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Service, TeamMember, TeamAssignment } from '@/types';
import { formatDate } from '@/lib/utils';

interface ScheduleComponentProps {
  services: Service[];
  teamMembers: TeamMember[];
}

export default function ScheduleComponent({ services, teamMembers }: ScheduleComponentProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    services.length > 0 ? services[0].id : null
  );
  const [teamAssignments, setTeamAssignments] = useState<TeamAssignment>({});

  const currentService = services.find(s => s.id === selectedServiceId);

  const assignMember = (serviceId: number, memberId: string, role: string) => {
    setTeamAssignments(prev => ({
      ...prev,
      [serviceId]: {
        ...(prev[serviceId] || {}),
        [memberId]: role
      }
    }));
    
    const member = teamMembers.find(m => m.id === memberId);
    alert(`Assigned ${member?.name} as ${role} for service on ${formatDate(currentService!.date)}. SMS reminder sent (simulated).`);
  };
  
  const getAssignedRole = (serviceId: number, memberId: string) => {
    return teamAssignments[serviceId]?.[memberId] || 'Unassigned';
  };

  return (
    <div className="p-6 bg-off-white min-h-screen">
      <h2 className="text-2xl font-semibold text-navy mb-6">Volunteer Scheduler</h2>

      <div className="mb-6">
        <label htmlFor="service-select" className="block text-sm font-medium text-gray-700 mb-1">
          Select Service:
        </label>
        <select
          id="service-select"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-gold focus:border-gold"
          value={selectedServiceId || ''}
          onChange={(e) => setSelectedServiceId(Number(e.target.value))}
        >
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {formatDate(service.date)} - {service.theme}
            </option>
          ))}
        </select>
      </div>

      {currentService && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-navy mb-4">
            Schedule for: {formatDate(currentService.date)} - {currentService.theme}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map(member => (
              <div key={member.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center mb-2">
                  <div className="relative w-12 h-12 mr-3">
                    <Image 
                      src={member.photoUrl || 'https://placehold.co/100x100/E0E0E0/757575?text=User'}
                      alt={member.name} 
                      className="rounded-full"
                      width={48}
                      height={48}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/100x100/E0E0E0/757575?text=User';
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-navy">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role} (Default)</p>
                  </div>
                </div>
                <p className="text-sm mb-1">Status: 
                  <span className={`ml-1 font-semibold ${
                    member.status === 'Confirmed' ? 'text-green-600' :
                    member.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {member.status}
                  </span>
                </p>
                <p className="text-sm mb-2">
                  Assigned as: <span className="font-semibold">
                    {getAssignedRole(currentService.id, member.id)}
                  </span>
                </p>
                
                <select 
                  className="w-full p-1.5 border border-gray-300 rounded-md text-sm mb-2"
                  onChange={(e) => {
                    if (e.target.value) {
                      assignMember(currentService.id, member.id, e.target.value);
                    }
                  }}
                  value={getAssignedRole(currentService.id, member.id) === 'Unassigned' ? '' : getAssignedRole(currentService.id, member.id)}
                >
                  <option value="">Assign Role...</option>
                  <option value="Worship Leader">Worship Leader</option>
                  <option value="Vocals">Vocals</option>
                  <option value="Guitarist">Guitarist</option>
                  <option value="Pianist">Pianist</option>
                  <option value="Drums">Drums</option>
                  <option value="Bass">Bass</option>
                  <option value="Tech/Slides">Tech/Slides</option>
                  <option value="Greeter">Greeter</option>
                  <option value="Not Scheduled">Not Scheduled for this service</option>
                </select>
                <button className="text-xs text-gold hover:underline">
                  Send Reminder (Simulated)
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button className="bg-gold text-navy font-semibold py-2 px-4 rounded-lg shadow hover:bg-opacity-90 transition-colors">
              Confirm & Notify Team
            </button>
          </div>
        </div>
      )}
      {!currentService && <p className="text-gray-600">Please select a service to view or manage its schedule.</p>}
    </div>
  );
}
