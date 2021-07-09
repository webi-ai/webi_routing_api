export default ({ IDL }) => {
  return IDL.Service({
    'graphql_mutation' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'graphql_query' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };