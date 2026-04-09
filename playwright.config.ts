import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  timeout: 60000, 

  fullyParallel: true,


  reporter: 'html',

  use: {
    navigationTimeout: 45000,

    actionTimeout: 15000,
    trace: 'on-first-retry',
    
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  outputDir: 'test-results/',
});