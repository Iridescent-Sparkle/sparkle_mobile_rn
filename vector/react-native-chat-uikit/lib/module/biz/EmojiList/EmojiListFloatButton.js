import * as React from 'react';
import { View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext, useThemeContext } from '../../theme';
import { IconButton } from '../../ui/Button';
export function EmojiListFloatButton(params) {
  const {
    isVisible,
    onClicked,
    iconName,
    containerStyle,
    style
  } = params;
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
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
  } = useThemeContext();
  return /*#__PURE__*/React.createElement(View, {
    style: {
      //  WARN  (ADVICE) View #3647 of type RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.
      // backgroundColor: getColor('backgroundColor'),
      ...shadow.style.small[0],
      display: isVisible === true ? 'flex' : 'none'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      //  WARN  (ADVICE) View #3645 of type RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.
      // backgroundColor: getColor('backgroundColor'),
      ...shadow.style.small[1]
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      position: 'absolute',
      backgroundColor: getColor('bg'),
      borderRadius: 36
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(IconButton, {
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
export const EmojiListFloatButtonMemo = /*#__PURE__*/React.memo(EmojiListFloatButton, EmojiListFloatButtonCompare);
//# sourceMappingURL=EmojiListFloatButton.js.map