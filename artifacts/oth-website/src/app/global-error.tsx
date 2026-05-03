"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-navy text-white flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-4xl font-black uppercase text-gold mb-4">Something went wrong</h2>
          <button
            onClick={() => reset()}
            className="border-2 border-gold px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-gold hover:text-navy transition-all"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
