import * as React from 'react';
import { ICON_ASSETS } from '../../assets';
import { DefaultImage } from './DefaultImage';
export function DefaultIconImage(props) {
  const {
    url,
    size,
    borderRadius,
    style,
    defaultStyle,
    localIcon
  } = props;
  return /*#__PURE__*/React.createElement(DefaultImage, {
    defaultSource: localIcon ?? ICON_ASSETS.person_single_outline('3x'),
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