import { Page, Locator } from '@playwright/test';

export class WebTablePage {
    readonly page: Page;
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly ageInput: Locator;
    readonly salaryInput: Locator;
    readonly departmentInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addButton = page.locator('#addNewRecordButton');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');
        this.submitButton = page.locator('#submit');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/webtables');
        await this.page.addStyleTag({ content: 'footer, #fixedban { display: none !important; }' });
    }

    async addRecord(data: any) {
        await this.addButton.click();
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.emailInput.fill(data.email);
        await this.ageInput.fill(data.age);
        await this.salaryInput.fill(data.salary);
        await this.departmentInput.fill(data.department);
        await this.submitButton.click();
    }
}