function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View } from 'react-native';
import { Image } from './Image';
/**
 * It mainly adds the function of native component `Image` and preloading the default image.
 */
export function DefaultImage(props) {
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
  return /*#__PURE__*/React.createElement(View, {
    style: [containerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: [defaultContainerStyle]
  }, /*#__PURE__*/React.createElement(Image, _extends({
    style: [defaultStyle, {
      // display: visible ? 'flex' : 'none',
      opacity: visible === true ? 1 : 0
    }],
    source: defaultSource
  }, others))), source.uri !== undefined && source.uri !== null && source.uri.length > 0 ? /*#__PURE__*/React.createElement(Image, _extends({
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
export function DefaultImage2(props) {
  const {
    style,
    defaultSource,
    onLoad,
    source,
    ...others
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Image, _extends({
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