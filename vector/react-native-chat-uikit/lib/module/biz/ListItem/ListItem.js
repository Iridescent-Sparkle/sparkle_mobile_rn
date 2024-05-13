import * as React from 'react';
import { Pressable, View } from 'react-native';
import { getElement, useColors } from '../../hook';
import { usePaletteContext } from '../../theme';

/**
 * List Item Component properties.
 */

/**
 * Common list Item Component.
 *
 * The component is laid out left, center and right.
 *
 */
export function ListItem(props) {
  const {
    containerStyle,
    LeftName,
    RightText,
    RightIcon,
    LeftNameProps,
    RightTextProps,
    RightIconProps,
    onClicked,
    enableDivider = true,
    header,
    tail
  } = props;
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    t1: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    t2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    },
    divider: {
      light: colors.neutral[9],
      dark: colors.neutral[2]
    }
  });
  return /*#__PURE__*/React.createElement(View, null, getElement(header, {}), /*#__PURE__*/React.createElement(Pressable, {
    style: [{
      height: 53.5,
      flexDirection: 'row',
      alignItems: 'center'
    }, containerStyle],
    onPress: onClicked
  }, getElement(LeftName, LeftNameProps), /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1
    }
  }), getElement(RightText, RightTextProps), getElement(RightIcon, RightIconProps)), enableDivider === true ? /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 16
    }
  }) : null, getElement(tail, {}));
}
//# sourceMappingURL=ListItem.js.map