"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmojiList = EmojiList;
exports.EmojiListMemo = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _twemoji = _interopRequireDefault(require("twemoji"));
var _assets = require("../../assets");
var _config = require("../../config");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Text = require("../../ui/Text");
var _EmojiList = require("./EmojiList.const");
var _EmojiListFloatButton = require("./EmojiListFloatButton");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Emoji List Component properties.
 */

/**
 * List of emoji expressions.
 *
 * @param props {@link EmojiListProps}
 * @returns JSX.Element
 */
function EmojiList(props) {
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    width: winWidth
  } = (0, _reactNative.useWindowDimensions)();
  const {
    getColor
  } = (0, _hook.useColors)({
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
    countPerRow = _EmojiList.gCountPerRow,
    emojiList,
    onDel,
    onSend
  } = props;
  const {
    getStyleSize
  } = (0, _hook.useGetStyleProps)();
  const {
    width: propsWidth
  } = getStyleSize(containerStyle);
  const {
    checkType
  } = (0, _hook.useCheckType)();
  const {
    fontFamily
  } = (0, _config.useConfigContext)();
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
  } = (0, _config.useConfigContext)();
  (0, _hook.useCompare)(getColor, {
    enabled: enableCompare
  });
  const _emojiList = emojiList ?? _assets.FACE_ASSETS;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      // height: gAspectRatio * winWidth,
      backgroundColor: getColor('bg1')
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.ScrollView, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.group
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.list
  }, _emojiList.map((v, i) => {
    const r = _twemoji.default.convert.fromCodePoint(v.substring(2));
    return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
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
    }, /*#__PURE__*/React.createElement(_Text.Text, {
      style: {
        fontSize: _reactNative.Platform.OS === 'ios' ? 32 : 26,
        fontFamily: fontFamily
      }
    }, r));
  })))), /*#__PURE__*/React.createElement(_EmojiListFloatButton.EmojiListFloatButtonMemo, {
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
  }), /*#__PURE__*/React.createElement(_EmojiListFloatButton.EmojiListFloatButtonMemo, {
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
const styles = _reactNative.StyleSheet.create({
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
const EmojiListMemo = /*#__PURE__*/React.memo(EmojiList, EmojiListCompare);
exports.EmojiListMemo = EmojiListMemo;
//# sourceMappingURL=EmojiList.js.map