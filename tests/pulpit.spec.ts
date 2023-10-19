import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test("quick payment with correct data", async ({ page }) => {
        await page.goto("https://demo-bank.vercel.app/");
        await page.getByTestId('login-input').fill('testerLO');
        await page.getByTestId("password-input").fill("10987654");
        await page.getByTestId("login-button").click();
    
        await page.getByRole('link', { name: 'szybki przelew' }).click();
        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('150');
        await page.locator('#widget_1_transfer_title').fill('Przelew środków');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
        await page.getByRole('link', { name: 'Przelew wykonany! Chuck Demobankowy - 150,00PLN - Przelew środków' }).click();
      });
});