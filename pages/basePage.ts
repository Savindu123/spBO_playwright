import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async type(locator: string, text: string) {
    await this.page.locator(locator).fill(text);
  }

  async verifyURLContains(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }
}
