"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomTabBar = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Image = require("../../ui/Image");
var _TabPageHeader = require("../../ui/TabPage/TabPageHeader.hooks");
var _Text = require("../../ui/Text");
var _BottomTabBar = require("./BottomTabBar.const");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * tab component.
 */
const BottomTabBar = props => {
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
  } = (0, _reactNative.useWindowDimensions)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
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
  } = (0, _TabPageHeader.calculateLeft)({
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
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'column',
      height: _BottomTabBar.gHeaderHeight,
      justifyContent: 'center',
      marginVertical: 3
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
      // height: '100%',
    }, containerStyle]
  }, items.map((v, i) => {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      key: i,
      style: [{
        height: _BottomTabBar.gHeaderHeight,
        width: unitWidth - unitWidth * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
      }, content === null || content === void 0 ? void 0 : content.containerStyle],
      onTouchEnd: () => {
        onClicked === null || onClicked === void 0 ? void 0 : onClicked(i);
      }
    }, /*#__PURE__*/React.createElement(_Image.Icon, {
      name: v.icon ?? 'loading',
      style: [{
        height: 32,
        width: 32,
        tintColor: getColor(currentIndex === i ? 'selected' : 'no_selected')
      }]
    }), v.title ? /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'extraSmall',
      paletteType: 'title',
      style: [content === null || content === void 0 ? void 0 : content.style, {
        color: getColor(currentIndex === i ? 'selected' : 'no_selected')
      }]
    }, v.title) : null);
  })));
};
exports.BottomTabBar = BottomTabBar;
//# sourceMappingURL=BottomTabBar.js.map