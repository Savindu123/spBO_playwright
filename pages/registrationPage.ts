import { expect, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class RegistrationPage extends BasePage {
    readonly emailField;
    readonly passwordField;
    readonly businessNameField;
    readonly businessTypeFiled;
    readonly countryFiled;
    readonly termsCheckbox;
    readonly submitButton;

    readonly emptyEmailValidationMessage;
    readonly invalidEmailValidationMessage;
    readonly alreadyRegisteredEmailValidationMessage;

    readonly emptyPasswordValidationMessage;
    readonly lessCharactersPasswordValidationMessage;

    readonly emptybusinessnameValidationMessage;
    readonly businessnameValidationMessage;

    readonly emptybusinesstypeValidationMessage;




    constructor(page: Page) {
        super(page);
        this.emailField = page.locator('#username')
        this.passwordField = page.locator('#customerPassword');
        this.businessNameField = page.locator('#customerName');
        this.businessTypeFiled = page.locator('#BusinessType');
        this.countryFiled = page.getByLabel('Country');
        this.termsCheckbox = page.locator('#chk_terms');
        this.submitButton = page.getByRole('button', { name: 'Submit' });

        this.emptyEmailValidationMessage = page.getByText('Email is required');
        this.alreadyRegisteredEmailValidationMessage = page.getByText('Email address already exists');
        this.invalidEmailValidationMessage = page.getByText('Please enter a valid email');

        this.emptyPasswordValidationMessage = page.getByText('Password is required');
        this.lessCharactersPasswordValidationMessage = page.getByText('Password must be at least 8');

        this.emptybusinessnameValidationMessage = page.getByText('Business name is required');
        this.businessnameValidationMessage = page.getByText('Business name can only consist of alphabetical, number, dot and underscore.');

        this.emptybusinesstypeValidationMessage = page.getByText('Business type is required');


    }

    async openRegistrationPage() {
        await this.goto('https://spbackoffice.nvision.lk/registration_form');
    }

    async isSubmitButtonEnabled() {
        return await this.submitButton.isEnabled();
    }

    async register(email: string, password: string, businessName: string, businessType: string, country: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.businessNameField.fill(businessName);
        await this.businessTypeFiled.selectOption(businessType);
        await this.countryFiled.selectOption(country);
        await this.termsCheckbox.check();
        await this.submitButton.click();
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async enterBusinessName(businessName: string) {
        await this.businessNameField.fill(businessName);
    }

    async selectBusinessType(businessType: string) {
        await this.businessTypeFiled.selectOption(businessType);
    }

    async selectCountry(country: string) {
        await this.countryFiled.selectOption(country);
    }

    async checkTermsAndConditions() {
        await this.termsCheckbox.check();
    }

    async uncheckTermsAndConditions() {
        if (await this.termsCheckbox.isChecked()) {
            await this.termsCheckbox.uncheck();
        }
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async validateInvalidEmail() {
        const toast = this.page.getByText('Invalid email format');
        await expect(toast).toBeVisible(); // ✅ Waits and verifies
    }

}