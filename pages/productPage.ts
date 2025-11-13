import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { LoginPage } from './loginPage';

export class ProductPage extends BasePage {

    readonly productTitle;
    readonly addProductButton;
    readonly addProductFormTitle;
    readonly productFormSaveButton;


    constructor(page: Page) {
        super(page);

        this.productTitle = page.locator('//body/div[@class="box main bo-productC-main"]/div[@class="main-inner"]/div[@class="container"]/div[@class="row"]/div[@class="span12"]/div[@class="widget minHeight"]/div[@class="widget-header head"]/h3[1]'); // Product title element
        this.addProductButton = page.locator('//a[@id="add_product_btn"]');
        this.addProductFormTitle = page.locator('//h3[normalize-space()="Add products"]');
        this.productFormSaveButton = page.getByRole('button', { name: 'Save' });
    }

}