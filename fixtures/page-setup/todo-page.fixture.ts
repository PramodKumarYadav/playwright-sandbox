import { test as base } from "@playwright/test";
import { TodoPage } from "../../pages/TodoPage";

// Declare the types of your fixtures.
// type MyFixtures = {
//   todoPage: TodoPage;
// };

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    // Set up the fixture.
    console.log("todPage: Initializing and seeding data...");
    const todoPage = new TodoPage(page);
    await todoPage.navigate();
    await todoPage.addTodoItem("Buy Onions");
    await todoPage.addTodoItem("Buy Tomato");

    // Use the fixture value in the test.
    await use(todoPage);

    // Clean up the fixture.
    console.log("todPage: tearing down...");
    // await todoPage.addTodoItem("Clean up");
  },
});

export { expect } from "@playwright/test";
