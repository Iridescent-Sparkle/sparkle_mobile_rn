"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SimpleToast = require("./SimpleToast");
Object.keys(_SimpleToast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SimpleToast[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SimpleToast[key];
    }
  });
});
//# sourceMappingURL=index.js.map