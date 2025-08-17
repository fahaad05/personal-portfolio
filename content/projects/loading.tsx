export default function ProjectsLoading() {
  return (
    <div className="relative min-h-[100svh] bg-black">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0" />
      <div className="relative px-6 pt-20 mx-auto max-w-7xl lg:px-8 md:pt-24 lg:pt-32 pb-16">
        <div className="max-w-2xl mx-auto lg:mx-0 mb-8">
          <div className="h-7 w-40 rounded bg-white/10" />
          <div className="mt-3 h-4 w-72 rounded bg-white/5" />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="h-5 w-28 rounded bg-white/10 mb-4" />
              <div className="h-8 w-3/4 rounded bg-white/10 mb-3" />
              <div className="h-4 w-full rounded bg-white/5 mb-2" />
              <div className="h-4 w-2/3 rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
