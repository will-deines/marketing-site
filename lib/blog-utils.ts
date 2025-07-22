import postsData from "@/data/posts.json"

export type Post = {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  vertical: string[]
  funnel: string
  persona: string[]
  hero: string
  readingTime: number
}

export type PostContent = {
  title: string
  slug: string
  excerpt: string
  publishDate: string
  vertical: string[]
  persona: string[]
  funnel: string
  readingTime: number
  author: string
  hero: string
  ogImage: string
  canonical: string
  content: {
    intro: string
    sections: {
      h2: string
      body: string
    }[]
    cta: {
      text: string
      href: string
    }
  }
}

export const funnelLabels: Record<string, string> = {
  awareness: "Guides",
  consideration: "Playbooks",
  decision: "Success Stories",
  retention: "Product Updates",
}

export const verticalLabels: Record<string, string> = {
  fashion: "Fashion",
  beauty: "Beauty",
  electronics: "Electronics",
  saas: "SaaS",
  ecommerce: "E-commerce",
}

export const posts: Post[] = postsData

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function getFilteredPosts({
  vertical = [],
  funnel = "",
  minReadingTime = 0,
  maxReadingTime = 100,
  page = 1,
  limit = 9,
}: {
  vertical?: string[]
  funnel?: string
  minReadingTime?: number
  maxReadingTime?: number
  page?: number
  limit?: number
}): {
  posts: Post[]
  total: number
  hasMore: boolean
} {
  let filteredPosts = [...posts]

  // Filter by vertical
  if (vertical.length > 0) {
    filteredPosts = filteredPosts.filter((post) => post.vertical.some((v) => vertical.includes(v)))
  }

  // Filter by funnel
  if (funnel) {
    filteredPosts = filteredPosts.filter((post) => post.funnel === funnel)
  }

  // Filter by reading time
  filteredPosts = filteredPosts.filter(
    (post) => post.readingTime >= minReadingTime && post.readingTime <= maxReadingTime,
  )

  // Sort by publish date (newest first)
  filteredPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  // Paginate
  const startIndex = (page - 1) * limit
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit)

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    hasMore: startIndex + limit < filteredPosts.length,
  }
}

export function getFeaturedPost(vertical: string[] = []): Post | null {
  let candidatePosts = [...posts]

  // Filter by vertical if provided
  if (vertical.length > 0) {
    candidatePosts = candidatePosts.filter((post) => post.vertical.some((v) => vertical.includes(v)))
  }

  // Sort by publish date (newest first)
  candidatePosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  // Return the most recent post or null if no posts match
  return candidatePosts.length > 0 ? candidatePosts[0] : null
}

export function getRelatedPosts(currentSlug: string, count = 3): Post[] {
  const currentPost = posts.find((post) => post.slug === currentSlug)

  if (!currentPost) return []

  // Find posts with similar vertical or funnel
  const relatedPosts = posts.filter(
    (post) =>
      post.slug !== currentSlug &&
      (post.vertical.some((v) => currentPost.vertical.includes(v)) || post.funnel === currentPost.funnel),
  )

  // Sort by publish date (newest first)
  relatedPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  // Return the top N related posts
  return relatedPosts.slice(0, count)
}

export async function getPostBySlug(slug: string): Promise<PostContent | null> {
  try {
    // In a real implementation, this would fetch from an API or file system
    // For this example, we'll simulate fetching the post content
    const post = await import(`@/data/posts/${slug}.json`).then((module) => module.default)
    return post as PostContent
  } catch (error) {
    console.error(`Failed to load post with slug: ${slug}`, error)
    return null
  }
}

export function getAllVerticals(): string[] {
  const allVerticals = new Set<string>()

  posts.forEach((post) => {
    post.vertical.forEach((v) => allVerticals.add(v))
  })

  return Array.from(allVerticals)
}

export function generateStructuredData(posts: Post[]) {
  const itemListElements = posts.slice(0, 10).map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://garrio.ai/blog/${post.slug}`,
    name: post.title,
    image: `https://garrio.ai${post.hero}`,
  }))

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: itemListElements,
  }
}

export function getPosts({ limit = 3, vertical = "all" }: { limit?: number; vertical?: string | string[] }): Post[] {
  let filteredPosts = [...posts]

  // Filter by vertical if provided and not 'all'
  if (vertical !== "all") {
    const verticals = Array.isArray(vertical) ? vertical : [vertical]
    filteredPosts = filteredPosts.filter((post) => post.vertical.some((v) => verticals.includes(v)))
  }

  // Sort by publish date (newest first)
  filteredPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  // Return the top N posts
  return filteredPosts.slice(0, limit)
}
