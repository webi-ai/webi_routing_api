var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { TypeInfo, getNamedType, visit, visitWithTypeInfo, } from 'graphql';
export function uniqueBy(array, iteratee) {
    var e_1, _a;
    var FilteredMap = new Map();
    var result = [];
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var item = array_1_1.value;
            if (item.kind === 'Field') {
                var uniqueValue = iteratee(item);
                var existing = FilteredMap.get(uniqueValue);
                if (item.directives && item.directives.length) {
                    var itemClone = __assign({}, item);
                    result.push(itemClone);
                }
                else if (existing && existing.selectionSet && item.selectionSet) {
                    existing.selectionSet.selections = __spread(existing.selectionSet.selections, item.selectionSet.selections);
                }
                else if (!existing) {
                    var itemClone = __assign({}, item);
                    FilteredMap.set(uniqueValue, itemClone);
                    result.push(itemClone);
                }
            }
            else {
                result.push(item);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
export function inlineRelevantFragmentSpreads(fragmentDefinitions, selections, selectionSetType) {
    var e_2, _a;
    var _b;
    var selectionSetTypeName = selectionSetType
        ? getNamedType(selectionSetType).name
        : null;
    var outputSelections = [];
    var seenSpreads = [];
    try {
        for (var selections_1 = __values(selections), selections_1_1 = selections_1.next(); !selections_1_1.done; selections_1_1 = selections_1.next()) {
            var selection = selections_1_1.value;
            if (selection.kind === 'FragmentSpread') {
                var fragmentName = selection.name.value;
                if (!selection.directives || selection.directives.length === 0) {
                    if (seenSpreads.indexOf(fragmentName) >= 0) {
                        continue;
                    }
                    else {
                        seenSpreads.push(fragmentName);
                    }
                }
                var fragmentDefinition = fragmentDefinitions[selection.name.value];
                if (fragmentDefinition) {
                    var typeCondition = fragmentDefinition.typeCondition, directives = fragmentDefinition.directives, selectionSet = fragmentDefinition.selectionSet;
                    selection = {
                        kind: 'InlineFragment',
                        typeCondition: typeCondition,
                        directives: directives,
                        selectionSet: selectionSet,
                    };
                }
            }
            if (selection.kind === 'InlineFragment' &&
                (!selection.directives || ((_b = selection.directives) === null || _b === void 0 ? void 0 : _b.length) === 0)) {
                var fragmentTypeName = selection.typeCondition
                    ? selection.typeCondition.name.value
                    : null;
                if (!fragmentTypeName || fragmentTypeName === selectionSetTypeName) {
                    outputSelections.push.apply(outputSelections, __spread(inlineRelevantFragmentSpreads(fragmentDefinitions, selection.selectionSet.selections, selectionSetType)));
                    continue;
                }
            }
            outputSelections.push(selection);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (selections_1_1 && !selections_1_1.done && (_a = selections_1.return)) _a.call(selections_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return outputSelections;
}
export default function mergeAST(documentAST, schema) {
    var e_3, _a;
    var typeInfo = schema ? new TypeInfo(schema) : null;
    var fragmentDefinitions = Object.create(null);
    try {
        for (var _b = __values(documentAST.definitions), _c = _b.next(); !_c.done; _c = _b.next()) {
            var definition = _c.value;
            if (definition.kind === 'FragmentDefinition') {
                fragmentDefinitions[definition.name.value] = definition;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    var visitors = {
        SelectionSet: function (node) {
            var selectionSetType = typeInfo ? typeInfo.getParentType() : null;
            var selections = node.selections;
            selections = inlineRelevantFragmentSpreads(fragmentDefinitions, selections, selectionSetType);
            selections = uniqueBy(selections, function (selection) {
                return selection.alias ? selection.alias.value : selection.name.value;
            });
            return __assign(__assign({}, node), { selections: selections });
        },
        FragmentDefinition: function () {
            return null;
        },
    };
    return visit(documentAST, typeInfo ? visitWithTypeInfo(typeInfo, visitors) : visitors);
}
//# sourceMappingURL=mergeAst.js.map