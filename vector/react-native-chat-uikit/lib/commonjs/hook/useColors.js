"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useColors = useColors;
var React = _interopRequireWildcard(require("react"));
var _error = require("../error");
var _theme = require("../theme");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Simplify the use of theme colors.
 *
 * @example
 *
 * ```tsx
 * const { colors } = usePaletteContext();
 * const { getColor } = useColors({
 *   bg: {
 *     light: colors.neutral[98],
 *     dark: colors.neutral[1],
 *   },
 * });
 * // ...
 * <View
 *   style={{
 *     backgroundColor: getColor('bg'),
 *   }}
 * />
 * ```
 */
function useColors(pairs) {
  const {
    style
  } = (0, _theme.useThemeContext)();
  const list = React.useRef(new Map());
  const func = () => {
    return {
      initColor: pairs => {
        list.current.clear();
        const keys = Object.getOwnPropertyNames(pairs);
        for (const key of keys) {
          list.current.set(key, pairs[key]);
        }
      },
      getColor: key => {
        const item = list.current.get(key);
        if (item !== null && item !== void 0 && item[style]) {
          if (Array.isArray(item[style]) === true) {
            throw new _error.UIKitError({
              code: _error.ErrorCode.params
            });
          }
          return item === null || item === void 0 ? void 0 : item[style];
        }
        return undefined;
      },
      getColors: key => {
        const item = list.current.get(key);
        if (item !== null && item !== void 0 && item[style]) {
          if (Array.isArray(item[style]) === false) {
            throw new _error.UIKitError({
              code: _error.ErrorCode.params
            });
          }
          return item === null || item === void 0 ? void 0 : item[style];
        }
        return undefined;
      }
    };
  };
  if (pairs) {
    func().initColor(pairs);
  }
  return func();
}
//# sourceMappingURL=useColors.js.map