import { mergeTests } from "@playwright/test";
import { test as saveLogs } from "./common-setup/save-logs-to-file.fixture";
import { test as saveScreenshots } from "./common-setup/save-screenshots.fixture";
import { test as axeBuilder } from "./common-setup/axe-builder.fixture";
import { test as setupDatabase } from "./common-setup/database-setup.fixture";
// import { test as seedTodoList } from './seedTodoList.fixture';
import { test as dummyTest } from "./common-setup/dummy.fixture";
import { test as networkResponseAssert } from "./common-setup/assert-network-response.fixture";
import { test as consoleEventListener } from "./common-setup/console-event-listener.fixture";
import { test as smoke } from "./common-setup/custom-annotation-smoke.fixture";

// add another comment to test changed files.
export const test = mergeTests(
  saveLogs,
  saveScreenshots,
  axeBuilder,
  setupDatabase,
  dummyTest,
  networkResponseAssert,
  consoleEventListener,
  smoke,
);

export { expect } from "@playwright/test";
