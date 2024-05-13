import * as React from 'react';
import { Animated, PanResponder, useWindowDimensions } from 'react-native';
export const useSimulativeModalAnimation = type => {
  const {
    height
  } = useWindowDimensions();
  const initialY = type === 'slide' ? height : 0;
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(initialY)).current;
  // translateY.setValue(initialY);

  const createAnimated = toValue => {
    const config = {
      duration: 250,
      useNativeDriver: false
    };
    return Animated.parallel([Animated.timing(backgroundOpacity, {
      toValue,
      ...config
    }), Animated.timing(translateY, {
      toValue: toValue === 0 ? initialY : 0,
      ...config
    })]).start;
  };
  return {
    translateY,
    backgroundOpacity,
    startShow: createAnimated(1),
    startHide: createAnimated(0)
  };
};
export const useSimulativeModalPanResponder = params => {
  const {
    type,
    translateY,
    setModalVisible,
    startHide,
    startShow,
    onStartShouldSetPanResponder
  } = params;
  const isHideGesture = React.useCallback((distanceY, velocityY) => {
    return distanceY > 125 || distanceY > 0 && velocityY > 0.1;
  }, []);
  const r = React.useRef(PanResponder.create({
    onStartShouldSetPanResponder: (e, g) => {
      if (onStartShouldSetPanResponder) {
        return onStartShouldSetPanResponder(e, g);
      }
      return g.dy > 8;
    },
    onMoveShouldSetPanResponder: (e, g) => {
      if (onStartShouldSetPanResponder) {
        return onStartShouldSetPanResponder(e, g);
      }
      return g.dy > 8;
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
      if (isHideGesture(dy, vy)) {
        startHide(() => setModalVisible(false));
      } else {
        startShow();
      }
    }
  })).current;
  if (type === 'slide') return r;else return {
    panHandlers: {}
  };
};
//# sourceMappingURL=SimuModal.hooks.js.map