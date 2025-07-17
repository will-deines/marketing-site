import { test, expect } from '@playwright/test';

test.describe('Alternatives Pages', () => {
  test('should display alternatives listing or redirect', async ({ page }) => {
    // Try to navigate to alternatives index
    const response = await page.goto('/alternatives');
    
    // It might redirect to a specific alternative or show a listing
    if (response && response.status() === 200) {
      await expect(page.locator('h1, h2').first()).toBeVisible();
    }
  });

  test('should show competitor comparison page', async ({ page }) => {
    // Common competitor comparisons
    const competitors = [
      'zendesk',
      'intercom',
      'freshdesk',
      'helpscout',
      'gorgias'
    ];
    
    let foundCompetitor = false;
    
    for (const competitor of competitors) {
      try {
        await page.goto(`/alternatives/${competitor}`);
        if (await page.locator('h1').count() > 0) {
          foundCompetitor = true;
          
          // Check comparison content
          await expect(page.locator('h1')).toContainText(new RegExp(competitor, 'i'));
          await expect(page.locator('text=/vs|versus|alternative|comparison/i')).toBeVisible();
          
          break;
        }
      } catch {}
    }
    
    expect(foundCompetitor).toBeTruthy();
  });

  test('should display feature comparison table', async ({ page }) => {
    // Navigate to a competitor page
    await page.goto('/alternatives/zendesk');
    
    // Check for comparison elements
    const hasTable = await page.locator('table').count() > 0;
    const hasComparisonList = await page.locator('ul li:has-text("✓"), ul li:has-text("✗"), ul li:has-text("Yes"), ul li:has-text("No")').count() > 0;
    const hasFeatureGrid = await page.locator('[class*="grid"], [class*="comparison"]').count() > 0;
    
    // At least one comparison format should exist
    expect(hasTable || hasComparisonList || hasFeatureGrid).toBeTruthy();
  });

  test('should highlight Garrio advantages', async ({ page }) => {
    await page.goto('/alternatives/zendesk');
    
    // Look for positive differentiators
    const advantages = [
      'text=/better|faster|easier|more|less expensive|free/i',
      'text=/shopify.*native|built.*shopify/i',
      'text=/5 minute|quick|instant/i'
    ];
    
    let foundAdvantage = false;
    for (const advantage of advantages) {
      if (await page.locator(advantage).count() > 0) {
        foundAdvantage = true;
        break;
      }
    }
    
    expect(foundAdvantage).toBeTruthy();
  });

  test('should have CTA buttons', async ({ page }) => {
    await page.goto('/alternatives/zendesk');
    
    // Check for call-to-action
    const cta = page.locator('a:has-text("Try Garrio"), a:has-text("Get Started"), a:has-text("Start Free"), button:has-text("Switch")');
    await expect(cta.first()).toBeVisible();
  });

  test('should show pricing comparison if available', async ({ page }) => {
    await page.goto('/alternatives/zendesk');
    
    // Check for pricing information
    const hasPricing = await page.locator('text=/$[0-9]|€[0-9]|£[0-9]|free|pricing/i').count() > 0;
    
    if (hasPricing) {
      await expect(page.locator('text=/$[0-9]|€[0-9]|£[0-9]|free|pricing/i').first()).toBeVisible();
    }
  });
});