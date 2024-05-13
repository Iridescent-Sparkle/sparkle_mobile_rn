function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
// ref: https://github.com/software-mansion/react-native-gesture-handler/blob/main/example/src/showcase/bottomSheet/index.tsx
// When using Model in React Native, the inner FlatList cannot be scrolled. ref: https://zhuanlan.zhihu.com/p/630696822

import * as React from 'react';
import { Animated, Modal as RNModal, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { g_mask_color } from '../../const';
import { useModalAnimation, useModalPanResponder } from './Modal.hooks';

/**
 * Why not use properties to show and hide components? The method of using attributes has been tried, but this method requires more renderings (the function needs to be executed multiple times internally).
 *
 * ref: example/src/__dev__/test_modal_prototype.tsx
 */

/**
 * @deprecated 2023-11-28 Please use `SlideModal` instead.
 *
 * Mainly solves the effect problem of native modal component `RNModal` display mask.
 */
export function Modal(props) {
  const {
    propsRef,
    modalAnimationType,
    modalStyle,
    onRequestModalClose,
    disableBackgroundClose = false,
    backgroundColor,
    backgroundTransparent = false,
    children,
    onMoveShouldSetPanResponder,
    onFinished,
    ...others
  } = props;
  const {
    translateY,
    startShow,
    startHide,
    backgroundOpacity
  } = useModalAnimation(modalAnimationType);
  const [visible, setVisible] = React.useState(false);
  if (propsRef.current) {
    propsRef.current.startShow = () => {
      setVisible(true);
      startShow();
    };
    propsRef.current.startHide = onf => {
      startHide(() => {
        setVisible(false);
        onf === null || onf === void 0 ? void 0 : onf();
        onFinished === null || onFinished === void 0 ? void 0 : onFinished();
      });
    };
  }
  return /*#__PURE__*/React.createElement(RNModal, _extends({
    transparent: true,
    visible: visible,
    animationType: "none",
    onRequestClose: onRequestModalClose,
    supportedOrientations: ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']
  }, others), /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => {
      if (disableBackgroundClose !== true) {
        onRequestModalClose();
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
      opacity: modalAnimationType === 'fade' ? backgroundOpacity : 1,
      transform: [{
        translateY: translateY
      }]
    }, modalStyle],
    pointerEvents: "box-none"
  }, useModalPanResponder({
    type: modalAnimationType,
    translateY,
    startShow,
    onRequestModalClose,
    onMoveShouldSetPanResponder
  }).panHandlers), /*#__PURE__*/React.createElement(Pressable, null, children)));
}
//# sourceMappingURL=Modal.js.map