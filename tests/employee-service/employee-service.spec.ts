/* eslint-disable playwright/valid-describe-callback */
import { test, expect } from "@playwright/test";

// add a comment to test changed files.

/**
 * Failing this test to test the retry mechanism and get trace in CI
 */
test.describe("Employee-service", { tag: ["@employee-service"] }, () => {
  test("has title Playwright", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  /**
   * Failing this test to test the retry mechanism and get trace in CI
   */
  test("get started link is visible @smoke-test", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Click the get started link.
    await page.getByRole("link", { name: "Gettt started" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
  });
});
