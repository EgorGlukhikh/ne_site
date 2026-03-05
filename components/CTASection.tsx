import { profile } from '@/data/profile'

export default function CTASection() {
  return (
    <section className="container-page pt-0">
      <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="h2">Обсудим вашу задачу</h2>
          <p className="p-muted mt-1">Коротко разберём цель, формат и следующий шаг.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a href={profile.contacts.telegramUrl} target="_blank" rel="noreferrer" className="btn-primary">
            Написать в Telegram
          </a>
          <a href={`mailto:${profile.contacts.email}`} className="btn-ghost">
            {profile.contacts.email}
          </a>
        </div>
      </div>
    </section>
  )
}
