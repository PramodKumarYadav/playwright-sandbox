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

- Test report in CI is available in the latest workflow run as a URL under `publish-results` step. You can also refer the latest report [here](https://pramodkumaryadav.github.io/playwright-sandbox/).

> [!TIP]
> - To get a similar test report for your project, [follow step 1 till step3 of this article](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow). Thats it!
> -  Now every time the workflow runs, you will have test results published on GitHub Pages with the link of URL mentioned in the publish-results step as show in below image. ![results-url](./docs/results-url.png)

## ※ Reference

- [Playwright Home Page](https://playwright.dev/) 🎭 with Node.js.



