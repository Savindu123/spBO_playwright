import { expect, Page, type Locator } from "@playwright/test";
import { BasePage } from "./basePage";

/**
 * RegistrationPage models the registration form and exposes actions
 * and assertions used by tests. It extends BasePage which provides
 * navigation helpers and the `page`/`baseURL` properties.
 */
export class RegistrationPage extends BasePage {
    // Form fields
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly businessNameField: Locator;
    readonly businessTypeFiled: Locator;
    readonly countryFiled: Locator;
    readonly termsCheckbox: Locator;
    readonly submitButton: Locator;

    // Validation messages / toasts
    readonly emptyEmailValidationMessage: Locator;
    readonly invalidEmailValidationMessage: Locator;
    readonly alreadyRegisteredEmailValidationMessage: Locator;

    readonly emptyPasswordValidationMessage: Locator;
    readonly lessCharactersPasswordValidationMessage: Locator;

    readonly emptybusinessnameValidationMessage: Locator;
    readonly businessnameValidationMessage: Locator;

    readonly emptybusinesstypeValidationMessage: Locator;

    // Success message after a successful registration
    readonly registrationSuccessMessage: Locator;

    /**
     * Create a new RegistrationPage bound to the provided Playwright Page.
     * @param page Playwright Page instance provided by the test fixture
     */
    constructor(page: Page) {
        super(page);
        // Initialize locators -- do not change selectors or behavior
        this.emailField = page.locator('#username');
        this.passwordField = page.locator('#customerPassword');
        this.businessNameField = page.locator('#customerName');
        this.businessTypeFiled = page.locator('#BusinessType');
        this.countryFiled = page.getByLabel('Country');
        this.termsCheckbox = page.locator('#chk_terms');
        this.submitButton = page.getByRole('button', { name: 'Submit' });

        // Validation messages
        this.emptyEmailValidationMessage = page.getByText('Email is required');
        this.alreadyRegisteredEmailValidationMessage = page.getByText('Email address already exists');
        this.invalidEmailValidationMessage = page.getByText('Please enter a valid email');

        this.emptyPasswordValidationMessage = page.getByText('Password is required');
        this.lessCharactersPasswordValidationMessage = page.getByText('Password must be at least 8');

        this.emptybusinessnameValidationMessage = page.getByText('Business name is required');
        this.businessnameValidationMessage = page.getByText('Business name can only consist of alphabetical, number, dot and underscore.');

        this.emptybusinesstypeValidationMessage = page.getByText('Business type is required');

        this.registrationSuccessMessage = page.getByRole('heading', { name: 'Thank you for registering!' });
    }

    /**
     * Navigate to the registration page relative to the configured base URL.
     */
    async openRegistrationPage(): Promise<void> {
        await this.goto(this.baseURL + 'registration_form');
    }

    /**
     * Returns whether the Submit button is enabled.
     */
    async isSubmitButtonEnabled(): Promise<boolean> {
        return await this.submitButton.isEnabled();
    }

    /**
     * Fill the full registration form and submit it.
     * Note: this method will check the terms checkbox before submitting.
     */
    async register(email: string, password: string, businessName: string, businessType: string, country: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.businessNameField.fill(businessName);
        await this.businessTypeFiled.selectOption(businessType);
        await this.countryFiled.selectOption(country);
        await this.termsCheckbox.check();
        await this.submitButton.click();
    }

    /** Fill only the email field. */
    async enterEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    /** Fill only the password field. */
    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    /** Fill only the business name field. */
    async enterBusinessName(businessName: string): Promise<void> {
        await this.businessNameField.fill(businessName);
    }

    /** Select a business type from the dropdown. */
    async selectBusinessType(businessType: string): Promise<void> {
        await this.businessTypeFiled.selectOption(businessType);
    }

    /** Select the country from the country control. */
    async selectCountry(country: string): Promise<void> {
        await this.countryFiled.selectOption(country);
    }

    /** Check the terms and conditions checkbox. */
    async checkTermsAndConditions(): Promise<void> {
        await this.termsCheckbox.check();
    }

    /** Uncheck terms and conditions if it's currently checked. */
    async uncheckTermsAndConditions(): Promise<void> {
        if (await this.termsCheckbox.isChecked()) {
            await this.termsCheckbox.uncheck();
        }
    }

    /** Click the submit button without doing any other actions. */
    async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }

    /**
     * Assert that an invalid email toast/message is visible.
     * This is used by tests that enter an invalid email and expect an inline
     * or toast validation message.
     */
    async validateInvalidEmail(): Promise<void> {
        const toast = this.page.getByText('Invalid email format');
        await expect(toast).toBeVisible(); // ✅ Waits and verifies
    }

    /**
     * Wait until the provided locator becomes disabled. Useful for waiting
     * for form-level validation to apply to the submit button.
     */
    async waitForDisabledSubmitButton(locator: Locator): Promise<void> {
        // Wait until the element is disabled using Playwright's assertion helper
        await expect(locator).toBeDisabled({ timeout: 10000 });
    }
}