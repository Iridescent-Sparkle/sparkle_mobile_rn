"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorPlaceholder = ErrorPlaceholder;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Placeholder component after error. You can click the retry button
 * @param param0 The callback function when the button is clicked.
 * @returns JSX.Element
 */
function ErrorPlaceholder(_ref) {
  let {
    onClicked
  } = _ref;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    cornerRadius
  } = (0, _theme.useThemeContext)();
  const {
    input
  } = cornerRadius;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    fg: {
      light: colors.neutral[7],
      dark: colors.neutral[4]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: getColor('bg')
    }]
  }, /*#__PURE__*/React.createElement(_Image.Image, {
    source: require('../../assets/bg/blank.png'),
    style: {
      height: 140
    },
    resizeMode: 'contain'
  }), /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Text.Text, {
    paletteType: 'body',
    textType: 'medium',
    style: {
      color: getColor('fg')
    }
  }, tr('Failed to load'))), /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Button.CmnButton, {
    sizesType: 'middle',
    radiusType: input,
    contentType: 'only-text',
    text: tr('Refresh'),
    onPress: onClicked
  })));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=ErrorPlaceholder.js.map