import { test, expect } from '@playwright/test';

test.describe('Live Demo Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/live-demo');
  });

  test('should load demo interface', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Demo|Try/i);
    
    // Check for demo container or iframe
    const demoContainer = page.locator('iframe, [class*="demo"], [id*="demo"]').first();
    await expect(demoContainer).toBeVisible();
  });

  test('should have interactive chat widget', async ({ page }) => {
    // Look for chat interface elements
    const chatWidget = page.locator('[class*="chat"], [role="dialog"], button:has-text("Chat")').first();
    await expect(chatWidget).toBeVisible();
    
    // If it's a button, try clicking it
    if (await chatWidget.evaluate(el => el.tagName === 'BUTTON')) {
      await chatWidget.click();
      // Check if chat window opens
      await expect(page.locator('[class*="message"], textarea, input[type="text"]')).toBeVisible();
    }
  });

  test('should display demo instructions or guide', async ({ page }) => {
    // Check for instructional content
    const instructions = page.locator('text=/try|test|demo|example/i');
    await expect(instructions.first()).toBeVisible();
  });

  test('should allow sending test messages', async ({ page }) => {
    // Find message input
    const messageInput = page.locator('textarea, input[type="text"][placeholder*="message"], input[type="text"][placeholder*="type"], input[type="text"][placeholder*="ask"]').first();
    
    if (await messageInput.count() > 0) {
      await messageInput.fill('Hello, I need help with my order');
      
      // Find send button
      const sendButton = page.locator('button[type="submit"], button:has-text("Send"), button[aria-label*="send"]').first();
      await sendButton.click();
      
      // Wait for response
      await expect(page.locator('text=/thank|response|help/i')).toBeVisible({ timeout: 10000 });
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Demo should still be functional on mobile
    const demoArea = page.locator('main, [role="main"]');
    await expect(demoArea).toBeVisible();
  });
});