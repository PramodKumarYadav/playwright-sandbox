/* eslint-disable playwright/valid-describe-callback */
import { test, expect } from "@playwright/test";

// add a comment to test changed files.

/**
 * Failing this test to test the retry mechanism and get trace in CI
 */
test.describe("slow test 7", { tag: ["@employee-service"] }, () => {
  test("has title Playwright", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
    await page.waitForTimeout(60000);
  });
});
