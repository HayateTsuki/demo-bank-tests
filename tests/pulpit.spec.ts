import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'Przelew środków';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    //Act
    await pulpitPage.transferReceiverInput.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitleInput.fill(transferTitle);
    await pulpitPage.transferButton.click();
    await pulpitPage.closeTransferButton.click();

    //Assert
    await expect(pulpitPage.messageAfterAction).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    //Act
    await pulpitPage.mobileTopUpReceiver.selectOption(topUpReceiver);
    await pulpitPage.mobileTopUpAmount.fill(topUpAmount);
    await pulpitPage.mobileTopUpAgreementCheckbox.click();
    await pulpitPage.mobileTopUpTransferButton.click();
    await pulpitPage.closeTransferButton.click();

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
    await pulpitPage.mobileTopUpReceiver.selectOption(topUpReceiver);
    await pulpitPage.mobileTopUpAmount.fill(topUpAmount);
    await pulpitPage.mobileTopUpAgreementCheckbox.click();
    await pulpitPage.mobileTopUpTransferButton.click();
    await pulpitPage.closeTransferButton.click();

    // Assert
    await expect(pulpitPage.screenAccountBalance).toHaveText(
      `${expectedBalance}`,
    );
  });
});
