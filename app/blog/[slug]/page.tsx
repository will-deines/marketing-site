import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts, formatDate } from "@/lib/blog-utils"
import Header from "@/components/header"
import BlogPost from "@/components/blog/blog-post"
import RelatedPosts from "@/components/blog/related-posts"
import Footer from "@/components/footer"

// Generate static params for all posts
export async function generateStaticParams() {
  // In a real implementation, this would fetch all post slugs
  // For this example, we'll just use the one post we have
  return [{ slug: "fashion-chat-response-playbook" }]
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The post you're looking for doesn&apos;t exist.",
    }
  }

  return {
    title: `${post.title} | Garrio Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://garrio.ai/blog/${post.slug}`,
      siteName: "Garrio",
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
    },
    alternates: {
      canonical: post.canonical,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, 3)
  const formattedDate = formatDate(post.publishDate)

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [`https://garrio.ai${post.hero}`],
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Garrio",
      logo: {
        "@type": "ImageObject",
        url: "https://garrio.ai/logo.png",
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://garrio.ai/blog/${post.slug}`,
    },
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="flex min-h-screen flex-col">
        <Header variant="solid" />
        <main className="flex-1">
          <BlogPost post={post} formattedDate={formattedDate} />

          <RelatedPosts posts={relatedPosts} />
        </main>
        <Footer />
      </div>
    </>
  )
}
