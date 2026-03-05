'use client'

import { useState } from 'react'
import { profile } from '@/data/profile'

export default function LeadForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="card border-green-200 bg-green-50">
        <h3 className="text-xl font-semibold">Заявка отправлена</h3>
        <p className="p-muted mt-2">Спасибо! Чтобы ускорить старт, напишите в Telegram и укажите, что вы с сайта.</p>
        <a href={profile.contacts.telegramUrl} target="_blank" rel="noreferrer" className="btn-primary mt-4 inline-flex">
          Перейти в Telegram
        </a>
      </div>
    )
  }

  return (
    <form
      className="card space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <h3 className="text-xl font-semibold">Оставить заявку</h3>
      <p className="p-muted">Оставьте контакт и коротко опишите задачу. Я свяжусь с вами и предложу следующий шаг.</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Ваше имя" className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-500" />
        <input required placeholder="Контакт (Telegram/Email)" className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-500" />
      </div>

      <textarea required placeholder="Коротко: какую задачу нужно решить?" rows={4} className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-500" />

      <button type="submit" className="btn-primary">Отправить заявку</button>
      <p className="text-xs text-zinc-500">После отправки вы получите быстрый следующий шаг в Telegram.</p>
    </form>
  )
}
