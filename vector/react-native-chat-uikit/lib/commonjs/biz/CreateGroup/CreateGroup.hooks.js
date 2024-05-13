"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateGroup = useCreateGroup;
var React = _interopRequireWildcard(require("react"));
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _chat = require("../../chat");
var _utils = require("../../chat/utils");
var _config = require("../../config");
var _error = require("../../error");
var _i18n = require("../../i18n");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useCreateGroup(props) {
  const {
    onCreateGroupResult: propsOnCreateGroupResult,
    onGetGroupName
  } = props;
  const im = (0, _chat.useChatContext)();
  const {
    group: groupConfig
  } = (0, _config.useConfigContext)();
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  React.useEffect(() => {
    if (onGetGroupName) {
      im.setGroupNameOnCreateGroup(onGetGroupName);
    }
  }, [im, onGetGroupName]);
  const createMessageTip = React.useCallback((_data, group) => {
    const groupId = group.groupId;
    // const groupName = group.groupName;
    // const groupAvatar = group.groupAvatar;
    const tipMsg = _reactNativeChatSdk.ChatMessage.createCustomMessage(groupId, _chat.gCustomMessageCreateGroupEventType, _reactNativeChatSdk.ChatMessageChatType.GroupChat, {
      params: {
        create_group: JSON.stringify({
          text: '_uikit_msg_tip_create_group_success_with_params',
          self: im.userId
        })
      }
    });
    const s = im.user(im.userId);
    (0, _utils.setUserInfoToMessage)({
      msg: tipMsg,
      user: s
    });
    return tipMsg;
  }, [im]);
  const generateGroupName = React.useCallback(data => {
    const callback = im.getCreateGroupCustomNameCallback();
    if (callback) {
      return callback({
        selected: data
      });
    } else {
      const s = data.map(item => item.userName ?? item.userId).filter((_v, i) => i < 3).join(',');
      return tr('_uikit_group_create_name', `${s}`);
    }
  }, [im, tr]);
  const onCreateGroupResultValue = React.useCallback(data => {
    if (data && data.length > 0) {
      const newGroupName = generateGroupName(data);
      if (groupConfig.createGroupMemberLimit && data.length > groupConfig.createGroupMemberLimit) {
        propsOnCreateGroupResult === null || propsOnCreateGroupResult === void 0 ? void 0 : propsOnCreateGroupResult({
          isOk: false,
          error: new _error.UIKitError({
            code: _error.ErrorCode.chat_uikit,
            desc: 'The number of selected members exceeds the limit. '
          })
        });
        return;
      }
      im.createGroup({
        groupName: newGroupName,
        inviteMembers: data.map(item => item.userId),
        onResult: result => {
          if (result.isOk === true && result.value) {
            const msg = createMessageTip(data, result.value);
            im.insertMessage({
              message: msg,
              onResult: () => {
                propsOnCreateGroupResult === null || propsOnCreateGroupResult === void 0 ? void 0 : propsOnCreateGroupResult(result);
              }
            });
          }
        }
      });
    }
  }, [createMessageTip, generateGroupName, groupConfig.createGroupMemberLimit, im, propsOnCreateGroupResult]);
  return {
    onCreateGroupResultValue
  };
}
//# sourceMappingURL=CreateGroup.hooks.js.map