import { Page, Locator } from '@playwright/test';

export class WebTablePage {
    readonly page: Page;
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addButton = page.locator('#addNewRecordButton');
        this.firstNameInput = page.locator('#firstName');
        this.submitButton = page.locator('#submit');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/webtables');
        await this.page.addStyleTag({ content: 'footer, #fixedban { display: none !important; }' });
    }
}