"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Search = require("./Search");
Object.keys(_Search).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Search[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Search[key];
    }
  });
});
//# sourceMappingURL=index.js.map