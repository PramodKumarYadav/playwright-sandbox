import { test, expect } from "../fixtures/fixtures";

const BUY_BREAD = "buy bread";
const BUY_MILK = "buy milk";
const BUY_TOMATO = "Buy Tomato";
const BUY_ONIONS = "Buy Onions";

test.describe("todo page tests @payment-service", () => {
  test("has title", async ({ todoPage }) => {
    await todoPage.addTodoItem(BUY_MILK);
    await todoPage.addTodoItem(BUY_BREAD);

    // Mark some items as done
    await todoPage.markItemAsDone(BUY_BREAD);
    await todoPage.markItemAsDone(BUY_ONIONS);

    await todoPage.filterActiveItems();
    await expect.soft(todoPage.getTodoItem(BUY_TOMATO)).toBeVisible();
    await expect.soft(todoPage.getTodoItem(BUY_MILK)).toBeVisible();
    await expect.soft(todoPage.getTodoItem(BUY_BREAD)).toBeHidden();
    await expect.soft(todoPage.getTodoItem(BUY_ONIONS)).toBeHidden();

    // await expect (page).toHaveTitle(/Playwright/);
    // await expect(page.getByLabel('Star microsoft/playwright on')).toHaveAttribute('href', "https://github.com/microsoft/playwright");
  });

  test("simple test @smoke", async ({ todoPage }) => {
    await todoPage.addTodoItem(BUY_BREAD);
    await expect.soft(todoPage.getTodoItem(BUY_BREAD)).toBeVisible();

    // await expect (page).toHaveTitle(/Playwright/);
    // await expect(page.getByLabel('Star microsoft/playwright on')).toHaveAttribute('href', "https://github.com/microsoft/playwright");
  });
});
