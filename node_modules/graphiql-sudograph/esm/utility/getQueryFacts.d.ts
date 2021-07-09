import { GraphQLSchema, DocumentNode, OperationDefinitionNode, GraphQLNamedType } from 'graphql';
export declare type VariableToType = {
    [variable: string]: GraphQLNamedType;
};
export declare type QueryFacts = {
    variableToType?: VariableToType;
    operations?: OperationDefinitionNode[];
    documentAST?: DocumentNode;
};
export default function getOperationFacts(schema?: GraphQLSchema, documentStr?: string | null): QueryFacts | undefined;
export declare const getQueryFacts: typeof getOperationFacts;
export declare function collectVariables(schema: GraphQLSchema, documentAST: DocumentNode): VariableToType;
//# sourceMappingURL=getQueryFacts.d.ts.map