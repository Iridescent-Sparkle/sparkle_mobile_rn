"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThumbImage = ThumbImage;
var React = _interopRequireWildcard(require("react"));
var _assets = require("../../assets");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Image = require("../../ui/Image");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * ThumbImage component. If the url is incorrect, does not exist, or a network error occurs
 *
 * @param props {@link DefaultIconImageProps}
 * @returns JSX.Element
 */
function ThumbImage(props) {
  const {
    size,
    style,
    localIcon,
    ...others
  } = props;
  const {
    cornerRadius: corner
  } = (0, _theme.useThemeContext)();
  const {
    cornerRadius
  } = (0, _theme.usePaletteContext)();
  const {
    getBorderRadius
  } = (0, _hook.useGetStyleProps)();
  return /*#__PURE__*/React.createElement(_Image.DefaultIconImage, _extends({
    localIcon: localIcon ?? _assets.ICON_ASSETS.img('3x'),
    size: size,
    style: [style, {
      borderRadius: getBorderRadius({
        height: size,
        crt: corner.avatar,
        cr: cornerRadius,
        style
      })
    }],
    borderRadius: getBorderRadius({
      height: size,
      crt: corner.avatar,
      cr: cornerRadius,
      style
    })
  }, others));
}
//# sourceMappingURL=ThumbImage.js.map