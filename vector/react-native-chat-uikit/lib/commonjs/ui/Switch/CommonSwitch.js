"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSwitch = CommonSwitch;
var React = _interopRequireWildcard(require("react"));
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Switch = require("./Switch");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function CommonSwitch(props) {
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    switch_fg: {
      light: colors.neutral[100],
      dark: colors.neutral[100]
    },
    switch_track_disable: {
      light: colors.neutral[9],
      dark: colors.neutral[3]
    },
    switch_track_enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  return /*#__PURE__*/React.createElement(_Switch.Switch, _extends({
    thumbColor: getColor('switch_fg'),
    thumbBackgroundColor: getColor('switch_fg'),
    trackColor: {
      false: getColor('switch_track_disable'),
      true: getColor('switch_track_enable')
    }
  }, props));
}
//# sourceMappingURL=CommonSwitch.js.map