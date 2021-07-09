import type { Principal } from '@dfinity/agent';
export default interface _SERVICE {
  'graphql_mutation' : (arg_0: string, arg_1: string) => Promise<string>,
  'graphql_query' : (arg_0: string, arg_1: string) => Promise<string>,
};