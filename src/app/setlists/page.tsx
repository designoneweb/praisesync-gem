import Header from '@/components/layout/Header';
import SetListBuilder from '@/components/setlist/SetListBuilder';
import { initialSongs } from '@/lib/mock-data';

export default function SetListsPage() {
  return (
    <>
      <Header title="Set List Builder" />
      <main className="flex-1 overflow-y-auto">
        <SetListBuilder songs={initialSongs} />
      </main>
    </>
  );
}
