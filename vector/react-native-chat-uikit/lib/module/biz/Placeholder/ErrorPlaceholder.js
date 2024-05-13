import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext, useThemeContext } from '../../theme';
import { CmnButton } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { Text } from '../../ui/Text';

/**
 * Placeholder component after error. You can click the retry button
 * @param param0 The callback function when the button is clicked.
 * @returns JSX.Element
 */
export function ErrorPlaceholder(_ref) {
  let {
    onClicked
  } = _ref;
  const {
    tr
  } = useI18nContext();
  const {
    cornerRadius
  } = useThemeContext();
  const {
    input
  } = cornerRadius;
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
    fg: {
      light: colors.neutral[7],
      dark: colors.neutral[4]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: getColor('bg')
    }]
  }, /*#__PURE__*/React.createElement(Image, {
    source: require('../../assets/bg/blank.png'),
    style: {
      height: 140
    },
    resizeMode: 'contain'
  }), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    paletteType: 'body',
    textType: 'medium',
    style: {
      color: getColor('fg')
    }
  }, tr('Failed to load'))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(CmnButton, {
    sizesType: 'middle',
    radiusType: input,
    contentType: 'only-text',
    text: tr('Refresh'),
    onPress: onClicked
  })));
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=ErrorPlaceholder.js.map