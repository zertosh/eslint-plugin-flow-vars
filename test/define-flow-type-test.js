'use strict';

var rule = require('../define-flow-type');
var noUndefRule = require('eslint/lib/rules/no-undef');

var RuleTester = require('eslint').RuleTester;

var withTypes = [
  'var a: AType',
  'var a; (a: AType)',
  'type A = AType',
  'function f(a: AType) {}',
  'function f(a): AType {}',
  'class C { a: AType }',
  'class C { a: tt.AType }',
  'class C implements AType {};',
  'interface A {}'
];

new RuleTester({
  parser: 'babel-eslint',
  rules: {'no-undef': 1}
}).run('define-flow-type', rule, {
  valid: withTypes.concat([
    'function f(a: string) {}',
    'function f(a): string {}',
    'var tt = {}; class C { a: tt.AType }'
  ]),
  invalid: []
});

new RuleTester({
  parser: 'babel-eslint'
}).run('no-undef', noUndefRule, {
  valid: [],
  invalid: withTypes.map(function(code) {
    return {code: code, errors: 1};
  })
});
