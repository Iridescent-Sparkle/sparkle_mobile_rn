function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
export const DefaultSlide = props => {
  if (props.modalType === 'simu-modal') {
    return /*#__PURE__*/React.createElement(Internal, props);
  } else {
    return /*#__PURE__*/React.createElement(Pressable, null, /*#__PURE__*/React.createElement(Internal, props));
  }
};
const Internal = props => {
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    backgroundColor: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    backgroundColor2: {
      light: colors.neutral[8],
      dark: colors.neutral[3]
    }
  });
  return /*#__PURE__*/React.createElement(View, _extends({
    style: [{
      height: 32,
      width: '100%',
      backgroundColor: getColor('backgroundColor'),
      alignItems: 'center',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      transform: [{
        translateY: 15
      }]
    }]
  }, props), /*#__PURE__*/React.createElement(View, {
    style: {
      width: 36,
      height: 5,
      marginTop: 6,
      backgroundColor: getColor('backgroundColor2'),
      borderRadius: 2.5
    }
  }));
};
//# sourceMappingURL=DefaultSlide.js.map