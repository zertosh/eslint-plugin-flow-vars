'use strict';

var rule = require('../define-flow-type');
var noUndefRule = require('eslint/lib/rules/no-undef');

var RuleTester = require('eslint').RuleTester;
RuleTester.prototype.defineRule('define-flow-type', rule);

var ATYPE_NOT_DEFINED = '"AType" is not defined.';
var BTYPE_NOT_DEFINED = '"BType" is not defined.';
var B_NOT_DEFINED = '"b" is not defined.';

var NOW_VALID = [
  {
    code: 'var a: AType',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'var a; (a: AType)',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'var a: AType<BType>',
    errors: [ATYPE_NOT_DEFINED, BTYPE_NOT_DEFINED]
  },
  {
    code: 'type A = AType',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'function f(a: AType) {}',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'function f(a: AType.a) {}',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'function f(a: AType.a.b) {}',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'function f(a): AType {}',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'class C { a: AType }',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'class C { a: AType.a }',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'class C { a: AType.a.b }',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'class C implements AType {}',
    errors: [ATYPE_NOT_DEFINED]
  },
  {
    code: 'interface AType {}',
    errors: [ATYPE_NOT_DEFINED]
  }
];

var ALWAYS_INVALID = [
  {
    code: 'var a = b',
    errors: [B_NOT_DEFINED]
  },
  {
    code: 'function f(a = b) {}',
    errors: [B_NOT_DEFINED]
  },
  {
    code: 'class C extends b {}',
    errors: [B_NOT_DEFINED]
  },
  {
    code: 'class C { static S = b }',
    errors: [B_NOT_DEFINED]
  }
];

var ALWAYS_VALID = [
  'var a: string',
  'var a: Array',
  'var a: Array<string>',
  'type A = Array',
  'function f(a: string) {}',
  'function f(a): string {}',
  'class C { a: string }',
  'var AType = {}; class C { a: AType.a }',
  'declare module A { declare var a: AType }'
];

new RuleTester({
  parser: 'babel-eslint',
  rules: {'define-flow-type': 1}
}).run('no-undef', noUndefRule, {
  valid: [].concat(
    ALWAYS_VALID,
    NOW_VALID.map(function(item) { return item.code; })
  ),
  invalid: ALWAYS_INVALID
});

new RuleTester({
  parser: 'babel-eslint'
}).run('no-undef', noUndefRule, {
  valid: ALWAYS_VALID,
  invalid: [].concat(NOW_VALID, ALWAYS_INVALID)
});
