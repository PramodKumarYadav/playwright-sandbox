import { test as base, expect } from "@playwright/test";

export const test = base.extend<{ saveScreenshots: void }>({
  saveScreenshots: [
    async ({ page }, use) => {
      console.log("running screenshotFixture...");
      await use();
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
    },
    { auto: false },
  ],
});

export { expect } from "@playwright/test";
