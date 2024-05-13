import * as React from 'react';
import { Pressable } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Icon } from '../Image';
import { gMaxTimeout } from './Button.const';
export function IconButton(props) {
  var _buttonState$enabled2;
  const {
    style,
    containerStyle,
    preventHighFrequencyClicks = true,
    frequencyInterval = gMaxTimeout,
    disabled,
    onPress,
    iconName,
    buttonStateColors,
    iconResolution
  } = props;
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
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
  return /*#__PURE__*/React.createElement(Pressable, {
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
  }, /*#__PURE__*/React.createElement(Icon, {
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
export const IconButtonMemo = /*#__PURE__*/React.memo(IconButton, IconButtonCompare);
//# sourceMappingURL=IconButton.js.map