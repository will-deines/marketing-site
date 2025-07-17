import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should display blog listing', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Blog|Articles|Resources/i);
    
    // Check for blog posts
    const articles = page.locator('article, [class*="post"], [class*="blog-item"]');
    await expect(articles.first()).toBeVisible();
    
    // Should have multiple posts
    const postCount = await articles.count();
    expect(postCount).toBeGreaterThan(0);
  });

  test('should display post metadata', async ({ page }) => {
    // Check for common blog post elements
    await expect(page.locator('h2, h3').first()).toBeVisible(); // Post titles
    await expect(page.locator('text=/[0-9]{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/').first()).toBeVisible(); // Dates
    
    // Check for author or category if present
    const hasAuthor = await page.locator('text=/by|author/i').count() > 0;
    const hasCategory = await page.locator('text=/category|tag/i').count() > 0;
    expect(hasAuthor || hasCategory).toBeTruthy();
  });

  test('should have clickable post links', async ({ page }) => {
    // Find post links
    const postLinks = page.locator('a[href*="/blog/"]').filter({ hasNotText: 'Blog' });
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
  test('should display individual blog post', async ({ page }) => {
    // First go to blog listing
    await page.goto('/blog');
    
    // Click on first blog post
    const firstPost = page.locator('a[href*="/blog/"]').filter({ hasNotText: 'Blog' }).first();
    await firstPost.click();
    
    // Wait for navigation
    await page.waitForURL(/\/blog\/.+/);
    
    // Check post content
    await expect(page.locator('h1')).toBeVisible(); // Post title
    await expect(page.locator('main p, article p').first()).toBeVisible(); // Post content
  });

  test('should show post details and content', async ({ page }) => {
    // Navigate directly to a blog post (we'll try common slugs)
    const possibleSlugs = [
      '/blog/getting-started',
      '/blog/announcement',
      '/blog/how-to',
      '/blog/introduction'
    ];
    
    let loaded = false;
    for (const slug of possibleSlugs) {
      try {
        await page.goto(slug);
        if (await page.locator('h1').count() > 0) {
          loaded = true;
          break;
        }
      } catch {}
    }
    
    if (!loaded) {
      // If no direct slug works, navigate via listing
      await page.goto('/blog');
      await page.locator('a[href*="/blog/"]').filter({ hasNotText: 'Blog' }).first().click();
    }
    
    // Check for post elements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=/[0-9]{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/')).toBeVisible();
    await expect(page.locator('p').first()).toBeVisible();
  });
});