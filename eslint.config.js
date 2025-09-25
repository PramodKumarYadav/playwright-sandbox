// eslint.config.js

import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";

export default [
  // Base configuration for all files
  js.configs.recommended,

  // Ignore files
  {
    ignores: [
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "**/*.png",
      "**/*.cjs",
    ],
  },

  // JavaScript files configuration
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
  },

  // TypeScript files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        localStorage: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...playwright.configs.recommended.rules,
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/ban-types": "off", // Disable this rule as it's causing issues
      "@typescript-eslint/no-unsafe-function-type": "off", // Disable this rule to allow Function type
      "no-import-assign": "off", // Allow import assignment for testing purposes
    },
    settings: {
      playwright: {
        additionalAssertFunctionNames: ["assertCustomCondition"],
      },
    },
  },
];
