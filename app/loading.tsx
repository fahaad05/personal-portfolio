export default function Loading() {
  return (
    <div className="min-h-[100svh] bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0" />
      <div className="relative flex h-[100svh] items-center justify-center">
        <div className="h-6 w-6 animate-pulse rounded-full bg-white/40" />
      </div>
    </div>
  );
}