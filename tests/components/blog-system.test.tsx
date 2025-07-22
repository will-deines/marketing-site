import { render, screen, fireEvent } from '@testing-library/react'
import BlogPost from '@/components/blog/blog-post'
import { ResponsiveImage } from '@/components/ui/responsive-image'
import type { PostContent } from '@/lib/blog-utils'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock MDXRemote
jest.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-content">{source}</div>
}))

const mockPostData: PostContent = {
  slug: 'test-blog-post',
  title: 'Test Blog Post Title',
  excerpt: 'Test blog post excerpt',
  publishDate: '2025-01-22',
  vertical: ['ecommerce', 'fashion'],
  persona: ['founder'],
  funnel: 'awareness',
  readingTime: 8,
  author: 'Test Author',
  hero: '/covers/test-image.jpg',
  ogImage: '/og/test-image.jpg',
  canonical: '/blog/test-blog-post',
  content: {
    intro: 'This is the intro paragraph with **bold text** and important information.',
    sections: [
      {
        h2: 'First Section Title',
        body: 'This is the first section content with detailed information and examples.'
      },
      {
        h2: 'Second Section Title', 
        body: 'This is the second section with more **markdown** content and lists:\n\n- Item 1\n- Item 2\n- Item 3'
      }
    ],
    cta: {
      text: 'Start Free Trial',
      href: '/contact'
    }
  }
}

describe('Blog System Integration', () => {
  describe('BlogPost Component', () => {
    beforeEach(() => {
      // Clear any previous renders
      document.body.innerHTML = ''
    })

    it('should render complete blog post structure', () => {
      render(<BlogPost post={mockPostData} formattedDate="January 22, 2025" />)

      // Verify main title is rendered
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Blog Post Title')
      
      // Verify metadata is displayed
      expect(screen.getByText('January 22, 2025')).toBeInTheDocument()
      expect(screen.getByText('8 min read')).toBeInTheDocument()
      expect(screen.getByText('By Test Author')).toBeInTheDocument()
      
      // Verify vertical tags are rendered and clickable
      const ecommerceTag = screen.getByRole('link', { name: 'E-commerce' })
      expect(ecommerceTag).toBeInTheDocument()
      expect(ecommerceTag).toHaveAttribute('href', '/blog?vertical=ecommerce')
      
      // Verify funnel tag is rendered
      const awarenessTag = screen.getByRole('link', { name: 'Guides' })
      expect(awarenessTag).toBeInTheDocument()
      expect(awarenessTag).toHaveAttribute('href', '/blog?funnel=awareness')
    })

    it('should render hero image with proper attributes', () => {
      render(<BlogPost post={mockPostData} formattedDate="January 22, 2025" />)

      // Hero image should be present
      const heroImage = screen.getByRole('img')
      expect(heroImage).toBeInTheDocument()
      expect(heroImage).toHaveAttribute('alt', 'Test Blog Post Title')
    })

    it('should render MDX content correctly', () => {
      render(<BlogPost post={mockPostData} formattedDate="January 22, 2025" />)

      // Intro content should be rendered
      const introContent = screen.getByTestId('mdx-content')
      expect(introContent).toHaveTextContent(mockPostData.content.intro)

      // Section headers should be rendered
      expect(screen.getByRole('heading', { level: 2, name: 'First Section Title' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: 'Second Section Title' })).toBeInTheDocument()
    })

    it('should render functional CTA section', () => {
      render(<BlogPost post={mockPostData} formattedDate="January 22, 2025" />)

      // CTA section should be present
      expect(screen.getByText('Ready to implement these strategies?')).toBeInTheDocument()
      
      // CTA button should be functional
      const ctaButton = screen.getByRole('link', { name: 'Start Free Trial' })
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveAttribute('href', '/contact')
      expect(ctaButton).toHaveAttribute('target', '_blank')
      expect(ctaButton).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should handle missing hero image gracefully', () => {
      const postWithoutHero = { ...mockPostData, hero: undefined }
      render(<BlogPost post={postWithoutHero} formattedDate="January 22, 2025" />)

      // Should still render without crashing
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('should handle empty sections array', () => {
      const postWithEmptySections = { 
        ...mockPostData, 
        content: { ...mockPostData.content, sections: [] }
      }
      render(<BlogPost post={postWithEmptySections} formattedDate="January 22, 2025" />)

      // Should render intro and CTA but no section headers
      expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
      expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument()
    })
  })

  describe('ResponsiveImage Component', () => {
    it('should generate proper picture element structure', () => {
      render(<ResponsiveImage baseName="test-image" alt="Test Image" />)

      // Should create picture element
      const picture = document.querySelector('picture')
      expect(picture).toBeInTheDocument()

      // Should have multiple source elements for different formats
      const sources = document.querySelectorAll('source')
      expect(sources.length).toBeGreaterThan(3) // AVIF, WebP, JPEG sources

      // Should have fallback img element
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', '/covers/test-image.jpg')
      expect(img).toHaveAttribute('alt', 'Test Image')
    })

    it('should generate correct srcsets for responsive breakpoints', () => {
      render(<ResponsiveImage baseName="test-image" alt="Test Image" />)

      const sources = document.querySelectorAll('source')
      
      // Should have sources for desktop, tablet, and mobile
      const mediaQueries = Array.from(sources).map(source => source.getAttribute('media'))
      expect(mediaQueries).toContain('(min-width: 1024px)')
      expect(mediaQueries).toContain('(min-width: 768px)')
      expect(mediaQueries).toContain('(max-width: 767px)')
    })

    it('should handle fill prop correctly', () => {
      render(<ResponsiveImage baseName="test-image" alt="Test Image" fill={true} />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('fill')
    })

    it('should apply custom className', () => {
      render(<ResponsiveImage baseName="test-image" alt="Test Image" className="custom-class" />)

      const img = screen.getByRole('img')
      expect(img).toHaveClass('custom-class')
    })
  })

  describe('Blog Data Integration', () => {
    it('should handle real blog post data structure', async () => {
      // Test with actual blog post structure from our converted posts
      const realPostData: PostContent = {
        slug: 'the-real-cost-of-poor-customer-support-for-dtc-brands',
        title: 'The Real Cost of Poor Customer Support for DTC Brands',
        excerpt: 'Discover the hidden costs of poor customer support for DTC brands',
        publishDate: '2025-01-22',
        vertical: ['ecommerce', 'fashion', 'beauty'],
        persona: ['founder'],
        funnel: 'awareness',
        readingTime: 10,
        author: 'Garrio Team',
        hero: '/covers/real-cost-poor-support.jpg',
        ogImage: '/og/real-cost-poor-support.jpg',
        canonical: '/blog/the-real-cost-of-poor-customer-support-for-dtc-brands',
        content: {
          intro: 'When Sarah launched her sustainable fashion brand three years ago, she thought customer support was a "nice to have" that could wait until after her first million in revenue.',
          sections: [
            {
              h2: 'The Hidden Revenue Hemorrhage',
              body: 'But the real cost lies in what you\'re losing. Every frustrated customer who can\'t get help becomes a lost sale, a negative review, and worst of all—a walking advertisement for your competitors.'
            }
          ],
          cta: {
            text: 'Start Free Trial',
            href: '/contact'
          }
        }
      }

      render(<BlogPost post={realPostData} formattedDate="January 22, 2025" />)

      // Should render without errors
      expect(screen.getByText('The Real Cost of Poor Customer Support for DTC Brands')).toBeInTheDocument()
      expect(screen.getByText('The Hidden Revenue Hemorrhage')).toBeInTheDocument()
      
      // Should handle multiple verticals
      expect(screen.getByText(/ecommerce/i)).toBeInTheDocument()
      expect(screen.getByText(/fashion/i)).toBeInTheDocument()
      expect(screen.getByText(/beauty/i)).toBeInTheDocument()
    })

    it('should handle various funnel stages', () => {
      const funnelStages = [
        { funnel: 'awareness', label: 'Guides' },
        { funnel: 'consideration', label: 'Playbooks' },
        { funnel: 'decision', label: 'Success Stories' }
      ]
      
      funnelStages.forEach(({ funnel, label }) => {
        const postData = { ...mockPostData, funnel: funnel as any }
        const { unmount } = render(<BlogPost post={postData} formattedDate="January 22, 2025" />)
        
        // Should render funnel tag with correct label
        expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
        
        unmount()
      })
    })

    it('should handle various vertical combinations', () => {
      const verticalCombinations = [
        { verticals: ['ecommerce'], labels: ['E-commerce'] },
        { verticals: ['fashion', 'beauty'], labels: ['Fashion', 'Beauty'] },
        { verticals: ['ecommerce', 'fashion', 'beauty'], labels: ['E-commerce', 'Fashion', 'Beauty'] }
      ]
      
      verticalCombinations.forEach(({ verticals, labels }) => {
        const postData = { ...mockPostData, vertical: verticals as any }
        const { unmount } = render(<BlogPost post={postData} formattedDate="January 22, 2025" />)
        
        // Each vertical should have its own link with correct label
        labels.forEach(label => {
          expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
        })
        
        unmount()
      })
    })
  })

  describe('Accessibility and UX', () => {
    it('should have proper heading hierarchy', () => {
      render(<BlogPost post={mockPostData} formattedDate="January 22, 2025" />)

      // Should have h1 for main title
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      
      // Should have h2 for sections
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2)
      
      // Should have h3 for CTA
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })

    it('should have proper link relationships', () => {
      render(<BlogPost post={mockPostData} formattedDate="January 22, 2025" />)

      // CTA link should have proper security attributes
      const ctaLink = screen.getByRole('link', { name: 'Start Free Trial' })
      expect(ctaLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(ctaLink).toHaveAttribute('target', '_blank')
    })

    it('should have proper semantic structure', () => {
      render(<BlogPost post={mockPostData} formattedDate="January 22, 2025" />)

      // Should use article element
      const article = document.querySelector('article')
      expect(article).toBeInTheDocument()

      // Should have header section
      const header = document.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    it('should handle keyboard navigation', () => {
      render(<BlogPost post={mockPostData} formattedDate="January 22, 2025" />)

      // Links should be focusable
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
        // Focus should work
        fireEvent.focus(link)
        expect(document.activeElement).toBe(link)
      })
    })
  })
})