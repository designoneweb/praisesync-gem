'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-navy mb-4">Something went wrong!</h2>
      <button
        onClick={reset}
        className="bg-gold text-navy font-semibold py-2 px-4 rounded-lg shadow hover:bg-opacity-90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
