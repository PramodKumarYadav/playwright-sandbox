# 🎭 Playwright Sandbox

I have created this repo to both practice playwright and in the process create a feature rich template project that QAs can use for their real projects for doing end to end test automation.

[![All Test runs](https://img.shields.io/badge/all_test_runs-on_browserstack-blue)](https://observability.browserstack.com/projects/playwright-sandbox/builds)

[![🚀 Trigger targeted tests on new deployments](https://github.com/PramodKumarYadav/playwright-sandbox/actions/workflows/trigger-targetted-tests-on-every-new-env-deployment.yml/badge.svg)](https://github.com/PramodKumarYadav/playwright-sandbox/actions/workflows/trigger-targetted-tests-on-every-new-env-deployment.yml)

> [!NOTE]
>
> As the name suggests, this is a draft - work in progress - project. You may refer it to get a lot of cool things out of it but
> do remember that this is not a refined project (for example, at the moment, the Readme.md (or overall design) is very raw and not yet refined).

## 🏃🏻‍♂️ Runme

```sh {"id":"01HR2FSVY5BNKH6WNMC5DVH04H","name":"Format files"}
npm run prettier
```

```bash {"id":"01HR2FPMJVH50H6XJDBNS4Y5DT","name":"Lint files"}
npm run lint
```

## 🚀 Getting Started

### Clone project

Start by cloning the repo on your local machine.

### Install dependencies

> Install NodeJS if not already installed.

Install project dependencies by running below command:

```bash {"id":"01HR2DWKKY17PPTNB0FES9551V"}
npm install
```

### Run tests

Use the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) to run the tests in the tests folder from VS Code or run the following command in the terminal:

```bash {"id":"01HR2DWKKY17PPTNB0FJ5A118B"}
npx playwright test --ui
```

## 🐞 Playwright Test report

Test report URL for the latest run in CI is available in the run itself and here:: https://pramodkumaryadav.github.io/playwright-sandbox/

> [!NOTE]
>
> - For the above report to be available, as a one time measure, a project admin or maintainer has to manually enable `Pages` settings to use `GithHub Actions` as a source for `Build and Deployment`.
> - The detailed steps are mentioned in github official docs [here: Required steps are from step 1 till 4. Step 5 is to be skipped, since we already have workflow in our repository](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow).

## Contributing to the project

### Install Husky, ESLint, and Prettier

We use a mix of [Husky](https://github.com/typicode/husky), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) within our repository to help enforce consistent coding practices.

- Husky is a tool that will install a pre-commit hook to run the linter any time before you attempt to make a commit.
- To install the pre-commit hook you will need to run

```bash {"id":"01HR2DWKKY17PPTNB0FJXFTFMV"}
npm run prepare
```

## Secrets

All secrets should be stored in CI using GitHub secrets and locally using .env.env-name files.

### Dotenv files

Secrets for each test envirnoment i.e. (local, dev, staging) are to be added in different test files such as .env.local, .env.dev, .env.staging.

You should ignore all .env\* files in .gitignore file so that we do not unintentionally commit and push secrets in our PRs.

## Reference

- [Playwright Home Page](https://playwright.dev/) 🎭 with Node.js.
- [Use Prettier for code formatting](https://prettier.io/docs/en/)
- [All prettier options that can be overriden are here](https://prettier.io/docs/en/options). However note that defaults are good enough and need no further changes except one made in `.prettierrc` file for both practical reasons and demo purposes.
- [Pre Commit hook for Code formatting](https://prettier.io/docs/en/precommit#option-1-lint-stagedhttpsgithubcomokonetlint-staged). We use option 1; and as recommended in their docs, commit `.husky` directory in git to share with all team members.
- [Runme](https://docs.runme.dev/getting-started).
