import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '../components/mdx';
import { Navigation } from '../components/nav';

export const revalidate = 60

export default function ProfilePage() {
  const page = allPages.find((p) => p.slug === 'profile')
  if (!page) return notFound()

  return (
    <div className="relative min-h-[100svh] bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <article className="px-6 pt-20 mx-auto max-w-3xl lg:px-8 md:pt-24 lg:pt-32 prose prose-invert prose-zinc">
        <h1 className="font-display text-3xl sm:text-4xl text-zinc-100">{page.title}</h1>
        {page.description ? (
          <p className="mt-2 text-zinc-400">{page.description}</p>
        ) : null}
        <div className="mt-8">
          <Mdx code={page.body.code} />
        </div>
      </article>
    </div>
  )
}