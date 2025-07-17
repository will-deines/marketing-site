import { test, expect } from '@playwright/test';

test.describe('Features Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/features');
  });

  test('should load and display all main sections', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Features – Garrio Chat for Shopify/);
    
    // Check that all major sections are visible
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Check for feature pillars section
    const featurePillars = page.locator('text=/customer service|support|automation/i');
    await expect(featurePillars.first()).toBeVisible();
    
    // Check for comparison table
    const comparisonSection = page.locator('text=/comparison|vs|versus/i');
    await expect(comparisonSection.first()).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Check header navigation
    const pricingLink = page.locator('a[href="/pricing"]').first();
    await expect(pricingLink).toBeVisible();
    
    // Check CTA button
    const ctaButton = page.locator('a:has-text("Get Started"), a:has-text("Start Free")').first();
    await expect(ctaButton).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that content is still visible and properly formatted
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    
    // Mobile menu should be available
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has(svg)').first();
    await expect(mobileMenuButton).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check meta description
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescription).toContain('Shopify support app');
    
    // Check that there's an h1 tag
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });
});