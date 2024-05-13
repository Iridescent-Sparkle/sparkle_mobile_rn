function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Animated, Easing } from 'react-native';
import { ClassImage } from './Image.class';
import { getIconSource } from './Image.hooks';
const AnimatedImage = Animated.createAnimatedComponent(ClassImage);
export function LoadingIcon(props) {
  const {
    name = 'loading',
    resolution,
    style,
    isStop,
    ...others
  } = props;
  const deg = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const animate = Animated.loop(Animated.timing(deg, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.linear)
    }));
    if (isStop === true) {
      animate.stop();
    } else {
      // animate.reset();
      animate.start();
    }
  }, [deg, isStop]);
  return /*#__PURE__*/React.createElement(AnimatedImage, _extends({
    source: getIconSource(name, resolution) ?? 0,
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