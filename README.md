# 🎭 Playwright Sandbox

I have created this repo to both practice playwright and in the process create a template project that can be used by teams to work on real projects for doing end to end test automation. 

## ⚙️ Setup

### Clone Project

Start by cloning the repo on your local machine. 

### Install dependencies

Install project dependencies by running below command:

```bash
npm install
```

## 🔢 Getting Started

### Running tests

Use the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) to run the tests in the tests folder from VS Code or run the following command in the terminal:

```bash
npx playwright test --ui
```

## 🐞 Playwright Test report 

- The latest [Playwright HTML Test report ](https://pramodkumaryadav.github.io/playwright-sandbox/) for the latest CI run on GitHub Actions is available on projects GitHub hosted Page.

> [!TIP]
> - If you want to get a similar report for your project repository, then after first run of workflow in CI, follow the steps [mentioned here](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-from-a-branch). In step6, select `gh-pages` branch (and not the main branch). Select /(root) and Save.
> - Once you save the above step; automatically a new deployment with name `pages-build-deployment` will be created, triggered and get visible under Actions tab. 
> - At completion of this workflow, the `playwright-report` test report will be deployed to: https://your-github-user-name.github.io/your-project-name/ . Example, for the current project it is: https://pramodkumaryadav.github.io/playwright-sandbox/).
> - From now on, whenever you push to main branch, the pages will be deployed automatically under above workflow and URL.

> [!IMPORTANT]
> - Note that, the very first CI run of workflow `playwright-on-ubuntu` will create a new branch named `gh-pages` in remote repository. This is created by workflow action `crazy-max/ghaction-github-pages@v4`. You do not need to (and should not need to) create the `gh-pages` branch manually. 
> - You also do NOT need to set the ${{ secrets.GITHUB_TOKEN }} in secrets for this to work. It works out of box automatically.

## ※ Reference

- [Playwright Home Page](https://playwright.dev/) 🎭 with Node.js.



