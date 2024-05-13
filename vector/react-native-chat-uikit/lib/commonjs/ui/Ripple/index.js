"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Ripple = require("./Ripple");
Object.keys(_Ripple).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Ripple[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Ripple[key];
    }
  });
});
//# sourceMappingURL=index.js.map