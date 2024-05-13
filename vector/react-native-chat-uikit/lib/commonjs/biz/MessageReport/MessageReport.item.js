"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageReportItem = MessageReportItem;
exports.MessageReportItemMemo = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Text = require("../../ui/Text");
var _MessageReport = require("./MessageReport.const");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function MessageReportItem(props) {
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    backgroundColor: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    color: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    checked: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    unchecked: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  const {
    data,
    onChecked
  } = props;
  const {
    id,
    title,
    checked
  } = data;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    key: id,
    style: {
      backgroundColor: getColor('backgroundColor'),
      paddingHorizontal: 16,
      width: '100%',
      height: _MessageReport.gMessageReportItemHeight,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      marginVertical: 10,
      maxWidth: '90%'
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'medium',
    paletteType: 'title',
    style: {
      color: getColor('color')
    }
  }, tr(title))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(_Button.IconButton, {
    iconName: checked === true ? 'radio_ellipse' : 'unchecked_ellipse',
    style: {
      tintColor: checked === true ? getColor('checked') : getColor('unchecked'),
      width: 24,
      height: 24,
      margin: 4
    },
    onPress: () => {
      onChecked === null || onChecked === void 0 ? void 0 : onChecked(checked);
    }
  })));
}
const MessageReportItemMemo = /*#__PURE__*/React.memo(MessageReportItem);
exports.MessageReportItemMemo = MessageReportItemMemo;
//# sourceMappingURL=MessageReport.item.js.map