import * as React from 'react';
import { View } from 'react-native';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { BottomSheetMenu } from './BottomSheetMenu';
import { BottomSheetMenuItem } from './BottomSheetMenu.item';
/**
 * The BottomSheetNameMenu component provides menu functionality.
 *
 * Compared with `BottomSheetMenu`, it is simpler to use, you only need to enter a text array.
 *
 * @test {@link https://github.com/AsteriskZuo/react-native-chat-room/blob/57b8f2ea9b24cd0e4fb8606dc3b246b3fd91d52f/src/biz/ParticipantList/ParticipantContextMenu.tsx}
 *
 * @test {@link https://github.com/AsteriskZuo/react-native-chat-room/blob/57b8f2ea9b24cd0e4fb8606dc3b246b3fd91d52f/src/biz/MessageList/MessageList.tsx}
 *
 * @example
 * ```tsx
 * const menuRef = React.useRef<BottomSheetNameMenuRef>({} as any);
 * // ...
 * <BottomSheetNameMenu
 *   ref={menuRef}
 *   initItems={[]}
 *   onRequestModalClose={() => {
 *     menuRef?.current?.startHide?.();
 *   }}
 * />
 * // ...
 * menuRef?.current?.startShowWithInit([
 *   {
 *     name: 'Mute',
 *     isHigh: false,
 *     onClicked: () => {
 *       if (userId !== im.userId) {
 *         muteMember(userId, true);
 *       }
 *       menuRef?.current?.startHide?.();
 *     },
 *   },
 *   {
 *     name: 'Remove',
 *     isHigh: true,
 *     onClicked: () => {
 *       if (userId !== im.userId) {
 *         removeMember(userId);
 *       }
 *       menuRef?.current?.startHide?.();
 *     },
 *   },
 * ]);
 * ```
 */
export const BottomSheetNameMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    onRequestModalClose,
    title
  } = props;
  const {
    getItems
  } = useGetListItems(() => {
    var _menuRef$current, _menuRef$current$getD;
    return menuRef === null || menuRef === void 0 ? void 0 : (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$getD = _menuRef$current.getData) === null || _menuRef$current$getD === void 0 ? void 0 : _menuRef$current$getD.call(_menuRef$current);
  });
  const menuRef = React.useRef({});
  React.useImperativeHandle(ref, () => {
    return {
      startShow: () => {
        var _menuRef$current2, _menuRef$current2$sta;
        menuRef === null || menuRef === void 0 ? void 0 : (_menuRef$current2 = menuRef.current) === null || _menuRef$current2 === void 0 ? void 0 : (_menuRef$current2$sta = _menuRef$current2.startShow) === null || _menuRef$current2$sta === void 0 ? void 0 : _menuRef$current2$sta.call(_menuRef$current2);
      },
      startHide: onFinished => {
        var _menuRef$current3, _menuRef$current3$sta;
        menuRef === null || menuRef === void 0 ? void 0 : (_menuRef$current3 = menuRef.current) === null || _menuRef$current3 === void 0 ? void 0 : (_menuRef$current3$sta = _menuRef$current3.startHide) === null || _menuRef$current3$sta === void 0 ? void 0 : _menuRef$current3$sta.call(_menuRef$current3, onFinished);
      },
      startShowWithInit: (initItems, others) => {
        var _menuRef$current4, _menuRef$current4$sta;
        const items = getItems({
          initItems,
          onRequestModalClose
        });
        menuRef === null || menuRef === void 0 ? void 0 : (_menuRef$current4 = menuRef.current) === null || _menuRef$current4 === void 0 ? void 0 : (_menuRef$current4$sta = _menuRef$current4.startShowWithInit) === null || _menuRef$current4$sta === void 0 ? void 0 : _menuRef$current4$sta.call(_menuRef$current4, items, others);
      },
      startShowWithProps: props => {
        var _menuRef$current5, _menuRef$current5$sta;
        const items = getItems({
          ...props,
          onRequestModalClose
        });
        menuRef === null || menuRef === void 0 ? void 0 : (_menuRef$current5 = menuRef.current) === null || _menuRef$current5 === void 0 ? void 0 : (_menuRef$current5$sta = _menuRef$current5.startShowWithInit) === null || _menuRef$current5$sta === void 0 ? void 0 : _menuRef$current5$sta.call(_menuRef$current5, items);
      },
      getData: () => {
        var _menuRef$current6, _menuRef$current6$get;
        return menuRef === null || menuRef === void 0 ? void 0 : (_menuRef$current6 = menuRef.current) === null || _menuRef$current6 === void 0 ? void 0 : (_menuRef$current6$get = _menuRef$current6.getData) === null || _menuRef$current6$get === void 0 ? void 0 : _menuRef$current6$get.call(_menuRef$current6);
      }
    };
  }, [getItems, onRequestModalClose]);
  return /*#__PURE__*/React.createElement(BottomSheetMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestModalClose,
    initItems: getItems(props),
    title: title
  });
});
function useGetListItems(onGetData) {
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    divider: {
      light: colors.neutral[9],
      dark: colors.neutral[0]
    }
  });
  const {
    tr
  } = useI18nContext();
  const getItems = React.useCallback(props => {
    const {
      initItems,
      onRequestModalClose,
      hasCancel = true,
      layoutType
    } = props;
    if (!initItems) {
      return [];
    }
    const d = initItems.map((v, i) => {
      if (v.isHigh !== true) {
        return /*#__PURE__*/React.createElement(BottomSheetMenuItem, {
          key: i,
          id: i.toString(),
          initState: 'enabled',
          text: tr(v.name),
          onPress: () => {
            var _v$onClicked;
            (_v$onClicked = v.onClicked) === null || _v$onClicked === void 0 ? void 0 : _v$onClicked.call(v, v.name, onGetData === null || onGetData === void 0 ? void 0 : onGetData());
          },
          iconName: v.icon,
          containerStyle: {
            alignItems: layoutType !== 'left' ? 'center' : 'flex-start'
          }
        });
      } else {
        return /*#__PURE__*/React.createElement(BottomSheetMenuItem, {
          key: i,
          id: i.toString(),
          initState: 'warned',
          text: tr(v.name),
          onPress: () => {
            var _v$onClicked2;
            (_v$onClicked2 = v.onClicked) === null || _v$onClicked2 === void 0 ? void 0 : _v$onClicked2.call(v, v.name, onGetData === null || onGetData === void 0 ? void 0 : onGetData());
          },
          iconName: v.icon,
          containerStyle: {
            alignItems: layoutType !== 'left' ? 'center' : 'flex-start'
          }
        });
      }
    }).filter(v => v !== null);
    if (hasCancel === false) {
      const data = [...d];
      return data;
    } else {
      const data = [...d, /*#__PURE__*/React.createElement(View, {
        key: 99,
        style: {
          height: 8,
          width: '100%',
          backgroundColor: getColor('divider')
        }
      }), /*#__PURE__*/React.createElement(BottomSheetMenuItem, {
        key: 100,
        id: '100',
        initState: 'enabled',
        text: tr('cancel'),
        onPress: onRequestModalClose,
        textStyle: {
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: 22
        }
      })];
      return data;
    }
  }, [getColor, onGetData, tr]);
  return {
    getItems
  };
}
//# sourceMappingURL=BottomSheetNameMenu.js.map