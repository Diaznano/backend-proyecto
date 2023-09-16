module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true, 
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021, 
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",
    semi: ["error", "always"],
    "@typescript-eslint/no-var-requires": "off",
    quotes: ["error", "double"],
    indent: ["error", 2],
    "comma-dangle": ["error", "always-multiline"],
    "no-multiple-empty-lines": ["error", { max: 2, maxBOF: 1, maxEOF: 0 }],
  },
};
