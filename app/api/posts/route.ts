import { NextResponse } from 'next/server'
import { posts } from '@/data/posts'

export async function GET() {
  return NextResponse.json({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'Article',
      position: index + 1,
      name: post.title,
      datePublished: post.date,
      description: post.excerpt,
    })),
    posts,
  })
}
