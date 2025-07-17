"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/blog-utils"
import type { Post } from "@/lib/blog-utils"

interface BlogCardProps {
  post: Post
  onClick: () => void
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  const formattedDate = formatDate(post.publishDate)

  return (
    <Link href={`/blog/${post.slug}`} onClick={onClick} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-md h-full flex flex-col">
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
          <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-1">{post.excerpt}</p>
          <div className="mt-auto flex items-center text-sm text-gray-500">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
