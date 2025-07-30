"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface BlogLayoutProps {
  children: React.ReactNode
  title: string
}

export default function BlogLayout({ children, title }: BlogLayoutProps) {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Generate table of contents from headings
    const headings = document.querySelectorAll("article h2, article h3")
    const items: TOCItem[] = []
    
    headings.forEach((heading) => {
      const id = heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      heading.id = id
      items.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      })
    })
    
    setToc(items)

    // Set up intersection observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  return (
    <div className="relative">
      {/* Desktop Table of Contents */}
      <aside className="hidden xl:block fixed left-[calc(50%-40rem)] top-32 w-64">
        <div className="sticky top-32">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">On this page</h4>
          <nav className="space-y-2">
            {toc.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block text-sm transition-colors duration-200",
                  item.level === 3 && "ml-4",
                  activeId === item.id
                    ? "text-purple-600 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="xl:pr-64">{children}</div>

      {/* Mobile Table of Contents */}
      <div className="xl:hidden">
        <details className="mt-8 mb-4 p-4 bg-gray-50 rounded-lg">
          <summary className="text-sm font-semibold text-gray-900 cursor-pointer">
            Table of Contents
          </summary>
          <nav className="mt-4 space-y-2">
            {toc.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block text-sm text-gray-600 hover:text-gray-900 transition-colors",
                  item.level === 3 && "ml-4"
                )}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </div>
  )
}