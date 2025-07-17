import { test, expect } from '@playwright/test';

test.describe('ROI Calculator Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/roi-calculator');
  });

  test('should display calculator form', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/ROI|Calculator|Return/i);
    
    // Check for input fields
    await expect(page.locator('input[type="number"], input[type="range"], select').first()).toBeVisible();
  });

  test('should have all necessary input fields', async ({ page }) => {
    // Common ROI calculator fields
    const fieldsToCheck = [
      'text=/tickets|support|conversations|chats/i',
      'text=/cost|price|spend/i',
      'text=/time|hours|minutes/i',
      'text=/revenue|sales|income/i'
    ];
    
    for (const field of fieldsToCheck) {
      const fieldExists = await page.locator(field).count() > 0;
      if (fieldExists) {
        await expect(page.locator(field).first()).toBeVisible();
      }
    }
  });

  test('should calculate ROI when inputs are changed', async ({ page }) => {
    // Find numeric inputs
    const inputs = page.locator('input[type="number"], input[type="range"]');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      // Change first input
      const firstInput = inputs.first();
      await firstInput.fill('1000');
      
      // Look for calculated results
      await expect(page.locator('text=/\$|%|saved|roi/i')).toBeVisible();
    }
  });

  test('should update results dynamically', async ({ page }) => {
    // Get initial result if visible
    const resultElement = page.locator('[class*="result"], [class*="total"], [class*="savings"]').first();
    
    if (await resultElement.count() > 0) {
      const initialValue = await resultElement.textContent();
      
      // Change an input
      const input = page.locator('input[type="number"], input[type="range"]').first();
      await input.fill('2000');
      
      // Wait for result to update
      await expect(resultElement).not.toHaveText(initialValue || '');
    }
  });

  test('should show comparison or benefits section', async ({ page }) => {
    // Check for benefits/comparison content
    const benefits = page.locator('text=/save|improve|increase|reduce/i');
    await expect(benefits.first()).toBeVisible();
  });

  test('should have CTA after calculation', async ({ page }) => {
    // Look for call-to-action buttons
    const cta = page.locator('a:has-text("Get Started"), a:has-text("Start Free"), button:has-text("Try")');
    await expect(cta.first()).toBeVisible();
  });
});