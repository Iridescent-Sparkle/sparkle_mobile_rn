import { ErrorCode, UIKitError } from '../../error';
import { useThemeContext } from '../../theme';
import { usePaletteContext } from '../../theme';
export const useGetButtonSizeStyle = props => {
  const {
    button
  } = useThemeContext();
  const {
    sizesType,
    contentType
  } = props;
  const trimming = params => {
    const ret = params;
    switch (contentType) {
      case 'only-icon':
        ret.button.paddingHorizontal = ret.button.paddingVertical;
        break;
      case 'icon-text':
      case 'only-text':
      case 'text-icon':
        break;
      default:
        break;
    }
    return ret;
  };
  switch (sizesType) {
    case 'small':
      return button.size.small;
    case 'middle':
      return button.size.middle;
    case 'large':
      return trimming(button.size.large);
    default:
      break;
  }
  throw new UIKitError({
    code: ErrorCode.enum,
    extra: `ButtonSizesType: ${sizesType}`
  });
};
export const useGetButtonStyle = props => {
  const {
    buttonStyle
  } = props;
  const {
    button
  } = useThemeContext();
  switch (buttonStyle) {
    case 'borderButton':
      return button.style.borderButton;
    case 'commonButton':
      return button.style.commonButton;
    case 'textButton1':
      return button.style.textButton1;
    case 'textButton2':
      return button.style.textButton2;
    default:
      break;
  }
  throw new UIKitError({
    code: ErrorCode.enum,
    extra: `ButtonStyleType: ${buttonStyle}`
  });
};
export const useGetButtonStateStyle = props => {
  const {
    disabled
  } = props;
  const stateType = disabled === true ? 'disabled' : 'enabled';
  const {
    state
  } = useGetButtonStyle(props);
  switch (stateType) {
    case 'disabled':
      return state.disabled;
    case 'enabled':
      return state.enabled;
    default:
      break;
  }
  throw new UIKitError({
    code: ErrorCode.enum,
    extra: `ButtonStateColorType: ${stateType}`
  });
};
export const useGetButtonRadiusStyle = props => {
  const {
    radiusType
  } = props;
  const {
    button
  } = useThemeContext();
  const {
    cornerRadius
  } = usePaletteContext();
  switch (radiusType) {
    case 'extraSmall':
      return cornerRadius.extraSmall;
    case 'small':
      return cornerRadius.small;
    case 'medium':
      return cornerRadius.medium;
    case 'large':
      return button.size.large.button.height;
    default:
      break;
  }
  return undefined;
};
//# sourceMappingURL=Button.hooks.js.map