function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from './Text';
/**
 * This component is used to calculate the width of the displayed string. No ellipses will be generated due to width. The component is not visible. But it is also recommended to put it at the bottom.
 *
 * **Note**: The string does not wrap, it is only displayed on one line, and the test calculation is performed without displaying the ellipsis.
 */
export function PresetCalcTextWidth(props) {
  const {
    content,
    onWidth,
    textProps: {
      onLayout,
      onTextLayout,
      ...others
    }
  } = props;
  return /*#__PURE__*/React.createElement(View, {
    style: {
      position: 'absolute',
      width: 1,
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement(ScrollView, {
    horizontal: true
  }, /*#__PURE__*/React.createElement(Text, _extends({
    onLayout: e => {
      // onWidth(e.nativeEvent.layout.width);
      onLayout === null || onLayout === void 0 ? void 0 : onLayout(e);
    },
    onTextLayout: e => {
      var _e$nativeEvent$lines$;
      onWidth(((_e$nativeEvent$lines$ = e.nativeEvent.lines[0]) === null || _e$nativeEvent$lines$ === void 0 ? void 0 : _e$nativeEvent$lines$.width) ?? 0);
      onTextLayout === null || onTextLayout === void 0 ? void 0 : onTextLayout(e);
    }
  }, others), content)));
}
//# sourceMappingURL=PresetCalcTextWidth.js.map