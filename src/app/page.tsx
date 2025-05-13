import Header from '@/components/layout/Header';
import Dashboard from '@/components/dashboard/Dashboard';
import { initialServices, initialSongs } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto">
        <Dashboard services={initialServices} songs={initialSongs} />
      </main>
    </>
  );
}
