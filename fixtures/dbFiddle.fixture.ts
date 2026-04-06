import { test as base, expect, Page } from '@playwright/test';

type DbFiddleFixtures = {
  dbFiddle: {
    schemaEditor: (sql: string) => Promise<void>;
    queryEditor: (sql: string) => Promise<void>;
    run: () => Promise<void>;
  };
};

export const test = base.extend<DbFiddleFixtures>({
  dbFiddle: async ({ page }, use) => {
    await page.goto('https://www.db-fiddle.com/');

    const schemaEditor = page.locator('.CodeMirror').first();
    const queryEditor = page.locator('.CodeMirror').nth(1);

    const dbFiddle = {
      schemaEditor: async (sql: string) => {
        await schemaEditor.evaluate((editorDiv, sql) => {
          // @ts-ignore
          editorDiv.CodeMirror.setValue(sql);
        }, sql);
      },
      queryEditor: async (sql: string) => {
        await queryEditor.evaluate((editorDiv, sql) => {
          // @ts-ignore
          editorDiv.CodeMirror.setValue(sql);
        }, sql);
      },
      run: async () => {
        const runButton = page.getByRole('button', { name: 'Run' });
        await expect(runButton).toBeEnabled({ timeout: 10000 });
        await runButton.click();
      },
    };

    await use(dbFiddle);
  },
});

export { expect };