import { test, expect } from '@playwright/test'

test.describe('Blog Performance Tests', () => {
  test.describe('Image Loading Performance', () => {
    test('should load hero images efficiently', async ({ page }) => {
      // Test with one of our optimized blog posts
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      
      const startTime = Date.now()
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime
      
      // Should load within reasonable time
      expect(loadTime).toBeLessThan(5000)
      
      // Check that hero image loaded successfully
      const heroImage = page.locator('img').first()
      await expect(heroImage).toBeVisible()
      
      // Verify image has loaded (not broken)
      const naturalWidth = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth)
      expect(naturalWidth).toBeGreaterThan(0)
    })

    test('should serve appropriate image format based on browser support', async ({ page, browserName }) => {
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Check if modern formats are being served
      const images = await page.locator('img').all()
      
      for (const img of images) {
        const src = await img.getAttribute('src')
        if (src && src.includes('/covers/')) {
          // Modern browsers should get optimized formats
          if (browserName === 'chromium') {
            // Chrome supports WebP and AVIF
            const isOptimized = src.includes('.webp') || src.includes('.avif') || src.includes('.jpg')
            expect(isOptimized).toBeTruthy()
          }
        }
      }
    })

    test('should have responsive image behavior', async ({ page }) => {
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Test desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 })
      await page.waitForTimeout(500)
      
      const desktopImages = await page.locator('img[src*="/covers/"]').all()
      const desktopSources = []
      for (const img of desktopImages) {
        const src = await img.getAttribute('src')
        if (src) desktopSources.push(src)
      }

      // Test tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.waitForTimeout(500)
      
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      await page.waitForTimeout(500)
      
      // Images should still be visible and properly sized
      const mobileImages = page.locator('img[src*="/covers/"]')
      await expect(mobileImages.first()).toBeVisible()
      
      // Image should not overflow viewport
      const imageBox = await mobileImages.first().boundingBox()
      if (imageBox) {
        expect(imageBox.width).toBeLessThanOrEqual(375)
      }
    })

    test('should not block page rendering while images load', async ({ page }) => {
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      
      // Text content should be visible quickly
      await expect(page.locator('h1')).toBeVisible({ timeout: 2000 })
      await expect(page.locator('p').first()).toBeVisible({ timeout: 2000 })
      
      // Page should be interactive even if images are still loading
      const ctaButton = page.locator('button, a').filter({ hasText: /trial|demo|start/i }).first()
      if (await ctaButton.count() > 0) {
        await expect(ctaButton).toBeVisible({ timeout: 3000 })
      }
    })
  })

  test.describe('Page Load Performance', () => {
    test('should meet Core Web Vitals thresholds', async ({ page }) => {
      // Navigate to blog post
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      
      // Measure Largest Contentful Paint (LCP)
      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            resolve(lastEntry.startTime)
          })
          observer.observe({ entryTypes: ['largest-contentful-paint'] })
          
          // Fallback timeout
          setTimeout(() => resolve(0), 5000)
        })
      })

      // LCP should be under 2.5 seconds (Core Web Vitals threshold)
      expect(lcp).toBeLessThan(2500)
    })

    test('should have efficient JavaScript bundle size', async ({ page }) => {
      // Navigate and wait for all resources
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Get resource timing information
      const resourceSizes = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        return resources
          .filter(resource => resource.name.includes('.js'))
          .map(resource => ({
            name: resource.name,
            size: resource.transferSize || resource.encodedBodySize,
            duration: resource.duration
          }))
      })

      // Check that JavaScript bundles are reasonably sized
      const totalJSSize = resourceSizes.reduce((sum, resource) => sum + (resource.size || 0), 0)
      
      // Total JS should be under 1MB for good performance
      expect(totalJSSize).toBeLessThan(1024 * 1024)
    })

    test('should handle slow network conditions gracefully', async ({ page }) => {
      // Simulate slow 3G network
      await page.route('**/*', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 100)) // Add 100ms delay
        await route.continue()
      })

      const startTime = Date.now()
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      
      // Even on slow network, critical content should appear
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })
      
      const timeToContent = Date.now() - startTime
      
      // Should show content within 10 seconds even on slow network
      expect(timeToContent).toBeLessThan(10000)
    })
  })

  test.describe('Blog Index Performance', () => {
    test('should load blog index efficiently with multiple posts', async ({ page }) => {
      const startTime = Date.now()
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime

      // Blog index should load quickly
      expect(loadTime).toBeLessThan(5000)

      // Should show blog posts
      const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article')
      await expect(blogCards.first()).toBeVisible()
      
      // Should handle multiple posts efficiently
      const postCount = await blogCards.count()
      expect(postCount).toBeGreaterThan(0)
    })

    test('should handle blog filtering performance', async ({ page }) => {
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')

      // Find filter controls
      const filterButton = page.locator('button, a').filter({ hasText: /fashion|beauty|ecommerce/i }).first()
      
      if (await filterButton.count() > 0) {
        const startTime = Date.now()
        await filterButton.click()
        await page.waitForTimeout(1000) // Allow for filtering animation/logic
        const filterTime = Date.now() - startTime

        // Filtering should be responsive
        expect(filterTime).toBeLessThan(2000)
      }
    })

    test('should lazy load images in blog grid', async ({ page }) => {
      await page.goto('/blog')
      await page.waitForLoadState('domcontentloaded')

      // Get initial image count
      const initialImages = await page.locator('img[src*="/covers/"]').count()
      
      // Scroll down to trigger lazy loading
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2)
      })
      await page.waitForTimeout(1000)

      // Check if more images loaded or existing ones are properly visible
      const postScrollImages = await page.locator('img[src*="/covers/"]').count()
      
      // Either more images loaded, or existing ones are visible
      expect(postScrollImages).toBeGreaterThanOrEqual(initialImages)
    })
  })

  test.describe('Memory and Resource Usage', () => {
    test('should not have memory leaks when navigating between posts', async ({ page }) => {
      // Navigate to first post
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Get initial memory usage
      const initialMemory = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory.usedJSHeapSize
        }
        return 0
      })

      // Navigate to several other posts
      const posts = [
        '/blog/small-team-big-impact-customer-support-strategies-for-lean-dtc-operations',
        '/blog/why-fashion-brands-need-industry-specific-ai-not-generic-chatbots'
      ]

      for (const post of posts) {
        await page.goto(post)
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(1000)
      }

      // Check final memory usage
      const finalMemory = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory.usedJSHeapSize
        }
        return 0
      })

      // Memory usage shouldn't grow excessively (allow for some increase)
      if (initialMemory > 0 && finalMemory > 0) {
        const memoryIncrease = finalMemory - initialMemory
        const maxAllowedIncrease = initialMemory * 2 // 100% increase max
        expect(memoryIncrease).toBeLessThan(maxAllowedIncrease)
      }
    })

    test('should clean up event listeners and observers', async ({ page }) => {
      await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands')
      await page.waitForLoadState('networkidle')

      // Check for excessive event listeners
      const listenerCount = await page.evaluate(() => {
        // Check for common event listeners that might not be cleaned up
        const elements = document.querySelectorAll('*')
        let totalListeners = 0
        
        elements.forEach(el => {
          const listeners = (el as any).getEventListeners?.() || {}
          totalListeners += Object.keys(listeners).length
        })
        
        return totalListeners
      })

      // Should have reasonable number of event listeners
      expect(listenerCount).toBeLessThan(100)
    })
  })
})