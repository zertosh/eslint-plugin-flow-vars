'use strict';

module.exports = function(context) {
  var imported = Object.create(null);
  function markTypeAsUsed(node) {
    context.markVariableAsUsed(node.id.name);
  }
  function markUsedIfImported(ident) {
    if (imported[ident.name]) {
      context.markVariableAsUsed(ident.name);
      imported[ident.name] = null;
    }
  }
  return {
    DeclareClass: markTypeAsUsed,
    DeclareModule: markTypeAsUsed,
    DeclareFunction: markTypeAsUsed,
    DeclareVariable: markTypeAsUsed,
    ImportDeclaration: function(node) {
      if (node.importKind === 'type') {
        for (var i = 0; i < node.specifiers.length; i++) {
          var specifier = node.specifiers[i];
          imported[specifier.local.name] = true;
        }
      }
    },
    GenericTypeAnnotation: function(node) {
      if (node.id.type === 'Identifier') {
        markUsedIfImported(node.id);
      } else if (node.id.type === 'QualifiedTypeIdentifier') {
        markUsedIfImported(node.id.qualification);
      }
    }
  };
};

module.exports.schema = [];
