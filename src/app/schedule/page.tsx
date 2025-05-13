import Header from '@/components/layout/Header';
import ScheduleComponent from '@/components/schedule/ScheduleComponent';
import { initialServices, initialTeamMembers } from '@/lib/mock-data';

export default function SchedulePage() {
  return (
    <>
      <Header title="Volunteer Scheduler" />
      <main className="flex-1 overflow-y-auto">
        <ScheduleComponent services={initialServices} teamMembers={initialTeamMembers} />
      </main>
    </>
  );
}
