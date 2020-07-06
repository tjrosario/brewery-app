module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    "globals": {
      "Atomics": 'readonly',
      "SharedArrayBuffer": 'readonly'
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    "settings": {
      "react": { "version": 'detect' }
    }
};
