"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ThemePreface: true
};
exports.ThemePreface = void 0;
var _palette = require("./palette");
Object.keys(_palette).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _palette[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _palette[key];
    }
  });
});
var _palette2 = require("./palette.preset");
Object.keys(_palette2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _palette2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _palette2[key];
    }
  });
});
var _theme = require("./theme");
Object.keys(_theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _theme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme[key];
    }
  });
});
var _theme2 = require("./theme.dark");
Object.keys(_theme2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _theme2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme2[key];
    }
  });
});
var _theme3 = require("./theme.light");
Object.keys(_theme3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _theme3[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme3[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
/**
 * Preface
 *
 * Theme service mainly consists of two parts, `Palette` and `Theme` components. Among them, the `Palette` component is responsible for providing basic color templates, text templates, linear gradient templates, etc. The `Theme` component provides `light` and `dark` modes based on the capabilities provided by the `Palette` component.
 *
 * For details on the `Palette` component, see `palette.tsx`
 *
 * For details on the `Theme` component, see `theme.tsx`
 */
const ThemePreface = 'Preface';
exports.ThemePreface = ThemePreface;
//# sourceMappingURL=index.js.map