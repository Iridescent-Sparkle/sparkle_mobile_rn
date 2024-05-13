"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingIcon = LoadingIcon;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Image = require("./Image.class");
var _Image2 = require("./Image.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedImage = _reactNative.Animated.createAnimatedComponent(_Image.ClassImage);
function LoadingIcon(props) {
  const {
    name = 'loading',
    resolution,
    style,
    isStop,
    ...others
  } = props;
  const deg = React.useRef(new _reactNative.Animated.Value(0)).current;
  React.useEffect(() => {
    const animate = _reactNative.Animated.loop(_reactNative.Animated.timing(deg, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: _reactNative.Easing.inOut(_reactNative.Easing.linear)
    }));
    if (isStop === true) {
      animate.stop();
    } else {
      // animate.reset();
      animate.start();
    }
  }, [deg, isStop]);
  return /*#__PURE__*/React.createElement(AnimatedImage, _extends({
    source: (0, _Image2.getIconSource)(name, resolution) ?? 0,
    style: [style, {
      transform: [{
        rotate: deg.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }]
    }]
  }, others));
}
//# sourceMappingURL=LoadingIcon.js.map