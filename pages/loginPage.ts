import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly usernameField;
  readonly passwordField;

  readonly signInButton

  constructor(page: Page) {
    super(page);
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.signInButton = this.page.locator('button:has-text("Sign In")'); 
  }

  async openLoginPage() {
    await this.goto('https://spbackoffice.nvision.lk/');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }

  async validateInvalidEmail() {
    const toast = this.page.getByText('Invalid Username or Password');
    await expect(toast).toBeVisible(); // ✅ Waits and verifies
  }

  async validateEmailfield() {
    const toast = this.page.getByText('Email is required');
    await expect(toast).toBeVisible(); // ✅ Waits and verifies
  }

  async validatePasswordfield() {
    const toast = this.page.getByText('Password is required');
    await expect(toast).toBeVisible(); // ✅ Waits and verifies
  }
}
