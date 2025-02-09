import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Proses Login
  // Go to website
  await page.goto("https://www.saucedemo.com/");

  // Verification logo appear
  const logo = page.locator(".login_logo");
  await expect(logo).toBeVisible();
  await expect(logo).toHaveText("Swag Labs");
  console.log("logo visible");

  // Fill authentication
  const inputUsername = page.locator("#user-name");
  await inputUsername.fill("standard_user");
  await expect(inputUsername).toHaveValue("standard_user");
  const inputPassword = page.locator("#password");
  await inputPassword.fill("secret_sauce");
  await expect(inputPassword).toHaveValue("secret_sauce");

  // Click button login
  const buttonLogin = page.locator("#login-button");
  await buttonLogin.click();

  // Verifikasi apakah login berhasil
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("Verifikasi logout berhasil", async ({ page }) => {
  // click sidemenu
  const logout = page.locator("#react-burger-menu-btn");
  await logout.click();

  // click logoutlink
  const logoutlink = page.locator("#logout_sidebar_link");
  await logoutlink.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/"); // redirect to login page
});

test("Verifikasi item bisa ditambahkan ke keranjang", async ({ page }) => {
  // Verifikasi item button cart
    // Sauce Labs Backpack
  const backpack = page.locator("#add-to-cart-sauce-labs-backpack");
  await backpack.click();
    // Sauce Labs Bolt T-Shirt
  const bolt_t_shirt = page.locator("#add-to-cart-sauce-labs-bolt-t-shirt");
  await bolt_t_shirt.click();

  const itembutton = page.locator(".shopping_cart_badge");
  await expect(itembutton).toBeVisible();
  await expect(itembutton).toHaveText("2");
});

// Testcase checkout
test("Testcase checkout succesfully", async ({ page }) => {
  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  const backpack = page.locator("#add-to-cart-sauce-labs-backpack");
  await backpack.click();
  // Sauce Labs Onesie
  const onesie = page.locator("#add-to-cart-sauce-labs-onesie");
  await onesie.click();
  // Sauce Labs Fleece Jacket
  const fleece_jacket = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await fleece_jacket.click();

  // Pergi ke halaman keranjang
  const cart = page.locator(".shopping_cart_link");
  await cart.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  const buttoncheckout = page.locator("#checkout");
  await buttoncheckout.click();

  // Verifikasi checkout
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );

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
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await buttonContinue.click();

  // Verifikasi berhasil input data
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );

  // Proses Checkout
  const buttonFinish = page.locator("#finish");
  await page.locator("#finish").scrollIntoViewIfNeeded();
  await buttonFinish.click();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );

  // Verifikasi bahwa checkout berhasil
  const successMessage = page.locator(".complete-header");
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText("Thank you for your order!");
});

test("Testcase Checkout with cart", async ({ page }) => {
  // Pilih Cart
  // Sauce Labs Backpack
  const linkcartBackpack = page.locator("#item_4_title_link > div");
  await linkcartBackpack.click();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/inventory-item.html?id=4"
  );

  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  const addcartBackpack = page.locator("#add-to-cart");
  await addcartBackpack.click();

  // Pergi ke halaman keranjang
  const cartlink = page.locator(".shopping_cart_link");
  await cartlink.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  const buttoncheckout = page.locator("#checkout");
  await buttoncheckout.click();

  // Verifikasi checkout
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );

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
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await buttonContinue.click();

  // Verifikasi berhasil input data
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );

  // Proses Checkout
  const buttonFinish = page.locator("#finish");
  await page.locator("#finish").scrollIntoViewIfNeeded();
  await buttonFinish.click();
  await page.waitForURL("https://www.saucedemo.com/checkout-complete.html"); // Tunggu sampai URL berubah
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  ); // Verifikasi URL benar
  console.log("Thank you for your order!");

  // Verifikasi bahwa checkout berhasil
  const successMessage = page.locator(".complete-header");
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText("Thank you for your order!");
});

test("Checkout without input information", async ({ page }) => {
  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  const Backpack = page.locator("#add-to-cart-sauce-labs-backpack");
  await Backpack.click();
  // Sauce Labs Onesie
  const Onesie = page.locator("#add-to-cart-sauce-labs-onesie");
  await Onesie.click();
  // Sauce Labs Fleece Jacket
  const Fleece_jacket = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await Fleece_jacket.click();

  // Pergi ke halaman keranjang
  const cart = page.locator(".shopping_cart_link");
  await cart.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  const buttoncheckout = page.locator("#checkout");
  await buttoncheckout.click();

  // Verifikasi checkout
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );

  // Without fill informasi checkout
  // Click button continue
  const buttonContinue = page.locator("#continue");
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await buttonContinue.click();

  // Verifikasi pesan error muncul checkout gagal
  const errorMessage = page.locator(".error-message-container.error");
  await expect(errorMessage).toBeVisible(); // Tunggu sampai pesan error muncul
  await expect(errorMessage).toHaveText("Error: First Name is required"); // Verifikasi teks error
  console.log("Error: First Name is required");
});

test("Checkout with input postal code only", async ({ page }) => {
  // Tambahkan produk ke keranjang
    // Sauce Labs Backpack
  const backpack = page.locator("#add-to-cart-sauce-labs-backpack");
  await backpack.click();
    // Sauce Labs Onesie
  const onesie = page.locator("#add-to-cart-sauce-labs-onesie");
  await onesie.click();
    // Sauce Labs Fleece Jacket
  const fleece_jacket = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await fleece_jacket.click();

  // Pergi ke halaman keranjang
  const cartlink = page.locator(".shopping_cart_link");
  await cartlink.click();
  await expect(page).toHaveURL(/.*cart.html/);

  // Klik tombol checkout
  const checkout = page.locator("#checkout");
  await checkout.click();
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Isi informasi checkout
  const inputPostal = page.locator("#postal-code");
  await inputPostal.fill("12345");
  await expect(inputPostal).toHaveValue("12345");

  // Click button continue
  const buttonContinue = page.locator("#continue");
  await buttonContinue.scrollIntoViewIfNeeded();
  await buttonContinue.click();

  // Verifikasi pesan error muncul checkout gagal
  const errorMessage = page.locator(".error-message-container.error");
  await expect(errorMessage).toBeVisible(); // Tunggu sampai pesan error muncul
  await expect(errorMessage).toHaveText("Error: First Name is required"); // Verifikasi teks error
  console.log("Error: First Name is required");
});

test("Checkout with input last name only", async ({ page }) => {
  // Tambahkan produk ke keranjang
    // Sauce Labs Backpack
  const backpack = page.locator("#add-to-cart-sauce-labs-backpack");
  await backpack.click();
    // Sauce Labs Onesie
  const onesie = page.locator("#add-to-cart-sauce-labs-onesie");
  await onesie.click();
    // Sauce Labs Fleece Jacket
  const fleece_jacket = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await fleece_jacket.click();

  // Pergi ke halaman keranjang
  const cartlink = page.locator(".shopping_cart_link");
  await cartlink.click();
  await expect(page).toHaveURL(/.*cart.html/);

  // Klik tombol checkout
  const checkout = page.locator("#checkout");
  await checkout.click();
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Isi informasi checkout
  const inputLastname = page.locator("#last-name");
  await inputLastname.fill("Dahayu");
  await expect(inputLastname).toHaveValue("Dahayu");

  // Click button continue
  const buttonContinue = page.locator("#continue");
  await buttonContinue.scrollIntoViewIfNeeded();
  await buttonContinue.click();

  // Verifikasi pesan error muncul checkout gagal
  const errorMessage = page.locator(".error-message-container.error");
  await expect(errorMessage).toBeVisible(); // Tunggu sampai pesan error muncul
  await expect(errorMessage).toHaveText("Error: First Name is required"); // Verifikasi teks error
  console.log("Error: First Name is required");
});

test("Checkout with input first name only", async ({ page }) => {
  // Tambahkan produk ke keranjang
    // Sauce Labs Backpack
  const backpack = page.locator("#add-to-cart-sauce-labs-backpack");
  await backpack.click();
    // Sauce Labs Onesie
  const onesie = page.locator("#add-to-cart-sauce-labs-onesie");
  await onesie.click();
    // Sauce Labs Fleece Jacket
  const fleece_jacket = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
  await fleece_jacket.click();

  // Pergi ke halaman keranjang
  const cartlink = page.locator(".shopping_cart_link");
  await cartlink.click();
  await expect(page).toHaveURL(/.*cart.html/);

  // Klik tombol checkout
  const checkout = page.locator("#checkout");
  await checkout.click();
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // Isi informasi checkout
  const inputLastname = page.locator("#first-name");
  await inputLastname.fill("Arunika");
  await expect(inputLastname).toHaveValue("Arunika");

  // Click button continue
  const buttonContinue = page.locator("#continue");
  await buttonContinue.scrollIntoViewIfNeeded();
  await buttonContinue.click();

  // Verifikasi pesan error muncul checkout gagal
  const errorMessage = page.locator(".error-message-container.error");
  await expect(errorMessage).toBeVisible(); // Tunggu sampai pesan error muncul
  await expect(errorMessage).toHaveText("Error: Last Name is required"); // Verifikasi teks error
  console.log("Error: Last Name is required");
});

test("Checkout with cart and back to home", async ({ page }) => {
  // Pilih Cart
  // Sauce Labs Backpack
  const linkcartBackpack = page.locator("#item_4_title_link > div");
  await linkcartBackpack.click();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/inventory-item.html?id=4"
  );

  // Tambahkan produk ke keranjang
  // Sauce Labs Backpack
  const addcartBackpack = page.locator("#add-to-cart");
  await addcartBackpack.click();

  // Pergi ke halaman keranjang
  const cartlink = page.locator(".shopping_cart_link");
  await cartlink.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Klik tombol checkout
  const buttoncheckout = page.locator("#checkout");
  await buttoncheckout.click();

  // Verifikasi checkout
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );

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
  await page.locator("#continue").scrollIntoViewIfNeeded();
  await buttonContinue.click();

  // Verifikasi berhasil input data
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );

  // Proses Checkout
  const buttonFinish = page.locator("#finish");
  await page.locator("#finish").scrollIntoViewIfNeeded();
  await buttonFinish.click();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );

  // Verifikasi bahwa checkout berhasil
  const successMessage = page.locator(".complete-header");
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText("Thank you for your order!");
  console.log("Thank you for your order!");

  // Click button back home
  const backhome = page.locator("#back-to-products");
  await backhome.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  console.log("product item");
});
