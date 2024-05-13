"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPageHeader = TabPageHeader;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _error = require("../../error");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Text = require("../Text");
var _TabPage = require("./TabPage.const");
var _TabPageHeader = require("./TabPageHeader.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function TabPageHeader(props) {
  const {
    propRef,
    onClicked,
    titles,
    width: initWidth,
    indicatorStyle,
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
  // const { getColor } = useGetColor();
  const {
    getColor
  } = (0, _hook.useColors)({
    backgroundColor: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    selected: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    no_selected: {
      light: colors.neutral[7],
      dark: colors.neutral[4]
    }
  });
  const [currentIndex, setCurrentIndex] = React.useState(initIndex ?? 0);
  const count = titles.length;
  const indicatorWidth = (indicatorStyle === null || indicatorStyle === void 0 ? void 0 : indicatorStyle.width) ?? 28;
  const width = initWidth ?? winWidth;
  const {
    left,
    toNext,
    unitWidth
  } = (0, _TabPageHeader.useTabPageHeaderAnimation2)({
    index: initIndex,
    width: width,
    count: count,
    indicatorWidth: indicatorWidth
  });
  if (indicatorWidth * count >= width) {
    throw new _error.UIKitError({
      code: _error.ErrorCode.params
    });
  }
  if (propRef.current) {
    propRef.current.toLeft = movedCount => {
      if (movedCount === 0) return;
      const cur = currentIndex - movedCount;
      setCurrentIndex(cur);
      toNext({
        count: count,
        width: width,
        indicatorWidth: indicatorWidth,
        index: cur
      })();
    };
    propRef.current.toRight = movedCount => {
      if (movedCount === 0) return;
      const cur = currentIndex + movedCount;
      setCurrentIndex(cur);
      toNext({
        count: count,
        width: width,
        indicatorWidth: indicatorWidth,
        index: cur
      })();
    };
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'column',
      height: _TabPage.gHeaderHeight + _TabPage.gIndicatorHeight
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%'
    }, containerStyle]
  }, titles.map((v, i) => {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      key: i,
      style: [{
        height: _TabPage.gHeaderHeight,
        width: unitWidth - unitWidth * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
      }, content === null || content === void 0 ? void 0 : content.containerStyle],
      onTouchEnd: () => {
        onClicked === null || onClicked === void 0 ? void 0 : onClicked(i);
      }
    }, /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'medium',
      paletteType: 'title',
      style: [content === null || content === void 0 ? void 0 : content.style, {
        color: getColor(currentIndex === i ? 'selected' : 'no_selected')
      }]
    }, v.title));
  })), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [{
      position: 'absolute',
      width: _TabPage.gIndicatorWidth,
      height: _TabPage.gIndicatorHeight,
      borderRadius: _TabPage.gIndicatorBorderRadius,
      backgroundColor: getColor('backgroundColor'),
      bottom: 0,
      left: left
    }, indicatorStyle]
  }));
}
//# sourceMappingURL=TabPageHeader.js.map