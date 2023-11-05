import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  paymentTab = this.page.getByRole('link', { name: 'płatności' });
  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  trasferAccountInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  executeButton = this.page.locator('#execute_btn');
  closeButton = this.page.getByTestId('close-button');

  transferCorrectMessage = this.page.locator('#show_messages');
}
