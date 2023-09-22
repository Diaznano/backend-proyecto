module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "process": true, 
  },
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "no-console": "off",
    "no-unused-vars": "error",
    'object-curly-spacing': ['error', 'always'],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2],
    "no-multiple-empty-lines": ["error", { max: 2, maxBOF: 1, maxEOF: 0 }],
  }
};
