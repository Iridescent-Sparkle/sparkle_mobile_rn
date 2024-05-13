"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = IconButton;
exports.IconButtonMemo = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Image = require("../Image");
var _Button = require("./Button.const");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function IconButton(props) {
  var _buttonState$enabled2;
  const {
    style,
    containerStyle,
    preventHighFrequencyClicks = true,
    frequencyInterval = _Button.gMaxTimeout,
    disabled,
    onPress,
    iconName,
    buttonStateColors,
    iconResolution
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    enabled_color: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    },
    disabled_color: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    },
    pressed_color: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  const clicked = React.useRef(false);
  const onPressInternal = event => {
    if (preventHighFrequencyClicks === true) {
      if (onPress) {
        if (clicked.current === false) {
          setTimeout(() => {
            clicked.current = false;
          }, frequencyInterval);
          clicked.current = true;
          onPress(event);
        }
      }
    } else {
      onPress === null || onPress === void 0 ? void 0 : onPress(event);
    }
  };
  const buttonState = () => {
    if (buttonStateColors) {
      return buttonStateColors;
    }
    return {
      enabled: {
        color: getColor('enabled_color'),
        backgroundColor: undefined,
        borderColor: undefined
      },
      disabled: {
        color: getColor('disabled_color'),
        backgroundColor: undefined,
        borderColor: undefined
      },
      pressed: {
        color: getColor('pressed_color'),
        backgroundColor: undefined,
        borderColor: undefined
      }
    };
  };
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    disabled: disabled,
    onPress: onPressInternal,
    style: state => {
      var _buttonColors;
      let buttonColors;
      if (state.pressed === true) {
        var _buttonState$pressed;
        buttonColors = (_buttonState$pressed = buttonState().pressed) === null || _buttonState$pressed === void 0 ? void 0 : _buttonState$pressed.backgroundColor;
      } else {
        if (disabled === true) {
          var _buttonState$disabled;
          buttonColors = (_buttonState$disabled = buttonState().disabled) === null || _buttonState$disabled === void 0 ? void 0 : _buttonState$disabled.backgroundColor;
        } else {
          var _buttonState$enabled;
          buttonColors = (_buttonState$enabled = buttonState().enabled) === null || _buttonState$enabled === void 0 ? void 0 : _buttonState$enabled.backgroundColor;
        }
      }
      return [{
        backgroundColor: (_buttonColors = buttonColors) === null || _buttonColors === void 0 ? void 0 : _buttonColors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
      }, containerStyle];
    }
  }, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: iconName,
    style: [{
      tintColor: (_buttonState$enabled2 = buttonState().enabled) === null || _buttonState$enabled2 === void 0 ? void 0 : _buttonState$enabled2.color
    }, style],
    resolution: iconResolution
  }));
}
const IconButtonCompare = (prevProps, nextProps) => {
  if (prevProps.iconName !== nextProps.iconName) {
    return false;
  }
  return true;
};
const IconButtonMemo = /*#__PURE__*/React.memo(IconButton, IconButtonCompare);
exports.IconButtonMemo = IconButtonMemo;
//# sourceMappingURL=IconButton.js.map