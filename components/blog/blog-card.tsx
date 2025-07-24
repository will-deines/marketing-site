"use client"

import { ArrowRight, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:transform hover:scale-[1.02] h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.hero || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover arrow */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ArrowRight className="w-5 h-5 text-purple-600" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category pill */}
          {post.vertical && (
            <div className="inline-flex mb-3">
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full">
                {post.verticalLabels?.[post.vertical] || post.vertical}
              </span>
            </div>
          )}

          <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
          
          {/* Meta info */}
          <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min</span>
              </div>
            </div>
            
            <div className="text-purple-600 font-medium group-hover:text-indigo-600 transition-colors">
              Read more
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
