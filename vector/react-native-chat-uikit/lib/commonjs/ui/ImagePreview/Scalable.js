"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scalable = Scalable;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Scalable(props) {
  const {
    children,
    containerStyle,
    onDoubleClicked
  } = props;
  const baseScale = React.useRef(new _reactNative.Animated.Value(1)).current;
  const pinchScale = React.useRef(new _reactNative.Animated.Value(1)).current;
  const scale = React.useRef(_reactNative.Animated.multiply(baseScale, pinchScale));
  const lastScale = React.useRef(1);
  const onPinchGestureEvent = _reactNative.Animated.event([{
    nativeEvent: {
      scale: pinchScale
    }
  }], {
    useNativeDriver: false
  });
  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === _reactNativeGestureHandler.State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  };
  const onDoubleTap = event => {
    if (event.nativeEvent.state === _reactNativeGestureHandler.State.ACTIVE) {
      // scale.setValue(1);
      // baseScale.setValue(1);
      // pinchScale.setValue(1);
      scale.current = _reactNative.Animated.multiply(baseScale, pinchScale);
      _reactNative.Animated.parallel([_reactNative.Animated.spring(baseScale, {
        toValue: 1,
        useNativeDriver: false
      }), _reactNative.Animated.spring(pinchScale, {
        toValue: 1,
        useNativeDriver: false
      })]).start();
      lastScale.current = 1;
      onDoubleClicked === null || onDoubleClicked === void 0 ? void 0 : onDoubleClicked();
    }
  };

  // const onOneTap = (
  //   event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  // ) => {
  //   if (event.nativeEvent.state === State.ACTIVE) {
  //     onOneClicked?.();
  //   }
  // };

  return /*#__PURE__*/React.createElement(_reactNativeGestureHandler.PinchGestureHandler
  // ref={pinchRef}
  // simultaneousHandlers={rotationRef}
  , {
    onGestureEvent: onPinchGestureEvent,
    onHandlerStateChange: onPinchHandlerStateChange
  }, /*#__PURE__*/React.createElement(_reactNativeGestureHandler.TapGestureHandler
  // ref={doubleTapRef}
  , {
    numberOfTaps: 2,
    onHandlerStateChange: onDoubleTap
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [{
      transform: [{
        scale: scale.current
      }]
    }, containerStyle],
    collapsable: false
  }, children)));
}
//# sourceMappingURL=Scalable.js.map