import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('POS Backoffice Login', () => {
  test('Valid user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login('test09876@mailinator.com', 'Asd12345');
    await expect(page).toHaveURL("https://spbackoffice.nvision.lk/home");
  });

  test('Try to login with invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login('test0987ailinator.com', 'Asd12345');
    await loginPage.validateInvalidEmail();
  });

    test('Try to login without email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login('', 'Asd12345');
    await loginPage.validateEmailfield();
  });

  test('Try to login without password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login('test09876@mailinator.com','');
    await loginPage.validatePasswordfield();
  });

    test('Try to login without email/password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login('','');
    await loginPage.validateEmailfield();
    await loginPage.validatePasswordfield();
  });
});
