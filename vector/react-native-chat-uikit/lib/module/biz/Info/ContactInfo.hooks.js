import * as React from 'react';
import { UIListenerType, useChatContext } from '../../chat';
import { useLifecycle } from '../../hook';
import { useI18nContext } from '../../i18n';
import { Services } from '../../services';
import { useContactInfoActions } from '../hooks/useContactInfoActions';
export function useContactInfo(props) {
  const {
    userId,
    userName: propsUserName,
    userAvatar: propsUserAvatar,
    doNotDisturb: propsDoNotDisturb,
    onDoNotDisturb: propsOnDoNotDisturb,
    onClearChat: propsOnClearChat,
    isContact: propsIsContact,
    onInitMenu,
    onSendMessage: propsOnSendMessage,
    onAudioCall: propsOnAudioCall,
    onVideoCall: propsOnVideoCall,
    onClickedNavigationBarButton,
    onAddContact: propsOnAddContact,
    onCopyId: propsOnCopyId
  } = props;
  const [doNotDisturb, setDoNotDisturb] = React.useState(propsDoNotDisturb);
  const [userName, setUserName] = React.useState(propsUserName);
  const [userAvatar, setUserAvatar] = React.useState(propsUserAvatar);
  const [isContact, setIsContact] = React.useState(propsIsContact);
  const [isSelf, setIsSelf] = React.useState(false);
  const menuRef = React.useRef({});
  const alertRef = React.useRef({});
  const toastRef = React.useRef({});
  const {
    onShowContactInfoActions
  } = useContactInfoActions({
    menuRef,
    alertRef,
    onInit: onInitMenu,
    onRemoveContact: () => {
      im.removeContact({
        userId
      });
      im.removeConversation({
        convId: userId
      });
    }
  });
  const im = useChatContext();
  const {
    tr
  } = useI18nContext();
  const addContact = React.useCallback(userId => {
    im.addNewContact({
      userId: userId,
      reason: 'add contact'
    });
  }, [im]);
  useLifecycle(React.useCallback(state => {
    if (state === 'load') {
      setIsContact(im.isContact({
        userId
      }));
      setIsSelf(im.userId === userId);
      if (im.userId !== userId) {
        im.getConversation({
          convId: userId,
          convType: 0,
          createIfNotExist: true
        }).then(value => {
          console.log('test:zuoyu:getConversation', value);
          setDoNotDisturb((value === null || value === void 0 ? void 0 : value.doNotDisturb) ?? false);
        }).catch(e => {
          console.log('test:zuoyu:getConversation:catch:', e);
          im.sendError({
            error: e
          });
        });
        im.getContact({
          userId: userId,
          onResult: value => {
            if (value) {
              var _value$value, _value$value2;
              setUserAvatar((_value$value = value.value) === null || _value$value === void 0 ? void 0 : _value$value.userAvatar);
              setUserName((_value$value2 = value.value) === null || _value$value2 === void 0 ? void 0 : _value$value2.userName);
            }
          }
        });
      } else {
        const user = im.user(im.userId);
        setUserAvatar(user === null || user === void 0 ? void 0 : user.avatarURL);
        setUserName(user === null || user === void 0 ? void 0 : user.userName);
      }
    }
  }, [im, userId]));
  const onDoNotDisturb = value => {
    if (propsOnDoNotDisturb) {
      propsOnDoNotDisturb(value);
      return;
    }
    im.setConversationSilentMode({
      convId: userId,
      convType: 0,
      doNotDisturb: value
    });
  };
  const onClearChat = () => {
    if (propsOnClearChat) {
      propsOnClearChat();
      return;
    }
    alertRef.current.alertWithInit({
      title: tr('_uikit_info_alert_clear_chat_title'),
      buttons: [{
        text: tr('cancel'),
        onPress: () => {
          alertRef.current.close();
        }
      }, {
        text: tr('confirm'),
        isPreferred: true,
        onPress: () => {
          alertRef.current.close(() => {
            im.removeConversationAllMessages({
              convId: userId,
              convType: 0
            });
          });
        }
      }]
    });
  };
  const onRequestCloseMenu = () => {
    var _menuRef$current, _menuRef$current$star;
    (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startHide) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current);
  };
  const onMoreMenu = () => {
    if (onClickedNavigationBarButton) {
      onClickedNavigationBarButton();
      return;
    }
    onShowContactInfoActions(userId, userName);
  };
  const onSendMessage = () => {
    if (propsOnSendMessage) {
      propsOnSendMessage(userId);
    }
  };
  const onAudioCall = () => {
    if (propsOnAudioCall) {
      propsOnAudioCall(userId);
    }
  };
  const onVideoCall = () => {
    if (propsOnVideoCall) {
      propsOnVideoCall(userId);
    }
  };
  const onAddContact = () => {
    if (propsOnAddContact) {
      propsOnAddContact(userId);
      return;
    }
    addContact(userId);
  };
  const onCopyId = () => {
    if (propsOnCopyId) {
      propsOnCopyId(userId);
      return;
    }
    Services.cbs.setString(userId);
    toastRef.current.show({
      message: tr('copy_success')
    });
  };
  React.useEffect(() => {
    const listener = {
      onUpdatedEvent: data => {
        if (data.convId === userId) {
          setDoNotDisturb(data.doNotDisturb ?? false);
        }
      },
      type: UIListenerType.Conversation
    };
    im.addUIListener(listener);
    return () => {
      im.removeUIListener(listener);
    };
  }, [im, userId]);
  React.useEffect(() => {
    const listener = {
      onAddedEvent: data => {
        if (data.userId === userId) {
          setIsContact(true);
        }
      },
      onDeletedEvent: data => {
        if (data.userId === userId) {
          setIsContact(false);
        }
      },
      type: UIListenerType.Contact
    };
    im.addUIListener(listener);
    return () => {
      im.removeUIListener(listener);
    };
  }, [im, userId]);
  React.useEffect(() => {
    const listener = {
      onContactAdded: async _userId => {
        if (userId === _userId) {
          setIsContact(true);
        }
      },
      onContactDeleted: async _userId => {
        if (userId === _userId) {
          setIsContact(false);
        }
      }
    };
    im.addListener(listener);
    return () => {
      im.removeListener(listener);
    };
  }, [im, userId]);
  return {
    ...props,
    doNotDisturb,
    onDoNotDisturb,
    onClearChat,
    userName,
    userAvatar,
    userId,
    isContact,
    menuRef,
    onRequestCloseMenu,
    onMore: onMoreMenu,
    alertRef,
    toastRef,
    tr,
    isSelf,
    onSendMessage,
    onAudioCall,
    onVideoCall,
    onAddContact,
    onCopyId
  };
}
//# sourceMappingURL=ContactInfo.hooks.js.map