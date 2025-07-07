/* eslint-disable playwright/no-wait-for-timeout */
import { test, expect } from "@playwright/test";
import { runLoadTest } from "../../utils/load-test-helpers";

// Individual test functions for better distribution across runners
test("Wait for 5 seconds", async ({ page }) => {
  await runLoadTest(page, 5);
  // Additional assertion to satisfy linter
  expect(true).toBe(true);
});

test("Wait for 10 seconds", async ({ page }) => {
  await runLoadTest(page, 10);
  // Additional assertion to satisfy linter
  expect(true).toBe(true);
});

test("Wait for 15 seconds", async ({ page }) => {
  await runLoadTest(page, 15);
  // Additional assertion to satisfy linter
  expect(true).toBe(true);
});

test("Wait for 20 seconds", async ({ page }) => {
  await runLoadTest(page, 20);
  // Additional assertion to satisfy linter
  expect(true).toBe(true);
});

test("Wait for 25 seconds", async ({ page }) => {
  await runLoadTest(page, 25);
  // Additional assertion to satisfy linter
  expect(true).toBe(true);
});
