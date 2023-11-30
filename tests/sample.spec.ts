import { test, expect } from '@playwright/test';

test.describe('Testy Perora', () => {
  test('Goto perora contact form and send some data', async ({ page }) => {
    //Arrange
    const url = 'https://test.perora.tv/kontakt/';
    const submitButton = page.getByRole('button', {
      name: 'Wyślij zgłoszenie',
    });

    //Act
    await page.goto(url);
    await page.getByRole('textbox').fill('test');
    await submitButton.click({ noWaitAfter: false, delay: 10000 });
    // await page.waitForEvent("frameattached", {timeout: 10000 });
    // // await page.waitForResponse(response =>
    // //     response.url() === 'https://test.perora.tv/kontakt/' && response.status() === 200
    // //   );
    // // await page.waitForRequest(request =>
    // //     request.url() === '' && request.method() === 'POST',
    // //   )
    // await page.reload({waitUntil: 'load'});
    // await page.waitForLoadState('domcontentloaded', {timeout: 10000 });

    //Assert
    await expect(page.locator('.contact-form__message-success')).toHaveText(
      'Twoje zgłoszenie zostało pomyślnie wysłane.',
    );
  });
});
