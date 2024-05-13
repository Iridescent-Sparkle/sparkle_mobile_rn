"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text1Button = Text1Button;
exports.Text1IconButton = Text1IconButton;
exports.Text2Button = Text2Button;
exports.Text2IconButton = Text2IconButton;
var React = _interopRequireWildcard(require("react"));
var _Button = require("./Button");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Text1Button(props) {
  return /*#__PURE__*/React.createElement(_Button.Button, _extends({
    buttonStyle: "textButton1"
  }, props));
}
function Text2Button(props) {
  return /*#__PURE__*/React.createElement(_Button.Button, _extends({
    buttonStyle: "textButton2"
  }, props));
}
function Text1IconButton(props) {
  return /*#__PURE__*/React.createElement(Text1Button, _extends({
    contentType: "only-icon"
  }, props));
}
function Text2IconButton(props) {
  return /*#__PURE__*/React.createElement(Text2Button, _extends({
    contentType: "only-icon"
  }, props));
}
//# sourceMappingURL=TextButton.js.map