import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}
  //logged user
  userNameText = this.page.getByTestId('user-name');

  //messages
  messageAfterAction = this.page.locator('#show_messages');

  //balance
  screenAccountBalance = this.page.locator('#money_value');

  //fast transfer
  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  closeTransferButton = this.page.getByTestId('close-button');

  //mobile top-up
  mobileTopUpReceiver = this.page.locator('#widget_1_topup_receiver');
  mobileTopUpAmount = this.page.locator('#widget_1_topup_amount');
  mobileTopUpAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  mobileTopUpTransferButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });
}
