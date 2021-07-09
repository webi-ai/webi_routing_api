"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("regenerator-runtime/runtime");
var toolkit_1 = require("@graphiql/toolkit");
require("./css/app.css");
require("./css/codemirror.css");
require("./css/foldgutter.css");
require("./css/info.css");
require("./css/jump.css");
require("./css/lint.css");
require("./css/loading.css");
require("./css/show-hint.css");
require("./css/doc-explorer.css");
require("./css/history.css");
var GraphiQL_1 = require("./components/GraphiQL");
GraphiQL_1.GraphiQL.createFetcher = toolkit_1.createGraphiQLFetcher;
exports.default = GraphiQL_1.GraphiQL;
//# sourceMappingURL=cdn.js.map