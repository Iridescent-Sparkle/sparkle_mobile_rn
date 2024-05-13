"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPage = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _error = require("../../error");
var _TabPage2 = require("./TabPage.const");
var _TabPage3 = require("./TabPage.hooks");
var _TabPageBody2 = require("./TabPageBody");
var _TabPageBody3 = require("./TabPageBody.LIST");
var _TabPageBody4 = require("./TabPageBody.T");
var _TabPageHeader2 = require("./TabPageHeader");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const _TabPage = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    header,
    body,
    height,
    width: initWidth,
    headerPosition = 'up',
    initIndex = 0,
    onCurrentIndex
  } = props;
  const {
    Header,
    HeaderProps
  } = header;
  const {
    titles: headerTitles
  } = HeaderProps;
  const {
    Body,
    BodyProps,
    type: bodyType
  } = body;
  const {
    children: bodyChildren,
    onMomentumScrollEnd,
    scrollEventThrottle,
    ...BodyOtherProps
  } = BodyProps;
  const {
    RenderChildren: RenderChildrenT,
    RenderChildrenProps: RenderChildrenPropsT,
    onMomentumScrollEnd: onMomentumScrollEndT,
    scrollEventThrottle: scrollEventThrottleT,
    ...BodyOtherPropsT
  } = BodyProps;
  const {
    RenderChildren: RenderChildrenLIST,
    RenderChildrenProps: RenderChildrenPropsLIST,
    onMomentumScrollEnd: onMomentumScrollEndLIST,
    scrollEventThrottle: scrollEventThrottleLIST,
    ...BodyOtherPropsLIST
  } = BodyProps;
  const {
    width: winWidth
  } = (0, _reactNative.useWindowDimensions)();
  const {
    headerRef,
    bodyRef,
    headerStartScrolling
  } = (0, _TabPage3.useTabPageAPI)(props, ref);
  const count = headerTitles.length;
  const _TabPageHeader = Header ?? _TabPageHeader2.TabPageHeader;
  const _TabPageBody = Body ?? _TabPageBody2.TabPageBody;
  const _TabPageBodyT = Body ?? _TabPageBody4.TabPageBodyT;
  const _TabPageBodyLIST = Body ?? _TabPageBody3.TabPageBodyLIST;
  const width = initWidth ?? winWidth;
  if (headerTitles.length <= 0 || bodyType === 'TabPageBody' && headerTitles.length !== (bodyChildren === null || bodyChildren === void 0 ? void 0 : bodyChildren.length)) {
    throw new _error.UIKitError({
      code: _error.ErrorCode.params
    });
  }
  const getHeader = () => {
    return /*#__PURE__*/React.createElement(_TabPageHeader, _extends({}, HeaderProps, {
      propRef: headerRef,
      onClicked: index => {
        var _bodyRef$current;
        (_bodyRef$current = bodyRef.current) === null || _bodyRef$current === void 0 ? void 0 : _bodyRef$current.scrollTo(index);
        if (_reactNative.Platform.OS === 'android') {
          headerStartScrolling(width, width * index);
        }
      },
      width: width,
      initIndex: initIndex
    }));
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      // flex: 1,
      flexGrow: 1,
      width: width,
      height: height ? height : '100%'
    }
  }, headerPosition === 'up' ? getHeader() : null, bodyType === 'TabPageBody' ? /*#__PURE__*/React.createElement(_TabPageBody, _extends({
    propsRef: bodyRef,
    onMomentumScrollEnd: e => {
      // !!! On the android platform, when using `scrollTo`, this callback is not triggered. shit.
      onMomentumScrollEnd === null || onMomentumScrollEnd === void 0 ? void 0 : onMomentumScrollEnd(e);
      headerStartScrolling(width, e.nativeEvent.contentOffset.x);
    },
    scrollEventThrottle: scrollEventThrottle ?? 16,
    height: height ? height - (_TabPage2.gHeaderHeight + _TabPage2.gIndicatorHeight) : undefined,
    width: width,
    children: bodyChildren,
    initIndex: initIndex,
    onCurrentIndex: onCurrentIndex
  }, BodyOtherProps)) : bodyType === 'TabPageBodyT' ? /*#__PURE__*/React.createElement(_TabPageBodyT, _extends({
    propsRef: bodyRef,
    onMomentumScrollEnd: e => {
      // !!! On the android platform, when using `scrollTo`, this callback is not triggered. shit.
      onMomentumScrollEndT === null || onMomentumScrollEndT === void 0 ? void 0 : onMomentumScrollEndT(e);
      headerStartScrolling(width, e.nativeEvent.contentOffset.x);
    },
    scrollEventThrottle: scrollEventThrottleT ?? 16,
    height: height ? height - (_TabPage2.gHeaderHeight + _TabPage2.gIndicatorHeight) : undefined,
    width: width,
    childrenCount: count,
    RenderChildren: RenderChildrenT,
    RenderChildrenProps: RenderChildrenPropsT,
    initIndex: initIndex,
    onCurrentIndex: onCurrentIndex
  }, BodyOtherPropsT)) : /*#__PURE__*/React.createElement(_TabPageBodyLIST, _extends({
    propsRef: bodyRef,
    onMomentumScrollEnd: e => {
      // !!! On the android platform, when using `scrollTo`, this callback is not triggered. shit.
      onMomentumScrollEndLIST === null || onMomentumScrollEndLIST === void 0 ? void 0 : onMomentumScrollEndLIST(e);
      headerStartScrolling(width, e.nativeEvent.contentOffset.x);
    },
    scrollEventThrottle: scrollEventThrottleLIST ?? 16,
    height: height ? height - (_TabPage2.gHeaderHeight + _TabPage2.gIndicatorHeight) : undefined,
    width: width,
    childrenCount: count,
    RenderChildren: RenderChildrenLIST,
    RenderChildrenProps: RenderChildrenPropsLIST,
    initIndex: initIndex,
    onCurrentIndex: onCurrentIndex
  }, BodyOtherPropsLIST)), headerPosition !== 'up' ? getHeader() : null);
});
_TabPage.DefaultHeader = _TabPageHeader2.TabPageHeader;
_TabPage.DefaultBody = _TabPageBody2.TabPageBody;
const TabPage = _TabPage;
exports.TabPage = TabPage;
//# sourceMappingURL=TabPage.js.map