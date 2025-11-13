import { BasePage } from './../pages/basePage';
import { test, expect } from '@playwright/test';
//import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';

test.describe('Verify Product form functions', () => {

    test('Verify Product Page Title and Add Product button', async ({ page }) => {
        const basePage = new BasePage(page);
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        // Navigate to the login page
        await loginPage.openLoginPage();
        // Perform login with valid credentials
        await loginPage.login(loginPage.validUsernameLogin, loginPage.validPasswordLogin);
        //Navigate to Product Page
        await page.goto(basePage.baseURL + 'product_list');

        // Verify Product Page Title
        const productPageTitle = productPage.productTitle;
        await expect(productPageTitle).toHaveText('Product list');

        await page.screenshot({ path: 'screenshots/productPage.png', fullPage: true });

        // Verify Add Product button presence
        const AddProductButton = productPage.addProductButton;
        await expect(AddProductButton).toBeVisible();
    });

    test('Verify Add Product button functionality', async ({ page }) => {
        const basePage = new BasePage(page);
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        // Navigate to the login page
        await loginPage.openLoginPage();

        // Perform login with valid credentials
        await loginPage.login(loginPage.validUsernameLogin, loginPage.validPasswordLogin);

        //Navigate to Product Page
        await page.goto(basePage.baseURL + 'product_list');

        // Click on Add Product button
        const AddProductButton = productPage.addProductButton;
        await AddProductButton.click();

        // Verify navigation to Add Product page
        const addProductFormTitle = productPage.addProductFormTitle;
        await expect(addProductFormTitle).toHaveText('Add products');
    });

    test('Verify to Add product without Product name', async ({ page }) => {

        const basePage = new BasePage(page);
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        // Navigate to the login page
        await loginPage.openLoginPage();

        // Perform login with valid credentials
        await loginPage.login(loginPage.validUsernameLogin, loginPage.validPasswordLogin);

        //Navigate to Product Page
        await page.goto(basePage.baseURL + 'product_list');

        // Click on Add Product button
        const AddProductButton = productPage.addProductButton;
        await AddProductButton.click();

        const ProductFormSaveButton = productPage.productFormSaveButton
        await ProductFormSaveButton.click();

        //Verify Error messsage
        await expect(page.getByText("Product name is required")).toBeVisible();

    });


});

