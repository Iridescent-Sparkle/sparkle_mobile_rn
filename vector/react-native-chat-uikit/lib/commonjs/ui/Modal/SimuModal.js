"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimulativeModal = SimulativeModal;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _const = require("../../const");
var _DefaultSlide = require("./DefaultSlide");
var _SimuModal = require("./SimuModal.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Why not use properties to show and hide components? The method of using attributes has been tried, but this method requires more renderings (the function needs to be executed multiple times internally).
 *
 * ref: example/src/__dev__/test_modal_prototype.tsx
 */

/**
 * Simulate a modal window.
 */
function SimulativeModal(props) {
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
  } = (0, _SimuModal.useSimulativeModalAnimation)(modalAnimationType);
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const [modalVisible, setModalVisible] = React.useState(false);
  const _Slide = Slide ?? _DefaultSlide.DefaultSlide;
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
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flex: 1,
      position: 'absolute',
      width: width,
      height: height,
      display: modalVisible === true ? 'flex' : 'none'
      // opacity: modalVisible === true ? 1 : 0,
    }, maskStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => {
      if (disableBackgroundClose !== true) {
        startHide(() => setModalVisible(false));
      }
    }
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      backgroundColor: backgroundTransparent === true ? undefined : backgroundColor ?? _const.g_mask_color,
      opacity: backgroundTransparent === true ? 0 : backgroundOpacity
    }]
  })), /*#__PURE__*/React.createElement(_reactNative.Animated.View, _extends({
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
  }, (0, _SimuModal.useSimulativeModalPanResponder)({
    type: modalAnimationType,
    translateY,
    startShow,
    startHide,
    setModalVisible,
    onStartShouldSetPanResponder
  }).panHandlers)), children));
}
//# sourceMappingURL=SimuModal.js.map