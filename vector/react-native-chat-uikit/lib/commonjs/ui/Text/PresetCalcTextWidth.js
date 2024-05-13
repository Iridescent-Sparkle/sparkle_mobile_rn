"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresetCalcTextWidth = PresetCalcTextWidth;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Text = require("./Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * This component is used to calculate the width of the displayed string. No ellipses will be generated due to width. The component is not visible. But it is also recommended to put it at the bottom.
 *
 * **Note**: The string does not wrap, it is only displayed on one line, and the test calculation is performed without displaying the ellipsis.
 */
function PresetCalcTextWidth(props) {
  const {
    content,
    onWidth,
    textProps: {
      onLayout,
      onTextLayout,
      ...others
    }
  } = props;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      position: 'absolute',
      width: 1,
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement(_reactNative.ScrollView, {
    horizontal: true
  }, /*#__PURE__*/React.createElement(_Text.Text, _extends({
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