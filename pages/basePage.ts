import { Page, TestInfo, expect } from '@playwright/test';

// BasePage class provides common methods for interacting with web pages using Playwright
export class BasePage {
  // Reference to the Playwright Page object
  readonly page: Page;

  readonly baseURL: string;

  readonly validUsernameLogin: string;
  readonly validPasswordLogin: string;

  readonly invalidUsernameLogin: string;
  readonly invalidPasswordLogin: string;

  readonly incorrectEmailLogin: string;




  // Constructor initializes the BasePage with a Playwright Page instance
  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://spbackoffice.nvision.lk/';

    this.validUsernameLogin = 'test09876@mailinator.com';
    this.validPasswordLogin = 'Asd12345';

    this.invalidUsernameLogin = 'test@com';
    this.invalidPasswordLogin = '   ';

    this.incorrectEmailLogin = 'Go@gmail.lk';

  }

  // Navigates to the specified URL
  async goto(baseURL: string) {
    await this.page.goto(baseURL);
  }


  // Clicks on an element specified by the locator string (CSS or XPath)
  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  // Fills the input field specified by the locator with the provided text
  async fill(locator: string, text: string) {
    await this.page.locator(locator).fill(text);
  }

  // Verifies that the current page URL contains the specified path using a regular expression
  async verifyURLContains(path: string) {
    await expect(this.page).toHaveURL(this.baseURL);
  }

  async verifyToastMessage(actual: string, expected: string, testInfo: TestInfo) {
    await testInfo.attach('Toast Verification', {
      body: `Expected: ${expected}\nActual: ${actual}`,
      contentType: 'text/plain',
    });

    expect(actual, `Actual toast message: "${actual}"`).toBe(expected);
  }

}
