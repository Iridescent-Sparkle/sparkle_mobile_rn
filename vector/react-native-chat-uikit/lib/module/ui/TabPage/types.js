function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { ScrollView } from 'react-native';
export function TabPageBodyItem(props) {
  const {
    style,
    children,
    ...others
  } = props;
  return /*#__PURE__*/React.createElement(ScrollView, _extends({
    style: [style]
  }, others), children);
}
//# sourceMappingURL=types.js.map