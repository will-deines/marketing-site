"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/blog-utils"
import type { Post } from "@/lib/blog-utils"

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const formattedDate = formatDate(post.publishDate)

  return (
    <div className="mb-12">
      <div className="text-sm font-medium text-purple-600 mb-2">Featured</div>
      <Link
        href={`/blog/${post.slug}`}
        className="block group"
        onClick={() => {
          if (typeof window !== "undefined") {
            console.log("Analytics event: blog_card_click", {
              slug: post.slug,
              positionIndex: "featured",
            })
          }
        }}
      >
        <div className="relative rounded-xl overflow-hidden h-[360px]">
          <Image
            src={post.hero || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/55"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-purple-200 transition-colors">
              {post.title}
            </h2>
            <p className="text-white/90 mb-4 max-w-2xl">{post.excerpt}</p>
            <div className="flex items-center text-sm text-white/80">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
