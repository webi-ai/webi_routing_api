import 'regenerator-runtime/runtime';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import './css/app.css';
import './css/codemirror.css';
import './css/foldgutter.css';
import './css/info.css';
import './css/jump.css';
import './css/lint.css';
import './css/loading.css';
import './css/show-hint.css';
import './css/doc-explorer.css';
import './css/history.css';
import { GraphiQL } from './components/GraphiQL';
GraphiQL.createFetcher = createGraphiQLFetcher;
export default GraphiQL;
//# sourceMappingURL=cdn.js.map