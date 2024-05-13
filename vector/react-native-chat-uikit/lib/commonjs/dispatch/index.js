"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _dispatch = require("./dispatch");
Object.keys(_dispatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dispatch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatch[key];
    }
  });
});
var _dispatch2 = require("./dispatch.hooks");
Object.keys(_dispatch2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dispatch2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatch2[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
//# sourceMappingURL=index.js.map