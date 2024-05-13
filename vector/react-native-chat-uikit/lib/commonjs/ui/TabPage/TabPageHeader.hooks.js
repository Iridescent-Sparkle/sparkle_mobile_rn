"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTabPageHeaderAnimation2 = exports.useTabPageHeaderAnimation = exports.calculateLeft = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _TabPage = require("./TabPage.const");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const calculateLeft = params => {
  const {
    width,
    count,
    index,
    indicatorWidth
  } = params;
  const unitWidth = width / count;
  return {
    left: unitWidth / 2 - indicatorWidth / 2 + unitWidth * index,
    unitWidth: unitWidth
  };
};

/**
 *
 * **Note** On the Android platform, fast and complex operations may cause the indicator position to be incorrect.
 */
exports.calculateLeft = calculateLeft;
const useTabPageHeaderAnimation = params => {
  const {
    unitWidth,
    initLeft
  } = params;
  const left = React.useRef(new _reactNative.Animated.Value(initLeft)).current;
  const createAnimated = (type, count) => {
    //@ts-ignore
    const cur = left.__getValue();
    const c = count ?? 1;
    const config = {
      duration: _TabPage.gAnimatedDuration,
      useNativeDriver: false
    };
    return _reactNative.Animated.timing(left, {
      toValue: type === 'r' ? cur + unitWidth * c : cur - unitWidth * c,
      ...config
    }).start;
  };
  return {
    left,
    toNext: createAnimated
  };
};
exports.useTabPageHeaderAnimation = useTabPageHeaderAnimation;
const useTabPageHeaderAnimation2 = params => {
  const {
    width,
    count,
    index = 0,
    indicatorWidth
  } = params;
  const {
    left: leftValue,
    unitWidth
  } = calculateLeft({
    width,
    count,
    index,
    indicatorWidth
  });
  const left = React.useRef(new _reactNative.Animated.Value(leftValue)).current;
  const preCount = React.useRef(count);
  if (preCount.current !== count) {
    preCount.current = count;
    left.setValue(leftValue);
  }
  const createAnimated = params => {
    const {
      left: leftValue
    } = calculateLeft(params);
    const config = {
      duration: _TabPage.gAnimatedDuration,
      useNativeDriver: false
    };
    return _reactNative.Animated.timing(left, {
      toValue: leftValue,
      ...config
    }).start;
  };
  return {
    left,
    unitWidth,
    toNext: createAnimated
  };
};
exports.useTabPageHeaderAnimation2 = useTabPageHeaderAnimation2;
//# sourceMappingURL=TabPageHeader.hooks.js.map