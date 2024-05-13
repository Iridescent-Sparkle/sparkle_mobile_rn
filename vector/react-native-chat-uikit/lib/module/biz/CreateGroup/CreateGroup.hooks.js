import * as React from 'react';
import { ChatMessage, ChatMessageChatType } from 'react-native-chat-sdk';
import { gCustomMessageCreateGroupEventType, useChatContext } from '../../chat';
import { setUserInfoToMessage } from '../../chat/utils';
import { useConfigContext } from '../../config';
import { ErrorCode, UIKitError } from '../../error';
import { useI18nContext } from '../../i18n';
export function useCreateGroup(props) {
  const {
    onCreateGroupResult: propsOnCreateGroupResult,
    onGetGroupName
  } = props;
  const im = useChatContext();
  const {
    group: groupConfig
  } = useConfigContext();
  const {
    tr
  } = useI18nContext();
  React.useEffect(() => {
    if (onGetGroupName) {
      im.setGroupNameOnCreateGroup(onGetGroupName);
    }
  }, [im, onGetGroupName]);
  const createMessageTip = React.useCallback((_data, group) => {
    const groupId = group.groupId;
    // const groupName = group.groupName;
    // const groupAvatar = group.groupAvatar;
    const tipMsg = ChatMessage.createCustomMessage(groupId, gCustomMessageCreateGroupEventType, ChatMessageChatType.GroupChat, {
      params: {
        create_group: JSON.stringify({
          text: '_uikit_msg_tip_create_group_success_with_params',
          self: im.userId
        })
      }
    });
    const s = im.user(im.userId);
    setUserInfoToMessage({
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
          error: new UIKitError({
            code: ErrorCode.chat_uikit,
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