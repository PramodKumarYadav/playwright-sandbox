import { test as base, expect } from "@playwright/test";

export const test = base.extend<{ consoleEventListner: void }>({
  consoleEventListner: [
    async ({ page }, use) => {
      console.log("Listening to console events...");
      page.on("console", async (msg) => {
        console.log(msg.text());
        expect.soft(msg.type(), `for console msg => ${msg.text()}`).not.toEqual("error");
      });
      page.on("pageerror", async (error) => {
        console.log(`Found an error: ${error.name}, ${error.message}`);
        // eslint-disable-next-line playwright/no-standalone-expect
        expect.soft(error.name, `for error => ${error.message}`).not.toEqual("Error");
      });
      await use();
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
