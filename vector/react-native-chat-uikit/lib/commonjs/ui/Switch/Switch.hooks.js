"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSwitchAnimation = useSwitchAnimation;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useSwitchAnimation(params) {
  const {
    height,
    width,
    value,
    falseColor,
    trueColor,
    animationDuration
  } = params;
  const marginLeft = React.useRef(height * 0.05 < 1 ? 1 : height * 0.05);
  const translateX = React.useRef(new _reactNative.Animated.Value(value === false ? marginLeft.current : width - height + marginLeft.current)).current;
  const trackColorNumber = React.useRef(new _reactNative.Animated.Value(value === false ? 0 : 1)).current;
  const trackColor = trackColorNumber.interpolate({
    inputRange: [0, 1],
    outputRange: [falseColor, trueColor]
  });
  const toRight = _reactNative.Animated.parallel([_reactNative.Animated.timing(translateX, {
    toValue: width - height + marginLeft.current,
    duration: animationDuration,
    useNativeDriver: true
  }), _reactNative.Animated.timing(trackColorNumber, {
    toValue: 1,
    duration: animationDuration,
    useNativeDriver: false
  })]).start;
  const toLeft = _reactNative.Animated.parallel([_reactNative.Animated.timing(translateX, {
    toValue: marginLeft.current,
    duration: animationDuration,
    useNativeDriver: true
  }), _reactNative.Animated.timing(trackColorNumber, {
    toValue: 0,
    duration: animationDuration,
    useNativeDriver: false
  })]).start;
  return {
    translateX,
    toRight,
    toLeft,
    trackColor
  };
}
//# sourceMappingURL=Switch.hooks.js.map