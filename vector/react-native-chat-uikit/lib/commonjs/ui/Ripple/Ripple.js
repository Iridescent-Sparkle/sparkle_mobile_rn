"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ripple = Ripple;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Ripple(props) {
  const {
    containerStyle,
    children,
    rippleStyle,
    rippleDuration,
    rippleStartOpacity: startOpacity = 0.2,
    childrenStyle,
    playAnimated
  } = props;
  const {
    width: childrenWidth,
    height: childrenHeight,
    borderRadius: childrenBorderRadius
  } = childrenStyle;
  const {
    width: rippleWidth,
    height: rippleHeight,
    backgroundColor: rippleBackgroundColor
  } = rippleStyle ?? {};
  const timestamp = React.useRef(rippleDuration ?? 1500).current;
  const opacity = React.useRef(new _reactNative.Animated.Value(1)).current;
  const scale = React.useRef(new _reactNative.Animated.Value(0)).current;
  React.useEffect(() => {
    const a = _reactNative.Animated.loop(_reactNative.Animated.parallel([_reactNative.Animated.timing(opacity, {
      useNativeDriver: false,
      toValue: 0,
      duration: timestamp
    }), _reactNative.Animated.timing(scale, {
      useNativeDriver: false,
      toValue: 1,
      duration: timestamp
    })]));
    if (playAnimated === true) {
      a.start();
    } else {
      opacity.setValue(startOpacity);
      scale.setValue(1);
      a.stop();
    }
    return () => {
      a.stop();
    };
  }, [opacity, scale, timestamp, playAnimated, startOpacity]);
  const height = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [childrenHeight, rippleHeight ?? childrenHeight * 1.1]
  });
  const width = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [childrenWidth, rippleWidth ?? childrenWidth * 1.1]
  });
  const borderRadius = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [childrenBorderRadius, childrenWidth / childrenHeight * childrenBorderRadius]
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      // flexGrow: 1,
      // overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [{
      height: height,
      width: width,
      opacity: opacity,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: rippleBackgroundColor ?? '#00bfff',
      borderRadius: borderRadius,
      // overflow: 'hidden',
      position: 'absolute'
    }]
  }), children);
}
//# sourceMappingURL=Ripple.js.map