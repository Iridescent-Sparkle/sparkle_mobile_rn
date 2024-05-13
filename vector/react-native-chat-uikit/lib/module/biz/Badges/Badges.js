import * as React from 'react';
import { View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Text } from '../../ui/Text';
export const gMaxCount = 99;
/**
 * Unread components.
 */
export function Badges(props) {
  const {
    count,
    maxCount = gMaxCount,
    containerStyle,
    textStyle
  } = props;
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    color: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    backgroundColor: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  const getCount = () => {
    if (count === undefined || count === 0) {
      return null;
    }
    return count > maxCount ? `${maxCount}+` : count;
  };
  const getSize = type => {
    if (count === 0) {
      return 0;
    } else if (count === undefined) {
      return 8;
    } else if (count < 10) {
      return 18;
    } else {
      return type === 'width' ? undefined : 18;
    }
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getColor('backgroundColor'),
      height: getSize('height'),
      width: getSize('width')
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    paletteType: 'label',
    textType: 'small',
    style: [{
      color: getColor('color'),
      paddingHorizontal: 5
    }, textStyle]
  }, getCount()));
}
//# sourceMappingURL=Badges.js.map