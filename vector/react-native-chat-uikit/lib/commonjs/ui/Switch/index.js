"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SwitchPreface: true
};
exports.SwitchPreface = void 0;
var _CommonSwitch = require("./CommonSwitch");
Object.keys(_CommonSwitch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CommonSwitch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CommonSwitch[key];
    }
  });
});
var _Switch = require("./Switch");
Object.keys(_Switch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Switch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Switch[key];
    }
  });
});
/**
 * SwitchPreface
 *
 * The native version does not support changing component size and icons. The ios and android platforms are inconsistent.
 */
const SwitchPreface = 'SwitchPreface';
exports.SwitchPreface = SwitchPreface;
//# sourceMappingURL=index.js.map