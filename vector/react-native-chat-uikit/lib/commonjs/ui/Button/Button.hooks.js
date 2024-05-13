"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetButtonStyle = exports.useGetButtonStateStyle = exports.useGetButtonSizeStyle = exports.useGetButtonRadiusStyle = void 0;
var _error = require("../../error");
var _theme = require("../../theme");
const useGetButtonSizeStyle = props => {
  const {
    button
  } = (0, _theme.useThemeContext)();
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
  throw new _error.UIKitError({
    code: _error.ErrorCode.enum,
    extra: `ButtonSizesType: ${sizesType}`
  });
};
exports.useGetButtonSizeStyle = useGetButtonSizeStyle;
const useGetButtonStyle = props => {
  const {
    buttonStyle
  } = props;
  const {
    button
  } = (0, _theme.useThemeContext)();
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
  throw new _error.UIKitError({
    code: _error.ErrorCode.enum,
    extra: `ButtonStyleType: ${buttonStyle}`
  });
};
exports.useGetButtonStyle = useGetButtonStyle;
const useGetButtonStateStyle = props => {
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
  throw new _error.UIKitError({
    code: _error.ErrorCode.enum,
    extra: `ButtonStateColorType: ${stateType}`
  });
};
exports.useGetButtonStateStyle = useGetButtonStateStyle;
const useGetButtonRadiusStyle = props => {
  const {
    radiusType
  } = props;
  const {
    button
  } = (0, _theme.useThemeContext)();
  const {
    cornerRadius
  } = (0, _theme.usePaletteContext)();
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
exports.useGetButtonRadiusStyle = useGetButtonRadiusStyle;
//# sourceMappingURL=Button.hooks.js.map