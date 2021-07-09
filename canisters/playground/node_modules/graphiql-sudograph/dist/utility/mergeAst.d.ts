import { DocumentNode, FieldNode, FragmentDefinitionNode, GraphQLOutputType, GraphQLSchema, SelectionNode } from 'graphql';
declare type Maybe<T> = null | T;
export declare function uniqueBy<T>(array: readonly SelectionNode[], iteratee: (item: FieldNode) => T): SelectionNode[];
export declare function inlineRelevantFragmentSpreads(fragmentDefinitions: {
    [key: string]: FragmentDefinitionNode | undefined;
}, selections: readonly SelectionNode[], selectionSetType?: Maybe<GraphQLOutputType>): readonly SelectionNode[];
export default function mergeAST(documentAST: DocumentNode, schema?: GraphQLSchema): DocumentNode;
export {};
//# sourceMappingURL=mergeAst.d.ts.map