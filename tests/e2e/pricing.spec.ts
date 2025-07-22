import { test, expect } from '@playwright/test';

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('should display all pricing tiers', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Pricing/);
    
    // Check for current pricing tiers
    await expect(page.locator('text="Free Plan"')).toBeVisible();
    await expect(page.locator('text="Starter Plan"')).toBeVisible();
    await expect(page.locator('text="Essentials Plan"')).toBeVisible();
    await expect(page.locator('text="Professional Plan"')).toBeVisible();
    
    // Check prices
    await expect(page.locator('text="$0"')).toBeVisible();
    await expect(page.locator('text="$10"')).toBeVisible();
    await expect(page.locator('text="$200"')).toBeVisible();
    await expect(page.locator('text="$500"')).toBeVisible();
  });

  test('should highlight the most popular plan', async ({ page }) => {
    // Look for "Popular" badge on Starter Plan
    const popularBadge = page.locator('text="Popular"');
    await expect(popularBadge).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    // Check Add for Free button
    const addFreeButton = page.locator('text="Add for Free"');
    await expect(addFreeButton).toBeVisible();
    
    // Check plan CTA buttons
    await expect(page.locator('text="Start for $10"')).toBeVisible();
    await expect(page.locator('text="Start for $200"')).toBeVisible();
    await expect(page.locator('text="Start for $500"')).toBeVisible();
  });

  test('should display feature comparisons', async ({ page }) => {
    // Check for chat allocations
    await expect(page.locator('text="250 chats/mo included"')).toBeVisible();
    await expect(page.locator('text="350 chats/mo included"')).toBeVisible();
    
    // Check for key features
    await expect(page.locator('text=/Industry-tuned LLM answers/i')).toBeVisible();
    await expect(page.locator('text=/Human reps handle AI escalations/i')).toBeVisible();
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

test.describe('Usage Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('should display usage calculator with default state', async ({ page }) => {
    // Check calculator heading
    await expect(page.locator('text="Calculate Your Savings"')).toBeVisible();
    
    // Check plan selection buttons
    await expect(page.locator('button:has-text("Free Plan")')).toBeVisible();
    await expect(page.locator('button:has-text("Starter Plan")')).toBeVisible();
    await expect(page.locator('button:has-text("Essentials Plan")')).toBeVisible();
    await expect(page.locator('button:has-text("Professional - Contact Us")')).toBeVisible();
    
    // Check default conversation count
    await expect(page.locator('text="500 conversations"')).toBeVisible();
    
    // Check cost comparison sections
    await expect(page.locator('text="Before Garrio"')).toBeVisible();
    await expect(page.locator('text="With Starter Plan"')).toBeVisible();
  });

  test('should switch between plans correctly', async ({ page }) => {
    // Click on Free Plan button
    await page.click('button:has-text("Free Plan")');
    
    // Should show "With Free Plan" in comparison
    await expect(page.locator('text="With Free Plan"')).toBeVisible();
    
    // Click on Essentials Plan button
    await page.click('button:has-text("Essentials Plan")');
    
    // Should show "With Essentials Plan" in comparison
    await expect(page.locator('text="With Essentials Plan"')).toBeVisible();
  });

  test('should cap Free plan conversation count to 250', async ({ page }) => {
    // Click on Free Plan
    await page.click('button:has-text("Free Plan")');
    
    // Should show capped conversation count
    await expect(page.locator('text="250 conversations"')).toBeVisible();
  });

  test('should show yellow warning when Free plan hits limit', async ({ page }) => {
    // Click on Free Plan
    await page.click('button:has-text("Free Plan")');
    
    // Should show yellow warning popup
    await expect(page.locator('text="Free Plan Limit Reached!"')).toBeVisible();
    await expect(page.locator('text="Upgrade to Starter Plan for additional conversations"')).toBeVisible();
  });

  test('should show different cost structures for different plan types', async ({ page }) => {
    // Test AI-only plan (Free) - should show remaining agent costs
    await page.click('button:has-text("Free Plan")');
    await expect(page.locator('text=/30% need agents/i')).toBeVisible();
    
    // Test human backup plan (Essentials) - should show zero agent costs
    await page.click('button:has-text("Essentials Plan")');
    await expect(page.locator('text="$0 (human agents included)"')).toBeVisible();
  });

  test('should display savings summary', async ({ page }) => {
    // Should show savings text
    await expect(page.locator('text=/You save \\$/i')).toBeVisible();
    
    // Should show explanation
    await expect(page.locator('text=/Based on .* conversations\/month/i')).toBeVisible();
  });

  test('should show Professional plan CTA section', async ({ page }) => {
    // Check Professional plan CTA
    await expect(page.locator('text="Need higher volume or custom features?"')).toBeVisible();
    await expect(page.locator('text="Contact Us for Custom Pricing"')).toBeVisible();
  });

  test('should display BLS wage data attribution', async ({ page }) => {
    // Check source attribution
    await expect(page.locator('text=/Cost calculations based on/i')).toBeVisible();
    await expect(page.locator('text=/BLS customer service representative wage data/i')).toBeVisible();
    await expect(page.locator('text=/\\$20\\.59\\/hour.*\\$37\\.48\\/hour/i')).toBeVisible();
  });

  test('Professional plan button should be disabled in calculator', async ({ page }) => {
    const professionalButton = page.locator('button:has-text("Professional - Contact Us")');
    
    // Should be disabled
    await expect(professionalButton).toBeDisabled();
  });

  test('should handle conversation volume slider interaction', async ({ page }) => {
    // Start with Starter plan (not Free to avoid the 250 limit)
    await page.click('button:has-text("Starter Plan")');
    
    // Find and interact with the slider
    const slider = page.locator('[role="slider"]');
    await expect(slider).toBeVisible();
    
    // The slider should be interactive (not testing specific values due to complexity of slider interaction)
    await expect(slider).toBeEnabled();
  });

  test('should show correct plan highlighting in selection', async ({ page }) => {
    // Default should be Starter (has purple background)
    const starterButton = page.locator('button:has-text("Starter Plan")');
    await expect(starterButton).toHaveClass(/bg-purple-600/);
    
    // Click Free Plan
    await page.click('button:has-text("Free Plan")');
    
    // Free Plan should now be highlighted
    const freeButton = page.locator('button:has-text("Free Plan")');
    await expect(freeButton).toHaveClass(/bg-purple-600/);
    
    // Starter should no longer be highlighted
    await expect(starterButton).toHaveClass(/bg-white/);
  });
});