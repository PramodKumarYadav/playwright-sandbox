import { test, expect } from "@playwright/test";
import { runLoadTest } from "@apps/load-test-helpers2";

test.describe("Test group", () => {
  test("seed", async ({ page }) => {
    // generate code here.
    await runLoadTest(page, 5);
    console.log("This is a seed test.");
    expect(true).toBe(true);
  });
});
