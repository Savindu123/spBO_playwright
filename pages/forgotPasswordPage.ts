import { expect, Page, type Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { LoginPage } from "./loginPage";

export class ForgotPasswordPage extends BasePage {
    readonly emailField;
    readonly resetButton;
    readonly backToLoginButton;
    readonly incorrectEmailValidationMessage;
    readonly invalidEmailValidationMessage;
    readonly accessGrantedEmailValidationMessage;
    readonly emptyEmailValidationMessage;

    constructor(page: Page) {
        super(page);

        // Initialize locators -- do not change selectors or behavior
        this.emailField = page.getByRole('textbox', { name: 'Email address' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.backToLoginButton = page.getByRole('link', { name: 'Back to Login' });
        this.incorrectEmailValidationMessage = page.getByText('//div[@class = "login-error"]/font');
        this.invalidEmailValidationMessage = page.locator('//div[@class = "login-error"]/font');
        this.emptyEmailValidationMessage = page.getByText('Email is required');
        this.accessGrantedEmailValidationMessage = page.getByText('Access Granted. Please check your email for password reset instructions.');
    }
    async openForgotPasswordPage() {
        await this.goto(this.baseURL + 'reset_password');
    }

    async resetPassword(email: string) {
        await this.emailField.fill(email);
        await this.resetButton.click();
    }
}
