"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectVariables = exports.getQueryFacts = void 0;
var graphql_1 = require("graphql");
function getOperationFacts(schema, documentStr) {
    if (!documentStr) {
        return;
    }
    var documentAST;
    try {
        documentAST = graphql_1.parse(documentStr, {
            experimentalFragmentVariables: true,
        });
    }
    catch (_a) {
        return;
    }
    var variableToType = schema
        ? collectVariables(schema, documentAST)
        : undefined;
    var operations = [];
    graphql_1.visit(documentAST, {
        OperationDefinition: function (node) {
            operations.push(node);
        },
    });
    return { variableToType: variableToType, operations: operations, documentAST: documentAST };
}
exports.default = getOperationFacts;
exports.getQueryFacts = getOperationFacts;
function collectVariables(schema, documentAST) {
    var variableToType = Object.create(null);
    documentAST.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            var variableDefinitions = definition.variableDefinitions;
            if (variableDefinitions) {
                variableDefinitions.forEach(function (_a) {
                    var variable = _a.variable, type = _a.type;
                    var inputType = graphql_1.typeFromAST(schema, type);
                    if (inputType) {
                        variableToType[variable.name.value] = inputType;
                    }
                });
            }
        }
    });
    return variableToType;
}
exports.collectVariables = collectVariables;
//# sourceMappingURL=getQueryFacts.js.map