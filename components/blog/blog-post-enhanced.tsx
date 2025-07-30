import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"

import { Button } from "@/components/ui/button"
import { ResponsiveImage } from "@/components/ui/responsive-image"
import { funnelLabels, verticalLabels, type PostContent } from "@/lib/blog-utils"
import { mdxComponents } from "./mdx-components"

interface BlogPostProps {
  post: PostContent
  formattedDate: string
}

export default function BlogPostEnhanced({ post, formattedDate }: BlogPostProps) {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="pt-16 pb-8 md:pt-24 md:pb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.vertical.map((v) => (
                <Link
                  key={v}
                  href={`/blog?vertical=${v}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-200 hover:scale-105"
                >
                  {verticalLabels[v] || v}
                </Link>
              ))}
              <Link
                href={`/blog?funnel=${post.funnel}`}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              >
                {funnelLabels[post.funnel] || post.funnel}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>By {post.author}</span>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <ResponsiveImage 
              baseName={post.hero ? post.hero.replace('/covers/', '').replace('.jpg', '') : "placeholder"} 
              alt={post.title} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-gray max-w-none mb-16">
            <div className="prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-6 prose-li:my-2 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-purple-700 prose-pre:bg-gray-900 prose-pre:text-gray-100">
              <MDXRemote source={post.content.intro} components={mdxComponents} />

              {post.content.sections.map((section, index) => (
                <section key={index} className="mt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.h2}</h2>
                  <MDXRemote source={section.body} components={mdxComponents} />
                </section>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 md:p-12 text-center shadow-xl mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to implement these strategies?
            </h3>
            <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
              Start improving your customer experience today with Garrio.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              asChild
            >
              <Link href={post.content.cta.href} target="_blank" rel="noopener noreferrer">
                {post.content.cta.text}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}