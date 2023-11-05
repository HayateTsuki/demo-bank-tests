export class SideMenuComponent {
  constructor(private page) {}

  userNameText = this.page.getByTestId('user-name');
  paymentLink = this.page.getByRole('link', { name: 'płatności' });
}
