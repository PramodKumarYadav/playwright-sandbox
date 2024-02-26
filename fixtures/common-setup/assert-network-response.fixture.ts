import { test as base, expect } from "@playwright/test";

export const test = base.extend<{ network: void }>({
  network: async ({}, use) => {
    await use();
  },
});

test.beforeEach(async ({ page }) => {
  console.log("Register response event before every test");
  page.on("response", (response) => {
    expect.soft(response.status(), `failed for URL: ${response.url()}`).toBeLessThan(400);
  });
});

test.afterEach(async () => {
  console.log("run after every test");
});
