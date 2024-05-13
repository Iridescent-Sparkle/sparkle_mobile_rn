function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { ICON_ASSETS } from '../../assets';
import { useConfigContext } from '../../config';
import { useGetStyleProps } from '../../hook';
import { usePaletteContext, useThemeContext } from '../../theme';
import { DefaultIconImage } from '../../ui/Image';
/**
 * Avatar component. If the url is incorrect, does not exist, or a network error occurs
 *
 * @param props {@link DefaultIconImageProps}
 */
export function Avatar(props) {
  const {
    size,
    style,
    localIcon,
    ...others
  } = props;
  const {
    cornerRadius: corner
  } = useThemeContext();
  const {
    cornerRadius
  } = usePaletteContext();
  const {
    getBorderRadius
  } = useGetStyleProps();
  const {
    personAvatar
  } = useConfigContext();
  return /*#__PURE__*/React.createElement(DefaultIconImage, _extends({
    localIcon: localIcon ?? personAvatar ?? ICON_ASSETS.person_single_outline('3x'),
    size: size,
    style: [style, {
      borderRadius: getBorderRadius({
        height: size,
        crt: corner.avatar,
        cr: cornerRadius,
        style
      })
    }],
    borderRadius: getBorderRadius({
      height: size,
      crt: corner.avatar,
      cr: cornerRadius,
      style
    })
  }, others));
}
export function GroupAvatar(props) {
  const {
    localIcon,
    ...others
  } = props;
  const {
    groupAvatar
  } = useConfigContext();
  return /*#__PURE__*/React.createElement(Avatar, _extends({}, others, {
    localIcon: localIcon ?? groupAvatar ?? ICON_ASSETS.person_double('3x')
  }));
}
//# sourceMappingURL=Avatar.js.map