function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { ErrorCode, UIKitError } from '../../error';
import { useDelayExecTask } from '../../hook';
import { timeoutTask } from '../../utils';
import { gAnimatedDuration } from './TabPage.const';
import { calculateIndex } from './TabPage.hooks';
export function TabPageBodyLIST(props) {
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
  } = useWindowDimensions();
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
      timeoutTask(gAnimatedDuration, () => setCurrentIndex(index));
      onCurrentIndex === null || onCurrentIndex === void 0 ? void 0 : onCurrentIndex(index);
    };
  }
  const {
    delayExecTask: _onCurrentIndex
  } = useDelayExecTask(100, index => {
    timeoutTask(gAnimatedDuration, () => setCurrentIndex(index));
    onCurrentIndex === null || onCurrentIndex === void 0 ? void 0 : onCurrentIndex(index);
  });
  if (childrenCount !== RenderChildren.length) {
    throw new UIKitError({
      code: ErrorCode.params,
      desc: 'TabPageBodyLIST: childrenCount !== RenderChildren.length, please check.'
    });
  }

  // const TabPageBodyContentMemo =
  //   React.memo<TabPageBodyLISTContentProps>(TabPageBodyContent);

  return /*#__PURE__*/React.createElement(View, {
    style: [{
      height: initHeight ? initHeight : undefined,
      flexGrow: 1
    }, containerStyle],
    ref: ref => {
      if (ref) {
        viewRef.current = ref;
      }
    }
  }, /*#__PURE__*/React.createElement(ScrollView, _extends({
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
      _onCurrentIndex(calculateIndex({
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
export function TabPageBodyContent(props) {
  const {
    RenderChildren,
    RenderChildrenProps,
    width,
    currentIndex
  } = props;
  // return <View></View>;
  return RenderChildren.map((RenderChild, i) => {
    return /*#__PURE__*/React.createElement(View, {
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
export const TabPageBodyContentMemo = /*#__PURE__*/React.memo(TabPageBodyContent);
//# sourceMappingURL=TabPageBody.LIST.js.map