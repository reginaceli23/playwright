import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Proses Login
  // Go to website
  await page.goto("https://www.saucedemo.com/");

  // Verification logo appear
  await expect(page.locator(".login_logo")).toBeVisible();
    // const logoVisible = expect(page.locator(".login_logo")).toBeVisible();
    // await logoVisible;

  // Fill authentication
  await page.fill('input[name="user-name"]', "standard_user");
  await page.fill('input[name="password"]', "secret_sauce");
  await page.click("#login-button");
  await expect(page).toHaveURL(/inventory.html/);
});

test("Verifikasi item pertama bisa ditambahkan ke keranjang", async ({page}) => {
  // Verifikasi item button cart
  await page.locator(".inventory_item button").first().click();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  // const item = page.locator(".inventory_item button").first(); 
  // await item.click();
});

test("Verifikasi logout berhasil", async ({ page }) => {
  await page.click("#react-burger-menu-btn");
  await page.click("#logout_sidebar_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test("Testcase Checkout successfully", async ({ page }) => {
  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
  // Sauce Labs Fleece Jacket
  await page.click("#add-to-cart-sauce-labs-fleece-jacket");

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");

  // Isi informasi checkout
  await page.fill("#first-name", "John");
  await page.fill("#last-name", "Doe");
  await page.fill("#postal-code", "12345");
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await page.click("#continue");

  // Selesaikan proses checkout
  await page.click("#finish");

  // Verifikasi bahwa checkout berhasil
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!"
  );
});

test("Testcase Checkout with cart", async ({ page }) => {
  // Pilih Cart
  await page.click("#item_4_title_link > div");
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/inventory-item.html?id=4"
  );

  // Tambahkan produk ke keranjang
  await page.click("#add-to-cart");
  //   await page.click('button[id="add-to-cart"]');

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");

  // Isi informasi checkout
  await page.fill("#first-name", "Arunika");
  await page.fill("#last-name", "Dahayu");
  await page.fill("#postal-code", "12345");
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await page.click("#continue");

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

test("Testcase Checkout input postal code", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
  // Sauce Labs Fleece Jacket
  await page.click("#add-to-cart-sauce-labs-fleece-jacket");

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");

  // Isi informasi checkout
  // await page.fill("#first-name", "John");
  // await page.fill("#last-name", "Doe");
  await page.fill("#postal-code", "12345");
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await page.click("#continue");

  // Verifikasi bahwa checkout gagal
  await expect(page.locator(".error-message-container.error")).toHaveText(
    "Error: First Name is required"
  );
});

test("Testcase Checkout input first name", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
  // Sauce Labs Fleece Jacket
  await page.click("#add-to-cart-sauce-labs-fleece-jacket");

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");

  // Isi informasi checkout
  await page.fill("#first-name", "Arunika");
  // await page.fill("#last-name", "Dahayu");
  // await page.fill("#postal-code", "12345");
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await page.click("#continue");

  // Verifikasi bahwa checkout gagal
  await expect(page.locator(".error-message-container.error")).toHaveText(
    "Error: Last Name is required"
  );
});

test("Testcase Checkout input last name", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
  // Sauce Labs Fleece Jacket
  await page.click("#add-to-cart-sauce-labs-fleece-jacket");

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");

  // Isi informasi checkout
  // await page.fill("#first-name", "Arunika");
  await page.fill("#last-name", "Dahayu");
  // await page.fill("#postal-code", "12345");
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await page.click("#continue");

  // Verifikasi bahwa checkout gagal
  await expect(page.locator(".error-message-container.error")).toHaveText(
    "Error: First Name is required"
  );
});

test("Testcase Checkout without fill information", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
  // Sauce Labs Fleece Jacket
  await page.click("#add-to-cart-sauce-labs-fleece-jacket");

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");

  // Isi informasi checkout
  // await page.fill("#first-name", "Arunika");
  // await page.fill("#last-name", "Dahayu");
  // await page.fill("#postal-code", "12345");
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await page.click("#continue");

  // Verifikasi bahwa checkout gagal
  await expect(page.locator(".error-message-container.error")).toHaveText(
    "Error: First Name is required"
  );
});

test("Checkout with cart and back to home", async ({ page }) => {
  // Pilih Cart
  // Sauce Labs Backpack                                
  await page.click("#item_4_title_link > div");
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/inventory-item.html?id=4"
  );

  // Tambahkan produk ke keranjang
  await page.click("#add-to-cart");
  //   await page.click('button[id="add-to-cart"]');

  // Pergi ke halaman keranjang
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  await page.click("#checkout");

  // Isi informasi checkout
  await page.fill("#first-name", "Arunika");
  await page.fill("#last-name", "Dahayu");
  await page.fill("#postal-code", "12345");
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await page.click("#continue");

  // Selesaikan proses checkout
  await page.click("#finish");
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );

  // Verifikasi bahwa checkout berhasil
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!"
  );

  // Click button back home
  await page.click("#back-to-products");
  // await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page).toHaveURL(/inventory.html/);

});
