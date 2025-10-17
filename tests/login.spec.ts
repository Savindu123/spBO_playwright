import { BasePage } from './../pages/basePage';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('POS Backoffice Login', () => {


  /**
   * Test: Successful login with valid credentials.
   *
   * Steps:
   * 1. Instantiate the LoginPage page object.
   * 2. Open the login page.
   * 3. Log in using valid email and password.
   * 4. Assert that the user is redirected to the home page.
   */
  test('Valid user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.openLoginPage();

    // Perform login with valid credentials
    //await loginPage.login('test09876@mailinator.com', 'Asd12345');

    await loginPage.login(loginPage.validUsernameLogin, loginPage.validPasswordLogin);

    // Verify successful navigation to the home page
    await expect(page).toHaveURL(loginPage.baseURL + 'home');
  });

  /**
   * Test: Attempted login with an invalid email format.
   *
   * Steps:
   * 1. Instantiate the LoginPage page object.
   * 2. Open the login page.
   * 3. Attempt to log in using an invalid email format and a valid password.
   * 4. Assert that the email validation error is shown.
   */
  test('Try to login with invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.openLoginPage();

    // Attempt login with invalid email format
    await loginPage.login('test0987ailinator.com', 'Asd12345');

    // Validate that the email field shows the appropriate validation error
    await loginPage.validateInvalidEmail();
  });

  /**
   * Test: Attempted login without providing an email.
   *
   * Steps:
   * 1. Instantiate the LoginPage page object.
   * 2. Open the login page.
   * 3. Attempt to log in with an empty email and a valid password.
   * 4. Assert that the email field validation is triggered.
   */
  test('Try to login without email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.openLoginPage();

    // Attempt login with empty email and valid password
    await loginPage.login('', 'Asd12345');

    // Validate that the email field shows the appropriate validation error
    await loginPage.validateEmailfield();
  });

  /**
   * Test: Attempted login without providing a password.
   *
   * Steps:
   * 1. Instantiate the LoginPage page object.
   * 2. Open the login page.
   * 3. Attempt to log in using a valid email but leave the password field empty.
   * 4. Assert that the password field validation is triggered (e.g., error message is shown).
   */
  test('Try to login without password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.openLoginPage();

    // Attempt login with valid email and empty password
    await loginPage.login('test09876@mailinator.com', '');

    // Validate that the password field shows the appropriate validation error
    await loginPage.validatePasswordfield();
  });

  /**
   * Test: Attempted login without providing both email and password.
   *
   * Steps:
   * 1. Instantiate the LoginPage page object.
   * 2. Open the login page.
   * 3. Attempt to log in with both email and password fields empty.
   * 4. Assert that both email and password field validations are triggered.
   */
  test('Try to login without email/password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.openLoginPage();

    // Attempt login with both email and password fields empty
    await loginPage.login('', '');

    // Validate that the email field shows the appropriate validation error
    await loginPage.validateEmailfield();
    // Validate that the password field shows the appropriate validation error
    await loginPage.validatePasswordfield();
  });

  /**
   * Test: Attempted login with only whitespace for email and password fields.
   *
   * Steps:
   * 1. Instantiate the LoginPage page object.
   * 2. Open the login page.
   * 3. Attempt to log in with whitespace-only values for email and password.
   * 4. Assert that the input fields are trimmed and treated as empty.
   */
  test('Try to login with spaces for email & password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.openLoginPage();

    // Attempt login with whitespace-only values for email and password
    await loginPage.login('     ', '        ');

    // Retrieve the values from the input fields after login attempt
    const emailValue = await loginPage.usernameField.inputValue();
    const passwordValue = await loginPage.passwordField.inputValue();

    // Assert that the trimmed values are empty, indicating whitespace is not accepted
    expect(emailValue.trim()).toBe('');
    expect(passwordValue.trim()).toBe('');
  });

  test('try to login with not registered email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login('abc@abc.lk', 'Asd12345');
    await loginPage.validateIncorrectEmail();
  })

  test('Validate user without BO login permission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login('57@yopmail.com', '123456789')
    await loginPage.validateUserWithoutBOLoginPermission();
  });

  test('Validate Register now button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.registerNowButton.click();
    await expect(page).toHaveURL(loginPage.baseURL + "registration_form");
  });

});
