import { Page, expect } from '@playwright/test';

// BasePage class provides common methods for interacting with web pages using Playwright
export class BasePage {
  // Reference to the Playwright Page object
  readonly page: Page;

  // Constructor initializes the BasePage with a Playwright Page instance
  constructor(page: Page) {
    this.page = page;
  }

  // Navigates to the specified URL
  async goto(url: string) {
    await this.page.goto(url);
  }

  // Clicks on an element specified by the locator string (CSS or XPath)
  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  // Fills the input field specified by the locator with the provided text
  async type(locator: string, text: string) {
    await this.page.locator(locator).fill(text);
  }

  // Verifies that the current page URL contains the specified path using a regular expression
  async verifyURLContains(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }
}
