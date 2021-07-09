var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import React from 'react';
import Argument from './Argument';
import TypeLink from './TypeLink';
var SearchResults = (function (_super) {
    __extends(SearchResults, _super);
    function SearchResults() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchResults.prototype.shouldComponentUpdate = function (nextProps) {
        return (this.props.schema !== nextProps.schema ||
            this.props.searchValue !== nextProps.searchValue);
    };
    SearchResults.prototype.render = function () {
        var e_1, _a;
        var searchValue = this.props.searchValue;
        var withinType = this.props.withinType;
        var schema = this.props.schema;
        var onClickType = this.props.onClickType;
        var onClickField = this.props.onClickField;
        var matchedWithin = [];
        var matchedTypes = [];
        var matchedFields = [];
        var typeMap = schema.getTypeMap();
        var typeNames = Object.keys(typeMap);
        if (withinType) {
            typeNames = typeNames.filter(function (n) { return n !== withinType.name; });
            typeNames.unshift(withinType.name);
        }
        var _loop_1 = function (typeName) {
            if (matchedWithin.length + matchedTypes.length + matchedFields.length >=
                100) {
                return "break";
            }
            var type = typeMap[typeName];
            if (withinType !== type && isMatch(typeName, searchValue)) {
                matchedTypes.push(React.createElement("div", { className: "doc-category-item", key: typeName },
                    React.createElement(TypeLink, { type: type, onClick: onClickType })));
            }
            if (type && 'getFields' in type) {
                var fields_1 = type.getFields();
                Object.keys(fields_1).forEach(function (fieldName) {
                    var field = fields_1[fieldName];
                    var matchingArgs;
                    if (!isMatch(fieldName, searchValue)) {
                        if ('args' in field && field.args.length) {
                            matchingArgs = field.args.filter(function (arg) {
                                return isMatch(arg.name, searchValue);
                            });
                            if (matchingArgs.length === 0) {
                                return;
                            }
                        }
                        else {
                            return;
                        }
                    }
                    var match = (React.createElement("div", { className: "doc-category-item", key: typeName + '.' + fieldName },
                        withinType !== type && [
                            React.createElement(TypeLink, { key: "type", type: type, onClick: onClickType }),
                            '.',
                        ],
                        React.createElement("a", { className: "field-name", onClick: function (event) { return onClickField(field, type, event); } }, field.name),
                        matchingArgs && [
                            '(',
                            React.createElement("span", { key: "args" }, matchingArgs.map(function (arg) { return (React.createElement(Argument, { key: arg.name, arg: arg, onClickType: onClickType, showDefaultValue: false })); })),
                            ')',
                        ]));
                    if (withinType === type) {
                        matchedWithin.push(match);
                    }
                    else {
                        matchedFields.push(match);
                    }
                });
            }
        };
        try {
            for (var typeNames_1 = __values(typeNames), typeNames_1_1 = typeNames_1.next(); !typeNames_1_1.done; typeNames_1_1 = typeNames_1.next()) {
                var typeName = typeNames_1_1.value;
                var state_1 = _loop_1(typeName);
                if (state_1 === "break")
                    break;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (typeNames_1_1 && !typeNames_1_1.done && (_a = typeNames_1.return)) _a.call(typeNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (matchedWithin.length + matchedTypes.length + matchedFields.length ===
            0) {
            return React.createElement("span", { className: "doc-alert-text" }, 'No results found.');
        }
        if (withinType && matchedTypes.length + matchedFields.length > 0) {
            return (React.createElement("div", null,
                matchedWithin,
                React.createElement("div", { className: "doc-category" },
                    React.createElement("div", { className: "doc-category-title" }, 'other results'),
                    matchedTypes,
                    matchedFields)));
        }
        return (React.createElement("div", { className: "doc-search-items" },
            matchedWithin,
            matchedTypes,
            matchedFields));
    };
    return SearchResults;
}(React.Component));
export default SearchResults;
function isMatch(sourceText, searchValue) {
    try {
        var escaped = searchValue.replace(/[^_0-9A-Za-z]/g, function (ch) { return '\\' + ch; });
        return sourceText.search(new RegExp(escaped, 'i')) !== -1;
    }
    catch (e) {
        return sourceText.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    }
}
//# sourceMappingURL=SearchResults.js.map