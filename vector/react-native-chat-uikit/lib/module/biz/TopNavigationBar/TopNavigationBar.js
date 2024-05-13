import * as React from 'react';
import { Pressable, View } from 'react-native';
import { getElement, useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { Icon } from '../../ui/Image';
import { Text } from '../../ui/Text';
/**
 * Top Navigation Bar Component.
 *
 * This component is usually displayed at the top of the page-level component, with a left-center-right layout. It generally provides a return button on the left, a title in the middle, and an expand button on the right.
 */
export function TopNavigationBar(props) {
  const {
    containerStyle,
    Title,
    Left,
    Right,
    LeftProps,
    RightProps
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
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      height: 44,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: getColor('bg'),
      paddingHorizontal: 8
    }, containerStyle]
  }, getElement(Left, LeftProps), Title, getElement(Right, RightProps));
}

/**
 * The component on the right side of the navigation bar.
 */
export function TopNavigationBarRight(_ref) {
  let {
    onClicked,
    iconName
  } = _ref;
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(Pressable, {
    style: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center'
    },
    onPress: onClicked
  }, /*#__PURE__*/React.createElement(Icon, {
    name: iconName,
    style: {
      height: 24,
      width: 24,
      tintColor: getColor('bg')
    }
  }));
}
export function TopNavigationBarRightList(_ref2) {
  let {
    onClickedList,
    iconNameList
  } = _ref2;
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row'
    }
  }, iconNameList.map((name, index) => {
    return /*#__PURE__*/React.createElement(IconButton, {
      key: index,
      iconName: name,
      onPress: onClickedList[index],
      style: {
        height: 24,
        width: 24,
        margin: 6,
        tintColor: getColor('bg')
      }
    });
  }));
}

/**
 * The component on the middle side of the navigation bar.
 */
export function TopNavigationBarTitle(_ref3) {
  let {
    text
  } = _ref3;
  const {
    tr
  } = useI18nContext();
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    title: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 22,
      fontWeight: '400',
      lineHeight: 22,
      fontStyle: 'normal',
      alignSelf: 'center',
      color: getColor('title')
    }
  }, tr(text)));
}
//# sourceMappingURL=TopNavigationBar.js.map