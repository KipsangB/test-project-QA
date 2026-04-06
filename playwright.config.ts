import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',


  timeout: 30000,


  use: {
    headless: false, // show browser while running tests
    screenshot: 'only-on-failure',
  },


  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});

