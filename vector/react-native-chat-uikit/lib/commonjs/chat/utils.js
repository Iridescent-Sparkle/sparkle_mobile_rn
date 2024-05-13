"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageSnapshot = getMessageSnapshot;
exports.getNewRequest = getNewRequest;
exports.setUserInfoToMessage = setUserInfoToMessage;
exports.userInfoFromMessage = userInfoFromMessage;
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _utils = require("../utils");
var _const = require("./const");
/**
 * Get user info from message.
 */
function userInfoFromMessage(msg) {
  if (msg === undefined || msg === null) {
    return undefined;
  }
  const jsonUserInfo = msg.attributes[_const.gMessageAttributeUserInfo];
  if (jsonUserInfo) {
    const userInfo = jsonUserInfo;
    const ret = {
      userId: msg.from,
      userName: userInfo.nickname,
      avatarURL: userInfo.avatarURL,
      from: {
        type: msg.chatType === _reactNativeChatSdk.ChatMessageChatType.GroupChat ? 'group' : 'user',
        groupId: msg.chatType === _reactNativeChatSdk.ChatMessageChatType.GroupChat ? msg.conversationId : undefined
      }
    };
    return ret;
  }
  return undefined;
}

/**
 * Set user info to message.
 */
function setUserInfoToMessage(params) {
  const {
    msg,
    user
  } = params;
  if (user === undefined || user === null || user.userName === undefined && user.avatarURL === undefined) {
    return;
  }
  msg.attributes = {
    ...msg.attributes,
    [_const.gMessageAttributeUserInfo]: {
      nickname: user.userName,
      avatarURL: user.avatarURL
    }
  };
}

/**
 * Get message snapshot.
 */
function getMessageSnapshot(msg) {
  if (msg === undefined) {
    return '';
  }
  switch (msg.body.type) {
    case _reactNativeChatSdk.ChatMessageType.TXT:
      {
        const content = _utils.emoji.toCodePointText(msg.body.content);
        if (msg.chatType === _reactNativeChatSdk.ChatMessageChatType.GroupChat) {
          const user = userInfoFromMessage(msg);
          return `${(user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? msg.from}: ${content}`;
        } else {
          return content;
        }
      }
    case _reactNativeChatSdk.ChatMessageType.IMAGE:
      return '[image]';
    case _reactNativeChatSdk.ChatMessageType.VIDEO:
      return '[video]';
    case _reactNativeChatSdk.ChatMessageType.FILE:
      return '[file]';
    case _reactNativeChatSdk.ChatMessageType.LOCATION:
      return '[location]';
    case _reactNativeChatSdk.ChatMessageType.VOICE:
      return '[voice]';
    case _reactNativeChatSdk.ChatMessageType.CUSTOM:
      return '[custom]';
    default:
      return '[unknown]';
  }
}

/**
 * Get new request from message.
 */
function getNewRequest(msg) {
  if (msg === undefined) {
    return undefined;
  }
  if (msg.body.type !== _reactNativeChatSdk.ChatMessageType.CUSTOM) {
    return undefined;
  } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.CUSTOM) {
    if (msg.body.event !== _const.gNewRequestConversationMsgEventType) {
      return undefined;
    }
  }
  return {
    requestId: msg.attributes[_const.gNewRequestConversationUserId],
    avatar: msg.attributes[_const.gNewRequestConversationUserAvatar],
    name: msg.attributes[_const.gNewRequestConversationUserName],
    tip: msg.attributes[_const.gNewRequestConversationTip],
    state: msg.attributes[_const.gNewRequestConversationState],
    msg: msg
  };
}
//# sourceMappingURL=utils.js.map