import * as React from 'react';
import { Platform, View } from 'react-native';
import { ChatMessage, ChatMessageType } from 'react-native-chat-sdk';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConfigContext } from '../../config';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext, useThemeContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { Icon } from '../../ui/Image';
import { SlideModal } from '../../ui/Modal';
import { Text } from '../../ui/Text';
import { TextInput } from '../../ui/TextInput';

/**
 * Referencing Values of the `MessageInputEditMessage` component.
 */

/**
 * Properties of the `MessageInputEditMessage` component.
 */

/**
 * The MessageInputEditMessage component provides menu functionality.
 *
 * @test {@link https://github.com/AsteriskZuo/react-native-chat-room/blob/192a6e98cf2f168dd3a5e0e5a306a6762cf5e0d6/example/src/__dev__/test_bottom_sheet_menu.tsx}
 *
 * @example
 *
 * ```tsx
 * const ref = React.useRef<MessageInputEditMessageRef>({} as any);
 * // ...
 *  <MessageInputEditMessage
 *   ref={ref}
 *   onRequestModalClose={() => {
 *     ref.current.startHide();
 *   }}
 *   initMsg={msg}
 * />
 * ```
 */
export const MessageInputEditMessage = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    onRequestModalClose,
    initMsg,
    numberOfLines = 2,
    bottom: propsBottom,
    onEditMessageFinished
  } = props;
  const {
    style
  } = useThemeContext();
  const {
    tr
  } = useI18nContext();
  const {
    colors
  } = usePaletteContext();
  const {
    bottom
  } = useSafeAreaInsets();
  const _bottom = propsBottom ?? bottom;
  const {
    fontFamily
  } = useConfigContext();
  const modalRef = React.useRef({});
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    bg2: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    state: {
      light: colors.neutralSpecial[5],
      dark: colors.neutralSpecial[6]
    },
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    btn_disable: {
      light: colors.neutral[7],
      dark: colors.neutral[4]
    },
    btn_enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  const isShow = React.useRef(false);
  // !!! needs improvement
  const pseudoMsg = React.useMemo(() => {
    return ChatMessage.createTextMessage('xxx', '', 0);
  }, []);
  const {
    updateMsg,
    msg: updatedMsg,
    inputRef,
    value,
    setValue,
    onBlur,
    onFocus,
    disable,
    onEdited
  } = useMessageInputEditMessage({
    msg: initMsg ?? pseudoMsg,
    onEditMessageFinished
  });
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
      startShowWithInit: msg => {
        isShow.current = true;
        updateMsg(msg);
        // if (updatedMsg !== msg) {
        //   isShow.current = true;
        //   updateMsg(msg);
        // } else {
        //   isShow.current = true;
        //   modalRef?.current?.startShow?.();
        // }
      }
    };
  }, [updateMsg]);
  React.useEffect(() => {
    if (isShow.current === true) {
      var _modalRef$current3, _modalRef$current3$st;
      modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current3 = modalRef.current) === null || _modalRef$current3 === void 0 ? void 0 : (_modalRef$current3$st = _modalRef$current3.startShow) === null || _modalRef$current3$st === void 0 ? void 0 : _modalRef$current3$st.call(_modalRef$current3);
    }
  }, [updatedMsg]);
  return /*#__PURE__*/React.createElement(SlideModal, {
    propsRef: modalRef,
    modalAnimationType: 'slide',
    onRequestModalClose: onRequestModalClose,
    enabledKeyboardAdjust: true,
    enableSlideComponent: false,
    keyboardVerticalOffset: -_bottom
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      // height: 56 * 6 + 36 + 80,
      backgroundColor: getColor('bg'),
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      backgroundColor: getColor('bg2'),
      paddingHorizontal: 12,
      paddingVertical: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: 'slash_in_rectangle',
    style: {
      width: 16,
      height: 16,
      tintColor: getColor('state')
    }
  }), /*#__PURE__*/React.createElement(Text, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('state')
    }
  }, tr('editing'))), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      backgroundColor: getColor('bg'),
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: 8
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1,
      paddingHorizontal: 8,
      paddingVertical: 7
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    ref: inputRef,
    numberOfLines: numberOfLines,
    multiline: true,
    unitHeight: Platform.OS === 'ios' ? 29 : 20,
    style: {
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      // lineHeight: 22,
      fontFamily: fontFamily,
      color: getColor('input_text')
    },
    containerStyle: {
      // width: '100%',
      backgroundColor: getColor('bg2'),
      minHeight: 36,
      paddingHorizontal: 8,
      paddingVertical: 7,
      // !!! ios: maxHeight = single * 3 + 1
      maxHeight: Platform.OS === 'ios' ? 58 : 54
    },
    onFocus: onFocus,
    onBlur: onBlur,
    onChangeText: setValue,
    value: value,
    keyboardAppearance: style === 'light' ? 'light' : 'dark',
    autoFocus: true
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      paddingVertical: 7
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    iconName: 'checked_ellipse',
    disabled: disable,
    style: {
      width: 30,
      height: 30,
      tintColor: getColor(disable === true ? 'btn_disable' : 'btn_enable'),
      alignSelf: 'flex-end'
    },
    onPress: onEdited
  })))), /*#__PURE__*/React.createElement(View, {
    style: {
      height: _bottom,
      backgroundColor: getColor('bg1')
    }
  })));
});
export function useMessageInputEditMessage(_ref) {
  let {
    msg,
    onEditMessageFinished
  } = _ref;
  const [_msg, _setMsg] = React.useState(msg);
  const valueRef = React.useRef(msg.body.content);
  const [value, _setValue] = React.useState(msg.body.content);
  const inputRef = React.useRef(null);
  const [disable, setDisable] = React.useState(true);
  const _updateMsg = msg => {
    if (msg.body.type !== ChatMessageType.TXT) {
      return;
    }
    const body = msg.body;
    valueRef.current = body.content;
    _setMsg({
      ...msg
    });
    onChangeValue(body.content);
  };
  const onFocus = () => {};
  const onBlur = () => {};
  const onChangeValue = t => {
    if (valueRef.current !== t) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    _setValue(t);
  };
  const onEdited = () => {
    onEditMessageFinished === null || onEditMessageFinished === void 0 ? void 0 : onEditMessageFinished(_msg.msgId, value);
  };
  return {
    msg: _msg,
    updateMsg: _updateMsg,
    value,
    setValue: onChangeValue,
    inputRef,
    onFocus,
    onBlur,
    disable,
    onEdited
  };
}
//# sourceMappingURL=MessageInputEditMessage.js.map