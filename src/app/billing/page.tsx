import Header from '@/components/layout/Header';
import PlaceholderComponent from '@/components/ui/PlaceholderComponent';

export default function BillingPage() {
  return (
    <>
      <Header title="Billing" />
      <main className="flex-1 overflow-y-auto">
        <PlaceholderComponent title="Billing & Subscription" />
      </main>
    </>
  );
}
