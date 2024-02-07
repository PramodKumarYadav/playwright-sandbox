import { test, expect } from "@playwright/test";
import { loadEnv } from "../env/load-env";

test.beforeAll(async () => {
  // Load environment variables based on NODE_ENV
  loadEnv();
});

test("env variables @env-test", async ({ page }) => {
  console.log("test env: ", process.env.DB_HOST);

  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("has title @unit-test", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  await expect(page).toHaveScreenshot("playwright.png");
});

test("get started link @smoke-test", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
});
