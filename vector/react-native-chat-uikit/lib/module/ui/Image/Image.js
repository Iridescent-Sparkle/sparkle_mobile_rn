function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Image as RNImage } from 'react-native';
/**
 * It mainly adds the function of native component `RNImage` to use the default image after loading failure.
 *
 * !!! If your image source (source attribute) is null or invalid, onError may not be called. You should ensure that your image source is a valid URL or a local image obtained through the require function.
 */
export function Image(props) {
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
  return /*#__PURE__*/React.createElement(RNImage, _extends({
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
export const ImageMemo = /*#__PURE__*/React.memo(Image, ImageCompare);
//# sourceMappingURL=Image.js.map