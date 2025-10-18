import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

// LoginPage class extends the BasePage to encapsulate login page interactions
export class LoginPage extends BasePage {

  // Locators for username and password input fields
  readonly usernameField;
  readonly passwordField;

  // Locator for the eye icon to toggle password visibility
  readonly eyeIcon;

  // Locator for the sign-in button
  readonly signInButton

  // Locator for the "Register now" link/button
  readonly registerNowButton

  // Locator for the "Forgot Password?" link/button
  readonly forgotPasswordButton;

  readonly resetPasswordPageTitle;


  // Constructor initializes locators using the provided Playwright Page object
  constructor(page: Page) {
    super(page);
    this.usernameField = page.locator('#username'); // Username input field
    this.passwordField = page.locator('#password'); // Password input field
    this.signInButton = this.page.locator('button:has-text("Sign In")'); // Sign In button
    this.registerNowButton = page.getByRole('link', { name: 'Register now' });
    this.eyeIcon = page.locator('svg'); // Eye icon for password visibility toggle
    this.forgotPasswordButton = page.getByRole('link', { name: 'Forgot Password?' });// Forgot Password link
    this.resetPasswordPageTitle = page.getByRole('heading', { name: 'Reset Password' });
  }

  // Navigates to the login page URL
  async openLoginPage() {
    await this.goto(this.baseURL);
  }

  // Performs login by filling username and password, then clicking the sign-in button
  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  // Validates that the "Invalid Username or Password" error toast is visible
  async validateInvalidEmail() {
    const toast = this.page.getByText('Invalid Username or Password');
    await expect(toast).toBeVisible(); // ✅ Waits and verifies
  }

  async validateIncorrectEmail() {
    const toast = this.page.getByText('Incorrect Username or Password');
    await expect(toast).toBeVisible(); // ✅ Waits and verifies
  }

  // Validates that the "Email is required" error toast is visible
  async validateEmailfield() {
    const toast = this.page.getByText('Email is required');
    await expect(toast).toBeVisible(); // ✅ Waits and verifies
  }

  // Validates that the "Password is required" error toast is visible
  async validatePasswordfield() {
    const toast = this.page.getByText('Password is required');
    await expect(toast).toBeVisible(); // ✅ Waits and verifies
  }

  async validateUserWithoutBOLoginPermission() {
    const toast = this.page.locator('div').filter({ hasText: /^Your account has not been granted Back Office sign in access\.$/ });
    await expect(toast).toBeVisible(); // ✅ Waits and verifies
  }

  async clickEyeIcon() {
    await this.eyeIcon.click();
  }

  async getPasswordFieldType() {
    return await this.passwordField.getAttribute('type');
  }

  async clickForgotPassword() {
    await this.forgotPasswordButton.click();
  }

}
