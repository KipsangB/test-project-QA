import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/demoqaloginpage.js';
import { WebTablePage } from '../pages/webpagetable.js'; 

type MyFixtures = {
    loginPage: LoginPage;
    tablePage: WebTablePage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    tablePage: async ({ page }, use) => {
        await use(new WebTablePage(page));
    },
});

export { expect } from '@playwright/test';