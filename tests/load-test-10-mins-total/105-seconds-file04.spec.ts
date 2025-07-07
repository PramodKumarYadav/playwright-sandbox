/* eslint-disable playwright/no-wait-for-timeout */
import { test, expect } from "@playwright/test";

// Define different test durations
const testDurations = [5, 10, 15, 20, 25, 30]; // seconds

testDurations.forEach((duration) => {
  test(`Wait for ${duration} seconds`, async ({ page }) => {
    // Navigate to the page before starting the load test.
    await page.goto("https://demo.playwright.dev/todomvc");

    // This test simulates a load test that runs for the specified duration.
    const startTime = Date.now();
    while (Date.now() - startTime < duration * 1000) {
      // Do nothing, just wait.
      await page.waitForTimeout(1000);
    }
    // Assert that the test ran for the expected duration.
    const elapsedTime = Date.now() - startTime;
    expect(elapsedTime).toBeGreaterThanOrEqual(duration * 1000);
    console.log(`Load test completed in ${elapsedTime / 1000} seconds`);
  });
});
