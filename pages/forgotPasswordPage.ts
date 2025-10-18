import { expect, Page, type Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { LoginPage } from "./loginPage";

export class ForgotPasswordPage extends BasePage {
    readonly emailField;
    readonly resetButton;
    readonly backToLoginButton;
    readonly incorrectEmailValidationMessage;
    readonly invalidEmailValidationMessage;

    constructor(page: Page) {
        super(page);

        // Initialize locators -- do not change selectors or behavior
        this.emailField = page.getByRole('textbox', { name: 'Email address' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.backToLoginButton = page.getByRole('link', { name: 'Back to Login' });
        this.incorrectEmailValidationMessage = page.getByText('Incorrect User Name or Email');
        this.invalidEmailValidationMessage = page.getByText('Please enter a valid email');
    }
}
