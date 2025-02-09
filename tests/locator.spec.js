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

  // Proses Login
  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");

  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();

  // Verifikasi apakah login berhasil
  await expect(page).toHaveURL(/.*inventory.html/);

  // Tambahkan produk ke keranjang
  await page.click('button[id="add-to-cart-sauce-labs-backpack"]');
  await page.click('button[id="add-to-cart-sauce-labs-onesie"]');
  await page.click('button[id="add-to-cart-sauce-labs-fleece-jacket"]');

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL(/.*cart.html/);


  // Klik tombol checkout
  await page.click("#checkout");
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Isi informasi checkout
  await page.fill("#first-name", "Arunika");
  await page.fill("#last-name", "Dahayu");
  await page.fill("#postal-code", "12345");
  await page.click("#continue");

  // Verifikasi berhasil input data
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  // Proses checkout
  await page.click("#finish");
  await expect(page).toHaveURL(/.*checkout-complete.html/);

  // Verifikasi bahwa checkout berhasil
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!"
  );
  
});

test("Testcase checkout without input information", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Proses Login
  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");

  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();

  // Verifikasi apakah login berhasil
  await expect(page).toHaveURL(/.*inventory.html/);

  // Tambahkan produk ke keranjang
  const buttoncart1 = page.locator("#add-to-cart-sauce-labs-backpack");
  await buttoncart1.click();
  const buttoncart2 = page.locator("#add-to-cart-sauce-labs-onesie");
  await buttoncart2.click();
  const buttoncart3 = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await buttoncart3.click();

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL(/.*cart.html/);

  // Klik tombol checkout
  await page.click("#checkout");
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Tanpa isi informasi checkout
  await page.click("#continue");

  // Verifikasi pesan error muncul checkout gagal
  const errorMessage = page.locator(".error-message-container.error");

  // Tunggu sampai pesan error muncul
  await expect(errorMessage).toBeVisible();

  // Verifikasi teks error
  await expect(errorMessage).toHaveText("Error: First Name is required");

});

test("Testcase Checkout with cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page.locator(".login_logo")).toBeVisible();

  // Proses Login
  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");

  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Pilih Cart
  await page.click("#item_4_title_link > div");
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/inventory-item.html?id=4"
  );

  // Tambahkan produk ke keranjang
  await page.click("#add-to-cart");

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");

  // Isi informasi checkout
  const inputFirstname = page.locator("#first-name");
  await inputFirstname.fill("Arunika");
  await expect(inputFirstname).toHaveValue("Arunika");

  const inputLastname = page.locator("#last-name");
  await inputLastname.fill("Dahayu");
  await expect(inputLastname).toHaveValue("Dahayu");

  const inputPostal = page.locator("#postal-code");
  await inputPostal.fill("12345");
  await expect(inputPostal).toHaveValue("12345");

  const buttonContinue = page.locator("#continue");
  await buttonContinue.scrollIntoViewIfNeeded();
  await buttonContinue.click();
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  // Selesaikan proses checkout
  await page.click("#finish");
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );

  // Verifikasi bahwa checkout berhasil
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!"
  );
});

test("Checkout with input postal code only", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page.locator(".login_logo")).toBeVisible();

  // Login
  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");

  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Tambahkan produk ke keranjang
  const buttoncart1 = page.locator("#add-to-cart-sauce-labs-backpack");
  await buttoncart1.click();
  const buttoncart2 = page.locator("#add-to-cart-sauce-labs-onesie");
  await buttoncart2.click();
  const buttoncart3 = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await buttoncart3.click();

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL(/.*cart.html/);

  // Klik tombol checkout
  await page.click("#checkout");
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Isi informasi checkout
  const inputPostal = page.locator("#postal-code");
  await inputPostal.fill("12345");
  await expect(inputPostal).toHaveValue("12345");

  const buttonContinue = page.locator("#continue");
  await buttonContinue.scrollIntoViewIfNeeded();
  await buttonContinue.click();

    // Verifikasi bahwa checkout gagal
  await expect(page.locator(".error-message-container.error")).toHaveText(
    "Error: First Name is required"
  );
});

test("Checkout with input last name only", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page.locator(".login_logo")).toBeVisible();

  // Login
  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");

  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Tambahkan produk ke keranjang
  const buttoncart1 = page.locator("#add-to-cart-sauce-labs-backpack");
  await buttoncart1.click();
  const buttoncart2 = page.locator("#add-to-cart-sauce-labs-onesie");
  await buttoncart2.click();
  const buttoncart3 = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await buttoncart3.click();

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL(/.*cart.html/);

  // Klik tombol checkout
  await page.click("#checkout");
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Isi informasi checkout
  const inputLastname = page.locator("#last-name");
  await inputLastname.fill("Dahayu");
  await expect(inputLastname).toHaveValue("Dahayu");

  const buttonContinue = page.locator("#continue");
  await buttonContinue.scrollIntoViewIfNeeded();
  await buttonContinue.click();

    // Verifikasi bahwa checkout gagal
  await expect(page.locator(".error-message-container.error")).toHaveText(
    "Error: First Name is required"
  );
});

test("Checkout with input first name only", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page.locator(".login_logo")).toBeVisible();

  // Login
  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");

  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Tambahkan produk ke keranjang
  const buttoncart1 = page.locator("#add-to-cart-sauce-labs-backpack");
  await buttoncart1.click();
  const buttoncart2 = page.locator("#add-to-cart-sauce-labs-onesie");
  await buttoncart2.click();
  const buttoncart3 = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await buttoncart3.click();

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL(/.*cart.html/);

  // Klik tombol checkout
  await page.click("#checkout");
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Isi informasi checkout
  const inputFirstname = page.locator("#first-name");
  await inputFirstname.fill("Arunika");
  await expect(inputFirstname).toHaveValue("Arunika");

  const buttonContinue = page.locator("#continue");
  await buttonContinue.scrollIntoViewIfNeeded();
  await buttonContinue.click();

    // Verifikasi bahwa checkout gagal
    await expect(page.locator(".error-message-container.error")).toHaveText(
      "Error: Last Name is required"
    );
});