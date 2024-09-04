/* eslint-disable playwright/valid-describe-callback */
import { test, expect } from "@playwright/test";
import config from "config";

test("config test @config", async ({ page }) => {
  console.log("NODE_ENV value: ", process.env.NODE_ENV);
  console.log("HOST value: ", process.env.HOST);
  console.log("config value: ", config.get("baseURL"));

  // Expect a title "to contain" a substring.
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
});

/**
 * Failing this test to test the retry mechanism and get trace in CI
 */
test.describe("Test", { tag: ["@smokey"] }, () => {
  test("has title 12", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  /**
   * Failing this test to test the retry mechanism and get trace in CI
   */
  test("get started link @smoke-test", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Click the get started link.
    await page.getByRole("link", { name: "Get started" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
  });
});
