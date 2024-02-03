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
  root: true,
  // rules: {
  //   "no-console": 0,
  //   "no-restricted-syntax": [
  //     "error",
  //     {
  //       selector: "CallExpression[callee.property.name='only']",
  //       message: "We don't want to leave .only on our tests😱",
  //     },
  //   ],
  // },
  settings: {
    playwright: {
      additionalAssertFunctionNames: ["assertCustomCondition"],
    },
  },
};
