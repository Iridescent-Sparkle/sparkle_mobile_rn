function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { ErrorCode, UIKitError } from '../../error';
import { gHeaderHeight, gIndicatorHeight } from './TabPage.const';
import { useTabPageAPI } from './TabPage.hooks';
import { TabPageBody } from './TabPageBody';
import { TabPageBodyLIST } from './TabPageBody.LIST';
import { TabPageBodyT } from './TabPageBody.T';
import { TabPageHeader } from './TabPageHeader';
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
  } = useWindowDimensions();
  const {
    headerRef,
    bodyRef,
    headerStartScrolling
  } = useTabPageAPI(props, ref);
  const count = headerTitles.length;
  const _TabPageHeader = Header ?? TabPageHeader;
  const _TabPageBody = Body ?? TabPageBody;
  const _TabPageBodyT = Body ?? TabPageBodyT;
  const _TabPageBodyLIST = Body ?? TabPageBodyLIST;
  const width = initWidth ?? winWidth;
  if (headerTitles.length <= 0 || bodyType === 'TabPageBody' && headerTitles.length !== (bodyChildren === null || bodyChildren === void 0 ? void 0 : bodyChildren.length)) {
    throw new UIKitError({
      code: ErrorCode.params
    });
  }
  const getHeader = () => {
    return /*#__PURE__*/React.createElement(_TabPageHeader, _extends({}, HeaderProps, {
      propRef: headerRef,
      onClicked: index => {
        var _bodyRef$current;
        (_bodyRef$current = bodyRef.current) === null || _bodyRef$current === void 0 ? void 0 : _bodyRef$current.scrollTo(index);
        if (Platform.OS === 'android') {
          headerStartScrolling(width, width * index);
        }
      },
      width: width,
      initIndex: initIndex
    }));
  };
  return /*#__PURE__*/React.createElement(View, {
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
    height: height ? height - (gHeaderHeight + gIndicatorHeight) : undefined,
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
    height: height ? height - (gHeaderHeight + gIndicatorHeight) : undefined,
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
    height: height ? height - (gHeaderHeight + gIndicatorHeight) : undefined,
    width: width,
    childrenCount: count,
    RenderChildren: RenderChildrenLIST,
    RenderChildrenProps: RenderChildrenPropsLIST,
    initIndex: initIndex,
    onCurrentIndex: onCurrentIndex
  }, BodyOtherPropsLIST)), headerPosition !== 'up' ? getHeader() : null);
});
_TabPage.DefaultHeader = TabPageHeader;
_TabPage.DefaultBody = TabPageBody;
export const TabPage = _TabPage;
//# sourceMappingURL=TabPage.js.map