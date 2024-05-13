function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Text } from './Text';
export function SingleLineText(props) {
  const {
    numberOfLines,
    children,
    ...others
  } = props;
  return /*#__PURE__*/React.createElement(Text, _extends({
    numberOfLines: numberOfLines ?? 1
  }, others), children);
}
//# sourceMappingURL=SingleLineText.js.map