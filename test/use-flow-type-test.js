'use strict';

var rule = require('../use-flow-type');
var noUnusedVarsRule = require('eslint/lib/rules/no-unused-vars');

var RuleTester = require('eslint').RuleTester;
RuleTester.prototype.defineRule('use-flow-type', rule);

var A_NOT_USED = '"A" is defined but never used';

var NOW_VALID = [
  {
    code: 'declare class A {}',
    errors: [A_NOT_USED]
  },
  {
    code: 'declare module A {}',
    errors: [A_NOT_USED]
  },
  {
    code: 'declare module A { declare var a: Y }',
    errors: [A_NOT_USED]
  },
  {
    code: 'declare function A(): Y',
    errors: [A_NOT_USED]
  },
  {
    code: 'declare var A: Y',
    errors: [A_NOT_USED]
  },
  {
    code: 'import type A from "a"; (function<T: A>(): T {})',
    errors: [A_NOT_USED]
  },
  {
    code: 'import type {A} from "a"; (function<T: A>(): T {})',
    errors: [A_NOT_USED]
  },
  {
    code: 'import type {a as A} from "a"; (function<T: A>(): T {})',
    errors: [A_NOT_USED]
  }
];

var ALWAYS_INVALID = [
  {
    code: 'type A = Y',
    errors: [A_NOT_USED]
  },
  {
    code: 'function x<A>() {}; x()',
    errors: [A_NOT_USED]
  },
  {
    code: 'import type A from "a";',
    errors: [A_NOT_USED]
  }
];

var ALWAYS_VALID = [
  'type A = Y; var x: A; x()',
  'type A = Y; function x(a: A) { a() }; x()',
  'type A = Y; (x: A)',
  'function x<A>(): A {}; x()',
  'import type A from "a"; (function(): A {})'
];

new RuleTester({
  parser: 'babel-eslint',
  rules: {'use-flow-type': 1}
}).run('no-unused-vars', noUnusedVarsRule, {
  valid: [].concat(
    ALWAYS_VALID,
    NOW_VALID.map(function(item) { return item.code; })
  ),
  invalid: ALWAYS_INVALID
});

new RuleTester({
  parser: 'babel-eslint'
}).run('no-unused-vars', noUnusedVarsRule, {
  valid: ALWAYS_VALID,
  invalid: [].concat(NOW_VALID, ALWAYS_INVALID)
});
