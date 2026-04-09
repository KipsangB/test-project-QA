import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly newUserButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#userName');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login');
        this.newUserButton = page.locator('#newUser');
        this.errorMessage = page.locator('#name');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/login');
        // Clean up the UI from ads that block clicks
        await this.page.addStyleTag({ content: 'footer, #fixedban, .ad-unit { display: none !important; }' });
    }

    async login(user: string, pass: string) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    async getButtonStyle(locator: Locator) {
        return await locator.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
        });
    }
}