"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import BlogHero from "@/components/blog/blog-hero"
import BlogFilters from "@/components/blog/blog-filters"
import BlogGrid from "@/components/blog/blog-grid"
import FeaturedPost from "@/components/blog/featured-post"
import CtaRail from "@/components/blog/cta-rail"
import EmptyState from "@/components/blog/empty-state"
import { getFilteredPosts, getFeaturedPost, funnelLabels, verticalLabels, type Post } from "@/lib/blog-utils"

interface BlogIndexProps {
  initialVertical: string[]
  initialFunnel?: string
  initialMinReadingTime: number
  initialMaxReadingTime: number
  initialPage: number
  allVerticals: string[]
}

export default function BlogIndex({
  initialVertical,
  initialFunnel,
  initialMinReadingTime,
  initialMaxReadingTime,
  initialPage,
  allVerticals,
}: BlogIndexProps) {
  // State for filters
  const [vertical, setVertical] = useState<string[]>(initialVertical)
  const [funnel, setFunnel] = useState<string | undefined>(initialFunnel)
  const [minReadingTime, setMinReadingTime] = useState(initialMinReadingTime)
  const [maxReadingTime, setMaxReadingTime] = useState(initialMaxReadingTime)
  const [page, setPage] = useState(initialPage)

  // State for posts
  const [posts, setPosts] = useState<Post[]>([])
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null)
  const [, setTotalPosts] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Refs for infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Router for updating URL
  const router = useRouter()
  // const searchParams = useSearchParams()

  // Load posts based on filters
  const loadPosts = useCallback(
    (reset = false) => {
      setIsLoading(true)

      // Get filtered posts
      const currentPage = reset ? 1 : page
      const {
        posts: filteredPosts,
        total,
        hasMore: moreAvailable,
      } = getFilteredPosts({
        vertical,
        funnel,
        minReadingTime,
        maxReadingTime,
        page: currentPage,
        limit: 9,
      })

      // Update state
      if (reset) {
        setPosts(filteredPosts)
        setPage(1)
      } else {
        setPosts((prev) => [...prev, ...filteredPosts])
      }

      setTotalPosts(total)
      setHasMore(moreAvailable)
      setIsLoading(false)

      // Track filter application
      if (reset && typeof window !== "undefined") {
        console.log("Analytics event: blog_filter_apply", {
          vertical,
          funnel,
          countResults: total,
        })
      }
    },
    [vertical, funnel, minReadingTime, maxReadingTime, page],
  )

  // Load featured post
  const loadFeaturedPost = useCallback(() => {
    const featured = getFeaturedPost(vertical)
    setFeaturedPost(featured)
  }, [vertical])

  // Update URL with filters
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams()

    if (vertical.length > 0) {
      vertical.forEach((v) => params.append("vertical", v))
    }

    if (funnel) {
      params.set("funnel", funnel)
    }

    if (minReadingTime > 0) {
      params.set("minReadingTime", minReadingTime.toString())
    }

    if (maxReadingTime < 100) {
      params.set("maxReadingTime", maxReadingTime.toString())
    }

    if (page > 1) {
      params.set("page", page.toString())
    }

    const newUrl = params.toString() ? `/blog?${params.toString()}` : "/blog"
    router.push(newUrl, { scroll: false })
  }, [vertical, funnel, minReadingTime, maxReadingTime, page, router])

  // Set up infinite scroll
  useEffect(() => {
    if (!hasMore || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoading])

  // Load posts when page changes
  useEffect(() => {
    loadPosts(false)
  }, [page, loadPosts])

  // Load posts and featured post when filters change
  useEffect(() => {
    loadPosts(true)
    loadFeaturedPost()
    updateUrl()
  }, [vertical, funnel, minReadingTime, maxReadingTime, loadPosts, loadFeaturedPost, updateUrl])

  // Apply filters
  const applyFilters = (
    newVertical: string[],
    newFunnel: string | undefined,
    newMinReadingTime: number,
    newMaxReadingTime: number,
  ) => {
    setVertical(newVertical)
    setFunnel(newFunnel)
    setMinReadingTime(newMinReadingTime)
    setMaxReadingTime(newMaxReadingTime)
  }

  // Track scroll depth
  useEffect(() => {
    if (typeof window === "undefined") return

    const trackScrollDepth = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100

      const depths = [25, 50, 75]
      depths.forEach((depth) => {
        if (scrollPercent >= depth && !sessionStorage.getItem(`scrolled_${depth}`)) {
          console.log("Analytics event: blog_scroll_depth", { depth: `${depth}%` })
          sessionStorage.setItem(`scrolled_${depth}`, "true")
        }
      })
    }

    window.addEventListener("scroll", trackScrollDepth)
    return () => window.removeEventListener("scroll", trackScrollDepth)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <BlogHero
        vertical={vertical}
        setVertical={setVertical}
        allVerticals={allVerticals}
        verticalLabels={verticalLabels}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-24">
              {/* Filters */}
              <BlogFilters
                vertical={vertical}
                funnel={funnel}
                minReadingTime={minReadingTime}
                maxReadingTime={maxReadingTime}
                applyFilters={applyFilters}
                allVerticals={allVerticals}
                verticalLabels={verticalLabels}
                funnelLabels={funnelLabels}
              />

              {/* CTA Rail */}
              <div className="mt-8">
                <CtaRail />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Post */}
            {featuredPost && posts.length > 0 && (
              <div className="mb-12">
                <FeaturedPost post={featuredPost} />
              </div>
            )}

            {/* Blog Grid */}
            {posts.length > 0 ? <BlogGrid posts={posts} /> : <EmptyState />}

            {/* Load More Trigger */}
            {hasMore && (
              <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
                {isLoading && <div className="loader">Loading...</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
