import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface MDXPost {
  slug: string
  title: string
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
  content: string
}

export interface PostContent {
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

const postsDirectory = path.join(process.cwd(), 'content/blog')

export async function getMDXPost(slug: string): Promise<MDXPost | null> {
  try {
    // Try different possible filenames
    const possibleFiles = [
      `${slug}.mdx`,
      // Add mappings for the files we created
      ...(slug === 'the-instagram-generation-expects-instant-answers-meeting-modern-support-expectations' ? ['the-instagram-generation-expects-instant-answers.mdx'] : []),
      ...(slug === 'small-team-big-impact-customer-support-strategies-for-lean-dtc-operations' ? ['small-team-big-impact.mdx'] : []),
      ...(slug === 'from-side-hustle-to-1m-how-dtc-founders-scale-customer-support' ? ['from-side-hustle-to-1m.mdx'] : []),
      ...(slug === 'bootstrap-friendly-support-building-customer-love-on-a-tight-budget' ? ['bootstrap-friendly-support.mdx'] : []),
      ...(slug === 'black-friday-survival-how-dtc-brands-handle-10x-support-volume' ? ['black-friday-survival.mdx'] : []),
      ...(slug === 'why-fashion-brands-need-industry-specific-ai-not-generic-chatbots' ? ['why-fashion-brands-need-ai.mdx'] : []),
      ...(slug === 'turning-customer-support-into-your-secret-revenue-driver' ? ['turning-customer-support-revenue-driver.mdx'] : []),
      ...(slug === 'the-real-cost-of-poor-customer-support-for-dtc-brands' ? ['real-cost-poor-support.mdx'] : []),
      ...(slug === 'the-female-founders-guide-to-scaling-customer-support-without-burning-out' ? ['female-founders-guide.mdx'] : []),
      ...(slug === 'the-complete-shopify-seo-guide-2025-optimize-your-store-for-rankings' ? ['shopify-seo-guide.mdx'] : []),
    ]

    let fullPath: string | null = null
    let fileName: string | null = null

    for (const file of possibleFiles) {
      const testPath = path.join(postsDirectory, file)
      if (fs.existsSync(testPath)) {
        fullPath = testPath
        fileName = file
        break
      }
    }

    if (!fullPath || !fileName) {
      console.log(`MDX file not found for slug: ${slug}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: data.slug || slug,
      title: data.title,
      excerpt: data.excerpt,
      publishDate: data.publishDate,
      vertical: data.vertical || [],
      persona: data.persona || [],
      funnel: data.funnel,
      readingTime: data.readingTime,
      author: data.author,
      hero: data.hero,
      ogImage: data.ogImage,
      canonical: data.canonical,
      content
    }
  } catch (error) {
    console.error(`Error reading MDX file for slug ${slug}:`, error)
    return null
  }
}

export async function convertMDXToPostContent(slug: string): Promise<PostContent | null> {
  const mdxPost = await getMDXPost(slug)
  
  if (!mdxPost) {
    return null
  }

  // For MDX posts, we'll render the entire content as the intro
  // and create a single section for the main content
  // This is a simplified approach - you might want to parse the content differently
  const content = {
    intro: mdxPost.content,
    sections: [] as { h2: string; body: string }[],
    cta: {
      text: "Learn More",
      href: "https://apps.shopify.com/garrio"
    }
  }

  return {
    title: mdxPost.title,
    slug: mdxPost.slug,
    excerpt: mdxPost.excerpt,
    publishDate: mdxPost.publishDate,
    vertical: mdxPost.vertical,
    persona: mdxPost.persona,
    funnel: mdxPost.funnel,
    readingTime: mdxPost.readingTime,
    author: mdxPost.author,
    hero: mdxPost.hero,
    ogImage: mdxPost.ogImage,
    canonical: mdxPost.canonical,
    content
  }
}

// Simple Post interface for blog listing (matching the existing blog-utils interface)
export interface Post {
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

export async function getAllMDXPosts(): Promise<Post[]> {
  // List of our MDX blog posts with their slug mappings
  const mdxPostSlugs = [
    'the-instagram-generation-expects-instant-answers-meeting-modern-support-expectations',
    'small-team-big-impact-customer-support-strategies-for-lean-dtc-operations',
    'from-side-hustle-to-1m-how-dtc-founders-scale-customer-support',
    'bootstrap-friendly-support-building-customer-love-on-a-tight-budget',
    'black-friday-survival-how-dtc-brands-handle-10x-support-volume',
    'why-fashion-brands-need-industry-specific-ai-not-generic-chatbots',
    'turning-customer-support-into-your-secret-revenue-driver',
    'the-real-cost-of-poor-customer-support-for-dtc-brands',
    'the-female-founders-guide-to-scaling-customer-support-without-burning-out',
    'the-complete-shopify-seo-guide-2025-optimize-your-store-for-rankings'
  ]

  const posts: Post[] = []

  for (const slug of mdxPostSlugs) {
    try {
      const mdxPost = await getMDXPost(slug)
      if (mdxPost) {
        posts.push({
          slug: mdxPost.slug,
          title: mdxPost.title,
          excerpt: mdxPost.excerpt,
          publishDate: mdxPost.publishDate,
          vertical: mdxPost.vertical,
          funnel: mdxPost.funnel,
          persona: mdxPost.persona,
          hero: mdxPost.hero,
          readingTime: mdxPost.readingTime
        })
      }
    } catch (error) {
      console.error(`Error loading MDX post ${slug}:`, error)
    }
  }

  // Sort by publish date (newest first)
  posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  return posts
}

// Utility functions for filtering posts (similar to blog-utils but work with any posts array)
export function getFilteredPostsFromArray(
  posts: Post[],
  {
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
  }
): {
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

export function getFeaturedPostFromArray(posts: Post[], vertical: string[] = []): Post | null {
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