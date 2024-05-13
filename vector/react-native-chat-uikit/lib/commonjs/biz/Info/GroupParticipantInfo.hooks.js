"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupParticipantInfo = useGroupParticipantInfo;
var React = _interopRequireWildcard(require("react"));
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _chat = require("../../chat");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _services = require("../../services");
var _hooks = require("../hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useGroupParticipantInfo(props) {
  const {
    groupId,
    userId,
    userName: propsUserName,
    userAvatar: propsUserAvatar,
    userRemark: propsUserRemark,
    doNotDisturb: propsDoNotDisturb,
    onDoNotDisturb: propsOnDoNotDisturb,
    onClearChat: propsOnClearChat,
    onCopyId: propsOnCopyId,
    onGroupParticipantRemark: propsOnGroupParticipantRemark,
    isContact: propsIsContact,
    onAddContact: propsOnAddContact,
    onSendMessage: propsOnSendMessage,
    onAudioCall: propsOnAudioCall,
    onVideoCall: propsOnVideoCall
  } = props;
  const menuRef = React.useRef({});
  const alertRef = React.useRef({});
  const toastRef = React.useRef({});
  const [doNotDisturb, setDoNotDisturb] = React.useState(propsDoNotDisturb);
  const [userName, _setUserName] = React.useState(propsUserName);
  const [userAvatar, _setUserAvatar] = React.useState(propsUserAvatar);
  const [userRemark, _setUserRemark] = React.useState(propsUserRemark);
  const [isContact, setIsContact] = React.useState(propsIsContact);
  const [isSelf, setIsSelf] = React.useState(false);
  const im = (0, _chat.useChatContext)();
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    closeMenu
  } = (0, _hooks.useCloseMenu)({
    menuRef
  });
  const addContact = React.useCallback(userId => {
    im.addNewContact({
      userId: userId,
      reason: 'add contact'
    });
  }, [im]);
  (0, _hook.useLifecycle)(React.useCallback(state => {
    if (state === 'load') {
      setIsContact(im.isContact({
        userId
      }));
      setIsSelf(im.userId === userId);
      im.getConversation({
        convId: userId,
        convType: _reactNativeChatSdk.ChatConversationType.PeerChat
      }).then(result => {
        setDoNotDisturb((result === null || result === void 0 ? void 0 : result.doNotDisturb) ?? false);
      }).catch();
    }
  }, [im, userId]));
  const onDoNotDisturb = value => {
    if (propsOnDoNotDisturb) {
      propsOnDoNotDisturb(value);
      return;
    }
    im.setConversationSilentMode({
      convId: userId,
      convType: _reactNativeChatSdk.ChatConversationType.PeerChat,
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
  const onCopyId = () => {
    if (propsOnCopyId) {
      propsOnCopyId(userId);
      return;
    }
    _services.Services.cbs.setString(userId);
    toastRef.current.show({
      message: tr('copy_success')
    });
  };
  const onRemark = () => {
    if (propsOnGroupParticipantRemark) {
      propsOnGroupParticipantRemark(groupId, userId);
    }
  };
  const onAddContact = () => {
    if (propsOnAddContact) {
      propsOnAddContact(userId);
      return;
    }
    addContact(userId);
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
  React.useEffect(() => {
    const listener = {
      onUpdatedEvent: data => {
        if (data.convId === groupId) {
          setDoNotDisturb(data.doNotDisturb ?? false);
        }
      },
      type: _chat.UIListenerType.Conversation
    };
    im.addUIListener(listener);
    return () => {
      im.removeUIListener(listener);
    };
  }, [groupId, im]);
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
    alertRef,
    userName,
    userAvatar,
    userRemark,
    onCopyId,
    toastRef,
    onRemark,
    isContact,
    tr,
    onAddContact,
    onSendMessage,
    onVideoCall,
    onAudioCall,
    isSelf,
    onRequestCloseMenu: closeMenu,
    menuRef
  };
}
//# sourceMappingURL=GroupParticipantInfo.hooks.js.map