import Header from '@/components/layout/Header';
import PlaceholderComponent from '@/components/ui/PlaceholderComponent';

export default function ReportsPage() {
  return (
    <>
      <Header title="Reports" />
      <main className="flex-1 overflow-y-auto">
        <PlaceholderComponent title="Reports & Analytics" />
      </main>
    </>
  );
}
