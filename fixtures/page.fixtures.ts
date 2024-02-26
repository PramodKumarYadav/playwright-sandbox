import { mergeTests } from "@playwright/test";
import { test as todoPage } from "./page-setup/todo-page.fixture";

export const test = mergeTests(todoPage);

export { expect } from "@playwright/test";
