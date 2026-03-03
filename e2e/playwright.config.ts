import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/src/tests',
  timeout: 60000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  workers: 2,
  reporter: 'html',

  use: {
    baseURL: 'https://demoqa.com',
    headless: false, // FORCE BROWSER POPUP
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    navigationTimeout: 20000,
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',

    acceptDownloads: true,
    permissions: ['geolocation'],
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],headless :false,
        const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByText('Open New Window').click() // Action that opens the popup
])
// Now you can interact with the new popup page object
await popup.getByRole('button', { name: 'Accept' }).click();
      },
    },
  ],
});