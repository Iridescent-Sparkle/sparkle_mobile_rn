"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMessageList = useMessageList;
var React = _interopRequireWildcard(require("react"));
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _chat = require("../../chat");
var _utils = require("../../chat/utils");
var _config = require("../../config");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _services = require("../../services");
var _utils2 = require("../../utils");
var _const = require("../const");
var _Context = require("../Context");
var _useCloseMenu = require("../hooks/useCloseMenu");
var _useMessageLongPressActions = require("../hooks/useMessageLongPressActions");
var _List = require("../List");
var _const2 = require("./const");
var _MessageListItem = require("./MessageListItem");
var _MessageListItem2 = require("./MessageListItem.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import { useDispatchContext } from '../../dispatch';

function useMessageList(props, ref) {
  const {
    convId,
    convType,
    testMode,
    onClickedItem: propsOnClicked,
    onLongPressItem: propsOnLongPress,
    onQuoteMessageForInput: propsOnQuoteMessageForInput,
    onEditMessageForInput: propsOnEditMessageForInput,
    reportMessageCustomList = _const.gReportMessageList,
    onClickedItemAvatar: propsOnClickedItemAvatar,
    onClickedItemQuote: propsOnClickedItemQuote,
    listItemRenderProps: propsListItemRenderProps,
    recvMessageAutoScroll = false,
    onInitMenu,
    onCopyFinished: propsOnCopyFinished,
    messageLayoutType,
    onNoMoreMessage
  } = props;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const flatListProps = (0, _List.useFlatList)({
    listState: testMode === 'only-ui' ? 'normal' : 'normal'
    // onInit: () => init(),
    // onLoadMore: () => onRequestHistoryMessage(),
  });

  const {
    dataRef,
    setData,
    isAutoLoad,
    listState,
    listType,
    ref: listRef
  } = flatListProps;
  const preBottomDataRef = React.useRef();
  const scrollEventThrottle = React.useRef(16).current;
  const needScrollRef = React.useRef(true);
  const userScrollGestureRef = React.useRef(false);
  const isBottomRef = React.useRef(true);
  const isTopRef = React.useRef(true);
  const heightRef = React.useRef(0);
  const bounces = React.useRef(true).current;
  const currentVoicePlayingRef = React.useRef();
  const im = (0, _chat.useChatContext)();
  const startMsgIdRef = React.useRef('');
  const [maxListHeight, setMaxListHeight] = React.useState(0);
  const enableListItemUserInfoUpdateFromMessage = React.useRef(false).current;
  // !!! https://github.com/facebook/react-native/issues/36529
  // !!! https://github.com/facebook/react-native/issues/14312
  // !!! only android, FlatList onEndReached no work android
  const [reachedThreshold] = React.useState(0.5);
  const reportDataRef = React.useRef(reportMessageCustomList.map((d, i) => {
    return {
      id: i.toString(),
      tag: d.key,
      title: tr(d.value),
      checked: false
    };
  }));
  // There is no more data.
  const hasNoMoreRef = React.useRef(false);
  const menuRef = React.useRef(null);
  const reportRef = React.useRef(null);
  const alertRef = React.useRef(null);
  const inverted = React.useRef(true).current;
  const currentReportMessageRef = React.useRef();
  const {
    closeMenu
  } = (0, _useCloseMenu.useCloseMenu)({
    menuRef
  });
  const MessageListItemRef = React.useRef((propsListItemRenderProps === null || propsListItemRenderProps === void 0 ? void 0 : propsListItemRenderProps.ListItemRender) ?? _MessageListItem.MessageListItemMemo);
  const listItemRenderPropsRef = React.useRef({
    ...propsListItemRenderProps
  });
  const {
    dispatchUserInfo
  } = (0, _Context.useMessageContext)();
  const {
    recallTimeout
  } = (0, _config.useConfigContext)();
  const setNeedScroll = React.useCallback(needScroll => {
    needScrollRef.current = needScroll;
  }, []);
  const setUserScrollGesture = React.useCallback(isUserScroll => {
    userScrollGestureRef.current = isUserScroll;
  }, []);
  // const { addListener, removeListener, emit } = useDispatchContext();

  const needScrollToBottom = React.useCallback(() => {
    if (needScrollRef.current === true) {
      return true;
    }
    return false;
  }, []);
  const scrollToBottom = React.useCallback(animated => {
    if (needScrollToBottom() === true) {
      (0, _utils2.timeoutTask)(0, () => {
        var _listRef$current, _listRef$current$scro;
        listRef === null || listRef === void 0 ? void 0 : (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : (_listRef$current$scro = _listRef$current.scrollToIndex) === null || _listRef$current$scro === void 0 ? void 0 : _listRef$current$scro.call(_listRef$current, {
          index: 0,
          animated
        });
      });
    }
  }, [listRef, needScrollToBottom]);
  const scrollTo = React.useCallback((index, animated) => {
    setNeedScroll(false);
    (0, _utils2.timeoutTask)(0, () => {
      var _listRef$current2, _listRef$current2$scr;
      listRef === null || listRef === void 0 ? void 0 : (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 ? void 0 : (_listRef$current2$scr = _listRef$current2.scrollToIndex) === null || _listRef$current2$scr === void 0 ? void 0 : _listRef$current2$scr.call(_listRef$current2, {
        index,
        animated,
        viewPosition: 1
      });
    });
  }, [listRef, setNeedScroll]);
  const onRenderItem = React.useCallback(info => {
    for (const d of dataRef.current) {
      if (d.id === info.item.id) {
        d.index = info.index;
        break;
      }
    }
  }, [dataRef]);
  const removeDuplicateData = React.useCallback(list => {
    const uniqueList = list.filter((item, index, self) => index === self.findIndex(t => {
      if (item.model.modelType === 'message' && t.model.modelType === 'message') {
        const msgModel = item.model;
        const tMsgModel = t.model;
        if (msgModel.msg.localMsgId === tMsgModel.msg.localMsgId) {
          return true;
        }
      } else if (item.model.modelType === 'system' && t.model.modelType === 'system') {
        const msgModel = item.model;
        const tMsgModel = t.model;
        if (msgModel.msg.msgId === tMsgModel.msg.msgId) {
          return true;
        }
      } else if (item.model.modelType === 'time' && t.model.modelType === 'time') {
        const msgModel = item.model;
        const tMsgModel = t.model;
        if (msgModel.timestamp === tMsgModel.timestamp) {
          return true;
        }
      }
      return false;
    }));
    return uniqueList;
  }, []);
  const _refreshToUI = React.useCallback(items => {
    setData([...items]);
  }, [setData]);
  const refreshToUI = React.useCallback(items => {
    dataRef.current = removeDuplicateData(items);
    if (needScrollToBottom() === true) {
      if (dataRef.current.length > 0) {
        preBottomDataRef.current = dataRef.current[0];
      }
      _refreshToUI(dataRef.current);
    } else {
      const index = dataRef.current.findIndex(d => {
        var _preBottomDataRef$cur;
        if (d.id === ((_preBottomDataRef$cur = preBottomDataRef.current) === null || _preBottomDataRef$cur === void 0 ? void 0 : _preBottomDataRef$cur.id)) {
          return true;
        }
        return false;
      });
      if (index !== -1) {
        // !!!: Get the element after the specified position in the array and return
        const tmp = dataRef.current.slice(index);
        _refreshToUI(tmp);
      } else {
        _refreshToUI(dataRef.current);
      }
    }
  }, [dataRef, removeDuplicateData, needScrollToBottom, _refreshToUI]);

  // !!! Both gestures and scrolling methods are triggered on the ios platform. However, the android platform only has gesture triggering.
  const onMomentumScrollEnd = React.useCallback(() => {}, []);
  const {
    delayExecTask
  } = (0, _hook.useDelayExecTask)(500, React.useCallback(event => {
    const y = event.nativeEvent.contentOffset.y;
    if (y < 10) {
      var _preBottomDataRef$cur2;
      setNeedScroll(true);
      const preId = (_preBottomDataRef$cur2 = preBottomDataRef.current) === null || _preBottomDataRef$cur2 === void 0 ? void 0 : _preBottomDataRef$cur2.id;
      refreshToUI(dataRef.current);
      const item = dataRef.current.find(d => {
        if (d.id === preId) {
          return true;
        }
        return false;
      });
      if ((item === null || item === void 0 ? void 0 : item.index) !== undefined) {
        scrollTo(item.index, false);
      }
    } else {
      setNeedScroll(false);
    }
  }, [dataRef, refreshToUI, scrollTo, setNeedScroll]));
  const onScroll = React.useCallback(event => {
    const y = event.nativeEvent.contentOffset.y;
    if (y + heightRef.current > event.nativeEvent.contentSize.height - 10) {
      isTopRef.current = true;
    } else {
      isTopRef.current = false;
    }
    if (y < 10) {
      isBottomRef.current = true;
    } else {
      isBottomRef.current = false;
    }
    if (userScrollGestureRef.current === true) {
      delayExecTask({
        ...event
      });
    }
  }, [delayExecTask]);
  const onScrollEndDrag = React.useCallback(_event => {
    setUserScrollGesture(false);
  }, [setUserScrollGesture]);
  const onScrollBeginDrag = React.useCallback(_event => {
    setUserScrollGesture(true);
  }, [setUserScrollGesture]);
  const onLayout = React.useCallback(event => {
    heightRef.current = event.nativeEvent.layout.height;
  }, []);
  const updateMessageVoiceUIState = React.useCallback(model => {
    const msgId = model.msg.msgId;
    dataRef.current.map(d => {
      if (d.model.modelType === 'message') {
        const msgModel = d.model;
        if (msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.VOICE) {
          if (msgModel.msg.msgId === msgId) {
            msgModel.isVoicePlaying = !msgModel.isVoicePlaying;
          } else {
            msgModel.isVoicePlaying = false;
          }
          d.model = {
            ...msgModel
          };
        }
      }
    });
    refreshToUI(dataRef.current);
  }, [dataRef, refreshToUI]);
  const startVoicePlay = React.useCallback(async msgModel => {
    var _currentVoicePlayingR;
    const isSame = msgModel.msg.msgId === ((_currentVoicePlayingR = currentVoicePlayingRef.current) === null || _currentVoicePlayingR === void 0 ? void 0 : _currentVoicePlayingR.msg.msgId);
    if (currentVoicePlayingRef.current) {
      const tmp = currentVoicePlayingRef.current;
      try {
        await _services.Services.ms.stopAudio();
        tmp.isVoicePlaying = true;
        currentVoicePlayingRef.current = undefined;
        updateMessageVoiceUIState(tmp);
      } catch (error) {
        tmp.isVoicePlaying = true;
        currentVoicePlayingRef.current = undefined;
        updateMessageVoiceUIState(tmp);
      }
    }
    if (isSame === true) {
      return;
    }
    currentVoicePlayingRef.current = msgModel;
    const tmp = currentVoicePlayingRef.current;
    updateMessageVoiceUIState(msgModel);
    const body = msgModel.msg.body;
    const localPath = body.localPath;
    try {
      var _msgModel$msg$attribu;
      const isExisted = await _services.Services.dcs.isExistedFile(localPath);
      if (isExisted !== true) {
        currentVoicePlayingRef.current = undefined;
        updateMessageVoiceUIState(msgModel);
        return;
      }
      const readFlag = (_msgModel$msg$attribu = msgModel.msg.attributes) === null || _msgModel$msg$attribu === void 0 ? void 0 : _msgModel$msg$attribu[_chat.gMessageAttributeVoiceReadFlag];
      if (readFlag === undefined) {
        msgModel.msg.attributes = {
          ...msgModel.msg.attributes,
          [_chat.gMessageAttributeVoiceReadFlag]: true
        };
        im.updateMessage({
          message: msgModel.msg,
          onResult: () => {}
        });
      }
      await _services.Services.ms.playAudio({
        url: _utils2.LocalPath.playVoice(localPath),
        onPlay(_ref) {
          let {
            currentPosition,
            duration
          } = _ref;
          if (currentPosition === duration) {
            tmp.isVoicePlaying = true;
            currentVoicePlayingRef.current = undefined;
            updateMessageVoiceUIState(msgModel);
          }
        }
      });
    } catch (error) {
      tmp.isVoicePlaying = true;
      currentVoicePlayingRef.current = undefined;
      updateMessageVoiceUIState(msgModel);
    }
  }, [im, updateMessageVoiceUIState]);
  const recallMessage = React.useCallback(msg => {
    im.messageManager.recallMessage(msg);
  }, [im]);
  const showReportMessageMenu = React.useCallback(model => {
    var _reportRef$current, _reportRef$current$st;
    currentReportMessageRef.current = model;
    (_reportRef$current = reportRef.current) === null || _reportRef$current === void 0 ? void 0 : (_reportRef$current$st = _reportRef$current.startShow) === null || _reportRef$current$st === void 0 ? void 0 : _reportRef$current$st.call(_reportRef$current);
  }, []);
  const onDelMessageToUI = React.useCallback(msg => {
    const index = dataRef.current.findIndex(d => {
      if (d.model.modelType === 'message') {
        const msgModel = d.model;
        if (msg.status === _reactNativeChatSdk.ChatMessageStatus.SUCCESS) {
          if (msgModel.msg.msgId === msg.msgId) {
            return true;
          }
        } else {
          if (msgModel.msg.localMsgId === msg.localMsgId) {
            return true;
          }
        }
      }
      return false;
    });
    if (index !== -1) {
      dataRef.current.splice(index, 1);
      if (index === 0) {
        preBottomDataRef.current = dataRef.current[0];
      }
      refreshToUI(dataRef.current);
    }
  }, [dataRef, refreshToUI]);
  const onDelMessageQuoteToUI = React.useCallback(msg => {
    const index = dataRef.current.findIndex(d => {
      if (d.model.modelType === 'message') {
        const msgModel = d.model;
        if (msg.status === _reactNativeChatSdk.ChatMessageStatus.SUCCESS) {
          var _msgModel$quoteMsg;
          if (((_msgModel$quoteMsg = msgModel.quoteMsg) === null || _msgModel$quoteMsg === void 0 ? void 0 : _msgModel$quoteMsg.msgId) === msg.msgId) {
            return true;
          }
        } else {
          var _msgModel$quoteMsg2;
          if (((_msgModel$quoteMsg2 = msgModel.quoteMsg) === null || _msgModel$quoteMsg2 === void 0 ? void 0 : _msgModel$quoteMsg2.localMsgId) === msg.localMsgId) {
            return true;
          }
        }
      }
      return false;
    });
    if (index !== -1) {
      const item = dataRef.current[index];
      if (item) {
        const msgModel = item.model;
        msgModel.quoteMsg = undefined;
        refreshToUI(dataRef.current);
      }
    }
  }, [dataRef, refreshToUI]);
  const deleteMessage = React.useCallback(msg => {
    im.removeMessage({
      message: msg,
      onResult: () => {
        onDelMessageToUI(msg);
        onDelMessageQuoteToUI(msg);
      }
    });
  }, [im, onDelMessageQuoteToUI, onDelMessageToUI]);
  const {
    onShowMessageLongPressActions
  } = (0, _useMessageLongPressActions.useMessageLongPressActions)({
    menuRef,
    alertRef,
    onQuoteMessageForInput: propsOnQuoteMessageForInput,
    onEditMessageForInput: propsOnEditMessageForInput,
    showReportMessage: showReportMessageMenu,
    onDeleteMessage: deleteMessage,
    onRecallMessage: recallMessage,
    onInit: onInitMenu,
    onCopyFinished: propsOnCopyFinished
  });
  const onClickedListItem = React.useCallback((id, model) => {
    const ret = propsOnClicked === null || propsOnClicked === void 0 ? void 0 : propsOnClicked(id, model);
    if (ret !== false) {
      if (model.modelType === 'message') {
        const msgModel = model;
        if (msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.VOICE) {
          startVoicePlay(msgModel);
        }
      }
    }
  }, [propsOnClicked, startVoicePlay]);
  const onLongPressListItem = React.useCallback((id, model) => {
    const ret = propsOnLongPress === null || propsOnLongPress === void 0 ? void 0 : propsOnLongPress(id, model);
    if (ret !== false) {
      onShowMessageLongPressActions(id, model);
    }
  }, [onShowMessageLongPressActions, propsOnLongPress]);
  const onClickedListItemAvatar = React.useCallback((id, model) => {
    propsOnClickedItemAvatar === null || propsOnClickedItemAvatar === void 0 ? void 0 : propsOnClickedItemAvatar(id, model);
  }, [propsOnClickedItemAvatar]);
  const onClickedListItemQuote = React.useCallback((id, model) => {
    const ret = propsOnClickedItemQuote === null || propsOnClickedItemQuote === void 0 ? void 0 : propsOnClickedItemQuote(id, model);
    if (ret !== false) {
      const item = dataRef.current.find(d => {
        if (d.id === id) {
          return true;
        }
        return false;
      });
      if (item && item.index !== undefined) {
        scrollTo(item.index, false);
      }
    }
  }, [dataRef, propsOnClickedItemQuote, scrollTo]);
  const getStyle = React.useCallback(() => {
    return undefined;
  }, []);
  const onAddDataToUI = React.useCallback((d, pos) => {
    if (d.model.modelType === 'message') {
      const msgModel = d.model;
      const user = im.getRequestData(msgModel.msg.from);
      if (user) {
        msgModel.userName = user.name;
        msgModel.userAvatar = user.avatar;
      }
    }
    if (pos === 'bottom') {
      dataRef.current = [d, ...dataRef.current];
    } else {
      dataRef.current = [...dataRef.current, d];
    }
    refreshToUI(dataRef.current);
  }, [dataRef, im, refreshToUI]);
  const onAddMessageListToUI = React.useCallback(async (msgs, position, onFinished) => {
    const list = msgs.reverse().map(async msg => {
      const getModel = async () => {
        let modelType = 'message';
        if (msg.body.type === _reactNativeChatSdk.ChatMessageType.CUSTOM) {
          const body = msg.body;
          if (body.event === _chat.gCustomMessageCardEventType) {
            modelType = 'message';
          } else {
            modelType = 'system';
          }
        }
        if (modelType === 'system') {
          return {
            userId: msg.from,
            modelType: 'system',
            msg: msg
          };
        } else {
          var _msg$attributes;
          const quote = (_msg$attributes = msg.attributes) === null || _msg$attributes === void 0 ? void 0 : _msg$attributes[_chat.gMessageAttributeQuote];
          let quoteMsg;
          if (quote) {
            quoteMsg = await im.getMessage({
              messageId: quote.msgID
            });
          }
          const user = im.getRequestData(msg.from);
          return {
            userId: msg.from,
            modelType: 'message',
            layoutType: messageLayoutType ?? (msg.from === im.userId ? 'right' : 'left'),
            msg: msg,
            quoteMsg: quoteMsg,
            userName: user === null || user === void 0 ? void 0 : user.name,
            userAvatar: user === null || user === void 0 ? void 0 : user.avatar
          };
        }
      };
      return {
        id: msg.msgId.toString(),
        model: await getModel(),
        containerStyle: getStyle()
      };
    });
    const l = await Promise.all(list);
    if (position === 'bottom') {
      dataRef.current = [...l, ...dataRef.current];
    } else {
      dataRef.current = [...dataRef.current, ...l];
    }
    refreshToUI(dataRef.current);
    onFinished === null || onFinished === void 0 ? void 0 : onFinished(l);
  }, [dataRef, getStyle, im, messageLayoutType, refreshToUI]);
  const reportMessage = React.useCallback(result => {
    if (result) {
      var _currentReportMessage;
      const msg = (_currentReportMessage = currentReportMessageRef.current) === null || _currentReportMessage === void 0 ? void 0 : _currentReportMessage.msg;
      if (msg) {
        im.reportMessage({
          messageId: msg.msgId,
          tag: result.tag,
          reason: tr(result.title),
          onResult: () => {
            var _reportRef$current2, _reportRef$current2$s;
            currentReportMessageRef.current = undefined;
            (_reportRef$current2 = reportRef.current) === null || _reportRef$current2 === void 0 ? void 0 : (_reportRef$current2$s = _reportRef$current2.startHide) === null || _reportRef$current2$s === void 0 ? void 0 : _reportRef$current2$s.call(_reportRef$current2);
          }
        });
      }
    }
  }, [im, tr]);
  const onUpdateMessageToUI = React.useCallback((msg, fromType) => {
    const isExisted = dataRef.current.find(d => {
      if (d.model.modelType === 'message') {
        const msgModel = d.model;
        if (fromType === 'send') {
          if (msgModel.msg.localMsgId === msg.localMsgId) {
            msgModel.msg = msg;
            d.model = {
              ...msgModel
            };
            return true;
          }
        } else {
          if (msgModel.msg.msgId === msg.msgId) {
            msgModel.msg = msg;
            d.model = {
              ...msgModel
            };
            return true;
          }
        }
      }
      return false;
    });
    if (isExisted) {
      refreshToUI(dataRef.current);
    }
  }, [dataRef, refreshToUI]);
  const resendMessage = React.useCallback(msg => {
    if (msg.direction !== _reactNativeChatSdk.ChatMessageDirection.SEND) {
      return;
    }
    const tmp = {
      ...msg
    };
    tmp.status = _reactNativeChatSdk.ChatMessageStatus.CREATE;
    onUpdateMessageToUI(tmp, 'send');
    im.messageManager.resendMessage(tmp);
  }, [im.messageManager, onUpdateMessageToUI]);
  const onClickedListItemState = React.useCallback((_id, model) => {
    if (model.modelType !== 'message') {
      return;
    }
    const msgModel = model;
    if (msgModel.msg.status === _reactNativeChatSdk.ChatMessageStatus.FAIL) {
      resendMessage(msgModel.msg);
    }
  }, [resendMessage]);
  const editMessage = React.useCallback(msg => {
    im.editMessage({
      message: msg,
      onResult: result => {
        if (result.isOk === true && result.value) {
          onUpdateMessageToUI(result.value, 'recv');
        } else {
          im.sendError({
            error: result.error,
            from: 'editMessage'
          });
        }
      }
    });
  }, [im, onUpdateMessageToUI]);
  const onAddMessageToUI = React.useCallback((msg, quoteMsg) => {
    onAddDataToUI({
      id: msg.msgId.toString(),
      model: {
        userId: msg.from,
        modelType: 'message',
        layoutType: msg.from === im.userId ? 'right' : 'left',
        msg: msg,
        quoteMsg: quoteMsg
      },
      containerStyle: getStyle()
    }, 'bottom');
    if (enableListItemUserInfoUpdateFromMessage === true && msg.direction === _reactNativeChatSdk.ChatMessageDirection.RECEIVE) {
      const userInfo = (0, _utils.userInfoFromMessage)(msg);
      if (userInfo) {
        dispatchUserInfo({
          ...userInfo,
          userAvatar: userInfo.avatarURL
        });
      }
    }
  }, [dispatchUserInfo, enableListItemUserInfoUpdateFromMessage, getStyle, im.userId, onAddDataToUI]);
  const onRecallMessageToUI = React.useCallback(tipMsg => {
    onAddDataToUI({
      id: tipMsg.msgId.toString(),
      model: {
        userId: tipMsg.from,
        modelType: 'system',
        msg: tipMsg
      },
      containerStyle: getStyle()
    }, 'bottom');
  }, [getStyle, onAddDataToUI]);
  const onRecvRecallMessage = React.useCallback((orgMsg, tipMsg) => {
    onDelMessageToUI(orgMsg);
    onDelMessageQuoteToUI(orgMsg);
    onRecallMessageToUI(tipMsg);
  }, [onDelMessageQuoteToUI, onDelMessageToUI, onRecallMessageToUI]);
  const sendRecvMessageReadAck = React.useCallback(msg => {
    if (msg.chatType === _reactNativeChatSdk.ChatMessageChatType.PeerChat && msg.direction === _reactNativeChatSdk.ChatMessageDirection.RECEIVE && msg.hasReadAck === false) {
      im.messageManager.sendMessageReadAck({
        message: msg
      });
    }
  }, [im]);

  // todo: how to do?
  // const setRecvMessageRead = React.useCallback(
  //   (msg: ChatMessage) => {
  //     if (
  //       msg.chatType === ChatMessageChatType.PeerChat &&
  //       msg.direction === ChatMessageDirection.RECEIVE &&
  //       msg.hasRead === false
  //     ) {
  //       im.messageManager.setMessageRead({
  //         convId: convId,
  //         convType: convType,
  //         message: msg,
  //       });
  //     }
  //   },
  //   [convId, convType, im.messageManager]
  // );

  const addSendMessageToUI = React.useCallback((value, onFinished) => {
    let ret;
    if (value.type === 'text') {
      var _value$quote;
      const v = value;
      const msg = _reactNativeChatSdk.ChatMessage.createTextMessage(convId,
      // emoji.fromCodePointText(v.content),
      v.content, convType);
      const quoteMsg = (_value$quote = value.quote) === null || _value$quote === void 0 ? void 0 : _value$quote.msg;
      if (quoteMsg) {
        msg.attributes = {
          [_chat.gMessageAttributeQuote]: {
            msgID: quoteMsg.msgId,
            msgPreview: quoteMsg.body.content,
            msgSender: quoteMsg.from,
            msgType: quoteMsg.body.type
          }
        };
      }
      ret = {
        id: msg.msgId.toString(),
        model: {
          userId: msg.from,
          modelType: 'message',
          layoutType: messageLayoutType ?? 'right',
          msg: msg,
          quoteMsg: quoteMsg
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    } else if (value.type === 'image') {
      const v = value;
      const msg = _reactNativeChatSdk.ChatMessage.createImageMessage(convId, v.localPath, convType, {
        width: v.imageWidth,
        height: v.imageHeight,
        fileSize: v.fileSize,
        displayName: v.displayName ?? ''
      });
      ret = {
        id: msg.msgId.toString(),
        model: {
          userId: msg.from,
          modelType: 'message',
          layoutType: messageLayoutType ?? 'right',
          msg: msg
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    } else if (value.type === 'voice') {
      const v = value;
      const msg = _reactNativeChatSdk.ChatMessage.createVoiceMessage(convId, v.localPath, convType, {
        duration: Math.round((v.duration ?? 0) / 1000),
        fileSize: v.fileSize,
        displayName: v.displayName ?? ''
      });
      ret = {
        id: msg.msgId.toString(),
        model: {
          userId: msg.from,
          modelType: 'message',
          layoutType: messageLayoutType ?? 'right',
          msg: msg
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    } else if (value.type === 'video') {
      const v = value;
      const msg = _reactNativeChatSdk.ChatMessage.createVideoMessage(convId, v.localPath, convType, {
        duration: v.duration ?? 0,
        fileSize: v.fileSize,
        displayName: v.displayName ?? '',
        thumbnailLocalPath: v.thumbLocalPath,
        width: v.videoWidth,
        height: v.videoHeight
      });
      ret = {
        id: msg.msgId.toString(),
        model: {
          userId: msg.from,
          modelType: 'message',
          layoutType: messageLayoutType ?? 'right',
          msg: msg
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    } else if (value.type === 'file') {
      const v = value;
      const msg = _reactNativeChatSdk.ChatMessage.createFileMessage(convId, v.localPath, convType, {
        fileSize: v.fileSize,
        displayName: v.displayName ?? ''
      });
      ret = {
        id: msg.msgId.toString(),
        model: {
          userId: msg.from,
          modelType: 'message',
          layoutType: messageLayoutType ?? 'right',
          msg: msg
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    } else if (value.type === 'card') {
      var _im$getRequestData, _im$getRequestData2;
      const card = value;
      const msg = _reactNativeChatSdk.ChatMessage.createCustomMessage(convId, _chat.gCustomMessageCardEventType, convType, {
        params: {
          userId: card.userId,
          nickname: ((_im$getRequestData = im.getRequestData(card.userId)) === null || _im$getRequestData === void 0 ? void 0 : _im$getRequestData.name) ?? card.userId,
          avatar: (_im$getRequestData2 = im.getRequestData(card.userId)) === null || _im$getRequestData2 === void 0 ? void 0 : _im$getRequestData2.avatar
        }
      });
      ret = {
        id: msg.msgId.toString(),
        model: {
          userId: msg.from,
          modelType: 'message',
          layoutType: messageLayoutType ?? 'right',
          msg: msg
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    } else if (value.type === 'custom') {
      const custom = value;
      const msg = custom.msg;
      ret = {
        id: msg.msgId.toString(),
        model: {
          userId: msg.from,
          modelType: 'message',
          layoutType: messageLayoutType ?? 'right',
          msg: msg
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    } else if (value.type === 'system') {
      const v = value;
      const msg = v.msg;
      ret = {
        id: msg.msgId.toString(),
        model: {
          userId: msg.from,
          modelType: 'system',
          msg: msg
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    } else if (value.type === 'time') {
      const v = value;
      ret = {
        id: v.timestamp.toString(),
        model: {
          userId: (0, _utils2.seqId)('_$msg').toString(),
          modelType: 'time'
        },
        containerStyle: getStyle()
      };
      onAddDataToUI(ret, 'bottom');
    }
    if (ret) {
      onFinished === null || onFinished === void 0 ? void 0 : onFinished(ret);
      scrollToBottom();
    }
  }, [convId, convType, getStyle, im, messageLayoutType, onAddDataToUI, scrollToBottom]);
  const sendMessageToServer = React.useCallback(msg => {
    im.messageManager.sendMessage(msg);
  }, [im]);
  const init = React.useCallback(async () => {
    console.log('dev:MessageList:', convId, convType);
    if (testMode === 'only-ui') {
      return;
    }
    if (isAutoLoad === true) {
      setNeedScroll(true);
      setUserScrollGesture(false);
      currentVoicePlayingRef.current = undefined;
      startMsgIdRef.current = '';
      hasNoMoreRef.current = false;
      dataRef.current = [];
      im.messageManager.setRecallMessageTimeout(recallTimeout);
      refreshToUI(dataRef.current);
    }
  }, [convId, convType, dataRef, im.messageManager, isAutoLoad, recallTimeout, refreshToUI, setNeedScroll, setUserScrollGesture, testMode]);
  const onContentSizeChange = React.useCallback((_w, _h) => {}, []);
  const requestHistoryMessage = React.useCallback(() => {
    if (hasNoMoreRef.current === true) {
      onNoMoreMessage === null || onNoMoreMessage === void 0 ? void 0 : onNoMoreMessage();
      return;
    }
    im.messageManager.loadHistoryMessage({
      convId,
      convType,
      startMsgId: startMsgIdRef.current,
      loadCount: _const2.gRequestMaxMessageCount,
      onResult: msgs => {
        if (msgs.length < _const2.gRequestMaxMessageCount) {
          hasNoMoreRef.current = true;
        }
        if (msgs.length > 0) {
          const newStartMsgId = msgs[0].msgId.toString();
          if (newStartMsgId === startMsgIdRef.current) {
            return;
          }
          startMsgIdRef.current = msgs[0].msgId.toString();
          onAddMessageListToUI(msgs, 'top', list => {
            list.map(v => {
              if (v.model.modelType === 'message') {
                const msgModel = v.model;
                sendRecvMessageReadAck(msgModel.msg);
              }
            });
          });
        }
      }
    });
  }, [convId, convType, im.messageManager, onAddMessageListToUI, onNoMoreMessage, sendRecvMessageReadAck]);
  React.useImperativeHandle(ref, () => {
    return {
      addSendMessage: value => {
        setNeedScroll(true);
        addSendMessageToUI(value, item => {
          if (item.model.modelType === 'message') {
            const msgModel = item.model;
            sendMessageToServer(msgModel.msg);
          }
        });
      },
      removeMessage: msg => {
        deleteMessage(msg);
      },
      recallMessage: msg => {
        recallMessage(msg);
      },
      updateMessage: (updatedMsg, fromType) => {
        onUpdateMessageToUI(updatedMsg, fromType);
      },
      loadHistoryMessage: (msgs, pos) => {
        if (pos === 'top') {
          if (msgs.length > 0) {
            var _msgs$;
            if (startMsgIdRef.current === ((_msgs$ = msgs[0]) === null || _msgs$ === void 0 ? void 0 : _msgs$.msgId)) {
              return;
            }
            startMsgIdRef.current = msgs[0].msgId.toString();
          }
        }
        onAddMessageListToUI(msgs, pos, list => {
          list.map(v => {
            if (v.model.modelType === 'message') {
              const msgModel = v.model;
              sendRecvMessageReadAck(msgModel.msg);
            }
          });
        });
      },
      onInputHeightChange: _height => {
        // if (height > 0) {
        //   scrollToBottom();
        // }
      },
      editMessageFinished: model => {
        editMessage(model.msg);
      },
      scrollToBottom: () => {
        scrollToBottom();
      }
    };
  }, [addSendMessageToUI, deleteMessage, editMessage, onAddMessageListToUI, onUpdateMessageToUI, recallMessage, scrollToBottom, sendMessageToServer, sendRecvMessageReadAck, setNeedScroll]);
  React.useEffect(() => {
    const uiListener = {
      onDeletedEvent: data => {
        if (data.convId === convId) {
          dataRef.current = [];
          refreshToUI(dataRef.current);
        }
      },
      onRequestRefreshEvent: id => {
        if (id === convId) {
          refreshToUI(dataRef.current);
        }
      },
      onRequestReloadEvent: id => {
        if (id === convId) {
          init();
        }
      },
      type: _chat.UIListenerType.Conversation
    };
    im.addUIListener(uiListener);
    return () => {
      im.removeUIListener(uiListener);
    };
  }, [convId, dataRef, im, init, refreshToUI]);
  React.useEffect(() => {
    const listener = {
      onSendMessageChanged: msg => {
        onUpdateMessageToUI(msg, 'send');
      },
      onRecvMessage: async msg => {
        if (msg.conversationId === convId) {
          if (recvMessageAutoScroll === true) {
            setNeedScroll(true);
          }
          const quoteAttributes = (0, _MessageListItem2.getQuoteAttribute)(msg);
          if (quoteAttributes) {
            const quoteMsg = await im.getMessage({
              messageId: quoteAttributes.msgID
            });
            onAddMessageToUI(msg, quoteMsg);
          } else {
            onAddMessageToUI(msg);
          }
          sendRecvMessageReadAck(msg);
        }
      },
      onRecvMessageStatusChanged: msg => {
        onUpdateMessageToUI(msg, 'recv');
      },
      onRecvMessageContentChanged: (msg, _byUserId) => {
        onUpdateMessageToUI(msg, 'recv');
      },
      onRecvRecallMessage: (orgMsg, tipMsg) => {
        if (orgMsg.conversationId === convId) {
          if (recvMessageAutoScroll === true) {
            setNeedScroll(true);
          }
          onRecvRecallMessage(orgMsg, tipMsg);
        }
      },
      onRecallMessageResult: params => {
        if (params.isOk === true) {
          if (params.orgMsg && params.tipMsg) {
            if (params.orgMsg.conversationId === convId) {
              if (recvMessageAutoScroll === true) {
                setNeedScroll(true);
              }
              onRecvRecallMessage(params.orgMsg, params.tipMsg);
            }
          }
        }
      }
    };
    im.messageManager.addListener(convId, listener);
    return () => {
      im.messageManager.removeListener(convId);
    };
  }, [convId, im, onAddMessageToUI, onRecvRecallMessage, onUpdateMessageToUI, recvMessageAutoScroll, sendRecvMessageReadAck, setNeedScroll]);
  React.useEffect(() => {
    init();
    requestHistoryMessage();
  }, [convId, convType, im.messageManager, init, requestHistoryMessage]);
  return {
    ...flatListProps,
    listType,
    listState,
    onRequestCloseMenu: closeMenu,
    menuRef,
    alertRef,
    onClickedItem: onClickedListItem,
    onLongPressItem: onLongPressListItem,
    inverted,
    maxListHeight,
    setMaxListHeight,
    reachedThreshold,
    onMore: requestHistoryMessage,
    reportMessage: reportMessage,
    showReportMessage: showReportMessageMenu,
    reportData: reportDataRef.current,
    reportRef,
    onClickedItemAvatar: onClickedListItemAvatar,
    onClickedItemQuote: onClickedListItemQuote,
    onClickedItemState: onClickedListItemState,
    ListItemRender: MessageListItemRef.current,
    listItemRenderProps: listItemRenderPropsRef.current,
    scrollEventThrottle,
    onMomentumScrollEnd,
    onScrollEndDrag,
    onScrollBeginDrag,
    onScroll,
    onLayout,
    bounces,
    enableListItemUserInfoUpdateFromMessage,
    onContentSizeChange,
    onRenderItem
  };
}
//# sourceMappingURL=MessageList.hooks.js.map