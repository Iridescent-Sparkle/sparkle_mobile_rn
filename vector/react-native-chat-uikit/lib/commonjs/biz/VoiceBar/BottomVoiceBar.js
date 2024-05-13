"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomVoiceBar = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Modal = require("../../ui/Modal");
var _VoiceBar = require("./VoiceBar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const BottomVoiceBar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    onRequestModalClose,
    ...others
  } = props;
  const modalRef = React.useRef({});
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    }
  });
  React.useImperativeHandle(ref, () => {
    return {
      startHide: onFinished => {
        var _modalRef$current, _modalRef$current$sta;
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : (_modalRef$current$sta = _modalRef$current.startHide) === null || _modalRef$current$sta === void 0 ? void 0 : _modalRef$current$sta.call(_modalRef$current, onFinished);
      },
      startShow: () => {
        var _modalRef$current2, _modalRef$current2$st;
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current2 = modalRef.current) === null || _modalRef$current2 === void 0 ? void 0 : (_modalRef$current2$st = _modalRef$current2.startShow) === null || _modalRef$current2$st === void 0 ? void 0 : _modalRef$current2$st.call(_modalRef$current2);
      }
    };
  }, []);
  return /*#__PURE__*/React.createElement(_Modal.SlideModal, {
    propsRef: modalRef,
    modalAnimationType: 'slide',
    onRequestModalClose: onRequestModalClose,
    enableSlideComponent: false
  }, /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      backgroundColor: getColor('bg'),
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(_VoiceBar.VoiceBar, others)));
});
exports.BottomVoiceBar = BottomVoiceBar;
//# sourceMappingURL=BottomVoiceBar.js.map