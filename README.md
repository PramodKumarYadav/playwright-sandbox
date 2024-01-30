# 🎭 Playwright Sandbox

I have created this repo to both practice playwright and in the process create a feature rich template project that QAs can use for their real projects for doing end to end test automation. 

[![Multi machine - Run Tests and Publish test results to GitHub Pages](https://github.com/PramodKumarYadav/playwright-sandbox/actions/workflows/recommended-sharded-run-tests-on-container-and-publish-results-in-same-workflow.yml/badge.svg?branch=main)](https://github.com/PramodKumarYadav/playwright-sandbox/actions/workflows/recommended-sharded-run-tests-on-container-and-publish-results-in-same-workflow.yml)

## 🚀 Getting Started

### Clone project

Start by cloning the repo on your local machine. 

### Install dependencies

> Install NodeJS if not already installed.

Install project dependencies by running below command:

```bash
npm install
```

### Run tests

Use the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) to run the tests in the tests folder from VS Code or run the following command in the terminal:

```bash
npx playwright test --ui
```

## 🐞 Playwright Test report 

Test report URL for the latest run in CI is available in the run itself and here:: https://pramodkumaryadav.github.io/playwright-sandbox/

> [!NOTE]
> - For the above report to be available, as a one time measure, a project admin or maintainer has to manually enable `Pages` settings to use `GithHub Actions` as a source for `Build and Deployment`.
> - The detailed steps are mentioned in github official docs [here: Required steps are from step 1 till 4. Step 5 is to be skipped, since we already have workflow in our repository](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow). 

## ※ Reference

- [Playwright Home Page](https://playwright.dev/) 🎭 with Node.js.



