import { test, expect } from "@playwright/test";

// Testcase Checkout
test("Testcase Checkout", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Tambahkan produk ke keranjang
  await page.click('button[name="add-to-cart-sauce-labs-backpack"]');

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
  await page.goto("https://www.saucedemo.com/");

  await expect(page.locator(".login_logo")).toBeVisible();

  // Login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

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
  await page.click('button[name="add-to-cart-sauce-labs-backpack"]');

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
