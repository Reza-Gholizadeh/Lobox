/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    env: { browser: true, es2022: true, node: true },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module", project: "./tsconfig.json" },
    plugins: ["react", "@typescript-eslint"],
    rules: {
      "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  };