function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Button } from './Button';
export function Text1Button(props) {
  return /*#__PURE__*/React.createElement(Button, _extends({
    buttonStyle: "textButton1"
  }, props));
}
export function Text2Button(props) {
  return /*#__PURE__*/React.createElement(Button, _extends({
    buttonStyle: "textButton2"
  }, props));
}
export function Text1IconButton(props) {
  return /*#__PURE__*/React.createElement(Text1Button, _extends({
    contentType: "only-icon"
  }, props));
}
export function Text2IconButton(props) {
  return /*#__PURE__*/React.createElement(Text2Button, _extends({
    contentType: "only-icon"
  }, props));
}
//# sourceMappingURL=TextButton.js.map