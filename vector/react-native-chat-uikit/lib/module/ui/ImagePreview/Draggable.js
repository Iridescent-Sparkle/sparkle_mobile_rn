function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Animated, PanResponder } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
export function Draggable(props) {
  const {
    children,
    containerStyle
  } = props;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_event, gestureState) => {
      // @ts-ignore
      const {
        dx,
        dy
      } = gestureState;
      pan.setValue({
        x: dx,
        y: dy
      });
    },
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        // @ts-ignore
        x: pan.x._value,
        // @ts-ignore
        y: pan.y._value
      });
      pan.setValue({
        x: 0,
        y: 0
      });
    }
  })).current;
  return /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: [{
      transform: [{
        translateX: pan.x
      }, {
        translateY: pan.y
      }]
    }, containerStyle]
  }, panResponder.panHandlers), children);
}
export function Draggable2(props) {
  const {
    children,
    containerStyle
  } = props;
  const translateXY = React.useRef(new Animated.ValueXY({
    x: 0,
    y: 0
  }));
  const onGestureEvent = Animated.event([{
    nativeEvent: {
      translationX: translateXY.current.x,
      translationY: translateXY.current.y
    }
  }], {
    useNativeDriver: true
  });
  const onPanHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      translateXY.current.setValue({
        x: event.nativeEvent.translationX,
        y: event.nativeEvent.translationY
      });
      translateXY.current.flattenOffset();
    } else if (event.nativeEvent.oldState === State.UNDETERMINED) {
      translateXY.current.setOffset({
        // @ts-ignore
        x: translateXY.current.x._value,
        // @ts-ignore
        y: translateXY.current.y._value
      });
      translateXY.current.setValue({
        x: 0,
        y: 0
      });
    }
  };
  return /*#__PURE__*/React.createElement(PanGestureHandler, {
    maxPointers: 1,
    onGestureEvent: onGestureEvent,
    onHandlerStateChange: onPanHandlerStateChange
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      transform: [{
        translateX: translateXY.current.x
      }, {
        translateY: translateXY.current.y
      }]
    }, containerStyle]
  }, children));
}
//# sourceMappingURL=Draggable.js.map