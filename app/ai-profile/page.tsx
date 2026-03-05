import Reveal from '@/components/Reveal'
import { ContactIcon } from '@/components/Icons'
import { profile } from '@/data/profile'

export default function AiProfilePage() {
  return (
    <main className="container-page space-y-6">
      <Reveal>
        <section className="card space-y-4">
          <div className="flex items-center gap-3">
            <span className="icon-chip"><ContactIcon className="h-5 w-5" /></span>
            <h1 className="h2">AI-профиль</h1>
          </div>
          <p className="p-muted">Данные в машиночитаемом формате для интеграций и генеративных сценариев.</p>
          <pre className="overflow-auto rounded-xl bg-zinc-900 p-4 text-xs text-zinc-100">
{JSON.stringify(profile, null, 2)}
          </pre>
        </section>
      </Reveal>
    </main>
  )
}
