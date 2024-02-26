import { test as base } from "@playwright/test";

export const test = base.extend<{ smoke: void }>({
  smoke: [
    async ({}, use, testInfo) => {
      testInfo.annotations.push({ type: "smoke", description: "smoke test" });
      await use();
    },
    { auto: false },
  ],
});

export { expect } from "@playwright/test";
