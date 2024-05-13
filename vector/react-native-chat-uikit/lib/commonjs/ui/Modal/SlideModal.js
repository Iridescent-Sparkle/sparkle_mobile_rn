"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideModal = SlideModal;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _const = require("../../const");
var _utils = require("../../utils");
var _Keyboard = require("../Keyboard");
var _DefaultSlide = require("./DefaultSlide");
var _Modal = require("./Modal.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // ref: https://github.com/software-mansion/react-native-gesture-handler/blob/main/example/src/showcase/bottomSheet/index.tsx
// When using Model in React Native, the inner FlatList cannot be scrolled. ref: https://zhuanlan.zhihu.com/p/630696822
/**
 * Why not use properties to show and hide components? The method of using attributes has been tried, but this method requires more renderings (the function needs to be executed multiple times internally).
 *
 * ref: example/src/__dev__/test_modal_prototype.tsx
 */

/**
 * Mainly solves the effect problem of native modal component `RNModal` display mask.
 */
function SlideModal(props) {
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
    Slide,
    keyboardVerticalOffset,
    enableSlideComponent = true,
    enabledKeyboardAdjust = false,
    ...others
  } = props;
  const {
    translateY,
    startShow,
    startHide,
    backgroundOpacity
  } = (0, _Modal.useModalAnimation)(modalAnimationType);
  const [visible, setVisible] = React.useState(false);
  const _Slide = Slide ?? _DefaultSlide.DefaultSlide;
  if (propsRef.current) {
    propsRef.current.startShow = (onf, timeout) => {
      setVisible(true);
      if (timeout !== undefined) {
        startShow(() => {
          (0, _utils.timeoutTask)(timeout, () => {
            onf === null || onf === void 0 ? void 0 : onf();
          });
        });
      } else {
        startShow(() => {
          onf === null || onf === void 0 ? void 0 : onf();
        });
      }
    };
    propsRef.current.startHide = (onf, timeout) => {
      if (timeout !== undefined) {
        startHide(() => {
          setVisible(false);
          (0, _utils.timeoutTask)(timeout, () => {
            onf === null || onf === void 0 ? void 0 : onf();
            onFinished === null || onFinished === void 0 ? void 0 : onFinished();
          });
        });
      } else {
        startHide(() => {
          setVisible(false);
          onf === null || onf === void 0 ? void 0 : onf();
          onFinished === null || onFinished === void 0 ? void 0 : onFinished();
        });
      }
    };
  }
  return /*#__PURE__*/React.createElement(_reactNative.Modal, _extends({
    transparent: true,
    visible: visible,
    animationType: "none",
    onRequestClose: onRequestModalClose,
    supportedOrientations: ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']
  }, others), /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => {
      if (disableBackgroundClose !== true) {
        onRequestModalClose();
      }
    }
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      backgroundColor: backgroundTransparent === true ? undefined : backgroundColor ?? _const.g_mask_color,
      opacity: backgroundTransparent === true ? 0 : backgroundOpacity
    }]
  })), /*#__PURE__*/React.createElement(_Keyboard.KeyboardAvoidingView, {
    behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
    keyboardVerticalOffset: keyboardVerticalOffset,
    pointerEvents: 'box-none',
    enabled: enabledKeyboardAdjust,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [{
      flex: 1,
      justifyContent: 'flex-end',
      opacity: modalAnimationType === 'fade' ? backgroundOpacity : 1,
      transform: [{
        translateY: translateY
      }]
    }, modalStyle],
    pointerEvents: 'box-none'
  }, /*#__PURE__*/React.createElement(SlideComponent, {
    Slide: _Slide,
    modalAnimationType: modalAnimationType,
    translateY: translateY,
    startShow: startShow,
    startHide: startHide,
    onRequestModalClose: onRequestModalClose,
    onMoveShouldSetPanResponder: onMoveShouldSetPanResponder,
    enableSlideComponent: enableSlideComponent
  }), children)));
}
const SlideComponent = props => {
  const {
    Slide,
    modalAnimationType,
    translateY,
    startShow,
    onRequestModalClose,
    onMoveShouldSetPanResponder,
    enableSlideComponent
  } = props;
  const panHandlers = (0, _Modal.useModalPanResponder)({
    type: modalAnimationType,
    translateY: translateY,
    startShow: startShow,
    onRequestModalClose: onRequestModalClose,
    onMoveShouldSetPanResponder: onMoveShouldSetPanResponder
  }).panHandlers;
  return enableSlideComponent === true ? /*#__PURE__*/React.createElement(Slide, _extends({
    modalType: 'modal'
  }, panHandlers)) : null;
};
//# sourceMappingURL=SlideModal.js.map