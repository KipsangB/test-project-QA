import { test, expect } from '../fixtures/pom.fixture.js';
import { TITUS_BETT } from '../Data/tableData.js';

test.describe('Web Tables CRUD @tables', () => {

    test.beforeEach(async ({ tablePage }) => {
        await tablePage.goto();
    });

    test('should add a new record and verify data @smoke', async ({ tablePage, page }) => {
        // Using the data from tableData.ts
        await tablePage.addRecord(TITUS_BETT);

        // Verify the row exists using the email
        const row = page.getByRole('row', { name: TITUS_BETT.email });
        await expect(row).toBeVisible();
        await expect(row).toContainText(TITUS_BETT.firstName);
    });

    test('should delete an entry and verify removal @regression', async ({ page }) => {
        const targetEmail = 'cierra@example.com';
        const targetRow = page.getByRole('row', { name: targetEmail });

        await targetRow.locator('span[title="Delete"]').click();
        await expect(targetRow).not.toBeVisible();
    });
});