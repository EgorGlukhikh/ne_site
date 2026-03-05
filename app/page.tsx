import JsonLd from '@/components/JsonLd'
import Reveal from '@/components/Reveal'
import LeadForm from '@/components/LeadForm'
import { SparkIcon, SkillIcon } from '@/components/Icons'
import { profile } from '@/data/profile'
import { getTelegramPosts } from '@/lib/telegramFeed'
import TelegramNews from '@/components/TelegramNews'

const results = [
  {
    title: 'Скорость релизов',
    text: 'От идеи до выкладки — короткими спринтами, без провалов в коммуникации.',
  },
  {
    title: 'Прозрачный процесс',
    text: 'Понятные статусы по этапам: что сделано, что в работе, что следующим шагом.',
  },
  {
    title: 'Стабильное качество',
    text: 'Техничка, контент и финальная проверка собираются в единый управляемый поток.',
  },
]

export default async function HomePage() {
  const { posts, channelUrl } = await getTelegramPosts(4)

  return (
    <main className="container-page space-y-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          jobTitle: profile.role,
          description: profile.summary,
        }}
      />

      <Reveal>
        <section className="card grid gap-5 md:grid-cols-5 md:items-center">
          <img
            src="/photos/hero-egor.jpg"
            alt="Егор Глухих"
            className="h-56 w-full rounded-2xl object-contain bg-zinc-100 p-2 dark:bg-zinc-900 md:col-span-2 md:h-72"
          />
          <div className="md:col-span-3">
            <div className="mb-4 flex items-center gap-3">
              <span className="icon-chip"><SparkIcon className="h-5 w-5" /></span>
              <p className="text-sm uppercase tracking-widest text-accent">Личный сайт</p>
            </div>
            <h1 className="h1">{profile.name}</h1>
            <p className="p-base mt-4 max-w-3xl">{profile.summary}</p>
          </div>
        </section>
      </Reveal>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.skills.map((skill, i) => (
          <Reveal key={skill} delay={i * 70}>
            <div className="card h-full transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-3 inline-flex p-0 text-red-600 dark:text-red-500">
                <SkillIcon className="h-5 w-5" />
              </div>
              <p className="font-medium">{skill}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <section className="space-y-4">
          <h2 className="h2">Результаты и кейсы</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {results.map((item) => (
              <article key={item.title} className="card">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="p-muted mt-2">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <TelegramNews posts={posts} channelUrl={channelUrl} />
      </Reveal>

      <Reveal>
        <LeadForm />
      </Reveal>
    </main>
  )
}
