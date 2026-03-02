import { test, expect } from '@playwright/test';

test.describe('ToolsQA Login - Titus Tests', () => {

  test('Login successfully with Titus (expected failure on demo site)', async ({ page }) => {
    await page.goto('https://demoqa.com/login');

    await page.fill('#userName', 'Titus');
    await page.fill('#password', 'YourStrongPassword123!');
    await page.click('#login');

    await expect(page.locator('#output'))
      .toContainText('Invalid username or password');
  });

  // ✅ Corrected Empty Fields Test
  test('Login with empty fields', async ({ page }) => {
    await page.goto('https://demoqa.com/login');

    await page.click('#login');

    const username = page.locator('#userName');
    const password = page.locator('#password');

    // Check HTML5 validation state
    const isUsernameInvalid = await username.evaluate(
      (el: HTMLInputElement) => !el.checkValidity()
    );

    const isPasswordInvalid = await password.evaluate(
      (el: HTMLInputElement) => !el.checkValidity()
    );

    expect(isUsernameInvalid).toBeTruthy();
    expect(isPasswordInvalid).toBeTruthy();

    // Ensure no server-side error message appears
    await expect(page.locator('#output')).toHaveText('');
  });

  test('Check Login and New User button colors', async ({ page }) => {
    await page.goto('https://demoqa.com/login');

    const loginColor = await page.locator('#login')
      .evaluate(el => getComputedStyle(el).backgroundColor);

    const newUserColor = await page.locator('#newUser')
      .evaluate(el => getComputedStyle(el).backgroundColor);

    expect(loginColor).toBe('rgb(13, 110, 253)');
    expect(newUserColor).toBe('rgb(13, 110, 253)');
  });

});