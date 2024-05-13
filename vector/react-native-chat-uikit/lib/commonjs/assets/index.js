"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _faces = require("./faces.sort");
Object.keys(_faces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _faces[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _faces[key];
    }
  });
});
var _icons = require("./icons");
Object.keys(_icons).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _icons[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _icons[key];
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