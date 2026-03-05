'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  ['/', 'Главная'],
  ['/about', 'Обо мне'],
  ['/projects', 'Проекты'],
  ['/ai-profile', 'AI-профиль'],
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 text-zinc-900 backdrop-blur supports-[backdrop-filter]:bg-white/85 dark:border-zinc-800 dark:bg-zinc-950/85 dark:text-zinc-100">
      <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">EGOR.SITE</span>

        <div className="hidden items-center gap-6 text-sm lg:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="link-hover whitespace-nowrap text-zinc-700 dark:text-zinc-200">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 lg:hidden dark:border-zinc-700 dark:text-zinc-100"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/35" />
          <aside
            className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white px-6 pb-8 pt-6 shadow-2xl dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider">Навигация</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Выберите раздел</p>
              </div>
              <button
                aria-label="Закрыть меню"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 text-base">
              {links.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg px-2 py-1.5 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">Обычно отвечаю в течение дня.</p>
          </aside>
        </div>
      )}
    </header>
  )
}
