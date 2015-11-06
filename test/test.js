'use strict';

var assert = require('assert');
var flowVarsPlugin = require('../');

assert.equal(
  flowVarsPlugin.rules['define-flow-type'],
  require('../define-flow-type')
);

assert.equal(
  flowVarsPlugin.rules['use-flow-type'],
  require('../use-flow-type')
);

require('./define-flow-type-test');
require('./use-flow-type-test');
