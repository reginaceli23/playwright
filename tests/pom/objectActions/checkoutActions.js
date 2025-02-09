import checkoutPage from "../locator/checkoutPage";
import { expect } from "@playwright/test";

export default class checkoutActions {
  constructor(page) {
    this.page = page;
    this.checkoutPage = new checkoutPage();
    this.logo = page.locator(this.checkoutPage.logo);
    this.inputUsername = page.locator(this.checkoutPage.inputUsername);
    this.inputPassword = page.locator(this.checkoutPage.inputPassword);
    this.clickButtonLogin = page.locator(this.checkoutPage.buttonLogin);
    this.buttoncartBackpack = page.locator(this.checkoutPage.buttoncartBackpack);
    this.buttoncartOnesie = page.locator(this.checkoutPage.buttoncartOnesie);
    this.buttoncartFleece_Jacket = page.locator(this.checkoutPage.buttoncartFleece_Jacket);
    this.iconCart = page.locator(this.checkoutPage.iconCart);
    this.buttonCheckout_cart = page.locator(this.checkoutPage.buttonCheckout_cart);
    this.inputFirstname = page.locator(this.checkoutPage.inputFirstname);
    this.inputLastname = page.locator(this.checkoutPage.inputLastname);
    this.inputPostalcode = page.locator(this.checkoutPage.inputPostalcode);
    this.clickButtonContinue = page.locator(this.checkoutPage.buttonContinue);
    this.buttonFinish = page.locator(this.checkoutPage.buttonFinish);
    this.postPurchaseMessage = page.locator(this.checkoutPage.postPurchaseMessage);
  }
  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async actionCheckout() {
    // Logo should be able to appear
    await expect(this.logo).toBeVisible();
    await expect(this.logo).toHaveText("Swag Labs");
    console.log("logo visible");

    // Proses Login - fill authentication
    await this.inputUsername.fill("standard_user");
    await expect(this.inputUsername).toHaveValue("standard_user");
    await this.inputPassword.fill("secret_sauce");
    await expect(this.inputPassword).toHaveValue("secret_sauce");
    await this.clickButtonLogin.click();

    // Verify if the login was successful
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // Click button add to cart
    await this.buttoncartBackpack.click();
    await this.buttoncartOnesie.click();
    await this.buttoncartFleece_Jacket.click();

    // Click icon cart
    await this.iconCart.click();

    // Click button checkout
    await this.buttonCheckout_cart.click();

    // Verify if the checkout process was successful
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

    // Fill Information
    await this.inputFirstname.fill("Arunika");
    await expect(this.inputFirstname).toHaveValue("Arunika");
    await this.inputLastname.fill("Dahayu");
    await expect(this.inputLastname).toHaveValue("Dahayu");
    await this.inputPostalcode.fill("12345");
    await expect(this.inputPostalcode).toHaveValue("12345");
    await this.clickButtonContinue.click();

    // Verify if the data submission was successful
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html"); // (/checkout-step-two\.html$/)

    // Click buttoh finish
    await this.buttonFinish.click();

    // Get Post-Purchase Messages
    await expect(this.postPurchaseMessage).toBeVisible();
    await expect(this.postPurchaseMessage).toHaveText(
      "Thank you for your order!"
    );
    console.log("Thank you for your order!");
  }
}
