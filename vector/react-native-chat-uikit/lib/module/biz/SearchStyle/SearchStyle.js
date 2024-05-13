import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColors, useGetStyleProps } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext, useThemeContext } from '../../theme';
import { Icon } from '../../ui/Image';
import { Text } from '../../ui/Text';

/**
 * Search Style Component properties.
 */

/**
 * Search Style Component.
 */
export function SearchStyle(props) {
  const {
    title,
    onPress
  } = props;
  const {
    colors,
    cornerRadius
  } = usePaletteContext();
  const {
    cornerRadius: corner
  } = useThemeContext();
  const {
    getBorderRadius
  } = useGetStyleProps();
  const {
    getColor
  } = useColors({
    backgroundColor: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    color: {
      light: colors.neutral[6],
      dark: colors.neutral[4]
    }
  });
  const {
    tr
  } = useI18nContext();
  return /*#__PURE__*/React.createElement(View, {
    style: {
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      height: 44
    }
  }, /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      borderRadius: getBorderRadius({
        height: 36,
        crt: corner.input,
        cr: cornerRadius
      }),
      height: 36,
      paddingVertical: 7,
      width: '100%',
      backgroundColor: getColor('backgroundColor'),
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: 'magnifier',
    style: {
      width: 22,
      height: 22,
      tintColor: getColor('color')
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      width: 4
    }
  }), /*#__PURE__*/React.createElement(Text, {
    textType: 'large',
    paletteType: 'body',
    style: {
      color: getColor('color')
    }
  }, tr(title)))));
}
//# sourceMappingURL=SearchStyle.js.map