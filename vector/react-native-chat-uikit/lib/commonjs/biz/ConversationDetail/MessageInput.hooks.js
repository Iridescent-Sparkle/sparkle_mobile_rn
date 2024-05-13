"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMessageInput = useMessageInput;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _twemoji = _interopRequireDefault(require("twemoji"));
var _hook = require("../../hook");
var _utils = require("../../utils");
var _EmojiList = require("../EmojiList");
var _useMessageInputExtendActions = require("../hooks/useMessageInputExtendActions");
var _useSelectFile = require("../hooks/useSelectFile");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import { useDispatchContext } from '../../dispatch';

// import { gVoiceBarHeight } from '../const';

function useMessageInput(props, ref) {
  var _quoteMessageRef$curr;
  const {
    bottom,
    onClickedSend: propsOnClickedSend,
    closeAfterSend,
    onHeightChange,
    convId,
    onEditMessageFinished: propsOnEditMessageFinished,
    // onInputMention: propsOnInputMention,
    onClickedCardMenu: propsOnClickedCardMenu,
    onInitMenu
  } = props;
  const {
    keyboardHeight,
    keyboardCurrentHeight
  } = (0, _hook.useKeyboardHeight)();
  const inputRef = React.useRef({});
  const [_value, _setValue] = React.useState('');
  const [emojiHeight, _setEmojiHeight] = React.useState(0);
  const isClosedEmoji = React.useRef(true);
  const isClosedKeyboard = React.useRef(true);
  const isClosedVoiceBar = React.useRef(true);
  const [emojiIconName, setEmojiIconName] = React.useState('face');
  const [sendIconName, setSendIconName] = React.useState('plus_in_circle');
  const valueRef = React.useRef('');
  const rawValue = React.useRef('');
  /// !!! tell me why? inputBarState
  const [inputBarState, setInputBarState] = React.useState('normal');
  const inputBarStateRef = React.useRef('normal');
  const hasLayoutAnimation = React.useRef(false);
  const voiceBarRef = React.useRef({});
  const voiceBarStateRef = React.useRef('idle');
  const menuRef = React.useRef(null);
  const quoteMessageRef = React.useRef(undefined);
  const [showQuote, setShowQuote] = React.useState(false);
  const editRef = React.useRef({});
  const msgModelRef = React.useRef();
  const mentionListRef = React.useRef([]);
  const alertRef = React.useRef(null);
  const onSetInputBarState = state => {
    inputBarStateRef.current = state;
    setInputBarState(state);
  };
  const _onValue = v => {
    if (v.length > 0 && (inputBarStateRef.current === 'keyboard' || inputBarStateRef.current === 'emoji')) {
      setSendIconName('airplane');
    } else {
      setSendIconName('plus_in_circle');
    }
    _setValue(v);
  };
  const changeInputBarState = nextState => {
    if (nextState === 'normal') {
      isClosedEmoji.current = true;
      isClosedKeyboard.current = true;
      isClosedVoiceBar.current = true;
      onSetInputBarState('normal');
      setEmojiIconName('face');
      closeEmojiList();
      closeVoiceBar();
      closeKeyboard();
    } else if (nextState === 'emoji') {
      isClosedEmoji.current = false;
      isClosedKeyboard.current = true;
      isClosedVoiceBar.current = true;
      onSetInputBarState('emoji');
      setEmojiIconName('keyboard2');
      closeKeyboard();
      closeVoiceBar();
      showEmojiList();
    } else if (nextState === 'voice') {
      isClosedEmoji.current = true;
      isClosedKeyboard.current = true;
      isClosedVoiceBar.current = false;
      onSetInputBarState('voice');
      setEmojiIconName('face');
      closeKeyboard();
      closeEmojiList();
      showVoiceBar();
    } else if (nextState === 'keyboard') {
      isClosedKeyboard.current = false;
      onSetInputBarState('keyboard');
      setEmojiIconName('face');
      if (_reactNative.Platform.OS !== 'ios') {
        isClosedEmoji.current = true;
        isClosedVoiceBar.current = true;
        closeEmojiList();
        closeVoiceBar();
      }
    }
  };
  const onFocus = () => {
    changeInputBarState('keyboard');
  };
  const onBlur = () => {
    setLayoutAnimation();
    if (isClosedEmoji.current === true) {
      setEmojiIconName('face');
      closeEmojiList();
    } else {
      setEmojiIconName('keyboard2');
      showEmojiList();
    }
    if (isClosedVoiceBar.current === true) {
      closeVoiceBar();
    }
  };
  const setInputValue = (text, op, face) => {
    if (op) {
      if (op === 'add_face') {
        rawValue.current += face;
        valueRef.current = valueRef.current + _twemoji.default.convert.fromCodePoint(face.substring(2));
        _onValue(valueRef.current);
      } else if (op === 'del_face') {
        const rawFace = _twemoji.default.convert.toCodePoint(face);
        rawValue.current = rawValue.current.substring(0, rawValue.current.length - rawFace.length - 2);
        valueRef.current = valueRef.current.substring(0, valueRef.current.length - 2);
        _onValue(valueRef.current);
      } else if (op === 'del_c') {
        rawValue.current = rawValue.current.substring(0, rawValue.current.length - 1);
        valueRef.current = valueRef.current.substring(0, valueRef.current.length - 1);
        _onValue(valueRef.current);
      }
    } else {
      if (valueRef.current !== text) {
        if (valueRef.current.length > text.length) {
          // const tmp = findLastMention(valueRef.current);
          // if (tmp) {
          //   text = tmp;
          // }
          rawValue.current = rawValue.current.substring(0, rawValue.current.length - (valueRef.current.length - text.length));
        } else {
          // if (convType === ChatConversationType.GroupChat) {
          //   if (text.length > 0 && text[text.length - 1] === '@') {
          //     propsOnInputMention?.(convId);
          //   }
          // }
          rawValue.current += text.substring(valueRef.current.length);
        }
      }
      if (text.length === 0) {
        clearMentionList();
      }
      valueRef.current = text;
      _onValue(valueRef.current);
    }
  };
  const onClickedFaceListItem = face => {
    setInputValue(valueRef.current, 'add_face', face);
  };
  const onClickedDelButton = () => {
    if (valueRef.current.length >= 2) {
      const face = valueRef.current.substring(valueRef.current.length - 2);
      let lastIsFace = false;
      _EmojiList.FACE_ASSETS_UTF16.forEach(v => {
        if (face === v) {
          lastIsFace = true;
          setInputValue(valueRef.current, 'del_face', face);
        }
      });
      if (lastIsFace === false) {
        setInputValue(valueRef.current, 'del_c');
      }
    } else if (valueRef.current.length > 0) {
      setInputValue(valueRef.current, 'del_c');
    }
  };
  const onClickedClearButton = () => {
    // !!! https://github.com/facebook/react-native/issues/37979
    // !!! https://github.com/facebook/react-native/commit/a804c0f22b4b11b3d9632dc59a6da14f6c4325e3
    valueRef.current = '';
    rawValue.current = '';
    // inputRef.current?.clear();
    setInputValue(valueRef.current);
    clearMentionList();
    // _onValue(valueRef.current);
  };

  const onClickedEmojiButton = () => {
    if (emojiIconName === 'face') {
      changeInputBarState('emoji');
    } else {
      var _inputRef$current;
      isClosedKeyboard.current = false;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }
  };
  const onClickedVoiceButton = () => {
    changeInputBarState('voice');
  };
  const {
    delayExecTask: resetLayoutAnimation
  } = (0, _hook.useDelayExecTask)(175, React.useCallback(() => {
    if (hasLayoutAnimation.current === true) {
      hasLayoutAnimation.current = false;
    }
  }, []));
  const setLayoutAnimation = React.useCallback(() => {
    if (hasLayoutAnimation.current === false) {
      hasLayoutAnimation.current = true;
      _reactNative.LayoutAnimation.configureNext({
        duration: 250,
        // from keyboard event
        update: {
          duration: 250,
          type: _reactNative.Platform.OS === 'ios' ? 'keyboard' : 'linear'
        }
      });
    }
    resetLayoutAnimation();
  }, [resetLayoutAnimation]);
  const setEmojiHeight = React.useCallback(h => {
    setLayoutAnimation();
    _setEmojiHeight(h);
  }, [setLayoutAnimation]);
  const closeKeyboard = React.useCallback(() => {
    _reactNative.Keyboard.dismiss();
  }, []);
  const closeEmojiList = React.useCallback(() => {
    setEmojiHeight(0);
  }, [setEmojiHeight]);
  const closeVoiceBar = React.useCallback(() => {
    var _voiceBarRef$current, _voiceBarRef$current$;
    // setVoiceHeight(0);
    (_voiceBarRef$current = voiceBarRef.current) === null || _voiceBarRef$current === void 0 ? void 0 : (_voiceBarRef$current$ = _voiceBarRef$current.startHide) === null || _voiceBarRef$current$ === void 0 ? void 0 : _voiceBarRef$current$.call(_voiceBarRef$current);
  }, []);
  const showEmojiList = React.useCallback(() => {
    const tmp = keyboardHeight === 0 ? 300 : keyboardHeight;
    setEmojiHeight(tmp - (bottom ?? 0));
  }, [bottom, keyboardHeight, setEmojiHeight]);
  const showVoiceBar = React.useCallback(() => {
    var _voiceBarRef$current2, _voiceBarRef$current3;
    // setVoiceHeight(gVoiceBarHeight + (bottom ?? 0));
    (_voiceBarRef$current2 = voiceBarRef.current) === null || _voiceBarRef$current2 === void 0 ? void 0 : (_voiceBarRef$current3 = _voiceBarRef$current2.startShow) === null || _voiceBarRef$current3 === void 0 ? void 0 : _voiceBarRef$current3.call(_voiceBarRef$current2);
  }, []);
  const onCloseVoiceBar = () => {
    var _voiceBarRef$current4, _voiceBarRef$current5;
    if (voiceBarStateRef.current === 'recording') {
      return;
    }
    (_voiceBarRef$current4 = voiceBarRef.current) === null || _voiceBarRef$current4 === void 0 ? void 0 : (_voiceBarRef$current5 = _voiceBarRef$current4.startHide) === null || _voiceBarRef$current5 === void 0 ? void 0 : _voiceBarRef$current5.call(_voiceBarRef$current4);
  };
  const onVoiceStateChange = state => {
    voiceBarStateRef.current = state;
  };
  const onRequestCloseMenu = () => {
    var _menuRef$current, _menuRef$current$star;
    (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startHide) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current);
  };
  const onClickedEmojiSend = React.useCallback(() => {
    // !!! warning: valueRef.current is not the latest value
    const content = valueRef.current;
    propsOnClickedSend === null || propsOnClickedSend === void 0 ? void 0 : propsOnClickedSend({
      type: 'text',
      content: content
    });
    onClickedClearButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickedSend = () => {
    if (sendIconName === 'airplane') {
      const content = valueRef.current;
      if (quoteMessageRef.current !== undefined) {
        // !!! only support text message for quote
        propsOnClickedSend === null || propsOnClickedSend === void 0 ? void 0 : propsOnClickedSend({
          type: 'text',
          content: content,
          quote: quoteMessageRef.current
        });
        onHideQuoteMessage();
      } else {
        propsOnClickedSend === null || propsOnClickedSend === void 0 ? void 0 : propsOnClickedSend({
          type: 'text',
          content: content
        });
      }
      onClickedClearButton();
      if (closeAfterSend === true) {
        (0, _utils.timeoutTask)(0, closeKeyboard);
      }
    } else {
      onShowMessageInputExtendActions();
    }
  };
  const onSelectSendImage = props => {
    propsOnClickedSend === null || propsOnClickedSend === void 0 ? void 0 : propsOnClickedSend(props);
  };
  const onSelectSendVoice = props => {
    propsOnClickedSend === null || propsOnClickedSend === void 0 ? void 0 : propsOnClickedSend(props);
    changeInputBarState('normal');
  };
  const onSelectSendVideo = props => {
    propsOnClickedSend === null || propsOnClickedSend === void 0 ? void 0 : propsOnClickedSend(props);
  };
  const onSelectSendFile = props => {
    propsOnClickedSend === null || propsOnClickedSend === void 0 ? void 0 : propsOnClickedSend(props);
  };
  const onSelectSendCard = () => {
    propsOnClickedCardMenu === null || propsOnClickedCardMenu === void 0 ? void 0 : propsOnClickedCardMenu();
  };
  const {
    onShowMessageInputExtendActions
  } = (0, _useMessageInputExtendActions.useMessageInputExtendActions)({
    menuRef,
    convId,
    alertRef,
    onSelectOnePicture: _useSelectFile.selectOnePicture,
    onSelectOnePictureFromCamera: _useSelectFile.selectCamera,
    onSelectFile: _useSelectFile.selectFile,
    onSelectOneShortVideo: _useSelectFile.selectOneShortVideo,
    onSelectSendCard,
    onSelectFileResult: onSelectSendFile,
    onSelectOnePictureResult: onSelectSendImage,
    onSelectOneShortVideoResult: onSelectSendVideo,
    onInit: onInitMenu
  });
  const onVoiceFailed = React.useCallback(error => {
    let e = error;
    try {
      e.error = JSON.stringify(error);
    } catch {}
    console.warn('dev:voice:failed:', e);
  }, []);
  const onShowQuoteMessage = React.useCallback(model => {
    var _inputRef$current2;
    quoteMessageRef.current = model;
    isClosedKeyboard.current = false;
    (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.focus();
    setShowQuote(true);
  }, []);
  const onHideQuoteMessage = React.useCallback(() => {
    quoteMessageRef.current = undefined;
    setShowQuote(false);
  }, []);
  const onRequestCloseEdit = React.useCallback(() => {
    var _editRef$current, _editRef$current$star;
    (_editRef$current = editRef.current) === null || _editRef$current === void 0 ? void 0 : (_editRef$current$star = _editRef$current.startHide) === null || _editRef$current$star === void 0 ? void 0 : _editRef$current$star.call(_editRef$current);
  }, []);
  const onShowEditMessage = React.useCallback(model => {
    var _editRef$current2, _editRef$current2$sta;
    msgModelRef.current = model;
    (_editRef$current2 = editRef.current) === null || _editRef$current2 === void 0 ? void 0 : (_editRef$current2$sta = _editRef$current2.startShowWithInit) === null || _editRef$current2$sta === void 0 ? void 0 : _editRef$current2$sta.call(_editRef$current2, model.msg);
  }, []);
  const onEditMessageFinished = React.useCallback((msgId, text) => {
    var _editRef$current3, _editRef$current3$sta;
    (_editRef$current3 = editRef.current) === null || _editRef$current3 === void 0 ? void 0 : (_editRef$current3$sta = _editRef$current3.startHide) === null || _editRef$current3$sta === void 0 ? void 0 : _editRef$current3$sta.call(_editRef$current3, () => {
      var _msgModelRef$current;
      if (((_msgModelRef$current = msgModelRef.current) === null || _msgModelRef$current === void 0 ? void 0 : _msgModelRef$current.msg.msgId) === msgId) {
        const body = msgModelRef.current.msg.body;
        body.content = text;
        propsOnEditMessageFinished === null || propsOnEditMessageFinished === void 0 ? void 0 : propsOnEditMessageFinished(msgModelRef.current);
      }
    });
  }, [propsOnEditMessageFinished]);
  React.useEffect(() => {
    if (keyboardCurrentHeight > 0 && emojiHeight === 0 || emojiHeight > 0 && keyboardCurrentHeight === 0 || emojiHeight === 0 && keyboardCurrentHeight === 0) {
      // !!! height is pseudo.
      onHeightChange === null || onHeightChange === void 0 ? void 0 : onHeightChange(emojiHeight === 0 && keyboardCurrentHeight === 0 ? 0 : 1);
    }
  }, [keyboardCurrentHeight, emojiHeight, onHeightChange]);
  React.useImperativeHandle(ref, () => {
    return {
      close: () => {
        changeInputBarState('normal');
      },
      quoteMessage: model => {
        onShowQuoteMessage(model);
      },
      editMessage: model => {
        onShowEditMessage(model);
      }
      // mentionSelected: (list: { id: string; name: string }[]) => {
      //   mentionListRef.current.push(...list);
      //   // !!! only support one mention
      //   const text = valueRef.current;
      //   const index = text.lastIndexOf('@');
      //   if (index !== -1) {
      //     const pre = text.substring(0, index);
      //     const post = text.substring(index + 1);
      //     const mention = list[0];
      //     const mentionText = `@${mention!.name} `;
      //     const newText = `${pre}${mentionText}${post}`;
      //     setInputValue(newText);
      //   }
      // },
    };
  });

  // const deleteLastMentionFromList = React.useCallback((name: string) => {
  //   const index = mentionListRef.current
  //     .reverse()
  //     .findIndex((v) => v.name === name);
  //   if (index !== -1) {
  //     mentionListRef.current.splice(index, 1);
  //   }
  // }, []);

  // const findLastMention = React.useCallback(
  //   (text: string) => {
  //     if (mentionListRef.current.length > 0) {
  //       const last = mentionListRef.current[mentionListRef.current.length - 1];
  //       if (last) {
  //         // const index = text.lastIndexOf(`@${last.name} `);
  //         const key = `@${last.name}`;
  //         const index = text.lastIndexOf(key);
  //         if (index !== -1) {
  //           const start = index;
  //           const end = index + last.name.length + 1;
  //           if (end + 1 === text.length) {
  //             deleteLastMentionFromList(last.name);
  //             return text.replace(text.substring(start, end), '');
  //           }
  //         }
  //       }
  //     }
  //     return undefined;
  //   },
  //   [deleteLastMentionFromList]
  // );

  const clearMentionList = React.useCallback(() => {
    if (mentionListRef.current.length > 0) {
      mentionListRef.current = [];
    }
  }, []);
  return {
    value: _value,
    setValue: setInputValue,
    onClickedFaceListItem,
    onClickedDelButton,
    onClickedClearButton,
    onClickedEmojiButton,
    onClickedVoiceButton,
    inputRef,
    emojiHeight,
    emojiIconName,
    onFocus,
    onBlur,
    inputBarState,
    changeInputBarState,
    voiceBarRef,
    onCloseVoiceBar,
    onVoiceStateChange,
    onSelectSendVoice,
    onRequestCloseMenu,
    menuRef,
    sendIconName,
    onClickedSend,
    onVoiceFailed,
    showQuote,
    onHideQuoteMessage,
    onRequestCloseEdit,
    editRef,
    onEditMessageFinished,
    quoteMsg: (_quoteMessageRef$curr = quoteMessageRef.current) === null || _quoteMessageRef$curr === void 0 ? void 0 : _quoteMessageRef$curr.msg,
    onClickedEmojiSend
  };
}
//# sourceMappingURL=MessageInput.hooks.js.map