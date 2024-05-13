"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockButton = BlockButton;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Image = require("../Image");
var _Text = require("../Text");
var _Button = require("./Button.const");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function BlockButton(props) {
  const {
    containerStyle,
    iconName,
    text,
    preventHighFrequencyClicks = true,
    frequencyInterval = _Button.gMaxTimeout,
    onPress
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[95],
      dark: colors.neutral[95]
    },
    fg: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  const clicked = React.useRef(false);
  const onPressInternal = () => {
    if (preventHighFrequencyClicks === true) {
      if (onPress) {
        if (clicked.current === false) {
          setTimeout(() => {
            clicked.current = false;
          }, frequencyInterval);
          clicked.current = true;
          onPress();
        }
      }
    } else {
      onPress === null || onPress === void 0 ? void 0 : onPress();
    }
  };
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: [{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getColor('bg'),
      borderRadius: 8
    }, containerStyle],
    onPress: onPressInternal
  }, /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: iconName,
    style: {
      width: 32,
      height: 32,
      tintColor: getColor('fg')
    }
  })), /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'extraSmall',
    paletteType: 'body',
    style: {
      color: getColor('fg')
    }
  }, text));
}
//# sourceMappingURL=BlockButton.js.map