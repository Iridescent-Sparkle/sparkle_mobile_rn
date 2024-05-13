"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetMenu = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _error = require("../../error");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Modal = require("../../ui/Modal");
var _Text = require("../../ui/Text");
var _BottomSheetMenu = require("./BottomSheetMenu.const");
var _BottomSheetMenu2 = require("./BottomSheetMenu.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Referencing Values of the `BottomSheetMenu` component.
 */

/**
 * Properties of the `BottomSheetMenu` component.
 */

/**
 * The BottomSheetMenu component provides menu functionality.
 *
 * @test {@link https://github.com/AsteriskZuo/react-native-chat-room/blob/192a6e98cf2f168dd3a5e0e5a306a6762cf5e0d6/example/src/__dev__/test_bottom_sheet_menu.tsx}
 *
 * @example
 *
 * ```tsx
 * const ref = React.useRef<BottomSheetMenuRef>({} as any);
 * // ...
 *  <BottomSheetMenu
 *   ref={ref}
 *   onRequestModalClose={() => {
 *     ref.current.startHide();
 *   }}
 *   title={
 *     'Nickname: Sei la cosa più bella che mia sia mai capitato non so stare senza te.'
 *   }
 *   initItems={data}
 * />
 * ```
 */
const BottomSheetMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    onRequestModalClose,
    initItems,
    title,
    maxHeight: propsMaxHeight
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const modalRef = React.useRef({});
  const {
    height: winHeight
  } = (0, _reactNative.useWindowDimensions)();
  const othersRef = React.useRef();
  const {
    items,
    updateItems
  } = (0, _BottomSheetMenu2.useGetItems)(initItems);
  const {
    getColor
  } = (0, _hook.useColors)({
    bg1: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    bg2: {
      light: colors.neutral[8],
      dark: colors.neutral[3]
    },
    c1: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  const isShow = React.useRef(false);
  React.useImperativeHandle(ref, () => {
    return {
      startHide: onFinished => {
        var _modalRef$current, _modalRef$current$sta;
        isShow.current = false;
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : (_modalRef$current$sta = _modalRef$current.startHide) === null || _modalRef$current$sta === void 0 ? void 0 : _modalRef$current$sta.call(_modalRef$current, onFinished);
      },
      startShow: () => {
        var _modalRef$current2, _modalRef$current2$st;
        isShow.current = true;
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current2 = modalRef.current) === null || _modalRef$current2 === void 0 ? void 0 : (_modalRef$current2$st = _modalRef$current2.startShow) === null || _modalRef$current2$st === void 0 ? void 0 : _modalRef$current2$st.call(_modalRef$current2);
      },
      startShowWithInit: (initItems, others) => {
        othersRef.current = others;
        if (initItems !== items) {
          isShow.current = true;
          updateItems(initItems);
        } else {
          var _modalRef$current3, _modalRef$current3$st;
          isShow.current = true;
          modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current3 = modalRef.current) === null || _modalRef$current3 === void 0 ? void 0 : (_modalRef$current3$st = _modalRef$current3.startShow) === null || _modalRef$current3$st === void 0 ? void 0 : _modalRef$current3$st.call(_modalRef$current3);
        }
      },
      getData: () => {
        return othersRef.current;
      }
    };
  }, [items, updateItems]);
  React.useEffect(() => {
    if (isShow.current === true) {
      var _modalRef$current4, _modalRef$current4$st;
      modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current4 = modalRef.current) === null || _modalRef$current4 === void 0 ? void 0 : (_modalRef$current4$st = _modalRef$current4.startShow) === null || _modalRef$current4$st === void 0 ? void 0 : _modalRef$current4$st.call(_modalRef$current4);
    }
  }, [items]);
  if (initItems && initItems.length > _BottomSheetMenu.gMaxItemCount) {
    throw new _error.UIKitError({
      code: _error.ErrorCode.max_count
    });
  }
  return /*#__PURE__*/React.createElement(_Modal.SlideModal, {
    propsRef: modalRef,
    modalAnimationType: 'slide',
    onRequestModalClose: onRequestModalClose
  }, /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      // height: 56 * 6 + 36 + 80,
      backgroundColor: getColor('bg1'),
      alignItems: 'center',
      width: '100%'
      // borderTopLeftRadius: 16,
      // borderTopRightRadius: 16,
    }
  }, title ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      paddingVertical: 13,
      paddingHorizontal: 16
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'medium',
    paletteType: 'body',
    style: {
      color: getColor('c1')
    }
  }, title)) : null, items.length > 6 ? /*#__PURE__*/React.createElement(_reactNativeGestureHandler.ScrollView, {
    style: {
      maxHeight: propsMaxHeight ?? winHeight * 0.5,
      width: '100%'
    },
    bounces: false
  }, /*#__PURE__*/React.createElement(_reactNative.View, null, items)) : items, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: bottom
    }
  })));
});
exports.BottomSheetMenu = BottomSheetMenu;
//# sourceMappingURL=BottomSheetMenu.js.map