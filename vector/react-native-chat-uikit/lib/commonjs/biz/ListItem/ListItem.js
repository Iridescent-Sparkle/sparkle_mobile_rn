"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = ListItem;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * List Item Component properties.
 */

/**
 * Common list Item Component.
 *
 * The component is laid out left, center and right.
 *
 */
function ListItem(props) {
  const {
    containerStyle,
    LeftName,
    RightText,
    RightIcon,
    LeftNameProps,
    RightTextProps,
    RightIconProps,
    onClicked,
    enableDivider = true,
    header,
    tail
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    t1: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    t2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    },
    divider: {
      light: colors.neutral[9],
      dark: colors.neutral[2]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, null, (0, _hook.getElement)(header, {}), /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: [{
      height: 53.5,
      flexDirection: 'row',
      alignItems: 'center'
    }, containerStyle],
    onPress: onClicked
  }, (0, _hook.getElement)(LeftName, LeftNameProps), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }), (0, _hook.getElement)(RightText, RightTextProps), (0, _hook.getElement)(RightIcon, RightIconProps)), enableDivider === true ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 16
    }
  }) : null, (0, _hook.getElement)(tail, {}));
}
//# sourceMappingURL=ListItem.js.map