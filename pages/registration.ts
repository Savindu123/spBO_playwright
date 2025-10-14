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

    constructor(page: Page) {
        super(page);
        this.emailField = page.locator('#username')
        this.passwordField = page.locator('#customerPassword');
        this.businessNameField = page.locator('#customerName');
        this.businessTypeFiled = page.locator('#BusinessType');
        this.countryFiled = page.getByLabel('Country');
        this.termsCheckbox = page.locator('#chk_terms');
        this.submitButton = page.getByRole('button',{name: 'Submit'});

    }
}