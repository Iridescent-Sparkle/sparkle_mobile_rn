"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPageBodyContent = TabPageBodyContent;
exports.TabPageBodyContentMemo = void 0;
exports.TabPageBodyLIST = TabPageBodyLIST;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _error = require("../../error");
var _hook = require("../../hook");
var _utils = require("../../utils");
var _TabPage = require("./TabPage.const");
var _TabPage2 = require("./TabPage.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function TabPageBodyLIST(props) {
  const {
    style,
    childrenCount,
    RenderChildren,
    RenderChildrenProps,
    propsRef,
    height: initHeight,
    width: initWidth,
    containerStyle,
    initIndex = 0,
    onLayout: propsOnLayout,
    onCurrentIndex,
    onScroll: propsScroll,
    onMomentumScrollEnd: propsOnMomentumScrollEnd,
    enableCurrentIndex,
    scrollEnabled,
    ...others
  } = props;
  const ref = React.useRef({});
  const {
    width: winWidth
  } = (0, _reactNative.useWindowDimensions)();
  const w = initWidth ?? winWidth;
  let viewRef = React.useRef();
  const [currentIndex, setCurrentIndex] = React.useState(initIndex);
  if (propsRef.current) {
    propsRef.current.scrollTo = (index, animated) => {
      var _ref$current;
      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollTo({
        x: index * w,
        animated: animated
      });
      (0, _utils.timeoutTask)(_TabPage.gAnimatedDuration, () => setCurrentIndex(index));
      onCurrentIndex === null || onCurrentIndex === void 0 ? void 0 : onCurrentIndex(index);
    };
  }
  const {
    delayExecTask: _onCurrentIndex
  } = (0, _hook.useDelayExecTask)(100, index => {
    (0, _utils.timeoutTask)(_TabPage.gAnimatedDuration, () => setCurrentIndex(index));
    onCurrentIndex === null || onCurrentIndex === void 0 ? void 0 : onCurrentIndex(index);
  });
  if (childrenCount !== RenderChildren.length) {
    throw new _error.UIKitError({
      code: _error.ErrorCode.params,
      desc: 'TabPageBodyLIST: childrenCount !== RenderChildren.length, please check.'
    });
  }

  // const TabPageBodyContentMemo =
  //   React.memo<TabPageBodyLISTContentProps>(TabPageBodyContent);

  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      height: initHeight ? initHeight : undefined,
      flexGrow: 1
    }, containerStyle],
    ref: ref => {
      if (ref) {
        viewRef.current = ref;
      }
    }
  }, /*#__PURE__*/React.createElement(_reactNative.ScrollView, _extends({
    ref: ref,
    style: [style],
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    bounces: false,
    scrollEnabled: scrollEnabled,
    onLayout: e => {
      if (propsOnLayout) {
        propsOnLayout(e);
      }
      if (initIndex > 0) {
        var _ref$current2;
        (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.scrollTo({
          x: initIndex * w,
          animated: false
        });
      }
    },
    onScroll: e => {
      propsScroll === null || propsScroll === void 0 ? void 0 : propsScroll(e);
    },
    onMomentumScrollEnd: e => {
      propsOnMomentumScrollEnd === null || propsOnMomentumScrollEnd === void 0 ? void 0 : propsOnMomentumScrollEnd(e);
      const x = e.nativeEvent.contentOffset.x;
      _onCurrentIndex((0, _TabPage2.calculateIndex)({
        width: w,
        contentOffsetX: x
      }));
    }
  }, others), enableCurrentIndex === true ? /*#__PURE__*/React.createElement(TabPageBodyContentMemo, {
    width: w,
    RenderChildren: RenderChildren,
    RenderChildrenProps: RenderChildrenProps,
    currentIndex: currentIndex
  }) : /*#__PURE__*/React.createElement(TabPageBodyContentMemo, {
    width: w,
    RenderChildren: RenderChildren,
    RenderChildrenProps: RenderChildrenProps
  })));
}
function TabPageBodyContent(props) {
  const {
    RenderChildren,
    RenderChildrenProps,
    width,
    currentIndex
  } = props;
  // return <View></View>;
  return RenderChildren.map((RenderChild, i) => {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      key: i,
      style: {
        width: width
      }
    }, currentIndex !== undefined ? /*#__PURE__*/React.createElement(RenderChild, _extends({}, RenderChildrenProps, {
      index: i,
      currentIndex: currentIndex
    })) : /*#__PURE__*/React.createElement(RenderChild, _extends({}, RenderChildrenProps, {
      index: i
    })));
  });
}
const TabPageBodyContentMemo = /*#__PURE__*/React.memo(TabPageBodyContent);
exports.TabPageBodyContentMemo = TabPageBodyContentMemo;
//# sourceMappingURL=TabPageBody.LIST.js.map