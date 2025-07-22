"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getPosts, formatDate, verticalLabels, type Post } from "@/lib/blog-utils"
import { useInView } from "react-intersection-observer"

export default function GrowthLibraryTeaser() {
  const [posts, setPosts] = useState<Post[]>([])
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    // In a real app, you might get the user's vertical from a cookie or user preferences
    const userVertical = "all" // Default to all if no preference is set
    setPosts(getPosts({ limit: 3, vertical: userVertical }))
  }, [])

  const trackCardClick = (slug: string, position: number) => {
    // Analytics tracking
    console.log("blog_teaser_card_click", { slug, position })
    // In a real app, you would use your analytics library here
  }

  const trackCtaClick = () => {
    // Analytics tracking
    console.log("blog_teaser_cta_click")
    // In a real app, you would use your analytics library here
  }

  return (
    <section className="bg-gray-50 py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <div className="text-center mb-12">
          <h2 id="growth-library-heading" className="text-3xl font-semibold mb-3">
            Learn from Brands That Made It
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Actionable playbooks from founders who&apos;ve grown past $1M—because you don&apos;t have time for theory.
          </p>
        </div>

        <div
          role="list"
          aria-labelledby="growth-library-heading"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, index) => {
            const verticalTag = post.vertical[0]
            const verticalLabel = verticalLabels[verticalTag] || verticalTag

            return (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className={`group bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:scale-1015 block ${
                  inView
                    ? index === 0
                      ? "animate-fade-up"
                      : index === 1
                        ? "animate-fade-up-delay-1"
                        : "animate-fade-up-delay-2"
                    : "opacity-0"
                }`}
                onClick={() => trackCardClick(post.slug, index)}
                aria-label={`Read: ${post.title}`}
                role="listitem"
              >
                <div className="relative">
                  <Image
                    src={post.hero || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={338}
                    className="rounded-t-xl aspect-[16/9] object-cover w-full"
                    priority={index === 0}
                  />
                  <span className="absolute top-3 left-3 bg-indigo-600/90 text-white text-xs px-2 py-0.5 rounded badge-slide">
                    {verticalLabel}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold leading-snug mt-1 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-400 mt-3 mb-1">
                    <span>{formatDate(post.publishDate)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-indigo-600 font-medium hover:underline"
            onClick={trackCtaClick}
          >
            Browse Growth Library
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
