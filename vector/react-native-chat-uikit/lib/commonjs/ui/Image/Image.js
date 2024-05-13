"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = Image;
exports.ImageMemo = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * It mainly adds the function of native component `RNImage` to use the default image after loading failure.
 *
 * !!! If your image source (source attribute) is null or invalid, onError may not be called. You should ensure that your image source is a valid URL or a local image obtained through the require function.
 */
function Image(props) {
  const {
    style,
    source,
    failedSource,
    onError,
    ...others
  } = props;
  const [_source, setSource] = React.useState(source);
  const ref = React.useRef(undefined);
  if (source !== _source) {
    setSource(source);
  }
  return /*#__PURE__*/React.createElement(_reactNative.Image, _extends({
    ref: ref,
    style: [style],
    source: _source,
    onError: event => {
      if (onError) {
        onError(event);
      }
      if (failedSource) {
        setSource(failedSource);
      }
    }
  }, others));
}
const ImageCompare = () => {
  return true;
};
const ImageMemo = /*#__PURE__*/React.memo(Image, ImageCompare);
exports.ImageMemo = ImageMemo;
//# sourceMappingURL=Image.js.map