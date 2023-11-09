import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  trasferAccountInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  executeButton = this.page.locator('#execute_btn');
  closeButton = this.page.getByTestId('close-button');

  transferCorrectMessage = this.page.locator('#show_messages');

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.trasferAccountInput.fill(transferAccount);
    await this.transferAmountInput.fill(transferAmount);
    await this.executeButton.click();
    await this.closeButton.click();
  }
}
