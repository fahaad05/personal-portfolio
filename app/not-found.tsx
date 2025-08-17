import { Navigation } from "./components/nav";

export default function NotFound() {
  return (
    <div className="min-h-[100svh] bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container mx-auto max-w-[1500px] px-4 pt-32 pb-24 min-h-[100svh] flex items-center justify-center">
        <h1 className="py-20 text-2xl text-center font-semibold text-zinc-200">
          Page not found
        </h1>
      </div>
    </div>
  );
}
