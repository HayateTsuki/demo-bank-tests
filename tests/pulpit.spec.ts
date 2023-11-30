import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    const loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
  });

  test('quick payment with correct data', async () => {
    //Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'Przelew środków';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    //Act
    await pulpitPage.executeQuickPayment(
      receiverId,
      transferAmount,
      transferTitle,
    );

    //Assert
    await expect(pulpitPage.messageAfterAction).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async () => {
    //Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    //Act
    await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

    //Assert
    await expect(pulpitPage.messageAfterAction).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

    // Assert
    await expect(pulpitPage.screenAccountBalance).toHaveText(
      `${expectedBalance}`,
    );
  });
});
