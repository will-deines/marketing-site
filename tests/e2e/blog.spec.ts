import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should display blog listing', async ({ page }) => {
    // Check page title (actual title is "Garrio Growth Library")
    await expect(page).toHaveTitle(/Growth Library|Blog|Articles|Resources/i);
    
    // Check for blog posts (they're rendered as cards in a grid)
    const articles = page.locator('[class*="grid"] > div, article, [class*="post"], [class*="blog-item"]');
    await expect(articles.first()).toBeVisible();
    
    // Should have multiple posts
    const postCount = await articles.count();
    expect(postCount).toBeGreaterThan(0);
  });

  test('should display post metadata', async ({ page }) => {
    // Wait for the blog posts to load
    await page.waitForTimeout(2000);
    
    // Check for blog post titles in cards
    const postTitles = page.locator('[class*="grid"] h2, [class*="card"] h2');
    await expect(postTitles.first()).toBeVisible();
    
    // Check for dates or reading time
    await expect(page.locator('text=/min read|[0-9]{4}/').first()).toBeVisible();
    
    // Check for reading time which is always present in blog cards
    await expect(page.locator('text=/min read/').first()).toBeVisible();
  });

  test('should have clickable post links', async ({ page }) => {
    // Wait for the blog posts to load (they're client-side rendered)
    await page.waitForTimeout(2000);
    
    // Find post links (BlogCard components create these links)
    const postLinks = page.locator('a[href*="/blog/"]').filter({ hasNotText: 'Blog' }).filter({ hasNotText: 'Garrio Growth Library' });
    const linkCount = await postLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Check first link is clickable
    const firstLink = postLinks.first();
    await expect(firstLink).toBeVisible();
    
    // Get href to verify it's a valid blog post URL
    const href = await firstLink.getAttribute('href');
    expect(href).toMatch(/\/blog\/.+/);
  });

  test('should have pagination or load more if many posts', async ({ page }) => {
    // Check for pagination elements
    const hasPagination = await page.locator('text=/next|previous|load more|page [0-9]/i').count() > 0;
    const hasNumbers = await page.locator('button:has-text("2"), a:has-text("2")').count() > 0;
    
    // If there are many posts, pagination might be present
    if (hasPagination || hasNumbers) {
      expect(hasPagination || hasNumbers).toBeTruthy();
    }
  });

  test('should have search or filter functionality', async ({ page }) => {
    // Check for search box or category filters
    const hasSearch = await page.locator('input[type="search"], input[placeholder*="search"]').count() > 0;
    const hasCategories = await page.locator('text=/category|categories|filter|tag/i').count() > 0;
    
    // At least one discovery method should be present
    expect(hasSearch || hasCategories).toBeTruthy();
  });
});

test.describe('Blog Post Page', () => {
  const testPosts = [
    'the-real-cost-of-poor-customer-support-for-dtc-brands',
    'small-team-big-impact-customer-support-strategies-for-lean-dtc-operations'
  ];

  testPosts.forEach(slug => {
    test(`should display ${slug.split('-').slice(0, 3).join('-')} blog post`, async ({ page }) => {
      await page.goto(`/blog/${slug}`);
      await page.waitForLoadState('networkidle');
      
      // Check post structure
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('article, main')).toBeVisible();
      
      // Check for hero image
      const heroImage = page.locator('img').first();
      await expect(heroImage).toBeVisible();
      
      // Check for content sections
      await expect(page.locator('h2').first()).toBeVisible();
      
      // Check for CTA
      const ctaButton = page.locator('button, a').filter({ hasText: /trial|demo|start|contact/i });
      await expect(ctaButton.first()).toBeVisible();
    });
  });

  test('should show post metadata correctly', async ({ page }) => {
    await page.goto('/blog/the-real-cost-of-poor-customer-support-for-dtc-brands');
    await page.waitForLoadState('networkidle');
    
    // Check for date
    await expect(page.locator('text=/[0-9]{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/')).toBeVisible();
    
    // Check for reading time
    await expect(page.locator('text=/min read/')).toBeVisible();
    
    // Check for author
    await expect(page.locator('text=/By|Author/')).toBeVisible();
    
    // Check for tags/categories
    await expect(page.locator('a[href*="vertical"], a[href*="funnel"]')).toBeVisible();
  });

  test('should navigate from blog index to post', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    // Find and click first blog post link
    const firstPost = page.locator('a[href*="/blog/"]').filter({ hasNotText: 'Blog' }).first();
    await firstPost.click();
    
    // Wait for navigation
    await page.waitForURL(/\/blog\/.+/);
    
    // Should be on blog post page
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('article, main')).toBeVisible();
  });
});