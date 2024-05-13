"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultImage = DefaultImage;
exports.DefaultImage2 = DefaultImage2;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Image = require("./Image");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * It mainly adds the function of native component `Image` and preloading the default image.
 */
function DefaultImage(props) {
  const {
    style,
    defaultStyle = style,
    defaultContainerStyle,
    containerStyle,
    defaultSource,
    onLoad,
    source,
    ...others
  } = props;
  const [visible, setVisible] = React.useState(source.uri !== undefined && source.uri !== null ? false : true);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [containerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [defaultContainerStyle]
  }, /*#__PURE__*/React.createElement(_Image.Image, _extends({
    style: [defaultStyle, {
      // display: visible ? 'flex' : 'none',
      opacity: visible === true ? 1 : 0
    }],
    source: defaultSource
  }, others))), source.uri !== undefined && source.uri !== null && source.uri.length > 0 ? /*#__PURE__*/React.createElement(_Image.Image, _extends({
    style: [style, {
      position: 'absolute'
    }],
    onLoad: e => {
      onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
      setVisible(false);
    },
    source: {
      ...source,
      cache: source.cache ?? 'default'
    }
  }, others)) : null);
}
/**
 * The Android platform cannot display default images properly.
 */
function DefaultImage2(props) {
  const {
    style,
    defaultSource,
    onLoad,
    source,
    ...others
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Image.Image, _extends({
    style: style,
    onLoad: onLoad,
    source: {
      ...source,
      cache: source.cache ?? 'default'
    },
    defaultSource: defaultSource
  }, others)));
}
//# sourceMappingURL=DefaultImage.js.map