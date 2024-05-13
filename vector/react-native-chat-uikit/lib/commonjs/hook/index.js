"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  HookPreface: true
};
exports.HookPreface = void 0;
var _getElement = require("./getElement");
Object.keys(_getElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _getElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getElement[key];
    }
  });
});
var _useCheckType = require("./useCheckType");
Object.keys(_useCheckType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useCheckType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useCheckType[key];
    }
  });
});
var _useColors = require("./useColors");
Object.keys(_useColors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useColors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useColors[key];
    }
  });
});
var _useCompare = require("./useCompare");
Object.keys(_useCompare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useCompare[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useCompare[key];
    }
  });
});
var _useDelayExecTask = require("./useDelayExecTask");
Object.keys(_useDelayExecTask).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useDelayExecTask[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useDelayExecTask[key];
    }
  });
});
var _useForceUpdate = require("./useForceUpdate");
Object.keys(_useForceUpdate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useForceUpdate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useForceUpdate[key];
    }
  });
});
var _useGetObjectName = require("./useGetObjectName");
Object.keys(_useGetObjectName).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useGetObjectName[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useGetObjectName[key];
    }
  });
});
var _useGetStyleProps = require("./useGetStyleProps");
Object.keys(_useGetStyleProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useGetStyleProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useGetStyleProps[key];
    }
  });
});
var _useKeyboardHeight = require("./useKeyboardHeight");
Object.keys(_useKeyboardHeight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useKeyboardHeight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useKeyboardHeight[key];
    }
  });
});
var _useLifecycle = require("./useLifecycle");
Object.keys(_useLifecycle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useLifecycle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useLifecycle[key];
    }
  });
});
var _usePermissions = require("./usePermissions");
Object.keys(_usePermissions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _usePermissions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _usePermissions[key];
    }
  });
});
/**
 * Preface
 *
 * Tool collection:
 * 1. `useCheckType`: Check whether the object type is as expected.
 * 2. `useColors`: Simplify the use of theme colors.
 * 3. `useCompare`: Compare whether the objects before and after rendering are the same.
 * 4. `useDelayExecTask`: delayed call. If multiple identical calls are made in a short period of time, they will be merged into one call.
 * 5. `useForceUpdate`: Force component update.
 * 6. `useGetObjectName`: Try to get the name of the component. If it is of other types, it will be parsed accordingly.
 * 7. `useGetStyleProps`: Parse the size in the component properties.
 * 8. `useKeyboardHeight`: Get the keyboard height. Need to be obtained dynamically.
 * 9. `useLifecycle`: Function component life cycle calling tool.
 */
const HookPreface = 'preface';
exports.HookPreface = HookPreface;
//# sourceMappingURL=index.js.map