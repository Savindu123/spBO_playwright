import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';

test.describe('POS Backoffice Registration', () => {

    test('validate registration form with empty fields', async ({ page }) => {

        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();

        // Check if the submit button is disabled when all fields are empty
        const isSubmitDisabled = await registrationPage.isSubmitButtonEnabled();
        expect(isSubmitDisabled).toBeFalsy(); // Expecting the button to be disabled

    });

    test('validate registration form with only email filled', async ({ page }) => {

        const registrationPage = new RegistrationPage(page);

        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test12345@gmail.com');


        // Check if the submit button is disabled when only email is filled
        const isSubmitDisabled = await registrationPage.isSubmitButtonEnabled();
        expect(isSubmitDisabled).toBeFalsy(); // Expecting the button to be disabled      
    });

    test('validate registration form with only email and password filled', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test12345@gmail.com');
        await registrationPage.enterPassword('Asd12345');

        // Check if the submit button is disabled when email and password are filled
        const isSubmitDisabled = await registrationPage.isSubmitButtonEnabled();
        expect(isSubmitDisabled).toBeFalsy(); // Expecting the button to be disabled      
    });

    test('validate registration form with only email, password and business name filled', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test12345@gmail.com');
        await registrationPage.enterPassword('Asd12345');
        await registrationPage.enterBusinessName('Test Business');

        const isSubmitDisabled = await registrationPage.isSubmitButtonEnabled();
        expect(isSubmitDisabled).toBeTruthy(); // Expecting the button to be disabled   

        await registrationPage.submitButton.click();
    });

    test('validate registration form with all fields filled except terms checkbox', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test123kk45@gmail.com');
        await registrationPage.enterPassword('Asd12345');
        await registrationPage.enterBusinessName('Test Business');
        await registrationPage.selectBusinessType('Bar');
        await registrationPage.selectCountry('Sri Lanka');
        await registrationPage.uncheckTermsAndConditions();

        const afterFillingEnabled = await registrationPage.isSubmitButtonEnabled();
        expect(afterFillingEnabled).toBeFalsy();

        // Expecting the button to be disabled      
    });

    test('validate registration form with all fields filled with invalid email', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test123kk45gmail.com');
        await registrationPage.enterPassword('Asd12345');
        await registrationPage.enterBusinessName('Test Business');
        await registrationPage.selectBusinessType('Bar');
        await registrationPage.selectCountry('Sri Lanka');
        await registrationPage.checkTermsAndConditions();

        // Check if the submit button is disabled when all fields are filled with invalid email
        await expect(registrationPage.invalidEmailValidationMessage).toBeVisible();

        const afterFillingEnabled = await registrationPage.isSubmitButtonEnabled();
        expect(afterFillingEnabled).toBeFalsy();

        // Expecting the button to be disabled      
    });

    test('validate registration form with all fields filled with already registered email', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test09876@mailinator.com');// already registered email
        await registrationPage.enterPassword('Asd12345');
        await registrationPage.enterBusinessName('Test Business');
        await registrationPage.selectBusinessType('Bar');
        await registrationPage.selectCountry('Sri Lanka');
        await registrationPage.checkTermsAndConditions();

        // Check if the submit button is disabled when all fields are filled with invalid email
        await expect(registrationPage.alreadyRegisteredEmailValidationMessage).toBeVisible();


        const afterFillingEnabled = await registrationPage.isSubmitButtonEnabled();
        expect(afterFillingEnabled).toBeFalsy();
    });

    test('validate registration form with all fields and without password', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test5252@gmail.com');
        await registrationPage.enterBusinessName('Test Business');
        await registrationPage.selectBusinessType('Bar');
        await registrationPage.selectCountry('Sri Lanka');
        await registrationPage.checkTermsAndConditions();

        await registrationPage.submitButton.click();

        // Check if the submit button is disabled when all fields are filled with invalid email
        await expect(registrationPage.emptyPasswordValidationMessage).toBeVisible();

        // Adding a small delay to ensure the validation message is processed
        await page.waitForTimeout(1000);

        const afterFillingEnabled = await registrationPage.isSubmitButtonEnabled();
        expect(afterFillingEnabled).toBeFalsy();
    });

    test('validate registration form with all fields and without business name', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test5252@gmail.com');
        await registrationPage.enterPassword('Asd12345');
        await registrationPage.selectBusinessType('Bar');
        await registrationPage.selectCountry('Sri Lanka');
        await registrationPage.checkTermsAndConditions();

        await registrationPage.submitButton.click();

        // Adding a small delay to ensure the validation message is processed
        await page.waitForTimeout(1000);

        // Check if the submit button is disabled when all fields are filled with invalid email
        await expect(registrationPage.emptybusinessnameValidationMessage).toBeVisible();

        const afterFillingEnabled = await registrationPage.isSubmitButtonEnabled();
        expect(afterFillingEnabled).toBeFalsy();
    });

    test('validate registration form with all fields and invalid business name', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test5252@gmail.com');
        await registrationPage.enterPassword('Asd12345');
        await registrationPage.enterBusinessName('Test%$^$%&_');
        await registrationPage.selectBusinessType('Bar');
        await registrationPage.selectCountry('Sri Lanka');
        await registrationPage.checkTermsAndConditions();

        await registrationPage.submitButton.click();

        // Adding a small delay to ensure the validation message is processed
        await page.waitForTimeout(1000);


        // Check if the submit button is disabled when all fields are filled with invalid email
        await expect(registrationPage.businessnameValidationMessage).toBeVisible();

        const afterFillingEnabled = await registrationPage.isSubmitButtonEnabled();
        expect(afterFillingEnabled).toBeFalsy();
    });

    test('validate registration form with all fields and without business type', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.enterEmail('test5252@gmail.com');
        await registrationPage.enterPassword('Asd12345');
        await registrationPage.enterBusinessName('Test Business');
        await registrationPage.selectCountry('Sri Lanka');
        await registrationPage.checkTermsAndConditions();

        await registrationPage.submitButton.click();

        // Adding a small delay to ensure the validation message is processed
        await page.waitForTimeout(1000);

        // Check if the submit button is disabled when all fields are filled with invalid email
        await expect(registrationPage.emptybusinesstypeValidationMessage).toBeVisible();

        const afterFillingEnabled = await registrationPage.isSubmitButtonEnabled();
        expect(afterFillingEnabled).toBeFalsy();
    });
});
