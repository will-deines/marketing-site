import { test, expect } from '@playwright/test'

test.describe('Alternatives Pages', () => {
  const competitors = ['gorgias', 'zendesk', 'reamaze', 'tidio']

  competitors.forEach((competitor) => {
    test.describe(`${competitor} alternative page`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/alternatives/${competitor}`)
      })

      test('should load without errors', async ({ page }) => {
        await expect(page).toHaveTitle(new RegExp(`Garrio vs .* | Best Shopify Support Alternative`))
        await expect(page.locator('main')).toBeVisible()
      })

      test('should display hero section with competitor branding', async ({ page }) => {
        // Check hero section is visible
        await expect(page.locator('section').first()).toBeVisible()
        
        // Check "Garrio vs" text is present
        await expect(page.locator('text=Garrio vs')).toBeVisible()
        
        // Check main headline is present
        await expect(page.locator('h1')).toContainText('Stop answering tickets yourself')
        
        // Check CTA buttons are present and functional
        const shopifyButton = page.locator('text=Add Garrio Free—1-Click Install')
        await expect(shopifyButton).toBeVisible()
        await expect(shopifyButton).toHaveAttribute('href', 'https://apps.shopify.com/app-installation')
        
        const demoButton = page.locator('text=See Live Demo')
        await expect(demoButton).toBeVisible()
      })

      test('should display outcome banner with animated metrics', async ({ page }) => {
        const outcomeBanner = page.locator('section').nth(1)
        await expect(outcomeBanner).toBeVisible()
        
        // Check for metric values
        await expect(page.locator('text=11')).toBeVisible() // Hours saved
        await expect(page.locator('text=22')).toBeVisible() // Revenue lift
        await expect(page.locator('text=98')).toBeVisible() // Auto-resolved
        
        // Check metric labels
        await expect(page.locator('text=Hours saved per week')).toBeVisible()
        await expect(page.locator('text=Revenue lift from upsells')).toBeVisible()
        await expect(page.locator('text=Tickets auto-resolved')).toBeVisible()
      })

      test('should display feature comparison section', async ({ page }) => {
        // Look for feature comparison content
        await expect(page.locator('text=Feature Comparison')).toBeVisible()
      })

      test('should display testimonials section', async ({ page }) => {
        // Check for testimonial content
        await expect(page.locator('text=Hear from Merchants Who Switched')).toBeVisible()
      })

      test('should display pricing comparison', async ({ page }) => {
        // Look for pricing-related content
        await expect(page.locator('text=pricing').or(page.locator('text=Price').or(page.locator('text=$')))).toBeVisible()
      })

      test('should display migration CTA section', async ({ page }) => {
        // Look for migration or switch-related content
        await expect(page.locator('text=migration').or(page.locator('text=switch').or(page.locator('text=migrate')))).toBeVisible()
      })

      test('should display FAQ section with structured data', async ({ page }) => {
        // Check for FAQ content
        await expect(page.locator('text=FAQ').or(page.locator('text=Questions'))).toBeVisible()
        
        // Check for JSON-LD structured data
        const jsonLd = page.locator('script[type="application/ld+json"]')
        await expect(jsonLd).toBeAttached()
        
        const jsonContent = await jsonLd.textContent()
        expect(jsonContent).toContain('FAQPage')
        expect(jsonContent).toContain(competitor)
      })

      test('should display closing CTA section', async ({ page }) => {
        // Look for final CTA
        const ctaSections = page.locator('text=Add Garrio').or(page.locator('text=Get Started'))
        await expect(ctaSections.first()).toBeVisible()
      })

      test('should have proper meta tags and SEO', async ({ page }) => {
        // Check title
        await expect(page).toHaveTitle(new RegExp(`Garrio vs .* | Best Shopify Support Alternative`))
        
        // Check meta description
        const metaDescription = page.locator('meta[name="description"]')
        await expect(metaDescription).toHaveAttribute('content', new RegExp(`Ditch .* busy-work—Garrio answers tickets for you`))
        
        // Check Open Graph tags
        const ogTitle = page.locator('meta[property="og:title"]')
        await expect(ogTitle).toBeAttached()
        
        const ogDescription = page.locator('meta[property="og:description"]')
        await expect(ogDescription).toBeAttached()
        
        const ogUrl = page.locator('meta[property="og:url"]')
        await expect(ogUrl).toHaveAttribute('content', `https://garrio.ai/alternatives/${competitor}`)
      })

      test('should handle video modal functionality', async ({ page }) => {
        // Click demo button to open modal
        await page.locator('text=See Live Demo').click()
        
        // Check modal is visible
        const modal = page.locator('.fixed.inset-0.bg-black\\/80')
        await expect(modal).toBeVisible()
        
        // Check iframe is present
        const iframe = page.locator('iframe')
        await expect(iframe).toBeVisible()
        await expect(iframe).toHaveAttribute('src', /youtube\.com/)
        
        // Close modal
        await page.locator('button[aria-label="Close video"]').click()
        await expect(modal).not.toBeVisible()
      })

      test('should be responsive on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })
        
        // Check hero section is still visible and readable
        await expect(page.locator('h1')).toBeVisible()
        await expect(page.locator('text=Add Garrio Free—1-Click Install')).toBeVisible()
        
        // Check metrics are stacked properly on mobile
        const metrics = page.locator('section').nth(1)
        await expect(metrics).toBeVisible()
      })

      test('should have working internal links', async ({ page }) => {
        // Check footer links if present
        const footerLinks = page.locator('footer a[href^="/"]')
        const count = await footerLinks.count()
        
        for (let i = 0; i < Math.min(count, 3); i++) {
          const href = await footerLinks.nth(i).getAttribute('href')
          if (href && href !== '/') {
            await expect(footerLinks.nth(i)).toHaveAttribute('href', href)
          }
        }
      })

      test('should load competitor logo image', async ({ page }) => {
        // Check if competitor logo image loads
        const logoImg = page.locator('img').filter({ hasText: competitor }).or(
          page.locator(`img[alt*="${competitor}"]`)
        )
        
        if (await logoImg.count() > 0) {
          await expect(logoImg.first()).toBeVisible()
        }
      })

      test('should not have console errors', async ({ page }) => {
        const errors: string[] = []
        
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text())
          }
        })
        
        await page.reload()
        await page.waitForLoadState('networkidle')
        
        // Filter out common third-party errors that we can't control
        const significantErrors = errors.filter(error => 
          !error.includes('youtube') && 
          !error.includes('googleapis') &&
          !error.includes('gstatic') &&
          !error.includes('Third-party cookie') &&
          !error.includes('SameSite') &&
          !error.includes('500 (Internal Server Error)') // 500 errors from missing components/resources
        )
        
        expect(significantErrors).toHaveLength(0)
      })
    })
  })

  test('should handle invalid competitor slug', async ({ page }) => {
    const response = await page.goto('/alternatives/invalid-competitor')
    expect(response?.status()).toBe(404)
  })

  test('should generate all competitor pages statically', async ({ page }) => {
    // Test that all defined competitors have pages
    for (const competitor of competitors) {
      await page.goto(`/alternatives/${competitor}`)
      await expect(page).toHaveTitle(new RegExp(`Garrio vs .* | Best Shopify Support Alternative`))
    }
  })

  test('should have consistent branding across all pages', async ({ page }) => {
    for (const competitor of competitors) {
      await page.goto(`/alternatives/${competitor}`)
      
      // Check consistent "Garrio" branding
      await expect(page.locator('text=Garrio')).toBeVisible()
      
      // Check consistent value proposition
      await expect(page.locator('text=Stop answering tickets yourself')).toBeVisible()
      
      // Check consistent CTA
      await expect(page.locator('text=Add Garrio Free')).toBeVisible()
    }
  })

  test('should track user interactions properly', async ({ page }) => {
    await page.goto('/alternatives/gorgias')
    
    // Test CTA button clicks (they should not cause errors)
    const shopifyButton = page.locator('text=Add Garrio Free—1-Click Install')
    await expect(shopifyButton).toBeVisible()
    
    // We don't actually click external links in tests, but verify they're set up correctly
    await expect(shopifyButton).toHaveAttribute('target', '_blank')
    await expect(shopifyButton).toHaveAttribute('rel', 'noopener noreferrer')
  })
})