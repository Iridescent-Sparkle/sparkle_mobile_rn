"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmojiListFloatButton = EmojiListFloatButton;
exports.EmojiListFloatButtonMemo = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function EmojiListFloatButton(params) {
  const {
    isVisible,
    onClicked,
    iconName,
    containerStyle,
    style
  } = params;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    fg: {
      light: colors.neutral[3],
      dark: colors.neutral[98]
    },
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    }
  });
  const {
    shadow
  } = (0, _theme.useThemeContext)();
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      //  WARN  (ADVICE) View #3647 of type RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.
      // backgroundColor: getColor('backgroundColor'),
      ...shadow.style.small[0],
      display: isVisible === true ? 'flex' : 'none'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      //  WARN  (ADVICE) View #3645 of type RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.
      // backgroundColor: getColor('backgroundColor'),
      ...shadow.style.small[1]
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      position: 'absolute',
      backgroundColor: getColor('bg'),
      borderRadius: 36
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_Button.IconButton, {
    iconName: iconName,
    style: [{
      width: 20,
      height: 20,
      margin: 8,
      tintColor: getColor('fg')
    }, style],
    onPress: onClicked,
    frequencyInterval: 200
  }))));
}
const EmojiListFloatButtonCompare = (prevProps, nextProps) => {
  if (prevProps.isVisible !== nextProps.isVisible) {
    return false;
  }
  return true;
};
const EmojiListFloatButtonMemo = /*#__PURE__*/React.memo(EmojiListFloatButton, EmojiListFloatButtonCompare);
exports.EmojiListFloatButtonMemo = EmojiListFloatButtonMemo;
//# sourceMappingURL=EmojiListFloatButton.js.map