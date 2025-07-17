import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Contact/);
    
    // Check form fields
    await expect(page.locator('input[name="name"], input[placeholder*="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
    await expect(page.locator('input[name="company"], input[placeholder*="company"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"], textarea[placeholder*="message"]')).toBeVisible();
    
    // Check submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Check for validation messages or required field indicators
    const nameInput = page.locator('input[name="name"], input[placeholder*="name"]');
    const emailInput = page.locator('input[name="email"], input[type="email"]');
    
    // Fields should have required attribute or show validation
    await expect(nameInput).toHaveAttribute('required', '');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('should validate email format', async ({ page }) => {
    // Fill invalid email
    const emailInput = page.locator('input[name="email"], input[type="email"]');
    await emailInput.fill('invalid-email');
    
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Browser should show validation for invalid email
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBe(false);
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Fill form with valid data
    await page.fill('input[name="name"], input[placeholder*="name"]', 'John Doe');
    await page.fill('input[name="email"], input[type="email"]', 'john@example.com');
    await page.fill('input[name="company"], input[placeholder*="company"]', 'Test Company');
    await page.fill('textarea[name="message"], textarea[placeholder*="message"]', 'This is a test message');
    
    // Intercept the API call
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/api/contact') && response.request().method() === 'POST'
    );
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Wait for response or success message
    try {
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    } catch {
      // If no API call, check for success message
      await expect(page.locator('text=/thank you|success|sent/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display contact information if present', async ({ page }) => {
    // Check for common contact info elements
    const hasEmail = await page.locator('text=/@.*\\.com/').count() > 0;
    const hasPhone = await page.locator('text=/\\+?[0-9\\s\\-\\(\\)]+/').count() > 0;
    const hasAddress = await page.locator('text=/street|avenue|road|suite/i').count() > 0;
    
    // At least some contact info should be present
    expect(hasEmail || hasPhone || hasAddress).toBeTruthy();
  });
});