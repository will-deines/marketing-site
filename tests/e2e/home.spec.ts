import { test, expect } from '@playwright/test';

test('should navigate to the home page and display the main heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Build the brand you always dreamed of');
});
