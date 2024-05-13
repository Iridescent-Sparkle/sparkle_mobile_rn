import * as React from 'react';
import { Platform, View } from 'react-native';
import { useConfigContext } from '../../config';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext, useThemeContext } from '../../theme';
import { IconButtonMemo } from '../../ui/Button';
import { KeyboardAvoidingView } from '../../ui/Keyboard';
import { TextInput } from '../../ui/TextInput';
import { BottomSheetNameMenu } from '../BottomSheetMenu';
import { EmojiListMemo } from '../EmojiList';
import { BottomVoiceBar } from '../VoiceBar';
import { useMessageInput } from './MessageInput.hooks';
import { MessageInputEditMessage } from './MessageInputEditMessage';
import { MessageInputQuoteView } from './MessageInputQuoteView';
/**
 * Message Input Component.
 *
 * This component can send text, send emoticons, send files, send pictures, send voice, send files, etc. You can customize the sending menu and add a UI for sending custom messages. Usually this component is used in conjunction with the `MessageList` component.
 */
export const MessageInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    top,
    numberOfLines = 4,
    emojiList
  } = props;
  const testRef = React.useRef(null);
  const {
    fontFamily
  } = useConfigContext();
  const {} = useI18nContext();
  const {
    style
  } = useThemeContext();
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    input_bg: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    text_disable: {
      light: colors.neutral[7],
      dark: colors.neutral[3]
    },
    text_enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  const {
    value,
    setValue,
    onClickedFaceListItem,
    onClickedDelButton,
    onClickedEmojiButton,
    onClickedVoiceButton,
    inputRef,
    emojiHeight,
    emojiIconName,
    onFocus,
    onBlur,
    onCloseVoiceBar,
    voiceBarRef,
    onSelectSendVoice,
    onVoiceStateChange,
    menuRef,
    onRequestCloseMenu,
    sendIconName,
    onClickedSend,
    onVoiceFailed,
    showQuote,
    onHideQuoteMessage,
    onRequestCloseEdit,
    editRef,
    onEditMessageFinished,
    quoteMsg,
    onClickedEmojiSend
  } = useMessageInput(props, ref);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
    keyboardVerticalOffset: top
  }, showQuote === true ? /*#__PURE__*/React.createElement(MessageInputQuoteView, {
    showQuote: showQuote,
    onDel: onHideQuoteMessage,
    msg: quoteMsg
  }) : null, /*#__PURE__*/React.createElement(View, {
    ref: testRef,
    style: {
      backgroundColor: getColor('bg'),
      display: 'flex'
    },
    onLayout: () => {
      // testRef.current?.measure(
      //   (
      //     _x: number,
      //     _y: number,
      //     _width: number,
      //     _height: number,
      //     _pageX: number,
      //     pageY: number
      //   ) => {
      //     console.log(
      //       'Sub:Sub:measure:',
      //       _x,
      //       _y,
      //       _width,
      //       _height,
      //       _pageX,
      //       pageY
      //     );
      //     // setPageY(pageY);
      //   }
      // );
      // testRef.current?.measureInWindow(
      //   (_x: number, _y: number, _width: number, _height: number) => {
      //     // console.log('Sub:Sub:measureInWindow:', _x, _y, _width, _height);
      //   }
      // );
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      margin: 8
    }
  }, /*#__PURE__*/React.createElement(IconButtonMemo, {
    style: {
      width: 30,
      height: 30,
      tintColor: getColor('tintColor')
    },
    containerStyle: {
      alignSelf: 'flex-end',
      margin: 6
    },
    onPress: onClickedVoiceButton,
    iconName: 'wave_in_circle'
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center',
      flexShrink: 1,
      marginHorizontal: 6
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    ref: inputRef,
    numberOfLines: numberOfLines,
    multiline: true,
    unitHeight: Platform.OS === 'ios' ? 24 : 20,
    style: {
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      // lineHeight: 22,
      fontFamily: fontFamily,
      flex: Platform.select({
        ios: undefined,
        android: 1
      })
    },
    containerStyle: {
      width: '100%',
      minHeight: 36,
      paddingHorizontal: 8,
      paddingVertical: 7,
      maxHeight: Platform.OS === 'ios' ? 96 : 96
    },
    onFocus: onFocus,
    onBlur: onBlur,
    onChangeText: setValue,
    value: value,
    keyboardAppearance: style === 'light' ? 'light' : 'dark',
    placeholder: 'Aa'
  }))), /*#__PURE__*/React.createElement(IconButtonMemo, {
    style: {
      width: 30,
      height: 30,
      tintColor: getColor('icon')
    },
    containerStyle: {
      alignSelf: 'flex-end',
      margin: 6
    },
    onPress: onClickedEmojiButton,
    iconName: emojiIconName
  }), /*#__PURE__*/React.createElement(IconButtonMemo, {
    style: {
      width: 30,
      height: 30,
      tintColor: getColor(sendIconName === 'plus_in_circle' ? 'icon' : 'text_enable'),
      backgroundColor: undefined,
      borderRadius: 30
    },
    containerStyle: {
      alignSelf: 'flex-end',
      margin: 6
    },
    onPress: onClickedSend,
    iconName: sendIconName
  })))), /*#__PURE__*/React.createElement(View, {
    style: {
      backgroundColor: emojiHeight === 0 ? undefined : getColor('backgroundColor'),
      height: emojiHeight,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(EmojiListMemo, {
    containerStyle: {
      flex: 1
    },
    onFace: onClickedFaceListItem,
    onDel: onClickedDelButton,
    onSend: onClickedEmojiSend,
    emojiList: emojiList
  })), /*#__PURE__*/React.createElement(BottomVoiceBar, {
    ref: voiceBarRef,
    onRequestModalClose: onCloseVoiceBar,
    onClickedSendButton: onSelectSendVoice,
    onState: onVoiceStateChange,
    onFailed: onVoiceFailed
  }), /*#__PURE__*/React.createElement(BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(MessageInputEditMessage, {
    ref: editRef,
    top: top,
    onRequestModalClose: onRequestCloseEdit,
    onEditMessageFinished: onEditMessageFinished
  }));
});
//# sourceMappingURL=MessageInput.js.map