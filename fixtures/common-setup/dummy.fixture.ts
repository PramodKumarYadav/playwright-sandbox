import { test as base } from "@playwright/test";

export const test = base.extend<{ dummy: void }>({
  dummy: async ({}, use) => {
    await use();
  },
});

test.beforeEach(async () => {
  console.log("run before every test");
});

test.afterEach(async () => {
  console.log("run after every test");
});
