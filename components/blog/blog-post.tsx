import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ResponsiveImage } from "@/components/ui/responsive-image"
import { funnelLabels, verticalLabels, type PostContent } from "@/lib/blog-utils"
import { MDXRemote } from "next-mdx-remote/rsc"

interface BlogPostProps {
  post: PostContent
  formattedDate: string
}

export default function BlogPost({ post, formattedDate }: BlogPostProps) {
  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.vertical.map((v) => (
                <Link
                  key={v}
                  href={`/blog?vertical=${v}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                >
                  {verticalLabels[v] || v}
                </Link>
              ))}
              <Link
                href={`/blog?funnel=${post.funnel}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                {funnelLabels[post.funnel] || post.funnel}
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center text-gray-600 mb-6">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{post.readingTime} min read</span>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <ResponsiveImage 
              baseName={post.hero ? post.hero.replace('/covers/', '').replace('.jpg', '') : "placeholder"} 
              alt={post.title} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <MDXRemote source={post.content.intro} />

            {post.content.sections.map((section, index) => (
              <div key={index}>
                <h2>{section.h2}</h2>
                <MDXRemote source={section.body} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-purple-900 mb-3">Ready to implement these strategies?</h3>
            <p className="text-purple-800 mb-4">Start improving your customer experience today with Garrio.</p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
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
