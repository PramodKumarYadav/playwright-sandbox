import { expect, Page, Locator } from "@playwright/test";

export class TodoPage {
  // private readonly page : Page;
  // private readonly todoInput: Locator;

  /**
   * @param page
   * Parameter properties (like page) are assigned at the very start of the constructor
   * (before field initializers run), which is why field initializers like todoInput
   * can safely reference this.page - even if they appear earlier in the source code.
   * At the time todoInput is initialized, this.page has already been initialized,
   * so there's no "used before initialization" error.
   */
  constructor(private readonly page: Page) {
    // TypeScript automatically generates this property:
    // private readonly page: Page;
    // and assigns it: this.page = page;
  }
  /**
   * FIRST THOUGHT WAS TO USE THIS APPROACH:
   * If a locator field is used more than once, extract it as a property of the page object.
   * If not, use locator directly in the method.
   */

  /**
   * FINALLY, I REALIZED THAT THIS APPROACH IS BETTER:
   * EVEN if a locator field is used only once, define it as a field variable with a meaningful name.
   * Why? Because it makes the methods more readable by substituting the locator implementation
   * with a meaningful name (that tells about the intention hidden in the locator).
   */

  /**
   * For dynamic locators, use a method that takes the input as a value that changes and
   *  returns a locator.
   * Example:
   * In this refactored code, todoItem is a function that takes a
   * string item and returns a Locator. You can use this function to
   *  get a locator for a specific todo item
   */
  private readonly todoInput: Locator = this.page.getByPlaceholder(
    "What needs to be done?",
  );

  public getTodoItem(item: string): Locator {
    return this.page.locator("li").filter({ hasText: item });
  }
  // Either Assign above function to below variable to get selected item.
  private readonly specificTodoItem: (item: string) => Locator = this.getTodoItem;

  // OR use the fuction and do more operations on it.
  private readonly specificTodoItemCheckbox: (item: string) => Locator = (item: string) =>
    this.getTodoItem(item).getByLabel("Toggle Todo");

  // OR As below where dont specify the type of function in variable but use the function return type implicitly.
  private readonly specificTodoItemCheckbox2 = (item: string) =>
    this.page.locator("li").filter({ hasText: item }).getByLabel("Toggle Todo");

  // private readonly specificTodoItem: (item: string)  => Locator = (item: string) => this.page.locator('li').filter({ hasText: item });
  // private readonly specificTodoItemCheckbox: (item: string)  => Locator = (item: string) => this.page.locator('li').filter({ hasText: item }).getByLabel('Toggle Todo');
  private readonly activeItemsButton: Locator = this.page.getByRole("link", {
    name: "Active",
  });

  async navigate() {
    await this.page.goto("https://demo.playwright.dev/todomvc/#/");
    // await this.page.goto('https://playwright.dev/');
  }

  // public getItemByName(item: string) {
  //   return this.specificTodoItem(item);
  // }

  async addTodoItem(item: string) {
    await this.todoInput.click();
    await this.todoInput.fill(item);
    await this.todoInput.press("Enter");
    // await expect(this.page.getByText(item)).toBeVisible();
    await expect(this.specificTodoItem(item)).toBeVisible();
  }

  async markItemAsDone(item: string) {
    // await this.page.locator('li').filter({ hasText: item }).getByLabel('Toggle Todo').check();
    await this.specificTodoItemCheckbox(item).check();
    await expect(this.specificTodoItem(item)).toHaveClass("completed");
  }

  async filterActiveItems() {
    await this.activeItemsButton.click();
  }
}
