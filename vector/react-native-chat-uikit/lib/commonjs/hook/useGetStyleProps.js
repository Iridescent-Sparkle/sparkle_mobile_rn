"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropValueFromStyleT = getPropValueFromStyleT;
exports.useGetStyleProps = useGetStyleProps;
var React = _interopRequireWildcard(require("react"));
var _error = require("../error");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function useGetStyleProps() {
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
              throw new _error.UIKitError({
                code: _error.ErrorCode.params
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
function getPropValueFromStyleT(style, propKey) {
  let ret;
  if (Array.isArray(style)) {
    ret = _getPropValueFromStyleT(style, propKey);
  } else if (style && style[propKey] !== undefined) {
    ret = style[propKey];
  }
  return ret;
}
//# sourceMappingURL=useGetStyleProps.js.map