import { ForgotPasswordPage } from './../pages/forgotPasswordPage';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BasePage } from '../pages/basePage';

test.describe('Verify Invalid Email for Forgot Password', () => {

    test('Verify Enter Invalid Email for Forgot Password', async ({ page }, testInfo) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();
        await forgotPasswordPage.resetPassword(forgotPasswordPage.invalidUsernameLogin);

        await expect(forgotPasswordPage.invalidEmailValidationMessage).toBeVisible();

        const actualMessage = (await forgotPasswordPage.invalidEmailValidationMessage.textContent())?.trim() ?? '';
        const expectedMessage = 'Please enter a valid email';

        //const expectedMessage = forgotPasswordPage.; // replace with the expected text

        await forgotPasswordPage.verifyToastMessage(actualMessage, expectedMessage, testInfo);

    });

    test('Verify Enter Incorrect Email for Forgot Password', async ({ page }, testInfo) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();

        await forgotPasswordPage.resetPassword(forgotPasswordPage.incorrectEmailLogin);


        await expect(forgotPasswordPage.incorrectEmailValidationMessage).toBeVisible();



        const actualMessage = (await forgotPasswordPage.incorrectEmailValidationMessage.textContent())?.trim() ?? '';
        const expectedMessage = 'Incorrect User Name or Email Address';

        //const expectedMessage = forgotPasswordPage.; // replace with the expected text

        await forgotPasswordPage.verifyToastMessage(actualMessage, expectedMessage, testInfo);

    });

    //test('Verify ')


});
