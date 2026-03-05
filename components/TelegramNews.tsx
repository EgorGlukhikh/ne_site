'use client'

import { useEffect, useState } from 'react'
import type { TgPost } from '@/lib/telegramFeed'

type Props = {
  posts: TgPost[]
  channelUrl: string
}

export default function TelegramNews({ posts, channelUrl }: Props) {
  const [openPost, setOpenPost] = useState<TgPost | null>(null)

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpenPost(null)
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  return (
    <section className="card space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="h2">Новости из Telegram</h2>
        <a className="btn-ghost" href={channelUrl} target="_blank" rel="noreferrer">Открыть канал</a>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, idx) => (
            <article key={post.link + idx} className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-4">
              {post.media ? (
                <img
                  src={post.media}
                  alt={post.title || 'Пост Telegram'}
                  className="mb-3 h-40 w-full rounded-lg object-cover"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : null}
              <p className="text-sm font-semibold leading-snug text-zinc-900">{post.title || 'Пост из Telegram'}</p>
              {post.text ? <p className="mt-2 text-sm text-zinc-600">{post.text}</p> : null}
              <div className="mt-3 flex items-center justify-between pt-2">
                <p className="text-xs text-zinc-500">{post.date || 'Telegram'}</p>
                <button className="btn-ghost" onClick={() => setOpenPost(post)}>
                  Читать
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600">
          Пока не удалось получить посты автоматически. Проверьте, что канал публичный и доступен без ограничений. После этого лента подтянется сама (проверка каждые ~15 минут).
        </div>
      )}

      {openPost && (
        <div className="fixed inset-0 z-50" onClick={() => setOpenPost(null)}>
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute left-1/2 top-1/2 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold">{openPost.title || 'Пост из Telegram'}</h3>
            {openPost.media ? (
              <img
                src={openPost.media}
                alt={openPost.title || 'Пост Telegram'}
                className="mt-3 h-52 w-full rounded-xl object-cover"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : null}
            {openPost.text ? <p className="mt-3 text-zinc-700 leading-relaxed">{openPost.text}</p> : null}
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="btn-primary" href={openPost.link} target="_blank" rel="noreferrer">Открыть пост в Telegram</a>
              <button className="btn-ghost" onClick={() => setOpenPost(null)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
