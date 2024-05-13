"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultSlide = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DefaultSlide = props => {
  if (props.modalType === 'simu-modal') {
    return /*#__PURE__*/React.createElement(Internal, props);
  } else {
    return /*#__PURE__*/React.createElement(_reactNative.Pressable, null, /*#__PURE__*/React.createElement(Internal, props));
  }
};
exports.DefaultSlide = DefaultSlide;
const Internal = props => {
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    backgroundColor: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    backgroundColor2: {
      light: colors.neutral[8],
      dark: colors.neutral[3]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    style: [{
      height: 32,
      width: '100%',
      backgroundColor: getColor('backgroundColor'),
      alignItems: 'center',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      transform: [{
        translateY: 15
      }]
    }]
  }, props), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: 36,
      height: 5,
      marginTop: 6,
      backgroundColor: getColor('backgroundColor2'),
      borderRadius: 2.5
    }
  }));
};
//# sourceMappingURL=DefaultSlide.js.map