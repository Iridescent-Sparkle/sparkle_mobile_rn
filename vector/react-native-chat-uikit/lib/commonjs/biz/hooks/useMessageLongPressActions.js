"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMessageLongPressActions = useMessageLongPressActions;
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _chat = require("../../chat");
var _i18n = require("../../i18n");
var _services = require("../../services");
var _useCloseMenu = require("./useCloseMenu");
function useMessageLongPressActions(props) {
  const {
    menuRef,
    onQuoteMessageForInput,
    onEditMessageForInput,
    showReportMessage,
    onDeleteMessage,
    onRecallMessage,
    onCopyFinished,
    onTranslateMessage,
    onInit
  } = props;
  const {
    closeMenu
  } = (0, _useCloseMenu.useCloseMenu)({
    menuRef
  });
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const im = (0, _chat.useChatContext)();
  const isCardMessage = msg => {
    if (msg.body.type === _reactNativeChatSdk.ChatMessageType.CUSTOM) {
      const body = msg.body;
      if (body.event === _chat.gCustomMessageCardEventType) {
        return true;
      }
    }
    return false;
  };
  const onShowMenu = (_id, model) => {
    var _menuRef$current, _menuRef$current$star;
    if (model.modelType !== 'message') {
      return;
    }
    let initItems = [];
    const msgModel = model;
    if (model.modelType === 'message') {
      if (msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.TXT) {
        initItems.push({
          name: tr('_uikit_chat_list_long_press_menu_copy'),
          isHigh: false,
          icon: 'doc_on_doc',
          onClicked: () => {
            closeMenu(() => {
              const body = msgModel.msg.body;
              _services.Services.cbs.setString(body.content);
              onCopyFinished === null || onCopyFinished === void 0 ? void 0 : onCopyFinished(body.content);
            });
          }
        });
      }
      if (msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.TXT || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.VOICE || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.IMAGE || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.VIDEO || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.FILE || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.CUSTOM && isCardMessage(msgModel.msg)) {
        if (msgModel.msg.status === _reactNativeChatSdk.ChatMessageStatus.SUCCESS) {
          initItems.push({
            name: tr('_uikit_chat_list_long_press_menu_replay'),
            isHigh: false,
            icon: 'arrowshape_left',
            onClicked: () => {
              closeMenu(() => {
                onQuoteMessageForInput === null || onQuoteMessageForInput === void 0 ? void 0 : onQuoteMessageForInput(model);
              });
            }
          });
        }
      }
      if (msgModel.msg.status === _reactNativeChatSdk.ChatMessageStatus.SUCCESS) {
        if (msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.TXT) {
          const textBody = msgModel.msg.body;
          if (textBody.modifyCount === undefined || textBody.modifyCount <= 5) {
            initItems.push({
              name: tr('_uikit_chat_list_long_press_menu_translate'),
              isHigh: false,
              icon: 'a_in_arrows_round',
              onClicked: () => {
                closeMenu(() => {
                  onTranslateMessage === null || onTranslateMessage === void 0 ? void 0 : onTranslateMessage(model);
                });
              }
            });
          }
        }
      }
      if (msgModel.msg.status === _reactNativeChatSdk.ChatMessageStatus.SUCCESS) {
        if (msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.TXT && msgModel.msg.from === im.userId) {
          const textBody = msgModel.msg.body;
          if (textBody.modifyCount === undefined || textBody.modifyCount <= 5) {
            initItems.push({
              name: tr('_uikit_chat_list_long_press_menu_edit'),
              isHigh: false,
              icon: 'slash_in_rectangle',
              onClicked: () => {
                closeMenu(() => {
                  onEditMessageForInput === null || onEditMessageForInput === void 0 ? void 0 : onEditMessageForInput(model);
                });
              }
            });
          }
        }
      }
      if (msgModel.msg.status === _reactNativeChatSdk.ChatMessageStatus.SUCCESS) {
        initItems.push({
          name: tr('_uikit_chat_list_long_press_menu_report'),
          isHigh: false,
          icon: 'envelope',
          onClicked: () => {
            closeMenu(() => {
              showReportMessage === null || showReportMessage === void 0 ? void 0 : showReportMessage(msgModel);
            });
          }
        });
      }
      initItems.push({
        name: tr('_uikit_chat_list_long_press_menu_delete'),
        isHigh: false,
        icon: 'trash',
        onClicked: () => {
          closeMenu(() => {
            onDeleteMessage === null || onDeleteMessage === void 0 ? void 0 : onDeleteMessage(msgModel.msg);
          });
        }
      });
      if (msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.TXT || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.VOICE || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.IMAGE || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.VIDEO || msgModel.msg.body.type === _reactNativeChatSdk.ChatMessageType.FILE) {
        if (msgModel.msg.status === _reactNativeChatSdk.ChatMessageStatus.SUCCESS && msgModel.msg.from === im.userId) {
          initItems.push({
            name: tr('_uikit_chat_list_long_press_menu_recall'),
            isHigh: false,
            icon: 'arrow_Uturn_anti_clockwise',
            onClicked: () => {
              closeMenu(() => {
                const msgModel = model;
                onRecallMessage === null || onRecallMessage === void 0 ? void 0 : onRecallMessage(msgModel.msg, 'send');
              });
            }
          });
        }
      }
    }
    if (initItems.length === 0) {
      return;
    }
    initItems = onInit ? onInit(initItems) : initItems;
    (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startShowWithProps) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current, {
      initItems: initItems,
      onRequestModalClose: closeMenu,
      layoutType: 'left',
      hasCancel: false
    });
  };
  return {
    onShowMessageLongPressActions: onShowMenu
  };
}
//# sourceMappingURL=useMessageLongPressActions.js.map