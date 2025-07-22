import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { BlogCTARail } from "@/components/blog/cta-rail"
import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from 'react-markdown'

interface SimpleBlogPostProps {
  title: string
  subtitle: string
  author: string
  publishedAt: string
  readingTime: string
  tags: string[]
  content: string
  heroImage?: string
}

export function SimpleBlogPost({
  title,
  subtitle,
  author,
  publishedAt,
  readingTime,
  tags,
  content,
  heroImage
}: SimpleBlogPostProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {title}
                </h1>
                
                {subtitle && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {subtitle}
                  </p>
                )}

                <div className="flex items-center text-gray-600 mb-8">
                  <span>{formattedDate}</span>
                  <span className="mx-2">•</span>
                  <span>{readingTime}</span>
                  <span className="mx-2">•</span>
                  <span>By {author}</span>
                </div>
              </header>

              {/* Hero Image */}
              {heroImage && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
                  <Image 
                    src={heroImage} 
                    alt={title} 
                    fill 
                    className="object-cover" 
                    priority 
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg prose-purple max-w-none mb-12">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>

              {/* CTA */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-900 mb-3">
                    Ready to implement these strategies?
                  </h3>
                  <p className="text-purple-800 mb-6 text-lg">
                    Start improving your customer experience today with Garrio&apos;s industry-specific AI.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                      <Link href="/contact" rel="noopener noreferrer">
                        Get Started Free
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50" asChild>
                      <Link href="/features" rel="noopener noreferrer">
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </article>
        
        {/* CTA Rail */}
        <BlogCTARail />
      </main>
    </div>
  )
}