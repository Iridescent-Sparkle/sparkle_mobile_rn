import * as React from 'react';
import { ErrorCode, UIKitError } from '../error';
/**
 * Parse the size in the component properties.
 * @example
 *
 * ```tsx
 * const { getStyleSize } = useGetStyleProps();
 * const { width: propsWidth } = getStyleSize(containerStyle);
 * const { checkType } = useCheckType();
 * if (propsWidth) {
 *   checkType(propsWidth, 'number');
 * }
 * const getUnitSize = () => {
 *   if (propsWidth) {
 *     return (propsWidth as number) / countPerRow - 1;
 *   }
 *   return winWidth / countPerRow - 1;
 * };
 * ```
 */
export function useGetStyleProps() {
  const ret = React.useMemo(() => {
    return {
      getStyleProp: (prop, style) => {
        return getPropValueFromStyleT(style, prop);
      },
      getStyleSize: style => {
        const height = getPropValueFromStyleT(style, 'height');
        const width = getPropValueFromStyleT(style, 'width');
        return {
          height: height,
          width: width
        };
      },
      getBorderRadius: params => {
        var _getPropValueFromStyl;
        const {
          height,
          crt,
          cr,
          style
        } = params;
        const borderRadius = (_getPropValueFromStyl = getPropValueFromStyleT(style, 'borderRadius')) === null || _getPropValueFromStyl === void 0 ? void 0 : _getPropValueFromStyl.borderRadius;
        // const borderRadius = (style as any)?.borderRadius;
        if (borderRadius === undefined) {
          switch (crt) {
            case 'extraSmall':
              return cr.extraSmall;
            case 'small':
              return cr.small;
            case 'medium':
              return cr.medium;
            case 'large':
              return cr.large;
            case 'extraLarge':
              return height / 2;
            default:
              throw new UIKitError({
                code: ErrorCode.params
              });
          }
        }
        return borderRadius;
      }
    };
  }, []);
  return ret;
}
function _getPropValueFromStyleT(style, propKey) {
  let ret;
  style.forEach(item => {
    if (Array.isArray(item)) {
      const prop = _getPropValueFromStyleT(item, propKey);
      if (prop !== undefined) {
        ret = prop;
      }
    } else if (item && item[propKey] !== undefined) {
      ret = item[propKey];
    }
  });
  return ret;
}
export function getPropValueFromStyleT(style, propKey) {
  let ret;
  if (Array.isArray(style)) {
    ret = _getPropValueFromStyleT(style, propKey);
  } else if (style && style[propKey] !== undefined) {
    ret = style[propKey];
  }
  return ret;
}
//# sourceMappingURL=useGetStyleProps.js.map