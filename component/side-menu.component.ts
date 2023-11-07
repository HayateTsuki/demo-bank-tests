import { Page } from '@playwright/test';

export class SideMenuComponent {
  constructor(private page: Page) {}

  userNameText = this.page.getByTestId('user-name');
  paymentLink = this.page.getByRole('link', { name: 'płatności' });
}
