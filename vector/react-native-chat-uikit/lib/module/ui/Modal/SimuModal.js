function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import { g_mask_color } from '../../const';
import { DefaultSlide } from './DefaultSlide';
import { useSimulativeModalAnimation, useSimulativeModalPanResponder } from './SimuModal.hooks';

/**
 * Why not use properties to show and hide components? The method of using attributes has been tried, but this method requires more renderings (the function needs to be executed multiple times internally).
 *
 * ref: example/src/__dev__/test_modal_prototype.tsx
 */

/**
 * Simulate a modal window.
 */
export function SimulativeModal(props) {
  const {
    modalAnimationType,
    modalStyle,
    disableBackgroundClose = false,
    backgroundColor,
    backgroundTransparent = false,
    children,
    propsRef,
    onStartShouldSetPanResponder,
    onFinished,
    maskStyle,
    Slide,
    ...others
  } = props;
  const {
    translateY,
    startShow,
    startHide,
    backgroundOpacity
  } = useSimulativeModalAnimation(modalAnimationType);
  const {
    width,
    height
  } = useWindowDimensions();
  const [modalVisible, setModalVisible] = React.useState(false);
  const _Slide = Slide ?? DefaultSlide;
  if (propsRef) {
    if (propsRef.current) {
      propsRef.current.startShow = () => {
        setModalVisible(true);
        startShow();
      };
      propsRef.current.startHide = onf => {
        startHide(() => {
          setModalVisible(false);
          onf === null || onf === void 0 ? void 0 : onf();
          onFinished === null || onFinished === void 0 ? void 0 : onFinished();
        });
      };
    }
  }
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      flex: 1,
      position: 'absolute',
      width: width,
      height: height,
      display: modalVisible === true ? 'flex' : 'none'
      // opacity: modalVisible === true ? 1 : 0,
    }, maskStyle]
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => {
      if (disableBackgroundClose !== true) {
        startHide(() => setModalVisible(false));
      }
    }
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [StyleSheet.absoluteFill, {
      backgroundColor: backgroundTransparent === true ? undefined : backgroundColor ?? g_mask_color,
      opacity: backgroundTransparent === true ? 0 : backgroundOpacity
    }]
  })), /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: [{
      flex: 1,
      justifyContent: 'flex-end',
      opacity: modalVisible === true ? backgroundOpacity : 0,
      transform: [{
        translateY: translateY
      }]
    }, modalStyle],
    pointerEvents: "box-none"
    // {...useSimulativeModalPanResponder({
    //   type: modalAnimationType,
    //   translateY,
    //   startShow,
    //   startHide,
    //   setModalVisible,
    //   onStartShouldSetPanResponder,
    // }).panHandlers}
  }, others), /*#__PURE__*/React.createElement(_Slide, _extends({
    modalType: 'simu-modal'
  }, useSimulativeModalPanResponder({
    type: modalAnimationType,
    translateY,
    startShow,
    startHide,
    setModalVisible,
    onStartShouldSetPanResponder
  }).panHandlers)), children));
}
//# sourceMappingURL=SimuModal.js.map