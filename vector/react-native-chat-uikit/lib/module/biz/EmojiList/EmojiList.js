import * as React from 'react';
import { Pressable } from 'react-native';
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import emoji from 'twemoji';
import { FACE_ASSETS } from '../../assets';
import { useConfigContext } from '../../config';
import { useCheckType, useColors, useCompare, useGetStyleProps } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Text } from '../../ui/Text';
import { gCountPerRow } from './EmojiList.const';
import { EmojiListFloatButtonMemo } from './EmojiListFloatButton';

/**
 * Emoji List Component properties.
 */

/**
 * List of emoji expressions.
 *
 * @param props {@link EmojiListProps}
 * @returns JSX.Element
 */
export function EmojiList(props) {
  const {
    colors
  } = usePaletteContext();
  const {
    width: winWidth
  } = useWindowDimensions();
  const {
    getColor
  } = useColors({
    bg1: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    btn1: {
      light: colors.neutral[3],
      dark: colors.neutral[98]
    },
    btn2: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  const {
    onFace,
    containerStyle,
    countPerRow = gCountPerRow,
    emojiList,
    onDel,
    onSend
  } = props;
  const {
    getStyleSize
  } = useGetStyleProps();
  const {
    width: propsWidth
  } = getStyleSize(containerStyle);
  const {
    checkType
  } = useCheckType();
  const {
    fontFamily
  } = useConfigContext();
  if (propsWidth) {
    checkType(propsWidth, 'number');
  }
  const getUnitSize = () => {
    if (propsWidth) {
      return propsWidth / countPerRow - 1;
    }
    return winWidth / countPerRow - 1;
  };
  const {
    enableCompare
  } = useConfigContext();
  useCompare(getColor, {
    enabled: enableCompare
  });
  const _emojiList = emojiList ?? FACE_ASSETS;
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      // height: gAspectRatio * winWidth,
      backgroundColor: getColor('bg1')
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(View, {
    style: styles.group
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.list
  }, _emojiList.map((v, i) => {
    const r = emoji.convert.fromCodePoint(v.substring(2));
    return /*#__PURE__*/React.createElement(Pressable, {
      key: i,
      style: {
        justifyContent: 'center',
        alignItems: 'center',
        width: getUnitSize(),
        height: getUnitSize()
        // alignSelf: 'baseline', // !!! crash
      },

      onPress: () => {
        onFace === null || onFace === void 0 ? void 0 : onFace(v);
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        fontSize: Platform.OS === 'ios' ? 32 : 26,
        fontFamily: fontFamily
      }
    }, r));
  })))), /*#__PURE__*/React.createElement(EmojiListFloatButtonMemo, {
    iconName: 'arrow_left_thick',
    isVisible: true,
    onClicked: onDel,
    containerStyle: {
      right: 16 + 36 + 12,
      bottom: 16,
      borderRadius: 4,
      backgroundColor: getColor('bg1')
    },
    style: {
      tintColor: getColor('btn1')
    }
  }), /*#__PURE__*/React.createElement(EmojiListFloatButtonMemo, {
    iconName: 'airplane',
    isVisible: true,
    onClicked: onSend,
    containerStyle: {
      right: 16,
      bottom: 16,
      borderRadius: 4,
      backgroundColor: getColor('btn2')
    },
    style: {
      tintColor: getColor('bg1')
    }
  }));
}
const EmojiListCompare = (_prevProps, _nextProps) => {
  return true;
};
const styles = StyleSheet.create({
  group: {
    alignItems: 'center',
    flex: 1
  },
  title: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 2
  }
});
export const EmojiListMemo = /*#__PURE__*/React.memo(EmojiList, EmojiListCompare);
//# sourceMappingURL=EmojiList.js.map