"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Badges = require("./Badges");
Object.keys(_Badges).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Badges[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Badges[key];
    }
  });
});
//# sourceMappingURL=index.js.map