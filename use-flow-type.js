'use strict';

module.exports = function(context) {
  function markTypeAsUsed(node) {
    context.markVariableAsUsed(node.id.name);
  }
  return {
    DeclareClass: markTypeAsUsed,
    DeclareModule: markTypeAsUsed,
    DeclareFunction: markTypeAsUsed,
    DeclareVariable: markTypeAsUsed,
    TypeAlias: markTypeAsUsed,
    TypeParameterDeclaration: function(node) {
      for (var i = 0; i < node.params.length; i++) {
        context.markVariableAsUsed(node.params[i].name);
      }
    }
  };
};

module.exports.schema = [];
