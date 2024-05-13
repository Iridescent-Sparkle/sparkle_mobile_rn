"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badges = Badges;
exports.gMaxCount = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Text = require("../../ui/Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const gMaxCount = 99;
exports.gMaxCount = gMaxCount;
/**
 * Unread components.
 */
function Badges(props) {
  const {
    count,
    maxCount = gMaxCount,
    containerStyle,
    textStyle
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    color: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    backgroundColor: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  const getCount = () => {
    if (count === undefined || count === 0) {
      return null;
    }
    return count > maxCount ? `${maxCount}+` : count;
  };
  const getSize = type => {
    if (count === 0) {
      return 0;
    } else if (count === undefined) {
      return 8;
    } else if (count < 10) {
      return 18;
    } else {
      return type === 'width' ? undefined : 18;
    }
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getColor('backgroundColor'),
      height: getSize('height'),
      width: getSize('width')
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    paletteType: 'label',
    textType: 'small',
    style: [{
      color: getColor('color'),
      paddingHorizontal: 5
    }, textStyle]
  }, getCount()));
}
//# sourceMappingURL=Badges.js.map