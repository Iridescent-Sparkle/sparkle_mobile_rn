"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopNavigationBar = TopNavigationBar;
exports.TopNavigationBarRight = TopNavigationBarRight;
exports.TopNavigationBarRightList = TopNavigationBarRightList;
exports.TopNavigationBarTitle = TopNavigationBarTitle;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Top Navigation Bar Component.
 *
 * This component is usually displayed at the top of the page-level component, with a left-center-right layout. It generally provides a return button on the left, a title in the middle, and an expand button on the right.
 */
function TopNavigationBar(props) {
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
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      height: 44,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: getColor('bg'),
      paddingHorizontal: 8
    }, containerStyle]
  }, (0, _hook.getElement)(Left, LeftProps), Title, (0, _hook.getElement)(Right, RightProps));
}

/**
 * The component on the right side of the navigation bar.
 */
function TopNavigationBarRight(_ref) {
  let {
    onClicked,
    iconName
  } = _ref;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center'
    },
    onPress: onClicked
  }, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: iconName,
    style: {
      height: 24,
      width: 24,
      tintColor: getColor('bg')
    }
  }));
}
function TopNavigationBarRightList(_ref2) {
  let {
    onClickedList,
    iconNameList
  } = _ref2;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row'
    }
  }, iconNameList.map((name, index) => {
    return /*#__PURE__*/React.createElement(_Button.IconButton, {
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
function TopNavigationBarTitle(_ref3) {
  let {
    text
  } = _ref3;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    title: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
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