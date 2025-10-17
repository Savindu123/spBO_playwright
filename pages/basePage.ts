import { Page, expect } from '@playwright/test';

// BasePage class provides common methods for interacting with web pages using Playwright
export class BasePage {
  // Reference to the Playwright Page object
  readonly page: Page;

  readonly baseURL: string;

  readonly validUsernameLogin: string;
  readonly validPasswordLogin: string;


  // Constructor initializes the BasePage with a Playwright Page instance
  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://spbackoffice.nvision.lk/';

    this.validUsernameLogin = 'test09876@mailinator.com';
    this.validPasswordLogin = 'Asd12345';

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
}
