import { Page } from '@playwright/test';
import { SideMenuComponent } from '../component/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}
  //side menu
  sideMenuComponent = new SideMenuComponent(this.page);

  //messages
  messageAfterAction = this.page.locator('#show_messages');

  //balance
  screenAccountBalance = this.page.locator('#money_value');

  //fast transfer
  transferReceiverInput = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  closeTransferButton = this.page.getByTestId('close-button');

  async executeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiverInput.selectOption(receiverId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);

    await this.transferButton.click();
    await this.closeTransferButton.click();
  }

  //mobile top-up
  mobileTopUpReceiver = this.page.locator('#widget_1_topup_receiver');
  mobileTopUpAmount = this.page.locator('#widget_1_topup_amount');
  mobileTopUpAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  mobileTopUpTransferButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });

  async executeMobileTopUp(
    mobileTopUpReceiver: string,
    mobileTopUpAmount: string,
  ): Promise<void> {
    await this.mobileTopUpReceiver.selectOption(mobileTopUpReceiver);
    await this.mobileTopUpAmount.fill(mobileTopUpAmount);
    await this.mobileTopUpAgreementCheckbox.click();

    await this.mobileTopUpTransferButton.click();
    await this.closeTransferButton.click();
  }
}
