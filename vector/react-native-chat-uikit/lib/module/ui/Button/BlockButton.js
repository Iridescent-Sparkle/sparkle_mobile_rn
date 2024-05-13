import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Icon } from '../Image';
import { Text } from '../Text';
import { gMaxTimeout } from './Button.const';
export function BlockButton(props) {
  const {
    containerStyle,
    iconName,
    text,
    preventHighFrequencyClicks = true,
    frequencyInterval = gMaxTimeout,
    onPress
  } = props;
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
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
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getColor('bg'),
      borderRadius: 8
    }, containerStyle],
    onPress: onPressInternal
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Icon, {
    name: iconName,
    style: {
      width: 32,
      height: 32,
      tintColor: getColor('fg')
    }
  })), /*#__PURE__*/React.createElement(Text, {
    textType: 'extraSmall',
    paletteType: 'body',
    style: {
      color: getColor('fg')
    }
  }, text));
}
//# sourceMappingURL=BlockButton.js.map