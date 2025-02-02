// @ts-check
import { test, expect } from "@playwright/test";

// Testcase Login
test("Testcase Login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");

  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

// Testcase checkout
test("Testcase checkout", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");

  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();
  //   await page.click('#login-button');

  // Verifikasi apakah login berhasil
  await expect(page).toHaveURL(/.*inventory.html/);
    //   await page.waitForURL('https://www.saucedemo.com/inventory.html');
    //   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Tambahkan produk ke keranjang
    //   await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
  await page.click('button[id="add-to-cart-sauce-labs-backpack"]');
    //   const buttonCart = page.locator("#add-to-cart-sauce-labs-backpack");
    //   await buttonCart.click();
  await page.click('button[id="add-to-cart-sauce-labs-onesie"]');
    //   const buttonCart = page.locator("#add-to-cart-sauce-labs-onesie");
    //   await buttonCart.click();
  await page.click('button[id="add-to-cart-sauce-labs-fleece-jacket"]');
    //   const buttonCart = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
    //   await buttonCart.click();

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL(/.*cart.html/);
    //   await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");
  await expect(page).toHaveURL(/.*checkout-step-one.html/);
    //   await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

  // Isi informasi checkout
    await page.fill("#first-name", "Arunika");
    await page.fill("#last-name", "Dahayu");
    await page.fill("#postal-code", "12345");
    await page.click("#continue");
    
    // Isi informasi checkout
    //   const inputFirstname = page.locator("#first-name");
    //   await inputFirstname.fill("Arunika");
    //   await expect(inputFirstname).toHaveValue("Arunika");

    //   const inputLastname = page.locator("#last-name");
    //   await inputLastname.fill("Dahayu");
    //   await expect(inputLastname).toHaveValue("Dahayu");

    //   const inputPostal = page.locator("#postal-code");
    //   await inputPostal.fill("12345");
    //   await expect(inputPostal).toHaveValue("12345");

    //   const buttonContinue = page.locator("#continue");
    //   await buttonContinue.click();
    //   await expect(page).toHaveURL(/.*checkout-step-two.html/);
    //   await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // Proses Checkout
    //   const buttonFinish = page.locator("#finish");
    //   await buttonFinish.click();
    //   await expect(page).toHaveURL(/.*checkout-complete.html/);
    //   await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

  // Proses checkout
    await page.click("#finish");

  // Verifikasi bahwa checkout berhasil
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!"
  );
});
