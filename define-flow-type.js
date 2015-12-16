'use strict';

module.exports = function(context) {
  var unresolvedRefs = Object.create(null);
  var globalScope;

  function makeDefined(ident) {
    if (unresolvedRefs[ident.name]) {
      globalScope.__define(ident);
      var variable = globalScope.set.get(ident.name);
      variable.writeable = false;
      unresolvedRefs[ident.name] = null;
    }
  }

  return {
    Program: function(node) {
      globalScope = context.getScope();
      for (var i = 0; i < globalScope.through.length; i++) {
        var ref = globalScope.through[i];
        var name = ref.identifier.name;
        if (!unresolvedRefs[name]) {
          unresolvedRefs[name] = ref;
        }
      }
    },
    GenericTypeAnnotation: function(node) {
      if (node.id.type === 'Identifier') {
        makeDefined(node.id);
      } else if (node.id.type === 'QualifiedTypeIdentifier') {
        var qid = node.id;
        do { qid = qid.qualification; } while (qid.qualification);
        makeDefined(qid);
      }
    },
    ClassImplements: function(node) {
      makeDefined(node.id);
    },
    InterfaceDeclaration: function(node) {
      makeDefined(node.id);
    }
  };
};

module.exports.schema = [];
