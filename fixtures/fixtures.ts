import { mergeTests } from "@playwright/test";
import { test as pageFixtures } from "./page.fixtures";
import { test as commonFixtures } from "./common.fixtures";

export const test = mergeTests(commonFixtures, pageFixtures);

export { expect } from "@playwright/test";
