"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Draggable = Draggable;
exports.Draggable2 = Draggable2;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Draggable(props) {
  const {
    children,
    containerStyle
  } = props;
  const pan = React.useRef(new _reactNative.Animated.ValueXY()).current;
  const panResponder = React.useRef(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_event, gestureState) => {
      // @ts-ignore
      const {
        dx,
        dy
      } = gestureState;
      pan.setValue({
        x: dx,
        y: dy
      });
    },
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        // @ts-ignore
        x: pan.x._value,
        // @ts-ignore
        y: pan.y._value
      });
      pan.setValue({
        x: 0,
        y: 0
      });
    }
  })).current;
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, _extends({
    style: [{
      transform: [{
        translateX: pan.x
      }, {
        translateY: pan.y
      }]
    }, containerStyle]
  }, panResponder.panHandlers), children);
}
function Draggable2(props) {
  const {
    children,
    containerStyle
  } = props;
  const translateXY = React.useRef(new _reactNative.Animated.ValueXY({
    x: 0,
    y: 0
  }));
  const onGestureEvent = _reactNative.Animated.event([{
    nativeEvent: {
      translationX: translateXY.current.x,
      translationY: translateXY.current.y
    }
  }], {
    useNativeDriver: true
  });
  const onPanHandlerStateChange = event => {
    if (event.nativeEvent.oldState === _reactNativeGestureHandler.State.ACTIVE) {
      translateXY.current.setValue({
        x: event.nativeEvent.translationX,
        y: event.nativeEvent.translationY
      });
      translateXY.current.flattenOffset();
    } else if (event.nativeEvent.oldState === _reactNativeGestureHandler.State.UNDETERMINED) {
      translateXY.current.setOffset({
        // @ts-ignore
        x: translateXY.current.x._value,
        // @ts-ignore
        y: translateXY.current.y._value
      });
      translateXY.current.setValue({
        x: 0,
        y: 0
      });
    }
  };
  return /*#__PURE__*/React.createElement(_reactNativeGestureHandler.PanGestureHandler, {
    maxPointers: 1,
    onGestureEvent: onGestureEvent,
    onHandlerStateChange: onPanHandlerStateChange
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [{
      transform: [{
        translateX: translateXY.current.x
      }, {
        translateY: translateXY.current.y
      }]
    }, containerStyle]
  }, children));
}
//# sourceMappingURL=Draggable.js.map