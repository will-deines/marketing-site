import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import BlogPost from '@/components/blog/blog-post-enhanced'
import { getPostBySlug, formatDate } from '@/lib/blog-utils'

export const metadata: Metadata = {
  title: 'The Hidden Time Drain: How Much Customer Support Really Costs DTC Founders | Garrio',
  description: 'Discover the real time cost of customer support for DTC founders. Learn how support consumes 25+ hours weekly, the opportunity cost of founder time, and what successful brands do with reclaimed hours.',
  openGraph: {
    title: 'The Hidden Time Drain: How Much Customer Support Really Costs DTC Founders',
    description: 'The real time cost of customer support for DTC founders and opportunity cost analysis',
    type: 'article',
  },
}

export default async function BlogPostPage() {
  const post = await getPostBySlug('the-hidden-time-drain-how-much-customer-support-really-costs-dtc-founders')
  
  if (!post) {
    notFound()
  }

  const formattedDate = formatDate(post.publishDate)

  return <BlogPost post={post} formattedDate={formattedDate} />
}