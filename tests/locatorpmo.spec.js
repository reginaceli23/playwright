import { test, expect } from "@playwright/test";
import checkoutActions from "./pom/objectActions/checkoutActions";
const {default: loginActions} = require('../tests/pom/objectActions/loginActions');

test("login used pmo", async ({ page }) => {
    const objLogin = new loginActions(page);
    await objLogin.goto();
    await objLogin.inputLogin();
  });

test("checkout successfuly", async ({page}) => {
  const objCheckout = new checkoutActions (page);
  await objCheckout.goto();
  await objCheckout.actionCheckout();
})