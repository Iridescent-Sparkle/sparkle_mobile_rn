function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { ErrorCode, UIKitError } from '../../error';
import { Icon } from '../Image';
import { Text } from '../Text';
import { gMaxTimeout } from './Button.const';
import { useGetButtonRadiusStyle, useGetButtonSizeStyle, useGetButtonStateStyle, useGetButtonStyle } from './Button.hooks';
/**
 * The native component `Button` is not easy to use. Here we use `Pressable` to simulate the button effect and support button status and theme.
 */
export function Button(props) {
  const {
    style,
    buttonStyle,
    preventHighFrequencyClicks = true,
    frequencyInterval = gMaxTimeout,
    disabled,
    onPress,
    ...others
  } = props;
  const buttonSize = useGetButtonSizeStyle(props);
  const {
    state: buttonState
  } = useGetButtonStyle(props);
  const buttonRadius = useGetButtonRadiusStyle(props);
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
  return /*#__PURE__*/React.createElement(Pressable, _extends({
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
  const buttonSize = useGetButtonSizeStyle(props);
  const buttonState = useGetButtonStateStyle(props);
  switch (contentType) {
    case 'icon-text':
      return /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        style: [{
          width: buttonSize.icon.size,
          height: buttonSize.icon.size,
          tintColor: buttonState.color
          // backgroundColor: buttonState.backgroundColor,
        }, iconStyle],
        name: icon ?? 'star_fill'
      }), /*#__PURE__*/React.createElement(View, {
        style: {
          width: 4
        }
      }), /*#__PURE__*/React.createElement(Text, {
        style: [buttonSize.text, {
          color: buttonState.color
        }, textStyle]
      }, text));
    case 'only-icon':
      return /*#__PURE__*/React.createElement(Icon, {
        style: [{
          width: buttonSize.icon.size,
          height: buttonSize.icon.size,
          tintColor: buttonState.color
          // backgroundColor: buttonState.backgroundColor,
        }, iconStyle],
        name: icon ?? 'star_fill'
      });
    case 'only-text':
      return /*#__PURE__*/React.createElement(Text, {
        style: [buttonSize.text, {
          color: buttonState.color
        }, textStyle]
      }, text);
    case 'text-icon':
      return /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(Text, {
        style: [buttonSize.text, {
          color: buttonState.color
        }, textStyle]
      }, text), /*#__PURE__*/React.createElement(Icon, {
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
  throw new UIKitError({
    code: ErrorCode.enum,
    extra: `contentType: ${contentType}`
  });
};
//# sourceMappingURL=Button.js.map