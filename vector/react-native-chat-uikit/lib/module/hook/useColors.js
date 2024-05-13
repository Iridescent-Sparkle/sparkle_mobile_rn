import * as React from 'react';
import { ErrorCode, UIKitError } from '../error';
import { useThemeContext } from '../theme';
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
export function useColors(pairs) {
  const {
    style
  } = useThemeContext();
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
            throw new UIKitError({
              code: ErrorCode.params
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
            throw new UIKitError({
              code: ErrorCode.params
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