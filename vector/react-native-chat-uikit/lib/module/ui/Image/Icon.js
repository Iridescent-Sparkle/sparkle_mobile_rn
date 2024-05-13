function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Image } from './Image';
import { getIconSource } from './Image.hooks';
export function Icon(props) {
  const {
    name,
    resolution,
    style,
    ...others
  } = props;
  return /*#__PURE__*/React.createElement(Image, _extends({
    source: getIconSource(name, resolution) ?? 0,
    style: [style]
  }, others));
}
//# sourceMappingURL=Icon.js.map