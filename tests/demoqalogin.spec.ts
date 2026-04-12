import { test, expect } from '../fixtures/pom.fixture.js';
import { TITUS_BETT } from '../Data/tableData.js';

test.describe('Authentication Flow @auth', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/login', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        
        await page.addStyleTag({
            content: `
                #fixedban, footer, .adsbygoogle, #adplus-anchor {
                    display: none !important;
                    visibility: hidden !important;
                    pointer-events: none !important;
                }
            `
        });
    });

     //Task1/question1:Create a user and log in.

    test('should navigate to registration and back to login @smoke @regression', async ({ page }) => {
        const newUserBtn = page.locator('#newUser');
        
        await newUserBtn.waitFor({ state: 'visible' });
        await newUserBtn.scrollIntoViewIfNeeded();
        await Promise.all([
    page.waitForURL('**/register', { timeout: 15000, waitUntil: 'load' }),
    newUserBtn.click()
]);
        await page.fill('#firstname', TITUS_BETT.firstName);
        await page.fill('#lastname', TITUS_BETT.lastName);
        await page.fill('#userName', TITUS_BETT.username);
        await page.fill('#password', TITUS_BETT.password);

        await page.goto('https://demoqa.com/login', { waitUntil: 'networkidle' });

        await page.fill('#userName', TITUS_BETT.username);
        await page.fill('#password', TITUS_BETT.password);
        await page.click('#login', { force: true });

        await expect(page.locator('#userName-value')).toHaveText(TITUS_BETT.username);
    });

      //Task 2:Check the system's behavior when entering incorrect data (for example, a short password, an empty field).

    test('validation: login fails with invalid credentials @negative', async ({ page }) => {
        await page.waitForSelector('#login');

        // empty submit
        await page.click('#login', { force: true });
        
        //incorrect credentials

        await page.fill('#userName', TITUS_BETT.username);
        await page.fill('#password', 'WrongPassword123!'); 
        await page.click('#login', { force: true });

        // Verify if Error message should be visible and contain specific text
        const errorMessage = page.locator('#name');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(/Invalid username or password!/);
    });

     //Question3: Check the color of the buttons

    test('ui: verify button styling @ui @visual', async ({ page }) => {
        const loginBtn = page.locator('#login');
        await expect(loginBtn).toBeVisible();
        
        const bgColor = await loginBtn.evaluate(el => getComputedStyle(el).backgroundColor);
        
        console.log('Detected BG Color:', bgColor);
        
        // confirm if really the color is not empty and matches the expected Blue (rgb(13, 110, 253))
        expect(bgColor).toBe('rgb(13, 110, 253)');
    });

});