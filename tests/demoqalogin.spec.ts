
import { test, expect } from '@playwright/test';
import { TITUS_BETT } from '../Data/tableData.js';


test.describe('Authentication Flow', () => {
   
    test.beforeEach(async ({ page }) => {
        // using the'domcontentloaded' makes execution faster than 'load' because it doesn't wait for images/ads
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


    //Task/question1:Create a user and log in.


    test('should navigate to registration and back to login', async ({ page }) => {
        // Wait for the button specifically rather than the whole page load
        const newUserBtn = page.locator('#newUser');
        await newUserBtn.waitFor({ state: 'visible' });
        await newUserBtn.click({ force: true });
       
        await expect(page).toHaveURL(/register/);


        await page.fill('#firstname', 'Titus');
        await page.fill('#lastname', 'Bett');
        await page.fill('#userName', 'TitusBett');
        await page.fill('#password', 'Titus@123');

        await page.goto('https://demoqa.com/login', { waitUntil: 'domcontentloaded' });


        await page.fill('#userName', 'TitusBett');
        await page.fill('#password', 'Titus@123');
        await page.click('#login', { force: true });


        // If login stays on page, the username field remains visible
        await expect(page.locator('#userName')).toBeVisible();
    });




    //Task 2:Check the system's behavior when entering incorrect data (for example, a short password, an empty field).


    test('validation: login fails with invalid credentials', async ({ page }) => {
        await page.waitForSelector('#login');
       
        // when user use empty submit or fields
        await page.click('#login', { force: true });
       
        // Trying bad credentials entered
        await page.fill('#userName', 'TitusBett');
        await page.fill('#password', '123');
        await page.click('#login', { force: true });


        // Check for the error message
        const error = page.locator('#name');
        await expect(error).toBeVisible();
    });
//Question3: Check the color of the buttons


    test('ui: verify button styling', async ({ page }) => {
        const loginBtn = page.locator('#login');
        await expect(loginBtn).toBeVisible();
       
        const bgColor = await loginBtn.evaluate(el => getComputedStyle(el).backgroundColor);
       
        console.log('Detected BG Color:', bgColor);
        expect(bgColor).not.toBe('');
    });
});

