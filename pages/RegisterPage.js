import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.merchantRole = page.getByTestId('role-merchant');
    this.nameInput = page.getByPlaceholder('Votre nom');
    this.phoneInput = page.getByPlaceholder('+212 6XX XXX XXX');
    this.emailInput = page.getByPlaceholder('votre@email.com');
    this.passwordInput = page.getByPlaceholder('Min. 6 caractères');
    this.confirmPasswordInput = page.getByPlaceholder('Répéter le mot de passe');
    this.submitButton = page.getByRole('button', { name: 'Créer mon compte →' });
  }

  async registerMerchant({ name, phone, email, password }) {
    await this.merchantRole.click();
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.submitButton.click();
    await expect(this.page).toHaveURL('http://localhost:3000/dashboard');
  }
}