'use strict';

var rule = require('../use-flow-type');
var noUnusedVarsRule = require('eslint/lib/rules/no-unused-vars');

var RuleTester = require('eslint').RuleTester;

var withDefines = [
  'declare class C {}',
  'declare module M {}',
  'declare function F(): FF',
  'declare var v: V',
  'function f<T>() {}; f()',
  'type A = AType'
];

new RuleTester({
  parser: 'babel-eslint',
  rules: {'no-unused-vars': 1}
}).run('use-flow-type', rule, {
  valid: withDefines,
  invalid: []
});

new RuleTester({
  parser: 'babel-eslint'
}).run('no-unused-vars', noUnusedVarsRule, {
  valid: [],
  invalid: withDefines.map(function(code) {
    return {code: code, errors: 1};
  })
});
