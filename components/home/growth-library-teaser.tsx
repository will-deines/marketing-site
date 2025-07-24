"use client"

import { BookOpen, TrendingUp, ArrowRight, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import { getPosts, formatDate, verticalLabels, type Post } from "@/lib/blog-utils"

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
    <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Growth Library
          </div>
          <h2 id="growth-library-heading" className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Learn from brands that 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">made it work</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Actionable playbooks from founders who've scaled past $1M. Skip the theory—get the 
            exact strategies that actually move the needle.
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
                className={`group block ${
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
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px] overflow-hidden border border-gray-100">
                  <div className="relative">
                    <Image
                      src={post.hero || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={338}
                      className="aspect-[16/9] object-cover w-full"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
                        {verticalLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-indigo-100 p-1.5 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{formatDate(post.publishDate)}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold leading-tight mb-3 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>Founder Insights</span>
                      </div>
                      <div className="text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Read Story
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur rounded-2xl border border-indigo-100 p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Ready for more insights?</h3>
                <p className="text-gray-600">Explore our complete growth library</p>
              </div>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 group"
              onClick={trackCtaClick}
            >
              Browse All Stories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
