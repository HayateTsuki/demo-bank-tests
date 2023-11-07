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
