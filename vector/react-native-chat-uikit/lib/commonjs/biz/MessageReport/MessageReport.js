"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageReport = MessageReport;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _const = require("../const");
var _MessageReport = require("./MessageReport.const");
var _MessageReport2 = require("./MessageReport.hooks");
var _MessageReport3 = require("./MessageReport.item");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Properties of the `MessageReport` component.
 */

/**
 * Component for reporting messages.
 *
 * This component is mainly used for reporting illegal messages.
 *
 * @param props {@link MessageReportProps}
 * @returns JSX.Element
 *
 */
function MessageReport(props) {
  const {
    requestUseScrollGesture,
    onCancel,
    data: propData,
    onReport,
    height: propsHeight
  } = props;
  const {
    data,
    onUpdate
  } = (0, _MessageReport2.useMessageReportApi)(propData);
  const {
    isScrollingRef,
    handles
  } = (0, _MessageReport2.useScrollGesture)(requestUseScrollGesture);
  const ref = React.useRef({});
  const {
    height: winHeight
  } = (0, _reactNative.useWindowDimensions)();
  const {
    cornerRadius
  } = (0, _theme.useThemeContext)();
  const {
    input
  } = cornerRadius;
  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  let height = propsHeight ?? winHeight * 3 / 5 - _const.gBottomSheetHeaderHeight - _MessageReport.gTabHeaderHeight - bottom - (_reactNative.StatusBar.currentHeight ?? 0);
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    style: {
      height: height
    }
  }, handles), /*#__PURE__*/React.createElement(_reactNative.FlatList, {
    ref: ref,
    data: data,
    renderItem: info => {
      const {
        item
      } = info;
      return /*#__PURE__*/React.createElement(_MessageReport3.MessageReportItemMemo, {
        data: item.data,
        onChecked: () => {
          onUpdate(item);
        }
      });
    },
    keyExtractor: item => {
      return item.data.id;
    },
    onMomentumScrollEnd: () => {
      if (_reactNative.Platform.OS !== 'ios') {
        isScrollingRef.current = false;
        requestUseScrollGesture === null || requestUseScrollGesture === void 0 ? void 0 : requestUseScrollGesture(true);
      }
    },
    onResponderEnd: () => {
      if (_reactNative.Platform.OS === 'ios') {
        isScrollingRef.current = false;
        requestUseScrollGesture === null || requestUseScrollGesture === void 0 ? void 0 : requestUseScrollGesture(true);
      }
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 8
    }
  }, /*#__PURE__*/React.createElement(_Button.BorderButton, {
    sizesType: 'large',
    radiusType: input,
    contentType: 'only-text',
    text: tr('cancel'),
    style: {
      width: '42%',
      height: 40
    },
    onPress: onCancel
  }), /*#__PURE__*/React.createElement(_Button.CmnButton, {
    sizesType: 'large',
    radiusType: input,
    contentType: 'only-text',
    text: tr('report'),
    style: {
      width: '42%',
      height: 40
    },
    onPress: () => {
      onReport === null || onReport === void 0 ? void 0 : onReport(data.map(v => v.data).filter(v => v.checked === true)[0]);
    }
  })));
}
//# sourceMappingURL=MessageReport.js.map