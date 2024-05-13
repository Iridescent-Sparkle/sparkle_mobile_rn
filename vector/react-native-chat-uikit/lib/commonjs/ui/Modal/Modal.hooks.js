"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalPanResponder = exports.useModalAnimation = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useModalAnimation = type => {
  const {
    height
  } = (0, _reactNative.useWindowDimensions)();
  const initialY = type === 'slide' ? height : 0;
  const backgroundOpacity = React.useRef(new _reactNative.Animated.Value(0)).current;
  const translateYRef = React.useRef(new _reactNative.Animated.Value(initialY));
  // translateY.setValue(initialY);

  const createAnimated = toValue => {
    const config = {
      duration: 250,
      useNativeDriver: false
    };
    return _reactNative.Animated.parallel([_reactNative.Animated.timing(backgroundOpacity, {
      toValue,
      ...config
    }), _reactNative.Animated.timing(translateYRef.current, {
      toValue: toValue === 0 ? initialY : 0,
      ...config
    })]).start;
  };
  return {
    translateY: translateYRef.current,
    backgroundOpacity,
    startShow: createAnimated(1),
    startHide: createAnimated(0)
  };
};
exports.useModalAnimation = useModalAnimation;
const useModalPanResponder = params => {
  const {
    type,
    translateY,
    onRequestModalClose,
    startShow,
    onMoveShouldSetPanResponder
  } = params;
  const isHideGesture = React.useCallback((distanceY, velocityY) => {
    return distanceY > 125 || distanceY > 0 && velocityY > 0.1;
  }, []);
  const r = React.useRef(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: (e, g) => {
      if (onMoveShouldSetPanResponder) {
        return onMoveShouldSetPanResponder(e, g);
      }
      return g.dy >= 0;
    },
    onMoveShouldSetPanResponder: (e, g) => {
      if (onMoveShouldSetPanResponder) {
        return onMoveShouldSetPanResponder(e, g);
      }
      return g.dy >= 0;
    },
    onPanResponderGrant: (_, __) => {
      // @ts-ignore
      translateY.setOffset(translateY.__getValue());
    },
    onPanResponderMove: (_, _ref) => {
      let {
        dy
      } = _ref;
      return dy >= 0 && translateY.setValue(dy);
    },
    onPanResponderRelease: (_, _ref2) => {
      let {
        dy,
        vy
      } = _ref2;
      if (isHideGesture(dy, vy)) onRequestModalClose();else startShow();
    }
  })).current;
  if (type === 'slide') return r;else return {
    panHandlers: {}
  };
};
exports.useModalPanResponder = useModalPanResponder;
//# sourceMappingURL=Modal.hooks.js.map