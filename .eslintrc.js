module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true, 
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021, 
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "error",
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2],
    "no-multiple-empty-lines": ["error", { max: 2, maxBOF: 1, maxEOF: 0 }],
  },
};
