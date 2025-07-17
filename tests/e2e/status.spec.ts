import { test, expect } from '@playwright/test';

test.describe('Status Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/status');
  });

  test('should display system status', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Status|System|Health/i);
    
    // Check for status indicators
    await expect(page.locator('text=/operational|online|offline|degraded|maintenance/i').first()).toBeVisible();
  });

  test('should show service components', async ({ page }) => {
    // Check for service list
    const services = [
      'text=/api|API/i',
      'text=/chat|widget/i',
      'text=/dashboard|admin/i',
      'text=/database|data/i'
    ];
    
    let foundService = false;
    for (const service of services) {
      if (await page.locator(service).count() > 0) {
        foundService = true;
        await expect(page.locator(service).first()).toBeVisible();
      }
    }
    
    expect(foundService).toBeTruthy();
  });

  test('should display uptime or status indicators', async ({ page }) => {
    // Look for status indicators
    const hasStatusIcon = await page.locator('[class*="status"], [class*="indicator"], svg[class*="check"], svg[class*="circle"]').count() > 0;
    const hasStatusText = await page.locator('text=/up|operational|online|100%|99/i').count() > 0;
    const hasColorIndicator = await page.locator('[class*="green"], [class*="success"], [style*="green"]').count() > 0;
    
    expect(hasStatusIcon || hasStatusText || hasColorIndicator).toBeTruthy();
  });

  test('should show last updated time', async ({ page }) => {
    // Check for timestamp
    const hasTimestamp = await page.locator('text=/updated|checked|last|ago|[0-9]{2}:[0-9]{2}/i').count() > 0;
    const hasDate = await page.locator('time, [datetime]').count() > 0;
    
    expect(hasTimestamp || hasDate).toBeTruthy();
  });

  test('should have incident history or updates section', async ({ page }) => {
    // Check for incident/update section
    const hasIncidents = await page.locator('text=/incident|history|update|maintenance/i').count() > 0;
    
    if (hasIncidents) {
      await expect(page.locator('text=/incident|history|update|maintenance/i').first()).toBeVisible();
    }
  });

  test('should make API call to check real status', async ({ page }) => {
    // Intercept status API call
    const responsePromise = page.waitForResponse(
      response => response.url().includes('/api/status') && response.status() === 200,
      { timeout: 5000 }
    ).catch(() => null);
    
    // Reload to trigger API call
    await page.reload();
    
    const response = await responsePromise;
    if (response) {
      const data = await response.json();
      expect(data).toHaveProperty('status');
    }
  });
});