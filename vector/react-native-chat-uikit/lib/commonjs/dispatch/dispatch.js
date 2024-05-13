"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DispatchContext = void 0;
exports.DispatchContextProvider = DispatchContextProvider;
exports.useDispatchContext = useDispatchContext;
var React = _interopRequireWildcard(require("react"));
var _error = require("../error");
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Context of the dispatch.
 */
const DispatchContext = /*#__PURE__*/React.createContext(undefined);
exports.DispatchContext = DispatchContext;
DispatchContext.displayName = 'UIKitDispatchContext';

/**
 * Properties of the dispatch context.
 */

/**
 * The dispatch context's provider.
 * @param param0 {@link DispatchContextProps}
 * @returns The Dispatch Provider
 */
function DispatchContextProvider(_ref) {
  let {
    children
  } = _ref;
  const map = new Map();
  const v = {
    addListener: (key, listener) => {
      if (map.has(key)) {
        const s = map.get(key);
        if (s !== null && s !== void 0 && s.has(listener)) {
          throw new _error.UIKitError({
            code: _error.ErrorCode.existed
          });
        }
        s === null || s === void 0 ? void 0 : s.add(listener);
      } else {
        const s = new Set();
        s.add(listener);
        map.set(key, s);
      }
    },
    removeListener: (key, listener) => {
      if (map.has(key)) {
        const s = map.get(key);
        if (s !== null && s !== void 0 && s.has(listener)) {
          s.delete(listener);
        }
      }
    },
    emit: function (key) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      const s = map.get(key);
      (0, _utils.asyncTask)(() => {
        s === null || s === void 0 ? void 0 : s.forEach(v => {
          v === null || v === void 0 ? void 0 : v(...args);
          // v.apply(null, [...args]);
          // v.call(null, ...args);
        });
      });
    },

    emitSync: function (key) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      const s = map.get(key);
      s === null || s === void 0 ? void 0 : s.forEach(v => {
        v === null || v === void 0 ? void 0 : v(...args);
        // v.apply(null, [...args]);
        // v.call(null, ...args);
      });
    }
  };

  return /*#__PURE__*/React.createElement(DispatchContext.Provider, {
    value: v
  }, children);
}

/**
 * The dispatch context's hook.
 * @returns dispatch {@link DispatchApi}
 */
function useDispatchContext() {
  const dis = React.useContext(DispatchContext);
  if (!dis) throw Error(`${DispatchContext.displayName} is not provided`);
  return dis;
}
//# sourceMappingURL=dispatch.js.map