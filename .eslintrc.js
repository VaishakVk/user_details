module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: "latest",
    },
    overrides: [
        {
            files: ["**/test.js"],
            env: {
                jest: true,
            },
        },
    ],
    rules: {
        quotes: ["error", "double"],
        complexity: ["error", 8],
        "dot-notation": "warn",
        "no-console": [
            "warn",
            {
                allow: ["warn", "error", "info"],
            },
        ],
        "no-else-return": "warn",
        "no-unneeded-ternary": "warn",
        "no-unused-expressions": "error",
        "no-useless-return": "warn",
        "no-var": "warn",
        "object-shorthand": "warn",
        "one-var": ["warn", "never"],
        "prefer-arrow-callback": "warn",
        "prefer-const": [
            "warn",
            {
                destructuring: "all",
            },
        ],
    },
};
