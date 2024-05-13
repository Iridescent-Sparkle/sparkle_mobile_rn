"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = Text;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../theme");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Added theme support based on the native component `Text`.
 */
function Text(props) {
  const {
    textType,
    paletteType,
    children,
    style,
    ...others
  } = props;
  const presetTextStyle = useGetTextStyle({
    textType,
    paletteType
  });
  return /*#__PURE__*/React.createElement(_reactNative.Text, _extends({
    style: [presetTextStyle, style]
  }, others), children);
}
const useGetTextStyle = props => {
  const {
    textType,
    paletteType
  } = props;
  const {
    fonts
  } = (0, _theme.usePaletteContext)();
  switch (textType) {
    case 'extraSmall':
      switch (paletteType) {
        case 'headline':
          return fonts.headline.extraSmall;
        case 'title':
          return fonts.title.extraSmall;
        case 'label':
          return fonts.label.extraSmall;
        case 'body':
          return fonts.body.extraSmall;
        default:
          break;
      }
      break;
    case 'small':
      switch (paletteType) {
        case 'headline':
          return fonts.headline.small;
        case 'title':
          return fonts.title.small;
        case 'label':
          return fonts.label.small;
        case 'body':
          return fonts.body.small;
        default:
          break;
      }
      break;
    case 'medium':
      switch (paletteType) {
        case 'headline':
          return fonts.headline.medium;
        case 'title':
          return fonts.title.medium;
        case 'label':
          return fonts.label.medium;
        case 'body':
          return fonts.body.medium;
        default:
          break;
      }
      break;
    case 'large':
      switch (paletteType) {
        case 'headline':
          return fonts.headline.large;
        case 'title':
          return fonts.title.large;
        case 'label':
          return fonts.label.large;
        case 'body':
          return fonts.body.large;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return undefined;
};
//# sourceMappingURL=Text.js.map