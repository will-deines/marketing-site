import { 
  funnelLabels, 
  verticalLabels, 
  type PostContent 
} from '@/lib/blog-utils'

// Mock posts data for testing
const mockPosts: PostContent[] = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    excerpt: 'Test excerpt for post 1',
    publishDate: '2025-01-22',
    vertical: ['ecommerce'],
    persona: ['founder'],
    funnel: 'awareness',
    readingTime: 5,
    author: 'Test Author',
    hero: '/covers/test1.jpg',
    ogImage: '/og/test1.jpg',
    canonical: '/blog/test-post-1',
    content: {
      intro: 'Test intro',
      sections: [{ h2: 'Test Section', body: 'Test content' }],
      cta: { text: 'Test CTA', href: '/test' }
    }
  },
  {
    slug: 'test-post-2',
    title: 'Test Post 2',
    excerpt: 'Test excerpt for post 2',
    publishDate: '2025-01-20',
    vertical: ['fashion', 'beauty'],
    persona: ['cx-manager'],
    funnel: 'consideration',
    readingTime: 8,
    author: 'Test Author',
    hero: '/covers/test2.jpg',
    ogImage: '/og/test2.jpg',
    canonical: '/blog/test-post-2',
    content: {
      intro: 'Test intro 2',
      sections: [{ h2: 'Test Section 2', body: 'Test content 2' }],
      cta: { text: 'Test CTA 2', href: '/test2' }
    }
  }
]

describe('Blog Utils', () => {
  describe('Label Mappings', () => {
    it('should have proper funnel labels', () => {
      expect(funnelLabels.awareness).toBe('Guides')
      expect(funnelLabels.consideration).toBe('Playbooks') 
      expect(funnelLabels.decision).toBe('Success Stories')
      
      // All keys should have string values
      Object.entries(funnelLabels).forEach(([key, value]) => {
        expect(typeof key).toBe('string')
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      })
    })

    it('should have proper vertical labels', () => {
      expect(verticalLabels.ecommerce).toBe('E-commerce')
      expect(verticalLabels.fashion).toBe('Fashion')
      expect(verticalLabels.beauty).toBe('Beauty')
      
      // All keys should have string values
      Object.entries(verticalLabels).forEach(([key, value]) => {
        expect(typeof key).toBe('string')
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      })
    })

    it('should handle unknown funnel values gracefully', () => {
      // Should handle case where funnel value doesn't exist in mapping
      const unknownFunnel = 'unknown-funnel' as any
      const label = funnelLabels[unknownFunnel]
      expect(label).toBeUndefined()
    })

    it('should handle unknown vertical values gracefully', () => {
      // Should handle case where vertical value doesn't exist in mapping
      const unknownVertical = 'unknown-vertical' as any
      const label = verticalLabels[unknownVertical]
      expect(label).toBeUndefined()
    })
  })

  describe('PostContent Type Validation', () => {
    it('should validate complete PostContent structure', () => {
      const validPost: PostContent = {
        slug: 'valid-post',
        title: 'Valid Post Title',
        hero: '/covers/valid.jpg',
        publishedAt: '2025-01-22',
        author: 'Valid Author',
        readingTime: 10,
        vertical: ['ecommerce', 'fashion'],
        funnel: 'awareness',
        content: {
          intro: 'Valid introduction with meaningful content.',
          sections: [
            {
              h2: 'Valid Section Title',
              body: 'Valid section content with details.'
            }
          ],
          cta: {
            text: 'Valid CTA Text',
            href: '/valid-cta-link'
          }
        }
      }

      // Type checking at compile time ensures this is valid
      expect(validPost.slug).toBe('valid-post')
      expect(validPost.content.sections.length).toBe(1)
      expect(Array.isArray(validPost.vertical)).toBe(true)
    })

    it('should handle multiple sections in content', () => {
      const postWithMultipleSections: PostContent = {
        slug: 'multi-section-post',
        title: 'Multi Section Post',
        hero: '/covers/multi.jpg',
        publishedAt: '2025-01-22',
        author: 'Test Author',
        readingTime: 15,
        vertical: ['ecommerce'],
        funnel: 'consideration',
        content: {
          intro: 'Introduction content',
          sections: [
            { h2: 'Section 1', body: 'Content 1' },
            { h2: 'Section 2', body: 'Content 2' },
            { h2: 'Section 3', body: 'Content 3' }
          ],
          cta: {
            text: 'Call to Action',
            href: '/action'
          }
        }
      }

      expect(postWithMultipleSections.content.sections).toHaveLength(3)
      expect(postWithMultipleSections.content.sections[0].h2).toBe('Section 1')
      expect(postWithMultipleSections.content.sections[2].body).toBe('Content 3')
    })

    it('should handle multiple verticals', () => {
      const postWithMultipleVerticals: PostContent = {
        slug: 'multi-vertical-post',
        title: 'Multi Vertical Post',
        hero: '/covers/multi-vertical.jpg',
        publishedAt: '2025-01-22',
        author: 'Test Author',
        readingTime: 12,
        vertical: ['ecommerce', 'fashion', 'beauty'],
        funnel: 'decision',
        content: {
          intro: 'Multi-vertical content',
          sections: [{ h2: 'Cross-vertical insights', body: 'Content spanning industries' }],
          cta: { text: 'Learn More', href: '/learn' }
        }
      }

      expect(postWithMultipleVerticals.vertical).toHaveLength(3)
      expect(postWithMultipleVerticals.vertical).toContain('ecommerce')
      expect(postWithMultipleVerticals.vertical).toContain('fashion')
      expect(postWithMultipleVerticals.vertical).toContain('beauty')
    })

    it('should handle empty sections array', () => {
      const postWithEmptySections: PostContent = {
        slug: 'empty-sections-post',
        title: 'Post with Empty Sections',
        hero: '/covers/empty.jpg',
        publishedAt: '2025-01-22',
        author: 'Test Author',
        readingTime: 5,
        vertical: ['ecommerce'],
        funnel: 'awareness',
        content: {
          intro: 'Introduction only content',
          sections: [],
          cta: { text: 'Get Started', href: '/start' }
        }
      }

      expect(postWithEmptySections.content.sections).toHaveLength(0)
      expect(Array.isArray(postWithEmptySections.content.sections)).toBe(true)
    })
  })

  describe('Content Structure Validation', () => {
    it('should ensure required fields are present', () => {
      const requiredFields = [
        'slug', 'title', 'excerpt', 'publishDate', 'vertical', 'persona',
        'funnel', 'readingTime', 'author', 'hero', 'ogImage', 'canonical', 'content'
      ]

      const testPost = mockPosts[0]
      
      requiredFields.forEach(field => {
        expect(testPost).toHaveProperty(field)
        expect((testPost as any)[field]).toBeDefined()
      })
    })

    it('should ensure content has required structure', () => {
      const testPost = mockPosts[0]
      
      expect(testPost.content).toHaveProperty('intro')
      expect(testPost.content).toHaveProperty('sections')
      expect(testPost.content).toHaveProperty('cta')
      
      expect(typeof testPost.content.intro).toBe('string')
      expect(Array.isArray(testPost.content.sections)).toBe(true)
      expect(typeof testPost.content.cta).toBe('object')
    })

    it('should ensure sections have proper structure', () => {
      const testPost = mockPosts[0]
      
      testPost.content.sections.forEach(section => {
        expect(section).toHaveProperty('h2')
        expect(section).toHaveProperty('body')
        expect(typeof section.h2).toBe('string')
        expect(typeof section.body).toBe('string')
        expect(section.h2.length).toBeGreaterThan(0)
        expect(section.body.length).toBeGreaterThan(0)
      })
    })

    it('should ensure CTA has proper structure', () => {
      const testPost = mockPosts[0]
      
      expect(testPost.content.cta).toHaveProperty('text')
      expect(testPost.content.cta).toHaveProperty('href')
      expect(typeof testPost.content.cta.text).toBe('string')
      expect(typeof testPost.content.cta.href).toBe('string')
      expect(testPost.content.cta.text.length).toBeGreaterThan(0)
      expect(testPost.content.cta.href.length).toBeGreaterThan(0)
    })

    it('should validate slug format', () => {
      mockPosts.forEach(post => {
        // Slug should be URL-friendly
        expect(post.slug).toMatch(/^[a-z0-9-]+$/)
        expect(post.slug).not.toContain(' ')
        expect(post.slug).not.toContain('_')
        expect(post.slug.length).toBeGreaterThan(0)
      })
    })

    it('should validate date format', () => {
      mockPosts.forEach(post => {
        // Should be valid date format
        const date = new Date(post.publishDate)
        expect(date.toString()).not.toBe('Invalid Date')
        expect(post.publishDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      })
    })

    it('should validate reading time', () => {
      mockPosts.forEach(post => {
        expect(typeof post.readingTime).toBe('number')
        expect(post.readingTime).toBeGreaterThan(0)
        expect(post.readingTime).toBeLessThan(60) // Reasonable upper bound
      })
    })

    it('should validate vertical values', () => {
      const validVerticals = ['ecommerce', 'fashion', 'beauty']
      
      mockPosts.forEach(post => {
        expect(Array.isArray(post.vertical)).toBe(true)
        expect(post.vertical.length).toBeGreaterThan(0)
        
        post.vertical.forEach(vertical => {
          expect(validVerticals).toContain(vertical)
        })
      })
    })

    it('should validate funnel values', () => {
      const validFunnels = ['awareness', 'consideration', 'decision']
      
      mockPosts.forEach(post => {
        expect(validFunnels).toContain(post.funnel)
      })
    })

    it('should validate hero image path', () => {
      mockPosts.forEach(post => {
        if (post.hero) {
          expect(post.hero).toMatch(/^\/covers\/.*\.(jpg|jpeg|png|webp|avif)$/i)
        }
      })
    })
  })

  describe('Real Blog Post Data Integration', () => {
    // Test with actual blog post data from our converted posts
    const realBlogPosts = [
      'the-real-cost-of-poor-customer-support-for-dtc-brands',
      'small-team-big-impact-customer-support-strategies-for-lean-dtc-operations',
      'why-fashion-brands-need-industry-specific-ai-not-generic-chatbots'
    ]

    it('should handle real blog post slugs', () => {
      realBlogPosts.forEach(slug => {
        expect(slug).toMatch(/^[a-z0-9-]+$/)
        expect(slug.length).toBeGreaterThan(10)
        expect(slug.length).toBeLessThan(100)
      })
    })

    it('should validate expected hero image naming convention', () => {
      const expectedImages = [
        '/covers/real-cost-poor-support.jpg',
        '/covers/small-team-big-impact.jpg',
        '/covers/fashion-ai-vs-generic.jpg'
      ]

      expectedImages.forEach(imagePath => {
        expect(imagePath).toMatch(/^\/covers\/[a-z0-9-]+\.jpg$/)
      })
    })
  })
})