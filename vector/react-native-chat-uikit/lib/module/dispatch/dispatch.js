import * as React from 'react';
import { ErrorCode, UIKitError } from '../error';
import { asyncTask } from '../utils';
/**
 * Context of the dispatch.
 */
export const DispatchContext = /*#__PURE__*/React.createContext(undefined);
DispatchContext.displayName = 'UIKitDispatchContext';

/**
 * Properties of the dispatch context.
 */

/**
 * The dispatch context's provider.
 * @param param0 {@link DispatchContextProps}
 * @returns The Dispatch Provider
 */
export function DispatchContextProvider(_ref) {
  let {
    children
  } = _ref;
  const map = new Map();
  const v = {
    addListener: (key, listener) => {
      if (map.has(key)) {
        const s = map.get(key);
        if (s !== null && s !== void 0 && s.has(listener)) {
          throw new UIKitError({
            code: ErrorCode.existed
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
      asyncTask(() => {
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
export function useDispatchContext() {
  const dis = React.useContext(DispatchContext);
  if (!dis) throw Error(`${DispatchContext.displayName} is not provided`);
  return dis;
}
//# sourceMappingURL=dispatch.js.map