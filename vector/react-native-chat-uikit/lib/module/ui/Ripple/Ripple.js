import * as React from 'react';
import { Animated, View } from 'react-native';
export function Ripple(props) {
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
  const opacity = React.useRef(new Animated.Value(1)).current;
  const scale = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const a = Animated.loop(Animated.parallel([Animated.timing(opacity, {
      useNativeDriver: false,
      toValue: 0,
      duration: timestamp
    }), Animated.timing(scale, {
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
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      // flexGrow: 1,
      // overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(Animated.View, {
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