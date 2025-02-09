import loginPage from "../locator/loginPage";
import { expect } from "@playwright/test";

export default class loginActions {

    constructor(page) {
        this.page = page;
        this.loginPage = new loginPage();
        this.logo = page.locator(this.loginPage.logo);
        this.inputUsername = page.locator(this.loginPage.inputUsername);
        this.inputPassword = page.locator(this.loginPage.inputPassword);
        this.clickButtonLogin = page.locator(this.loginPage.buttonLogin);
    }
    
    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async inputLogin(){
        // Logo should be able to appear
        await expect(this.logo).toBeVisible();
        await expect(this.logo).toHaveText("Swag Labs");
        console.log("logo visible");

        // Proses Login - fill authentication
        await this.inputUsername.fill('standard_user');
        await expect(this.inputUsername).toHaveValue('standard_user');
        await this.inputPassword.fill('secret_sauce');
        await expect(this.inputPassword).toHaveValue('secret_sauce');
        await this.clickButtonLogin.click(); 

        // Verify if the login was successful
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
        console.log("Login successful")
    }
}