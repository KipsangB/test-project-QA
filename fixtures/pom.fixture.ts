import { test as base, expect } from './dbFiddle.fixture.js';
import { WebTablePage } from '../pages/webpageTable.js';
import { LoginPage } from '../pages/demoqaloginpage.js';

interface MyFixtures {
  webTablePage: WebTablePage;
  loginPage: LoginPage;
}

export const test = base.extend<MyFixtures>({
  webTablePage: async ({ page }, use) => {
    await use(new WebTablePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };