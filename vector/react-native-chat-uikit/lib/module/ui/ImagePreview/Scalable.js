import * as React from 'react';
import { Animated } from 'react-native';
import { PinchGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
export function Scalable(props) {
  const {
    children,
    containerStyle,
    onDoubleClicked
  } = props;
  const baseScale = React.useRef(new Animated.Value(1)).current;
  const pinchScale = React.useRef(new Animated.Value(1)).current;
  const scale = React.useRef(Animated.multiply(baseScale, pinchScale));
  const lastScale = React.useRef(1);
  const onPinchGestureEvent = Animated.event([{
    nativeEvent: {
      scale: pinchScale
    }
  }], {
    useNativeDriver: false
  });
  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  };
  const onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // scale.setValue(1);
      // baseScale.setValue(1);
      // pinchScale.setValue(1);
      scale.current = Animated.multiply(baseScale, pinchScale);
      Animated.parallel([Animated.spring(baseScale, {
        toValue: 1,
        useNativeDriver: false
      }), Animated.spring(pinchScale, {
        toValue: 1,
        useNativeDriver: false
      })]).start();
      lastScale.current = 1;
      onDoubleClicked === null || onDoubleClicked === void 0 ? void 0 : onDoubleClicked();
    }
  };

  // const onOneTap = (
  //   event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  // ) => {
  //   if (event.nativeEvent.state === State.ACTIVE) {
  //     onOneClicked?.();
  //   }
  // };

  return /*#__PURE__*/React.createElement(PinchGestureHandler
  // ref={pinchRef}
  // simultaneousHandlers={rotationRef}
  , {
    onGestureEvent: onPinchGestureEvent,
    onHandlerStateChange: onPinchHandlerStateChange
  }, /*#__PURE__*/React.createElement(TapGestureHandler
  // ref={doubleTapRef}
  , {
    numberOfTaps: 2,
    onHandlerStateChange: onDoubleTap
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      transform: [{
        scale: scale.current
      }]
    }, containerStyle],
    collapsable: false
  }, children)));
}
//# sourceMappingURL=Scalable.js.map