"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighText = HighText;
exports.useHighText = useHighText;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Text = require("./Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Highlight keywords.
 *
 * **Note** Exceeding the width is not considered.
 */
function HighText(props) {
  const {
    containerStyle
  } = props;
  const {
    getContent
  } = useHighText(props);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexDirection: 'row'
    }, containerStyle]
  }, getContent());
}
function useHighText(props) {
  const {
    keyword,
    content,
    style,
    highColors,
    textColors,
    ...others
  } = props;
  const list = content.split(keyword);
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    high: {
      light: (highColors === null || highColors === void 0 ? void 0 : highColors[0]) ?? colors.primary[5],
      dark: (highColors === null || highColors === void 0 ? void 0 : highColors[1]) ?? colors.primary[6]
    },
    text: {
      light: (textColors === null || textColors === void 0 ? void 0 : textColors[0]) ?? colors.neutral[1],
      dark: (textColors === null || textColors === void 0 ? void 0 : textColors[1]) ?? colors.primary[98]
    }
  });
  const getContent = () => {
    return list.map((item, index) => {
      if (item.length === 0) {
        if (index !== list.length - 1) {
          return /*#__PURE__*/React.createElement(_Text.Text, _extends({
            key: index
          }, others, {
            style: [style, {
              color: getColor('high')
            }]
          }), keyword);
        } else {
          return null;
        }
      } else {
        if (index === list.length - 1) {
          return /*#__PURE__*/React.createElement(_Text.Text, _extends({
            key: index * 10 + 1
          }, others, {
            style: [style, {
              color: getColor('text')
            }]
          }), item);
        } else {
          return /*#__PURE__*/React.createElement(_reactNative.View, {
            key: index,
            style: {
              flexDirection: 'row'
            }
          }, /*#__PURE__*/React.createElement(_Text.Text, _extends({
            key: index * 10 + 1
          }, others, {
            style: [style, {
              color: getColor('text')
            }]
          }), item), /*#__PURE__*/React.createElement(_Text.Text, _extends({
            key: index * 10 + 2
          }, others, {
            style: [style, {
              color: getColor('high')
            }]
          }), keyword));
        }
      }
    });
  };
  return {
    getContent
  };
}
//# sourceMappingURL=HighText.js.map