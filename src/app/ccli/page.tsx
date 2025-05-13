import Header from '@/components/layout/Header';
import PlaceholderComponent from '@/components/ui/PlaceholderComponent';

export default function CCLIPage() {
  return (
    <>
      <Header title="CCLI Settings" />
      <main className="flex-1 overflow-y-auto">
        <PlaceholderComponent title="CCLI Settings & Reporting" />
      </main>
    </>
  );
}
