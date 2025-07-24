"use client"

import { useCallback } from "react"

import BlogCard from "@/components/blog/blog-card"
import type { Post } from "@/lib/blog-utils"

interface BlogGridProps {
  posts: Post[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  // Track card clicks
  const trackCardClick = useCallback((slug: string, index: number) => {
    if (typeof window !== "undefined") {
      console.log("Analytics event: blog_card_click", {
        slug,
        positionIndex: index,
      })
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <div 
          key={post.slug} 
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
        >
          <BlogCard post={post} onClick={() => trackCardClick(post.slug, index)} />
        </div>
      ))}
    </div>
  )
}
