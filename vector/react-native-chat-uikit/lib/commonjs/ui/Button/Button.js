"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _error = require("../../error");
var _Image = require("../Image");
var _Text = require("../Text");
var _Button = require("./Button.const");
var _Button2 = require("./Button.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * The native component `Button` is not easy to use. Here we use `Pressable` to simulate the button effect and support button status and theme.
 */
function Button(props) {
  const {
    style,
    buttonStyle,
    preventHighFrequencyClicks = true,
    frequencyInterval = _Button.gMaxTimeout,
    disabled,
    onPress,
    ...others
  } = props;
  const buttonSize = (0, _Button2.useGetButtonSizeStyle)(props);
  const {
    state: buttonState
  } = (0, _Button2.useGetButtonStyle)(props);
  const buttonRadius = (0, _Button2.useGetButtonRadiusStyle)(props);
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
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, _extends({
    disabled: disabled,
    onPress: onPressInternal,
    style: state => {
      let buttonColors;
      if (state.pressed === true) {
        buttonColors = buttonState.pressed;
      } else {
        if (disabled === true) {
          buttonColors = buttonState.disabled;
        } else {
          buttonColors = buttonState.enabled;
        }
      }
      return [buttonSize.button, {
        backgroundColor: buttonColors.backgroundColor,
        borderRadius: buttonRadius,
        borderWidth: buttonStyle === 'borderButton' ? 1 : undefined,
        borderColor: buttonStyle === 'borderButton' ? buttonColors.borderColor : undefined,
        justifyContent: 'center',
        alignItems: 'center'
      }, style];
    }
  }, others), /*#__PURE__*/React.createElement(ButtonContent, props));
}
const ButtonContent = props => {
  const {
    contentType,
    text,
    icon,
    textStyle,
    iconStyle
  } = props;
  const buttonSize = (0, _Button2.useGetButtonSizeStyle)(props);
  const buttonState = (0, _Button2.useGetButtonStateStyle)(props);
  switch (contentType) {
    case 'icon-text':
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        style: [{
          width: buttonSize.icon.size,
          height: buttonSize.icon.size,
          tintColor: buttonState.color
          // backgroundColor: buttonState.backgroundColor,
        }, iconStyle],
        name: icon ?? 'star_fill'
      }), /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          width: 4
        }
      }), /*#__PURE__*/React.createElement(_Text.Text, {
        style: [buttonSize.text, {
          color: buttonState.color
        }, textStyle]
      }, text));
    case 'only-icon':
      return /*#__PURE__*/React.createElement(_Image.Icon, {
        style: [{
          width: buttonSize.icon.size,
          height: buttonSize.icon.size,
          tintColor: buttonState.color
          // backgroundColor: buttonState.backgroundColor,
        }, iconStyle],
        name: icon ?? 'star_fill'
      });
    case 'only-text':
      return /*#__PURE__*/React.createElement(_Text.Text, {
        style: [buttonSize.text, {
          color: buttonState.color
        }, textStyle]
      }, text);
    case 'text-icon':
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(_Text.Text, {
        style: [buttonSize.text, {
          color: buttonState.color
        }, textStyle]
      }, text), /*#__PURE__*/React.createElement(_Image.Icon, {
        style: [{
          width: buttonSize.icon.size,
          height: buttonSize.icon.size,
          tintColor: buttonState.color
          // backgroundColor: buttonState.backgroundColor,
        }, iconStyle],
        name: icon ?? 'star_fill'
      }));
    default:
      break;
  }
  throw new _error.UIKitError({
    code: _error.ErrorCode.enum,
    extra: `contentType: ${contentType}`
  });
};
//# sourceMappingURL=Button.js.map