"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchStyle = SearchStyle;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Search Style Component properties.
 */

/**
 * Search Style Component.
 */
function SearchStyle(props) {
  const {
    title,
    onPress
  } = props;
  const {
    colors,
    cornerRadius
  } = (0, _theme.usePaletteContext)();
  const {
    cornerRadius: corner
  } = (0, _theme.useThemeContext)();
  const {
    getBorderRadius
  } = (0, _hook.useGetStyleProps)();
  const {
    getColor
  } = (0, _hook.useColors)({
    backgroundColor: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    color: {
      light: colors.neutral[6],
      dark: colors.neutral[4]
    }
  });
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      height: 44
    }
  }, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    onPress: onPress
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      borderRadius: getBorderRadius({
        height: 36,
        crt: corner.input,
        cr: cornerRadius
      }),
      height: 36,
      paddingVertical: 7,
      width: '100%',
      backgroundColor: getColor('backgroundColor'),
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'magnifier',
    style: {
      width: 22,
      height: 22,
      tintColor: getColor('color')
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: 4
    }
  }), /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'large',
    paletteType: 'body',
    style: {
      color: getColor('color')
    }
  }, tr(title)))));
}
//# sourceMappingURL=SearchStyle.js.map