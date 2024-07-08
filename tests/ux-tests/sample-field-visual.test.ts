import { test, expect } from "@playwright/test";

test("Validate get started field @visual-test", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect.soft(page).toHaveTitle(/Playwright/);

  const getStarted = page.getByRole("link", { name: "Get started" });
  await expect.soft(getStarted).toHaveScreenshot({
    maxDiffPixels: 500,
    maxDiffPixelRatio: 0.1,
  });
});
