import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColors, useDelayExecTask } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Text } from '../../ui/Text';
import { g_index_alphabet_size, g_thumb_alphabet_size } from './ListIndex.const';
/**
 * List Index Component.
 *
 * This component is mainly used with alphabetical lists.
 */
export const ListIndex = props => {
  const {
    indexTitles,
    onIndexSelected,
    indexContainerStyle,
    fontContainerStyle,
    isVisibleLetter = false
  } = props;
  const ref = React.useRef(null);
  const offsetRef = React.useRef(0);
  const maxIndex = indexTitles.length - 1;
  const [currentIndex, setCurrentIndex] = React.useState();
  const [currentTitle, setCurrentTitle] = React.useState();
  const _onIndexSelected = index => {
    var _indexTitles$_index;
    let _index = index;
    if (index < 0) {
      _index = 0;
    } else if (index > maxIndex) {
      _index = maxIndex;
    }
    setCurrentIndex(_index);
    setCurrentTitle((_indexTitles$_index = indexTitles[_index]) === null || _indexTitles$_index === void 0 ? void 0 : _indexTitles$_index[0]);
    onIndexSelected === null || onIndexSelected === void 0 ? void 0 : onIndexSelected(_index);
  };
  const {
    delayExecTask
  } = useDelayExecTask(500, () => {
    setCurrentIndex(undefined);
    setCurrentTitle(undefined);
  });
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    fg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    fg2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    ref: ref,
    style: [{
      position: 'absolute',
      right: 2
    }, indexContainerStyle],
    onLayout: _e => {
      var _ref$current;
      // offsetRef.current = e.nativeEvent.layout.y;
      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.measure((_x, _y, _width, _height, _pageX, pageY) => {
        offsetRef.current = pageY;
      });
    },
    onTouchMove: e => {
      const y = e.nativeEvent.pageY;
      const index = Math.floor((y - offsetRef.current) / g_index_alphabet_size);
      _onIndexSelected(index);
    },
    onMoveShouldSetResponder: () => {
      return true;
    },
    onTouchEnd: e => {
      const y = e.nativeEvent.pageY;
      const index = Math.floor((y - offsetRef.current) / g_index_alphabet_size);
      _onIndexSelected(index);
      delayExecTask();
    }
  }, indexTitles.map((section, index) => /*#__PURE__*/React.createElement(View, {
    key: index,
    style: {
      height: g_index_alphabet_size,
      width: g_index_alphabet_size,
      backgroundColor: currentIndex === index ? getColor('bg') : undefined,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: g_index_alphabet_size
    }
  }, /*#__PURE__*/React.createElement(Text, {
    paletteType: 'label',
    textType: 'extraSmall',
    style: {
      color: currentIndex === index ? getColor('fg') : getColor('fg2')
    }
  }, section[0])))), currentTitle && isVisibleLetter === true ? /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, {
      justifyContent: 'center',
      alignItems: 'center'
    }, fontContainerStyle],
    pointerEvents: 'none'
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      backgroundColor: 'grey',
      height: g_thumb_alphabet_size,
      width: g_thumb_alphabet_size,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 50,
      color: 'white'
    }
  }, currentTitle))) : null);
};
//# sourceMappingURL=ListIndex.js.map