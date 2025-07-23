"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/blog-utils"
import type { Post } from "@/lib/blog-utils"
import { Star, ArrowRight, Clock, Calendar } from "lucide-react"

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const formattedDate = formatDate(post.publishDate)

  return (
    <div className="mb-16">
      {/* Featured badge */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
          <Star className="w-4 h-4 fill-current" />
          Featured Insight
        </div>
      </div>

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
        <div className="relative rounded-3xl overflow-hidden h-[480px] bg-white/90 backdrop-blur-sm border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] hover:transform hover:scale-[1.02]">
          <Image
            src={post.hero || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            priority
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-indigo-900/20"></div>

          {/* Hover arrow */}
          <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <ArrowRight className="w-6 h-6 text-purple-600" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            {/* Category */}
            {post.vertical && (
              <div className="inline-flex mb-4">
                <span className="px-4 py-2 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/20">
                  {post.verticalLabels?.[post.vertical] || post.vertical}
                </span>
              </div>
            )}

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-indigo-200 transition-all duration-500">
              {post.title}
            </h2>
            
            <p className="text-white/90 text-lg mb-6 max-w-3xl leading-relaxed">{post.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-white font-semibold group-hover:text-purple-200 transition-colors">
                <span>Read Full Insight</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
