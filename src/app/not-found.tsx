import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-navy mb-4">404</h2>
      <p className="text-lg text-gray-600 mb-6">Page not found</p>
      <Link
        href="/"
        className="bg-gold text-navy font-semibold py-2 px-4 rounded-lg shadow hover:bg-opacity-90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
