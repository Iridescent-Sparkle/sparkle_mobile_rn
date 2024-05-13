function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Button } from './Button';
export function CmnButton(props) {
  return /*#__PURE__*/React.createElement(Button, _extends({
    buttonStyle: "commonButton"
  }, props));
}
export function CmnIconButton(props) {
  return /*#__PURE__*/React.createElement(CmnButton, _extends({
    contentType: "only-icon"
  }, props));
}
//# sourceMappingURL=CmnButton.js.map