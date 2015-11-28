'use strict';

module.exports = function(context) {
  function markTypeAsUsed(node) {
    context.markVariableAsUsed(node.id.name);
  }
  return {
    DeclareClass: markTypeAsUsed,
    DeclareModule: markTypeAsUsed,
    DeclareFunction: markTypeAsUsed,
    DeclareVariable: markTypeAsUsed
  };
};

module.exports.schema = [];
