function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { usePaletteContext } from '../../theme';
/**
 * Added theme support based on the native component `Text`.
 */
export function Text(props) {
  const {
    textType,
    paletteType,
    children,
    style,
    ...others
  } = props;
  const presetTextStyle = useGetTextStyle({
    textType,
    paletteType
  });
  return /*#__PURE__*/React.createElement(RNText, _extends({
    style: [presetTextStyle, style]
  }, others), children);
}
const useGetTextStyle = props => {
  const {
    textType,
    paletteType
  } = props;
  const {
    fonts
  } = usePaletteContext();
  switch (textType) {
    case 'extraSmall':
      switch (paletteType) {
        case 'headline':
          return fonts.headline.extraSmall;
        case 'title':
          return fonts.title.extraSmall;
        case 'label':
          return fonts.label.extraSmall;
        case 'body':
          return fonts.body.extraSmall;
        default:
          break;
      }
      break;
    case 'small':
      switch (paletteType) {
        case 'headline':
          return fonts.headline.small;
        case 'title':
          return fonts.title.small;
        case 'label':
          return fonts.label.small;
        case 'body':
          return fonts.body.small;
        default:
          break;
      }
      break;
    case 'medium':
      switch (paletteType) {
        case 'headline':
          return fonts.headline.medium;
        case 'title':
          return fonts.title.medium;
        case 'label':
          return fonts.label.medium;
        case 'body':
          return fonts.body.medium;
        default:
          break;
      }
      break;
    case 'large':
      switch (paletteType) {
        case 'headline':
          return fonts.headline.large;
        case 'title':
          return fonts.title.large;
        case 'label':
          return fonts.label.large;
        case 'body':
          return fonts.body.large;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return undefined;
};
//# sourceMappingURL=Text.js.map