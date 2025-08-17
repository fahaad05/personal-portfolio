"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <div className="min-h-[100svh] bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0" />
      <div className="relative flex h-[100svh] flex-col items-center justify-center gap-4 px-6">
        <p className="text-zinc-200">Something went wrong.</p>
        <button
          onClick={reset}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-zinc-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-zinc-500/40"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
