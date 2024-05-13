import { ChatMessageChatType, ChatMessageType } from 'react-native-chat-sdk';
import { emoji } from '../utils';
import { gMessageAttributeUserInfo, gNewRequestConversationMsgEventType, gNewRequestConversationState, gNewRequestConversationTip, gNewRequestConversationUserAvatar, gNewRequestConversationUserId, gNewRequestConversationUserName } from './const';
/**
 * Get user info from message.
 */
export function userInfoFromMessage(msg) {
  if (msg === undefined || msg === null) {
    return undefined;
  }
  const jsonUserInfo = msg.attributes[gMessageAttributeUserInfo];
  if (jsonUserInfo) {
    const userInfo = jsonUserInfo;
    const ret = {
      userId: msg.from,
      userName: userInfo.nickname,
      avatarURL: userInfo.avatarURL,
      from: {
        type: msg.chatType === ChatMessageChatType.GroupChat ? 'group' : 'user',
        groupId: msg.chatType === ChatMessageChatType.GroupChat ? msg.conversationId : undefined
      }
    };
    return ret;
  }
  return undefined;
}

/**
 * Set user info to message.
 */
export function setUserInfoToMessage(params) {
  const {
    msg,
    user
  } = params;
  if (user === undefined || user === null || user.userName === undefined && user.avatarURL === undefined) {
    return;
  }
  msg.attributes = {
    ...msg.attributes,
    [gMessageAttributeUserInfo]: {
      nickname: user.userName,
      avatarURL: user.avatarURL
    }
  };
}

/**
 * Get message snapshot.
 */
export function getMessageSnapshot(msg) {
  if (msg === undefined) {
    return '';
  }
  switch (msg.body.type) {
    case ChatMessageType.TXT:
      {
        const content = emoji.toCodePointText(msg.body.content);
        if (msg.chatType === ChatMessageChatType.GroupChat) {
          const user = userInfoFromMessage(msg);
          return `${(user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? msg.from}: ${content}`;
        } else {
          return content;
        }
      }
    case ChatMessageType.IMAGE:
      return '[image]';
    case ChatMessageType.VIDEO:
      return '[video]';
    case ChatMessageType.FILE:
      return '[file]';
    case ChatMessageType.LOCATION:
      return '[location]';
    case ChatMessageType.VOICE:
      return '[voice]';
    case ChatMessageType.CUSTOM:
      return '[custom]';
    default:
      return '[unknown]';
  }
}

/**
 * Get new request from message.
 */
export function getNewRequest(msg) {
  if (msg === undefined) {
    return undefined;
  }
  if (msg.body.type !== ChatMessageType.CUSTOM) {
    return undefined;
  } else if (msg.body.type === ChatMessageType.CUSTOM) {
    if (msg.body.event !== gNewRequestConversationMsgEventType) {
      return undefined;
    }
  }
  return {
    requestId: msg.attributes[gNewRequestConversationUserId],
    avatar: msg.attributes[gNewRequestConversationUserAvatar],
    name: msg.attributes[gNewRequestConversationUserName],
    tip: msg.attributes[gNewRequestConversationTip],
    state: msg.attributes[gNewRequestConversationState],
    msg: msg
  };
}
//# sourceMappingURL=utils.js.map