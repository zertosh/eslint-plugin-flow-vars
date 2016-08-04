## THIS PROJECT IS DEPRECATED

The functionality provided by `eslint-plugin-flow-vars` has been merge into [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype).

To migrate, [install](https://github.com/gajus/eslint-plugin-flowtype#installation) `eslint-plugin-flowtype@2.4.0` or higher, and update your eslint config like this:

```diff
{
  "parser": "babel-eslint",
  "plugins": [
-    "flow-vars"
+    "flowtype"
  ],
  "rules": {
-    "flow-vars/define-flow-type": 1,
-    "flow-vars/use-flow-type": 1
+    "flowtype/define-flow-type": 1,
+    "flowtype/use-flow-type": 1
  }
}
```

# eslint-plugin-flow-vars

[![Build Status](https://travis-ci.org/zertosh/eslint-plugin-flow-vars.svg?branch=master)](https://travis-ci.org/zertosh/eslint-plugin-flow-vars)

An [eslint](https://github.com/eslint/eslint) plugin that makes flow type annotations global variables and marks declarations as used. Solves the problem of false positives with `no-undef` and `no-unused-vars` when using [`babel-eslint`](https://github.com/babel/babel-eslint).

## Usage

```sh
npm install eslint babel-eslint eslint-plugin-flow-vars
```

In your `.eslintrc`:

```json
{
  "parser": "babel-eslint",
  "plugins": [
    "flow-vars"
  ],
  "rules": {
    "flow-vars/define-flow-type": 1,
    "flow-vars/use-flow-type": 1
  }
}
```
