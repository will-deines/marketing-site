"use client"

import Image from "next/image"
import Link from "next/link"

import { formatDate, type Post } from "@/lib/blog-utils"

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    console.log("Analytics event: blog_card_click", {
                      slug: post.slug,
                      positionIndex: "related",
                    })
                  }
                }}
              >
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.hero || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center text-sm text-gray-500">
                      <span>{formatDate(post.publishDate)}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
