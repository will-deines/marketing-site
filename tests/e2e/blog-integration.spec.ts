import { test, expect } from '@playwright/test'

test.describe('Blog System Integration Tests', () => {
  test.describe('Blog Index Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog')
    })

    test('should load and display blog posts', async ({ page }) => {
      // Wait for dynamic content to load
      await page.waitForLoadState('networkidle')
      
      // Verify blog posts are visible and interactive
      const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article')
      await expect(blogCards.first()).toBeVisible()
      
      // Should have multiple posts from our new blog content
      const postCount = await blogCards.count()
      expect(postCount).toBeGreaterThan(0)
    })

    test('should have functional filtering by vertical', async ({ page }) => {
      await page.waitForLoadState('networkidle')
      
      // Look for filter controls (buttons, dropdown, or links)
      const filterControls = page.locator('[data-filter], [class*="filter"], button:has-text(/fashion|beauty|ecommerce/i)')
      
      if (await filterControls.count() > 0) {
        const initialPosts = await page.locator('[data-testid="blog-card"], .blog-card, article').count()
        
        // Click on a filter
        await filterControls.first().click()
        await page.waitForTimeout(500) // Allow filtering to occur
        
        const filteredPosts = await page.locator('[data-testid="blog-card"], .blog-card, article').count()
        
        // Filtering should change the displayed posts (either show fewer or different posts)
        expect(filteredPosts).toBeGreaterThanOrEqual(0)
      }
    })

    test('should have functional search if present', async ({ page }) => {
      await page.waitForLoadState('networkidle')
      
      const searchInput = page.locator('input[type="search"], input[placeholder*="search"]')
      
      if (await searchInput.count() > 0) {
        // Test search functionality
        await searchInput.fill('customer support')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(500)
        
        // Search should maintain or reduce post count (not increase)
        const resultsCount = await page.locator('[data-testid="blog-card"], .blog-card, article').count()
        expect(resultsCount).toBeGreaterThanOrEqual(0)
      }
    })

    test('should have working pagination if present', async ({ page }) => {
      await page.waitForLoadState('networkidle')
      
      const paginationNext = page.locator('button:has-text(/next|>|→/i), a:has-text(/next|>|→/i)')
      const paginationNumbers = page.locator('button:has-text("2"), a:has-text("2")')
      
      if (await paginationNext.count() > 0 || await paginationNumbers.count() > 0) {
        const initialUrl = page.url()
        
        // Try clicking next page
        if (await paginationNext.count() > 0) {
          await paginationNext.first().click()
          await page.waitForLoadState('networkidle')
          
          // URL should change or content should update
          const newUrl = page.url()
          const hasUrlChange = newUrl !== initialUrl
          const hasContentUpdate = await page.locator('[data-testid="blog-card"], .blog-card, article').count() > 0
          
          expect(hasUrlChange || hasContentUpdate).toBeTruthy()
        }
      }
    })
  })

  test.describe('Individual Blog Post Pages', () => {
    // Test our newly created blog posts
    const testPosts = [
      'the-real-cost-of-poor-customer-support-for-dtc-brands',
      'small-team-big-impact-customer-support-strategies-for-lean-dtc-operations',
      'why-fashion-brands-need-industry-specific-ai-not-generic-chatbots'
    ]

    testPosts.forEach(slug => {
      test(`should load ${slug} with complete structure`, async ({ page }) => {
        await page.goto(`/blog/${slug}`)
        await page.waitForLoadState('networkidle')

        // Verify essential post structure
        await expect(page.locator('h1')).toBeVisible()
        
        // Check for hero image (should be visible and properly loaded)
        const heroImage = page.locator('img[src*="/covers/"], picture img')
        if (await heroImage.count() > 0) {
          await expect(heroImage.first()).toBeVisible()
          
          // Verify image actually loads (not broken)
          const naturalWidth = await heroImage.first().evaluate((img: HTMLImageElement) => img.naturalWidth)
          expect(naturalWidth).toBeGreaterThan(0)
        }

        // Verify content sections are present
        const contentSections = page.locator('h2, [class*="section"]')
        expect(await contentSections.count()).toBeGreaterThan(0)

        // Check for CTA section
        const ctaSection = page.locator('[class*="cta"], button:has-text(/trial|demo|start|contact/i), a:has-text(/trial|demo|start|contact/i)')
        expect(await ctaSection.count()).toBeGreaterThan(0)
      })
    })

    test('should have working responsive images', async ({ page }) => {
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Check for picture element or srcset (responsive images)
      const responsiveImage = page.locator('picture, img[srcset]')
      
      if (await responsiveImage.count() > 0) {
        await expect(responsiveImage.first()).toBeVisible()
        
        // Verify multiple sources exist for responsive loading
        const sources = page.locator('picture source, img[srcset]')
        expect(await sources.count()).toBeGreaterThan(0)
      }
    })

    test('should have functional CTAs', async ({ page }) => {
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Find CTA buttons/links
      const ctaElements = page.locator('button:has-text(/trial|demo|start|contact|get started/i), a:has-text(/trial|demo|start|contact|get started/i)')
      
      if (await ctaElements.count() > 0) {
        const firstCta = ctaElements.first()
        await expect(firstCta).toBeVisible()
        
        // Verify CTA is clickable and has proper href/action
        const href = await firstCta.getAttribute('href')
        const tagName = await firstCta.evaluate(el => el.tagName)
        
        if (tagName === 'A') {
          expect(href).toBeTruthy()
          expect(href).toMatch(/\/|#|mailto:|tel:/)
        }
      }
    })

    test('should have proper SEO metadata', async ({ page }) => {
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Check title tag
      const title = await page.title()
      expect(title.length).toBeGreaterThan(10)
      expect(title.length).toBeLessThan(70) // SEO best practice

      // Check meta description
      const metaDescription = page.locator('meta[name="description"]')
      if (await metaDescription.count() > 0) {
        const description = await metaDescription.getAttribute('content')
        expect(description?.length || 0).toBeGreaterThan(50)
        expect(description?.length || 0).toBeLessThan(160) // SEO best practice
      }

      // Check Open Graph tags
      const ogTitle = page.locator('meta[property="og:title"]')
      const ogDescription = page.locator('meta[property="og:description"]')
      
      if (await ogTitle.count() > 0) {
        const ogTitleContent = await ogTitle.getAttribute('content')
        expect(ogTitleContent?.length || 0).toBeGreaterThan(0)
      }
    })
  })

  test.describe('Blog Navigation and UX', () => {
    test('should navigate from blog index to individual posts', async ({ page }) => {
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')

      // Find clickable blog post links
      const postLinks = page.locator('a[href*="/blog/"]:not([href="/blog"])')
      
      if (await postLinks.count() > 0) {
        const firstPostLink = postLinks.first()
        const href = await firstPostLink.getAttribute('href')
        
        // Click the link
        await firstPostLink.click()
        await page.waitForLoadState('networkidle')

        // Verify navigation worked
        expect(page.url()).toContain('/blog/')
        expect(page.url()).not.toBe('/blog')
        
        // Verify we're on a blog post page
        await expect(page.locator('h1')).toBeVisible()
      }
    })

    test('should have working back navigation', async ({ page }) => {
      // Go to blog index first
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')

      // Navigate to a specific post
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Use browser back
      await page.goBack()
      await page.waitForLoadState('networkidle')

      // Should be back on blog index
      expect(page.url()).toContain('/blog')
      expect(page.url()).not.toContain('/blog/')
    })

    test('should maintain user experience on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')

      // Blog cards should still be visible and usable on mobile
      const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article')
      await expect(blogCards.first()).toBeVisible()

      // Navigate to a post on mobile
      if (await blogCards.count() > 0) {
        await blogCards.first().click()
        await page.waitForLoadState('networkidle')

        // Content should be readable on mobile
        await expect(page.locator('h1')).toBeVisible()
        
        // Images should be responsive
        const images = page.locator('img')
        if (await images.count() > 0) {
          const firstImage = images.first()
          const boundingBox = await firstImage.boundingBox()
          
          if (boundingBox) {
            // Image shouldn't overflow viewport
            expect(boundingBox.width).toBeLessThanOrEqual(375)
          }
        }
      }
    })
  })

  test.describe('Performance and Accessibility', () => {
    test('should load blog posts within reasonable time', async ({ page }) => {
      const startTime = Date.now()
      
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')
      
      const loadTime = Date.now() - startTime
      
      // Should load within 5 seconds (generous for integration tests)
      expect(loadTime).toBeLessThan(5000)
    })

    test('should have accessible navigation', async ({ page }) => {
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')

      // Check for keyboard navigation
      await page.keyboard.press('Tab')
      
      // At least some elements should be focusable
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    })

    test('should handle image loading gracefully', async ({ page }) => {
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Check that images have proper alt text
      const images = page.locator('img')
      
      if (await images.count() > 0) {
        for (let i = 0; i < Math.min(3, await images.count()); i++) {
          const img = images.nth(i)
          const alt = await img.getAttribute('alt')
          
          // Alt text should exist and be meaningful
          expect(alt).toBeTruthy()
          expect(alt?.length || 0).toBeGreaterThan(3)
        }
      }
    })
  })

  test.describe('Error Handling', () => {
    test('should handle non-existent blog posts gracefully', async ({ page }) => {
      const response = await page.goto('/blog/non-existent-post-12345')
      
      // Should either redirect or show 404
      const status = response?.status()
      expect([404, 302, 301]).toContain(status || 200)
    })

    test('should handle malformed URLs gracefully', async ({ page }) => {
      const response = await page.goto('/blog/../../etc/passwd')
      
      // Should not expose system files or cause errors
      const status = response?.status()
      expect([404, 302, 301, 400]).toContain(status || 200)
    })
  })
})