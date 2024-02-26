import * as debug from "debug";
import * as fs from "fs";
import { test as base } from "@playwright/test";

export const test = base.extend<{ saveLogs: void }>({
  saveLogs: [
    async ({}, use, testInfo) => {
      // Collecting logs during the test.
      console.log("Collecting logs during the test.");
      const logs: string[] = [];
      debug.log = (...args: string[]) => logs.push(args.map(String).join(""));
      debug.enable("myserver");

      await use();

      // After the test we can check whether the test passed or failed.
      console.log("write logs to file");
      // if (testInfo.status !== testInfo.expectedStatus) {
      // outputPath() API guarantees a unique file name.
      console.log(
        `Running test "${testInfo.title}" failed! Saving logs into ${testInfo.outputPath("logs.txt")}`,
      );
      const logFile = testInfo.outputPath("logs.txt");
      await fs.promises.writeFile(logFile, logs.join("\n"), "utf8");
      testInfo.attachments.push({
        name: "logs",
        contentType: "text/plain",
        path: logFile,
      });
      // }
    },
    { auto: false },
  ],
});

export { expect } from "@playwright/test";
