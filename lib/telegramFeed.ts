export type TgPost = {
  title: string
  link: string
  date?: string
  text?: string
  media?: string
}

const CHANNEL = process.env.TELEGRAM_CHANNEL || process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || 'pro_mo_e'
const CHANNEL_URL = `https://t.me/${CHANNEL}`

function decodeXml(s: string) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function stripHtml(s: string) {
  return decodeXml(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function cleanTelegramText(s: string) {
  return s
    .replace(/^\s*\[(Photo|Video|Album)\]\s*/i, '')
    .replace(/\s*\[(Photo|Video|Album)\]\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchXml(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 900 },
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`)
  return res.text()
}

function parseRss(xml: string, limit: number): TgPost[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit)
  return items.map((m) => {
    const item = m[1]
    const titleRaw =
      item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ||
      item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ||
      'Пост из Telegram'
    const title = cleanTelegramText(stripHtml(titleRaw).trim())
    const link = (item.match(/<link>([\s\S]*?)<\/link>/)?.[1] || CHANNEL_URL).trim()
    const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '').trim()
    const descRaw =
      item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
      item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ||
      ''

    const media =
      descRaw.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ||
      descRaw.match(/https?:\/\/[^\s"']+\.(?:jpg|jpeg|png|webp|gif)/i)?.[0] ||
      undefined

    const text = cleanTelegramText(stripHtml(descRaw)).slice(0, 260)
    const date = pubDate ? new Date(pubDate).toLocaleDateString('ru-RU') : undefined
    return { title, link, date, text, media }
  })
}

export async function getTelegramPosts(limit = 6): Promise<{ posts: TgPost[]; channelUrl: string }> {
  const sources = [
    `https://rsshub.app/telegram/channel/${CHANNEL}`,
    `https://tg.i-c-a.su/rss/${CHANNEL}`,
  ]

  for (const src of sources) {
    try {
      const xml = await fetchXml(src)
      const posts = parseRss(xml, limit).filter((p) => p.title || p.text)
      if (posts.length) return { posts, channelUrl: CHANNEL_URL }
    } catch {
      // try next source
    }
  }

  return { posts: [], channelUrl: CHANNEL_URL }
}
