import { test, expect } from '@playwright/test';

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('should display all pricing tiers', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Pricing/);
    
    // Check for all three pricing tiers
    await expect(page.locator('text="Free"')).toBeVisible();
    await expect(page.locator('text="Growth"')).toBeVisible();
    await expect(page.locator('text="Scale"')).toBeVisible();
    
    // Check prices
    await expect(page.locator('text="$0"')).toBeVisible();
    await expect(page.locator('text="$29"')).toBeVisible();
    await expect(page.locator('text="$99"')).toBeVisible();
  });

  test('should highlight the most popular plan', async ({ page }) => {
    // Look for "Most Popular" badge
    const popularBadge = page.locator('text="Most Popular"');
    await expect(popularBadge).toBeVisible();
    
    // The free tier should have special styling
    const freeTier = page.locator('#free-tier');
    await expect(freeTier).toHaveClass(/shadow-lg|scale-105/);
  });

  test('should have working CTA buttons', async ({ page }) => {
    // Check Start Free button
    const startFreeButton = page.locator('button:has-text("Start Free")');
    await expect(startFreeButton).toBeVisible();
    
    // Check other plan buttons
    const upgradeButton = page.locator('text="Upgrade Now"');
    await expect(upgradeButton).toBeVisible();
    
    const contactSalesButton = page.locator('text="Contact Sales"');
    await expect(contactSalesButton).toBeVisible();
  });

  test('should display feature comparisons', async ({ page }) => {
    // Check for feature list items
    await expect(page.locator('text="100 chats/mo"')).toBeVisible();
    await expect(page.locator('text="2,000 chats/mo"')).toBeVisible();
    await expect(page.locator('text="10,000 chats/mo"')).toBeVisible();
    
    // Check for key features
    await expect(page.locator('text=/human.*handoff|email.*handoff/i')).toBeVisible();
    await expect(page.locator('text=/discount.*engine/i')).toBeVisible();
  });

  test('should show FAQ section if present', async ({ page }) => {
    // Check if there's a FAQ section on the pricing page
    const faqSection = page.locator('text="Frequently Asked Questions"');
    const hasFAQ = await faqSection.count() > 0;
    
    if (hasFAQ) {
      await expect(faqSection).toBeVisible();
      
      // Test FAQ interaction
      const firstQuestion = page.locator('button[aria-expanded]').first();
      await firstQuestion.click();
      
      // Answer should be visible
      const answer = page.locator('[id*="answer"]').first();
      await expect(answer).toBeVisible();
    }
  });
});