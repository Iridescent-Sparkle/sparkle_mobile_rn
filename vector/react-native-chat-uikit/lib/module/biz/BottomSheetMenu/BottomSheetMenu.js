import * as React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ErrorCode, UIKitError } from '../../error';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { SlideModal } from '../../ui/Modal';
import { Text } from '../../ui/Text';
import { gMaxItemCount } from './BottomSheetMenu.const';
import { useGetItems } from './BottomSheetMenu.hooks';

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
export const BottomSheetMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    onRequestModalClose,
    initItems,
    title,
    maxHeight: propsMaxHeight
  } = props;
  const {
    colors
  } = usePaletteContext();
  const {
    bottom
  } = useSafeAreaInsets();
  const modalRef = React.useRef({});
  const {
    height: winHeight
  } = useWindowDimensions();
  const othersRef = React.useRef();
  const {
    items,
    updateItems
  } = useGetItems(initItems);
  const {
    getColor
  } = useColors({
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
  if (initItems && initItems.length > gMaxItemCount) {
    throw new UIKitError({
      code: ErrorCode.max_count
    });
  }
  return /*#__PURE__*/React.createElement(SlideModal, {
    propsRef: modalRef,
    modalAnimationType: 'slide',
    onRequestModalClose: onRequestModalClose
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      // height: 56 * 6 + 36 + 80,
      backgroundColor: getColor('bg1'),
      alignItems: 'center',
      width: '100%'
      // borderTopLeftRadius: 16,
      // borderTopRightRadius: 16,
    }
  }, title ? /*#__PURE__*/React.createElement(View, {
    style: {
      paddingVertical: 13,
      paddingHorizontal: 16
    }
  }, /*#__PURE__*/React.createElement(Text, {
    textType: 'medium',
    paletteType: 'body',
    style: {
      color: getColor('c1')
    }
  }, title)) : null, items.length > 6 ? /*#__PURE__*/React.createElement(ScrollView, {
    style: {
      maxHeight: propsMaxHeight ?? winHeight * 0.5,
      width: '100%'
    },
    bounces: false
  }, /*#__PURE__*/React.createElement(View, null, items)) : items, /*#__PURE__*/React.createElement(View, {
    style: {
      height: bottom
    }
  })));
});
//# sourceMappingURL=BottomSheetMenu.js.map