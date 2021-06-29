const eslintConfig = require("./eslint-configs/eslint");
const importConfig = require("./eslint-configs/import");
const typeScriptEslintConfig = require("./eslint-configs/@typescript-eslint");

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["import", "jest", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended"
  ],
  "settings": {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"]
      }
    }
  },
  rules: {
    ...eslintConfig,
    ...importConfig,
    ...typeScriptEslintConfig
  }
}
