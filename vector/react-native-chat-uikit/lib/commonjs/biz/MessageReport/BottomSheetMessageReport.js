"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetMessageReport = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _const = require("../../const");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Modal = require("../../ui/Modal");
var _TabPage = require("../../ui/TabPage");
var _MessageReport = require("./MessageReport");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Referencing value of the `MessageReport` component.
 */

/**
 * Properties of the `MessageReport` component.
 */

/**
 * Component for reporting messages.
 *
 * It is composed of `SlideModal` and `MessageReport`.
 */
const BottomSheetMessageReport = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    data,
    containerStyle,
    onReport
  } = props;
  const modalRef = React.useRef({});
  const {
    height: winHeight
  } = (0, _reactNative.useWindowDimensions)();
  const height = winHeight * 3 / 5;
  const isUsePanResponder = React.useRef(true);
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
    backgroundColor2: {
      light: colors.neutral[8],
      dark: colors.neutral[3]
    }
  });
  React.useImperativeHandle(ref, () => {
    return {
      startHide: onFinished => {
        var _modalRef$current, _modalRef$current$sta;
        (_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : (_modalRef$current$sta = _modalRef$current.startHide) === null || _modalRef$current$sta === void 0 ? void 0 : _modalRef$current$sta.call(_modalRef$current, onFinished);
      },
      startShow: () => {
        var _modalRef$current2, _modalRef$current2$st;
        (_modalRef$current2 = modalRef.current) === null || _modalRef$current2 === void 0 ? void 0 : (_modalRef$current2$st = _modalRef$current2.startShow) === null || _modalRef$current2$st === void 0 ? void 0 : _modalRef$current2$st.call(_modalRef$current2);
      }
    };
  }, []);
  return /*#__PURE__*/React.createElement(_Modal.SlideModal, {
    propsRef: modalRef,
    modalAnimationType: "slide",
    backgroundColor: _const.g_mask_color,
    backgroundTransparent: false,
    onRequestModalClose: () => {
      var _modalRef$current3, _modalRef$current3$st;
      modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current3 = modalRef.current) === null || _modalRef$current3 === void 0 ? void 0 : (_modalRef$current3$st = _modalRef$current3.startHide) === null || _modalRef$current3$st === void 0 ? void 0 : _modalRef$current3$st.call(_modalRef$current3);
    }
    // onStartShouldSetPanResponder={() => {
    //   return isUsePanResponder.current;
    // }}
    // onMoveShouldSetPanResponder={() => {
    //   return isUsePanResponder.current;
    // }}
    // onRequestModalClose={() => {
    //   ref.current.startHide();
    // }}
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      height: height,
      backgroundColor: getColor('backgroundColor'),
      alignItems: 'center',
      width: '100%'
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_TabPage.TabPage, {
    header: {
      HeaderProps: {
        titles: [{
          title: tr('_uikit_report_title')
        }]
      }
    },
    body: {
      type: 'TabPageBody',
      BodyProps: {
        children: [/*#__PURE__*/React.createElement(_MessageReport.MessageReport, {
          key: '1',
          requestUseScrollGesture: finished => {
            isUsePanResponder.current = finished;
          },
          onCancel: () => {
            var _modalRef$current4, _modalRef$current4$st;
            (_modalRef$current4 = modalRef.current) === null || _modalRef$current4 === void 0 ? void 0 : (_modalRef$current4$st = _modalRef$current4.startHide) === null || _modalRef$current4$st === void 0 ? void 0 : _modalRef$current4$st.call(_modalRef$current4);
          },
          onReport: onReport,
          data: data
        })]
      }
    },
    headerPosition: "up"
  })));
});
exports.BottomSheetMessageReport = BottomSheetMessageReport;
//# sourceMappingURL=BottomSheetMessageReport.js.map