'use client'

import { useEffect, useState } from 'react'
import JsonLd from '@/components/JsonLd'
import { projects } from '@/data/projects'
import { SparkIcon } from '@/components/Icons'

type Project = (typeof projects)[number]

const images = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop',
  '/photos/IMG_0983.png',
]

export default function ProjectsPage() {
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  return (
    <main className="container-page space-y-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Проекты Егора',
          description: 'POLEZNO, АНО «Дома лучше», AI-офис',
        }}
      />

      <section className="space-y-3">
        <h1 className="h1">Проекты</h1>
        <p className="p-muted max-w-2xl">
          Три направления, где соединяются стратегия, технология и реальная польза.
        </p>
      </section>

      <div className="grid gap-6">
        {projects.map((p, i) => (
          <article key={p.slug} className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="grid lg:grid-cols-12">
              <img
                src={images[i % images.length]}
                alt={p.title}
                className="h-full min-h-[220px] w-full object-cover lg:col-span-4"
              />
              <div className="space-y-5 p-6 lg:col-span-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-red-600">
                  <SparkIcon className="h-4 w-4" />
                  <span>{p.type}</span>
                </div>
                <h2 className="h2 text-[1.75rem] sm:text-3xl">{p.title}</h2>
                <p className="p-base">{p.short}</p>

                <ul className="grid gap-2 text-sm text-zinc-700 md:grid-cols-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="rounded-lg bg-zinc-50 px-3 py-2">
                      {b}
                    </li>
                  ))}
                </ul>

                <button className="btn-ghost" onClick={() => setActive(p)}>
                  Открыть детали
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-red-600">{active.type}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">{active.title}</h3>
              </div>
              <button className="rounded-lg border border-zinc-300 px-3 py-1.5" onClick={() => setActive(null)}>
                Закрыть
              </button>
            </div>
            <p className="p-base">{active.description}</p>
            <p className="mt-3 p-muted">{active.fullText}</p>
          </div>
        </div>
      )}
    </main>
  )
}
