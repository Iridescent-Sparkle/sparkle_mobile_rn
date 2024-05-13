import * as React from 'react';
import { ChatConversationType } from 'react-native-chat-sdk';
import { UIListenerType, useChatContext } from '../../chat';
import { usePermissions } from '../../hook';
import { useCreateConversationDirectory } from '../hooks/useCreateConversationDirectory';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
export function useConversationDetail(props) {
  const {
    convId,
    convType,
    testMode,
    input,
    list,
    onClickedAvatar: propsOnClickedAvatar
  } = props;
  const permissionsRef = React.useRef(false);
  const messageInputRef = React.useRef({});
  const messageListRef = React.useRef({});
  const _messageInputRef = (input === null || input === void 0 ? void 0 : input.ref) ?? messageInputRef;
  const _MessageInput = (input === null || input === void 0 ? void 0 : input.render) ?? MessageInput;
  const messageInputProps = input !== null && input !== void 0 && input.props ? {
    ...input.props,
    convId,
    convType,
    testMode
  } : {
    convId,
    convType,
    testMode
  };
  const _messageListRef = (list === null || list === void 0 ? void 0 : list.ref) ?? messageListRef;
  const _MessageList = (list === null || list === void 0 ? void 0 : list.render) ?? MessageList;
  const messageListProps = list !== null && list !== void 0 && list.props ? {
    ...list.props,
    convId,
    convType,
    testMode
  } : {
    convId,
    convType,
    testMode
  };
  const [convName, setConvName] = React.useState();
  const [convAvatar, setConvAvatar] = React.useState();
  const ownerIdRef = React.useRef();
  const [doNotDisturb, setDoNotDisturb] = React.useState(false);
  const {
    getPermission
  } = usePermissions();
  const {
    createDirectoryIfNotExisted
  } = useCreateConversationDirectory();
  const im = useChatContext();
  im.messageManager.setCurrentConv({
    convId,
    convType
  });
  const setConversation = React.useCallback(async () => {
    const conv = await im.getConversation({
      convId,
      convType,
      createIfNotExist: true,
      fromNative: true
    });
    console.log('dev:ConversationDetail:', conv);
    if (conv) {
      setDoNotDisturb(conv.doNotDisturb ?? false);
      if (conv.convType === ChatConversationType.PeerChat) {
        // todo: get user info
        // im.getUserInfo({
        //   userId: conv.convId,
        //   onResult: (result) => {
        //     if (result.isOk === true && result.value) {
        //       conv.convName =
        //         result.value?.userName && result.value?.userName.length > 0
        //           ? result.value?.userName
        //           : result.value?.userId;
        //       setConvName(conv.convName);
        //       if (result.value?.avatarURL) {
        //         conv.convAvatar = result.value.avatarURL;
        //         setConvAvatar(result.value.avatarURL);
        //       }
        //     }
        //   },
        // });
        setConvName(conv.convName);
        setConvAvatar(conv.convAvatar);
      } else if (conv.convType === ChatConversationType.GroupChat) {
        im.getGroupInfo({
          groupId: conv.convId,
          onResult: result => {
            if (result.isOk === true && result.value) {
              var _result$value, _result$value2;
              conv.convName = result.value.groupName && ((_result$value = result.value) === null || _result$value === void 0 ? void 0 : _result$value.groupName.length) > 0 ? (_result$value2 = result.value) === null || _result$value2 === void 0 ? void 0 : _result$value2.groupName : result.value.groupId;
              ownerIdRef.current = result.value.owner;
              setConvName(conv.convName);
              console.log('dev:ConversationDetail:', result.value);
              if (result.value.groupAvatar) {
                conv.convAvatar = result.value.groupAvatar;
                setConvAvatar(result.value.groupAvatar);
              } else {
                setConvAvatar(conv.convAvatar);
              }
            }
          }
        });
      }
      im.setConversationRead({
        convId,
        convType
      });
    }
  }, [convId, convType, im]);
  const onClickedSend = React.useCallback(value => {
    var _messageListRef$curre;
    (_messageListRef$curre = _messageListRef.current) === null || _messageListRef$curre === void 0 ? void 0 : _messageListRef$curre.addSendMessage(value);
  }, [_messageListRef]);
  const onQuoteMessageForInput = React.useCallback(model => {
    var _messageInputRef$curr, _messageInputRef$curr2;
    (_messageInputRef$curr = _messageInputRef.current) === null || _messageInputRef$curr === void 0 ? void 0 : (_messageInputRef$curr2 = _messageInputRef$curr.quoteMessage) === null || _messageInputRef$curr2 === void 0 ? void 0 : _messageInputRef$curr2.call(_messageInputRef$curr, model);
  }, [_messageInputRef]);
  const onEditMessageForInput = React.useCallback(model => {
    var _messageInputRef$curr3, _messageInputRef$curr4;
    (_messageInputRef$curr3 = _messageInputRef.current) === null || _messageInputRef$curr3 === void 0 ? void 0 : (_messageInputRef$curr4 = _messageInputRef$curr3.editMessage) === null || _messageInputRef$curr4 === void 0 ? void 0 : _messageInputRef$curr4.call(_messageInputRef$curr3, model);
  }, [_messageInputRef]);
  const onEditMessageFinished = React.useCallback(model => {
    var _messageListRef$curre2, _messageListRef$curre3;
    (_messageListRef$curre2 = _messageListRef.current) === null || _messageListRef$curre2 === void 0 ? void 0 : (_messageListRef$curre3 = _messageListRef$curre2.editMessageFinished) === null || _messageListRef$curre3 === void 0 ? void 0 : _messageListRef$curre3.call(_messageListRef$curre2, model);
  }, [_messageListRef]);
  const onClickedAvatar = React.useCallback(() => {
    propsOnClickedAvatar === null || propsOnClickedAvatar === void 0 ? void 0 : propsOnClickedAvatar({
      convId: convId,
      convType: convType,
      ownerId: ownerIdRef.current
    });
  }, [convId, convType, propsOnClickedAvatar]);
  React.useEffect(() => {
    getPermission({
      onResult: isSuccess => {
        permissionsRef.current = isSuccess;
      }
    });
  }, [getPermission]);
  React.useEffect(() => {
    im.messageManager.setCurrentConv({
      convId,
      convType
    });
    setConversation();
    return () => {
      im.messageManager.setCurrentConv(undefined);
    };
  }, [convId, convName, convType, im, setConversation, testMode]);
  React.useEffect(() => {
    const listener = {
      onUpdatedEvent: data => {
        if (data.convId === convId) {
          setDoNotDisturb(data.doNotDisturb ?? false);
        }
      },
      onRequestRefreshEvent: id => {
        if (id === convId) {
          setConversation();
        }
      },
      onRequestReloadEvent: id => {
        if (id === convId) {
          setConversation();
        }
      },
      type: UIListenerType.Conversation
    };
    im.addUIListener(listener);
    return () => {
      im.removeUIListener(listener);
    };
  }, [convId, im, setConversation]);
  React.useEffect(() => {
    const uiListener = {
      onUpdatedEvent: data => {
        if (data.groupId === convId) {
          if (data.groupName) {
            setConvName(data.groupName);
          }
        }
      },
      onAddedEvent: data => {
        if (data.groupId === convId) {
          if (data.groupName) {
            setConvName(data.groupName);
          }
        }
      },
      type: UIListenerType.Group
    };
    im.addUIListener(uiListener);
    return () => {
      im.removeUIListener(uiListener);
    };
  }, [convId, im]);
  React.useEffect(() => {
    createDirectoryIfNotExisted(convId);
  }, [convId, createDirectoryIfNotExisted]);
  return {
    onClickedSend,
    _messageInputRef,
    _MessageInput,
    messageInputProps,
    _messageListRef,
    _MessageList,
    messageListProps,
    onQuoteMessageForInput,
    onEditMessageForInput,
    onEditMessageFinished,
    convName,
    convAvatar,
    onClickedAvatar,
    doNotDisturb
  };
}
//# sourceMappingURL=ConversationDetail.hooks.js.map