module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:playwright/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json", // Specify the path to your tsconfig.json file
  },
  root: true,
  settings: {
    playwright: {
      additionalAssertFunctionNames: ["assertCustomCondition"],
    },
  },
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "playwright/missing-playwright-await": "off",
  },
};
