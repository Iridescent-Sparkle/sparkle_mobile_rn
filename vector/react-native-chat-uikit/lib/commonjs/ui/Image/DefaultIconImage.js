"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultIconImage = DefaultIconImage;
var React = _interopRequireWildcard(require("react"));
var _assets = require("../../assets");
var _DefaultImage = require("./DefaultImage");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DefaultIconImage(props) {
  const {
    url,
    size,
    borderRadius,
    style,
    defaultStyle,
    localIcon
  } = props;
  return /*#__PURE__*/React.createElement(_DefaultImage.DefaultImage, {
    defaultSource: localIcon ?? _assets.ICON_ASSETS.person_single_outline('3x'),
    source: {
      uri: url
    },
    style: [{
      width: size,
      height: size,
      borderRadius: borderRadius
    }, style],
    defaultStyle: defaultStyle
  });
}
//# sourceMappingURL=DefaultIconImage.js.map