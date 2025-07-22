import { test, expect } from '@playwright/test';

test('should navigate to the about page and display the main heading', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('h1')).toContainText('You launched to build something that matters.');
});
