import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Icon } from '../Image';
import { useSwitchAnimation } from './Switch.hooks';
export function Switch(props) {
  const {
    colors
  } = usePaletteContext();
  const {
    style,
    height: propsHeight,
    width: propsWidth,
    value: propsValue,
    onValueChange,
    disabled,
    thumbColor,
    thumbBackgroundColor,
    trackColor: propsTrackColor,
    trackIcon: propsTrackIcon,
    backgroundView,
    iconStyle,
    animationDuration = 100
  } = props;
  const {
    getColor
  } = useColors({
    trackFalse: {
      light: colors.neutral[9],
      dark: colors.neutral[9]
    },
    trackTrue: {
      light: colors.neutral[3],
      dark: colors.neutral[3]
    },
    thumbColor: {
      light: thumbColor ?? colors.neutral[98],
      dark: thumbColor ?? colors.neutral[1]
    },
    thumbBackgroundColor: {
      light: thumbBackgroundColor ?? colors.primary[5],
      dark: thumbBackgroundColor ?? colors.primary[6]
    }
  });
  const height = propsHeight ?? 40;
  const width = propsWidth ?? height * (70 / 40);
  const _value = propsValue ?? false;
  const falseColor = (propsTrackColor === null || propsTrackColor === void 0 ? void 0 : propsTrackColor.false) ?? getColor('trackFalse');
  const trueColor = (propsTrackColor === null || propsTrackColor === void 0 ? void 0 : propsTrackColor.true) ?? getColor('trackTrue');
  const {
    translateX,
    toRight,
    toLeft,
    trackColor
  } = useSwitchAnimation({
    value: _value,
    width,
    height,
    falseColor,
    trueColor,
    animationDuration
  });
  const _onValueChange = v => {
    if (onValueChange) {
      onValueChange(v);
    }
    if (v === true) {
      toRight();
    } else {
      toLeft();
    }
  };
  if (width < height) {
    throw new Error('width must be greater than height');
  }
  if (height < 20) {
    throw new Error('height must be greater than 20');
  }
  if (typeof falseColor === 'number') {
    throw new Error('falseColor must be number');
  }
  if (typeof trueColor === 'number') {
    throw new Error('trueColor must be number');
  }
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [style, {
      width: width,
      height: height,
      backgroundColor: trackColor,
      borderRadius: width,
      justifyContent: 'center',
      overflow: 'hidden'
    }],
    onTouchEnd: () => {
      if (disabled === true) {
        return;
      }
      _onValueChange(!_value);
    }
  }, backgroundView ? /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, {
      position: 'absolute',
      backgroundColor: 'red'
    }]
  }, backgroundView) : null, /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      transform: [{
        translateX: translateX
      }],
      height: height * 0.9,
      width: height * 0.9,
      borderRadius: width * 0.9,
      backgroundColor: getColor('thumbBackgroundColor'),
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, propsTrackIcon !== null && propsTrackIcon !== void 0 && propsTrackIcon.false && propsTrackIcon.true ? /*#__PURE__*/React.createElement(Icon, {
    name: propsValue === true ? propsTrackIcon.true : propsTrackIcon.false,
    style: [{
      width: height * 0.9,
      height: height * 0.9,
      tintColor: getColor('thumbColor')
    }, iconStyle]
  }) : null));
}
//# sourceMappingURL=Switch.js.map