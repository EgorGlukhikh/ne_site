import Reveal from '@/components/Reveal'
import { SparkIcon } from '@/components/Icons'

export default function AboutPage() {
  return (
    <main className="container-page space-y-6">
      <Reveal>
        <section className="grid gap-4 md:grid-cols-3">
          <img
            src="/photos/IMG_0982.png"
            alt="Егор"
            className="card h-full min-h-[260px] w-full object-cover p-0 md:col-span-1"
          />
          <div className="card space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="icon-chip"><SparkIcon className="h-5 w-5" /></span>
              <h1 className="h2">Обо мне</h1>
            </div>
            <p className="p-base">
              Я проектный архитектор и предприниматель. Собираю системы на стыке технологий,
              образования и социальных инициатив — от идеи до работающего результата.
            </p>
            <p className="p-base">
              Мой фокус: ясная структура, понятные процессы и современная коммуникация без лишнего шума.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={120}>
        <section className="grid gap-4 md:grid-cols-3">
          {['Уточняю цель', 'Упрощаю сложное', 'Запускаю MVP'].map((item) => (
            <div key={item} className="card transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </section>
      </Reveal>
    </main>
  )
}
