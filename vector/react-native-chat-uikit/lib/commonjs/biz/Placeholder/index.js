"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EmptyPlaceholder = require("./EmptyPlaceholder");
Object.keys(_EmptyPlaceholder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EmptyPlaceholder[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _EmptyPlaceholder[key];
    }
  });
});
var _ErrorPlaceholder = require("./ErrorPlaceholder");
Object.keys(_ErrorPlaceholder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ErrorPlaceholder[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ErrorPlaceholder[key];
    }
  });
});
var _LoadingPlaceholder = require("./LoadingPlaceholder");
Object.keys(_LoadingPlaceholder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LoadingPlaceholder[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _LoadingPlaceholder[key];
    }
  });
});
//# sourceMappingURL=index.js.map