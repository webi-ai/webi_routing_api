"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var QueryStore = (function () {
    function QueryStore(key, storage, maxSize) {
        if (maxSize === void 0) { maxSize = null; }
        this.key = key;
        this.storage = storage;
        this.maxSize = maxSize;
        this.items = this.fetchAll();
    }
    Object.defineProperty(QueryStore.prototype, "length", {
        get: function () {
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    QueryStore.prototype.contains = function (item) {
        return this.items.some(function (x) {
            return x.query === item.query &&
                x.variables === item.variables &&
                x.headers === item.headers &&
                x.operationName === item.operationName;
        });
    };
    QueryStore.prototype.edit = function (item) {
        var itemIndex = this.items.findIndex(function (x) {
            return x.query === item.query &&
                x.variables === item.variables &&
                x.headers === item.headers &&
                x.operationName === item.operationName;
        });
        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1, item);
            this.save();
        }
    };
    QueryStore.prototype.delete = function (item) {
        var itemIndex = this.items.findIndex(function (x) {
            return x.query === item.query &&
                x.variables === item.variables &&
                x.headers === item.headers &&
                x.operationName === item.operationName;
        });
        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1);
            this.save();
        }
    };
    QueryStore.prototype.fetchRecent = function () {
        return this.items[this.items.length - 1];
    };
    QueryStore.prototype.fetchAll = function () {
        var raw = this.storage.get(this.key);
        if (raw) {
            return JSON.parse(raw)[this.key];
        }
        return [];
    };
    QueryStore.prototype.push = function (item) {
        var _a;
        var items = __spread(this.items, [item]);
        if (this.maxSize && items.length > this.maxSize) {
            items.shift();
        }
        for (var attempts = 0; attempts < 5; attempts++) {
            var response = this.storage.set(this.key, JSON.stringify((_a = {}, _a[this.key] = items, _a)));
            if (!response || !response.error) {
                this.items = items;
            }
            else if (response.isQuotaError && this.maxSize) {
                items.shift();
            }
            else {
                return;
            }
        }
    };
    QueryStore.prototype.save = function () {
        var _a;
        this.storage.set(this.key, JSON.stringify((_a = {}, _a[this.key] = this.items, _a)));
    };
    return QueryStore;
}());
exports.default = QueryStore;
//# sourceMappingURL=QueryStore.js.map