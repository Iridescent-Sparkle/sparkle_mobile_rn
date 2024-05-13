import * as React from 'react';
import { Animated, PanResponder, useWindowDimensions } from 'react-native';
export const useModalAnimation = type => {
  const {
    height
  } = useWindowDimensions();
  const initialY = type === 'slide' ? height : 0;
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  const translateYRef = React.useRef(new Animated.Value(initialY));
  // translateY.setValue(initialY);

  const createAnimated = toValue => {
    const config = {
      duration: 250,
      useNativeDriver: false
    };
    return Animated.parallel([Animated.timing(backgroundOpacity, {
      toValue,
      ...config
    }), Animated.timing(translateYRef.current, {
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
export const useModalPanResponder = params => {
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
  const r = React.useRef(PanResponder.create({
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
//# sourceMappingURL=Modal.hooks.js.map