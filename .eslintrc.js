module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // `.jsx` extension cannot be used with React Native
    // https://github.com/airbnb/javascript/issues/982
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': 0, // this is better for writing code from general to details
    'object-curly-newline': 0, // sometimes object fits into one line
    'arrow-parens': 0, // prettier does either all with parens or all without
    'function-paren-newline': 0, // prettier doesn't have a config for this
    'arrow-body-style': 0, // no problem with this format: ()=>{ return value };
    'global-require': 0, // in RN we import images with 'require' function
    indent: 0, // Prettier handles indents
    'no-restricted-syntax': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    // this one doesn't understand complex cases
    // FIXME: remove when all cores are in their own packages
    'import/no-extraneous-dependencies': 0,
    'linebreak-style': 0, // Git converts linebreak to CRLF for Windows
    'class-methods-use-this': 0,
    'no-underscore-dangle': [2, { allow: ['__'] }], // allow __ for Ramda
    'react/no-multi-comp': 0,
    'no-nested-ternary': 0,
    curly: 2,
    'lines-between-class-members': 0,
    'operator-linebreak': 0,
    'react/destructuring-assignment': 0,
    'implicit-arrow-linebreak': 0,
    'no-else-return': 0,
    camelcase: 0,
    'no-continue': 0,
    'no-unused-expressions': 0,
    'react/jsx-one-expression-per-line': 0,
    }
};