"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = Search;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Image = require("../../ui/Image");
var _TextInput = require("../../ui/TextInput");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Search Component properties.
 */

/**
 * Search Component.
 */
function Search(props) {
  const {
    onCancel,
    onChangeText,
    value,
    onBack
  } = props;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    style,
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
    bg2: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    color: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    cursor: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      // flex: 1,
      // paddingTop: 100,
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getColor('bg'),
      paddingLeft: 8
      // paddingRight: 8,
    }
  }, onBack ? /*#__PURE__*/React.createElement(_Button.IconButton, {
    iconName: 'chevron_left',
    style: {
      width: 24,
      height: 24,
      tintColor: getColor('icon')
    },
    onPress: onBack
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 44,
      justifyContent: 'center',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_TextInput.TextInput, {
    containerStyle: {
      backgroundColor: getColor('bg2'),
      justifyContent: 'center',
      // borderRadius: 18,
      height: 36
    },
    style: {
      paddingLeft: 35,
      color: getColor('color')
    },
    onChangeText: onChangeText,
    value: value,
    keyboardAppearance: style === 'light' ? 'light' : 'dark',
    autoFocus: true,
    cursorColor: getColor('cursor'),
    enableClearButton: true,
    clearButtonStyle: {
      padding: 7
    }
  }), /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'magnifier',
    style: {
      position: 'absolute',
      left: 8,
      width: 22,
      height: 22,
      tintColor: getColor('color')
    }
  })), onCancel ? /*#__PURE__*/React.createElement(_Button.Text1Button, {
    sizesType: 'middle',
    radiusType: input,
    contentType: 'only-text',
    text: tr('cancel'),
    onPress: onCancel,
    style: {
      paddingHorizontal: 20
    }
  }) : null));
}
//# sourceMappingURL=Search.js.map