import * as React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Icon } from '../../ui/Image';
import { calculateLeft } from '../../ui/TabPage/TabPageHeader.hooks';
import { Text } from '../../ui/Text';
import { gHeaderHeight } from './BottomTabBar.const';
/**
 * tab component.
 */
export const BottomTabBar = props => {
  const {
    propRef,
    onClicked,
    titles: items,
    width: initWidth,
    containerStyle,
    content,
    initIndex
  } = props;
  const {
    width: winWidth
  } = useWindowDimensions();
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    backgroundColor: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    selected: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    no_selected: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  const [currentIndex, setCurrentIndex] = React.useState(initIndex ?? 0);
  const count = items.length;
  const width = initWidth ?? winWidth;
  const {
    unitWidth
  } = calculateLeft({
    width,
    count,
    index: initIndex ?? 0,
    indicatorWidth: 0
  });
  if (propRef.current) {
    propRef.current.toLeft = movedCount => {
      if (movedCount === 0) return;
      const cur = currentIndex - movedCount;
      setCurrentIndex(cur);
    };
    propRef.current.toRight = movedCount => {
      if (movedCount === 0) return;
      const cur = currentIndex + movedCount;
      setCurrentIndex(cur);
    };
  }
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'column',
      height: gHeaderHeight,
      justifyContent: 'center',
      marginVertical: 3
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
      // height: '100%',
    }, containerStyle]
  }, items.map((v, i) => {
    return /*#__PURE__*/React.createElement(View, {
      key: i,
      style: [{
        height: gHeaderHeight,
        width: unitWidth - unitWidth * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
      }, content === null || content === void 0 ? void 0 : content.containerStyle],
      onTouchEnd: () => {
        onClicked === null || onClicked === void 0 ? void 0 : onClicked(i);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: v.icon ?? 'loading',
      style: [{
        height: 32,
        width: 32,
        tintColor: getColor(currentIndex === i ? 'selected' : 'no_selected')
      }]
    }), v.title ? /*#__PURE__*/React.createElement(Text, {
      textType: 'extraSmall',
      paletteType: 'title',
      style: [content === null || content === void 0 ? void 0 : content.style, {
        color: getColor(currentIndex === i ? 'selected' : 'no_selected')
      }]
    }, v.title) : null);
  })));
};
//# sourceMappingURL=BottomTabBar.js.map