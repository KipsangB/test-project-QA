import { test, expect } from '@playwright/test';

test.describe('ToolsQA Web Tables - CRUD operations', () => {

  test('Add a new record and verify', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');

    await page.click('#addNewRecordButton');

    await page.fill('#firstName', 'Titus');
    await page.fill('#lastName', 'Kiptoo');
    await page.fill('#userEmail', 'titus@example.com');
    await page.fill('#age', '25');
    await page.fill('#salary', '50000');
    await page.fill('#department', 'IT');

    await page.click('#submit');

    const cell = page.getByRole('cell', { name: 'Titus' }).first();
    await expect(cell).toBeVisible();
  });

  test('Edit existing record and verify update', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');

    await page.click('#addNewRecordButton');

    await page.fill('#firstName', 'Titus');
    await page.fill('#lastName', 'Bett');
    await page.fill('#userEmail', 'titus@example.com');
    await page.fill('#age', '25');
    await page.fill('#salary', '50000');
    await page.fill('#department', 'IT');

    await page.click('#submit');

    const cell = page.getByRole('cell', { name: 'Titus' }).first();
    await expect(cell).toBeVisible();

    const row = cell.locator('xpath=ancestor::div[contains(@class,"rt-tr-group")]');
    await row.locator('span[title="Edit"]').click();

    await page.fill('#firstName', 'UpdatedTitus');
    await page.click('#submit');

    await expect(page.getByText('UpdatedTitus')).toBeVisible();
  });

  test('Delete the record and verify removal', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');

    const cell = page.getByRole('cell', { name: 'UpdatedTitus' }).first();

    if (await cell.isVisible()) {
      const row = cell.locator('xpath=ancestor::div[contains(@class,"rt-tr-group")]');
      await row.locator('span[title="Delete"]').click();
    }

    await expect(page.getByText('UpdatedTitus')).toHaveCount(0);
  });

});