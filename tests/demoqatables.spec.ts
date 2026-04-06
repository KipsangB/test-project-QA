import { test, expect } from '@playwright/test';

test.describe('Web Tables CRUD @tables', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/webtables');
        await page.addStyleTag({ 
            content: 'footer, #fixedban, .ad-unit { display: none !important; }' 
        });
    });

    test('should add a new record and verify data @smoke', async ({ page }) => {
        const user = {
            first: 'Titus',
            last: 'Bett',
            email: 'titusbett@example.com',
            age: '30',
            salary: '50000',
            dept: 'QA'
        };

        // 1. Add a record to the table
        await page.getByRole('button', { name: 'Add' }).click();
        await page.locator('#firstName').fill(user.first);
        await page.locator('#lastName').fill(user.last);
        await page.locator('#userEmail').fill(user.email);
        await page.locator('#age').fill(user.age);
        await page.locator('#salary').fill(user.salary);
        await page.locator('#department').fill(user.dept);
        await page.locator('#submit').click();

        // Check that the data is saved correctly
        const row = page.getByRole('row', { name: user.email });
        await expect(row).toBeVisible();
        await expect(row).toContainText(user.first);
        await expect(row).toContainText(user.dept);
    });

    test('should delete an entry and verify removal @regression', async ({ page }) => {
        const targetEmail = 'cierra@example.com';
        const targetRow = page.getByRole('row', { name: targetEmail });

        // 2. Delete the entry
        await targetRow.locator('span[title="Delete"]').click();
        // 3. Check if it has disappeared
        await expect(targetRow).not.toBeVisible();
    });
});