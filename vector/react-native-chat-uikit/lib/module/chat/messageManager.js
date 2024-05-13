import { ChatDownloadStatus, ChatMessage, ChatMessageStatus, ChatMessageType, ChatSearchDirection } from 'react-native-chat-sdk';
import { ErrorCode, UIKitError } from '../error';
import { asyncTask, getCurTs } from '../utils';
import { gCustomMessageRecallEventType, gMessageAttributeFileProgress } from './const';
let gListener;

/**
 * Message Cache Manager Implementation.
 */
export class MessageCacheManagerImpl {
  constructor(client) {
    console.log('dev:MessageCacheManager:constructor');
    this._client = client;
    this._userListener = new Map();
    this._sendList = new Map();
    this._downloadList = new Map();
    this._recallTimeout = 120000;
  }
  init() {
    this.unInit();
    console.log('dev:MessageCacheManager:init');
    gListener = {
      onMessagesReceived: this.bindOnMessagesReceived.bind(this),
      onMessagesRead: this.bindOnMessagesRead.bind(this),
      onGroupMessageRead: this.bindOnGroupMessageRead.bind(this),
      onMessagesDelivered: this.bindOnMessagesDelivered.bind(this),
      onMessagesRecalled: this.bindOnMessagesRecalled.bind(this),
      onMessageContentChanged: this.bindOnMessageContentChanged.bind(this)
    };
    this._client.addListener(gListener);
  }
  unInit() {
    this.reset();
    console.log('dev:MessageCacheManager:unInit');
    if (gListener) {
      this._client.removeListener(gListener);
      gListener = undefined;
    }
  }
  reset() {
    console.log('dev:MessageCacheManager:reset');
    this._userListener.clear();
    this._sendList.clear();
    this._downloadList.clear();
  }
  addListener(key, listener) {
    console.log('dev:MessageCacheManager:addListener', key);
    this._userListener.set(key, listener);
  }
  removeListener(key) {
    console.log('dev:MessageCacheManager:removeListener');
    this._userListener.delete(key);
  }
  emitSendMessageChanged(msg) {
    this._userListener.forEach(v => {
      var _v$onSendMessageChang;
      (_v$onSendMessageChang = v.onSendMessageChanged) === null || _v$onSendMessageChang === void 0 ? void 0 : _v$onSendMessageChang.call(v, msg);
    });
  }
  emitSendMessageProgressChanged(msg) {
    this._userListener.forEach(v => {
      var _v$onSendMessageProgr;
      (_v$onSendMessageProgr = v.onSendMessageProgressChanged) === null || _v$onSendMessageProgr === void 0 ? void 0 : _v$onSendMessageProgr.call(v, msg);
    });
  }
  emitSendMessageBefore(msg) {
    this._userListener.forEach(v => {
      var _v$onSendMessageBefor;
      (_v$onSendMessageBefor = v.onSendMessageBefore) === null || _v$onSendMessageBefor === void 0 ? void 0 : _v$onSendMessageBefor.call(v, msg);
    });
  }
  emitRecallMessageBefore(msg) {
    this._userListener.forEach(v => {
      var _v$onRecallMessageBef;
      (_v$onRecallMessageBef = v.onRecallMessageBefore) === null || _v$onRecallMessageBef === void 0 ? void 0 : _v$onRecallMessageBef.call(v, msg);
    });
  }
  emitRecallMessageChanged(params) {
    this._userListener.forEach(v => {
      var _v$onRecallMessageRes;
      (_v$onRecallMessageRes = v.onRecallMessageResult) === null || _v$onRecallMessageRes === void 0 ? void 0 : _v$onRecallMessageRes.call(v, params);
    });
  }
  emitRecvMessageStateChanged(msg) {
    this._userListener.forEach(v => {
      var _v$onRecvMessageStatu;
      (_v$onRecvMessageStatu = v.onRecvMessageStatusChanged) === null || _v$onRecvMessageStatu === void 0 ? void 0 : _v$onRecvMessageStatu.call(v, msg);
    });
  }
  emitAttachmentChanged(msg) {
    this._userListener.forEach(v => {
      var _v$onMessageAttachmen;
      (_v$onMessageAttachmen = v.onMessageAttachmentChanged) === null || _v$onMessageAttachmen === void 0 ? void 0 : _v$onMessageAttachmen.call(v, msg);
    });
  }
  emitAttachmentProgressChanged(msg) {
    this._userListener.forEach(v => {
      var _v$onMessageAttachmen2;
      (_v$onMessageAttachmen2 = v.onMessageAttachmentProgressChanged) === null || _v$onMessageAttachmen2 === void 0 ? void 0 : _v$onMessageAttachmen2.call(v, msg);
    });
  }
  emitConversationUnreadCountChanged() {
    this._client.client.chatManager.getUnreadCount().then(count => {
      this._userListener.forEach(v => {
        var _v$onAllConversationU;
        (_v$onAllConversationU = v.onAllConversationUnreadCountChanged) === null || _v$onAllConversationU === void 0 ? void 0 : _v$onAllConversationU.call(v, count);
      });
    }).catch();
  }
  bindOnMessagesReceived(messages) {
    asyncTask(this.emitConversationUnreadCountChanged.bind(this));
    messages.forEach(msg => {
      this._userListener.forEach(v => {
        var _v$onRecvMessage;
        (_v$onRecvMessage = v.onRecvMessage) === null || _v$onRecvMessage === void 0 ? void 0 : _v$onRecvMessage.call(v, msg);
      });
    });
  }
  bindOnMessagesRead(messages) {
    messages.forEach(msg => {
      this._userListener.forEach(v => {
        var _v$onRecvMessageStatu2;
        (_v$onRecvMessageStatu2 = v.onRecvMessageStatusChanged) === null || _v$onRecvMessageStatu2 === void 0 ? void 0 : _v$onRecvMessageStatu2.call(v, msg);
      });
    });
  }
  bindOnGroupMessageRead(_groupMessageAcks) {
    // todo: get message for group
    // groupMessageAcks.forEach((ack) => {
    //   this._userListener.forEach((v) => {
    //     v.onRecvMessageStatusChanged?.(ack.message);
    //   });
    // });
  }
  bindOnMessagesDelivered(messages) {
    messages.forEach(msg => {
      this._userListener.forEach(v => {
        var _v$onRecvMessageStatu3;
        (_v$onRecvMessageStatu3 = v.onRecvMessageStatusChanged) === null || _v$onRecvMessageStatu3 === void 0 ? void 0 : _v$onRecvMessageStatu3.call(v, msg);
      });
    });
  }
  bindOnMessagesRecalled(messages) {
    messages.forEach(msg => {
      const tipMsg = this.createRecallMessageTip(msg);
      this._client.insertMessage({
        message: tipMsg,
        onResult: () => {
          this._userListener.forEach(v => {
            var _v$onRecvRecallMessag;
            (_v$onRecvRecallMessag = v.onRecvRecallMessage) === null || _v$onRecvRecallMessag === void 0 ? void 0 : _v$onRecvRecallMessag.call(v, msg, tipMsg);
          });
        }
      });
    });
  }
  bindOnMessageContentChanged(message, lastModifyOperatorId, _lastModifyTime) {
    this._userListener.forEach(v => {
      var _v$onRecvMessageConte;
      (_v$onRecvMessageConte = v.onRecvMessageContentChanged) === null || _v$onRecvMessageConte === void 0 ? void 0 : _v$onRecvMessageConte.call(v, message, lastModifyOperatorId);
    });
  }
  setCurrentConv(conv) {
    this._client.setCurrentConversation({
      conv
    });
  }
  getCurrentConv() {
    return this._client.getCurrentConversation();
  }
  sendMessageReadAck(params) {
    this._client.sendMessageReadAck({
      message: params.message,
      onResult: result => {
        if (result.isOk === true) {
          const hasReadAck = params.message.hasReadAck;
          if (hasReadAck !== true) {
            const tmp = {
              ...params.message,
              hasReadAck: true
            };
            this.emitRecvMessageStateChanged(tmp);
          }
        }
      }
    });
  }
  setMessageRead(params) {
    this._client.setMessageRead({
      convId: params.convId,
      convType: params.convType,
      msgId: params.message.msgId,
      onResult: result => {
        if (result.isOk === true) {
          const hasRead = params.message.hasRead;
          if (hasRead !== true) {
            const tmp = {
              ...params.message,
              hasRead: true
            };
            this.emitRecvMessageStateChanged(tmp);
          }
        }
      }
    });
  }
  async sendMessage(msg) {
    const callback = {
      onSuccess: message => {
        const isExisted = this._sendList.get(message.localMsgId);
        if (isExisted) {
          this.emitSendMessageChanged(message);
          this._sendList.delete(message.localMsgId);
        }
      },
      onProgress: (localMsgId, progress) => {
        const isExisted = this._sendList.get(localMsgId);
        if (isExisted) {
          const msg = {
            ...isExisted.msg
          };
          const p = {
            [gMessageAttributeFileProgress]: progress
          };
          msg.attributes = {
            ...msg.attributes,
            ...p
          };
          this.emitSendMessageProgressChanged(msg);
        }
      },
      onError: (localMsgId, _error) => {
        const isExisted = this._sendList.get(localMsgId);
        if (isExisted) {
          const msg = {
            ...isExisted.msg
          };
          msg.status = ChatMessageStatus.FAIL;
          this.emitSendMessageChanged(msg);
          this._sendList.delete(localMsgId);
        }
      }
    };
    this._sendList.set(msg.localMsgId, {
      msg
    });
    this.emitSendMessageBefore(msg);
    this._client.sendMessage({
      message: msg,
      callback: callback
    });
  }
  async resendMessage(msg) {
    const callback = {
      onSuccess: message => {
        const isExisted = this._sendList.get(message.localMsgId);
        if (isExisted) {
          this.emitSendMessageChanged(message);
          this._sendList.delete(message.localMsgId);
        }
      },
      onError: (localMsgId, _error) => {
        const isExisted = this._sendList.get(localMsgId);
        if (isExisted) {
          const msg = {
            ...isExisted.msg
          };
          msg.status = ChatMessageStatus.FAIL;
          this.emitSendMessageChanged(msg);
          this._sendList.delete(localMsgId);
        }
      }
    };
    this._sendList.set(msg.localMsgId, {
      msg: msg
    });
    this.emitSendMessageBefore(msg);
    this._client.resendMessage({
      message: msg,
      callback: callback
    });
  }
  createRecallMessageTip(msg) {
    const tip = ChatMessage.createCustomMessage(msg.conversationId, gCustomMessageRecallEventType, msg.chatType, {
      params: {
        recall: JSON.stringify({
          text: '_uikit_msg_tip_recall',
          self: this._client.userId,
          from: msg.from,
          fromName: msg.from
        })
      }
    });
    // tip.localTime = msg.localTime;
    // tip.serverTime = msg.serverTime;
    return tip;
  }
  async recallMessage(msg) {
    this.emitRecallMessageBefore(msg);
    const currentTimestamp = getCurTs();
    if (msg.localTime + this._recallTimeout < currentTimestamp) {
      this.emitRecallMessageChanged({
        isOk: false
      });
      this._client.sendError({
        error: new UIKitError({
          code: ErrorCode.msg_recall_error
        })
      });
      return;
    }
    this._client.recallMessage({
      message: msg,
      onResult: value => {
        if (value.isOk === true) {
          const tipMsg = this.createRecallMessageTip(msg);
          this._client.insertMessage({
            message: tipMsg,
            onResult: result => {
              this.emitRecallMessageChanged({
                isOk: result.isOk,
                orgMsg: msg,
                tipMsg: tipMsg
              });
            }
          });
        } else {
          this.emitRecallMessageChanged({
            isOk: false
          });
          this._client.sendError({
            error: value.error
          });
        }
      }
    });
  }
  async downloadAttachment(msg) {
    if (msg.body.type !== ChatMessageType.IMAGE && msg.body.type !== ChatMessageType.VIDEO && msg.body.type !== ChatMessageType.FILE && msg.body.type !== ChatMessageType.VOICE) {
      return;
    }
    const callback = {
      onSuccess: message => {
        const isExisted = this._downloadList.get(message.localMsgId);
        if (isExisted) {
          this.emitAttachmentChanged(message);
          this._downloadList.delete(message.localMsgId);
        }
      },
      onProgress: (localMsgId, progress) => {
        const isExisted = this._downloadList.get(localMsgId);
        if (isExisted) {
          const msg = {
            ...isExisted.msg
          };
          const p = {
            [gMessageAttributeFileProgress]: progress
          };
          msg.attributes = {
            ...msg.attributes,
            ...p
          };
          this.emitAttachmentProgressChanged(msg);
        }
      },
      onError: (localMsgId, _error) => {
        const isExisted = this._downloadList.get(localMsgId);
        if (isExisted) {
          const msg = {
            ...isExisted.msg
          };
          msg.body = {
            ...msg.body,
            fileStatus: ChatDownloadStatus.FAILED
          };
          this.emitAttachmentChanged(msg);
          this._downloadList.delete(localMsgId);
        }
      }
    };
    this._downloadList.set(msg.localMsgId, {
      msg
    });
    this._client.downloadMessageAttachment({
      message: msg,
      callback: callback
    });
  }
  loadHistoryMessage(params) {
    const {
      convId,
      convType,
      startMsgId,
      loadCount
    } = params;
    return this._client.getHistoryMessage({
      convId,
      convType,
      startMsgId,
      direction: ChatSearchDirection.UP,
      loadCount: loadCount,
      onResult: result => {
        if (result.isOk && result.value) {
          // todo: try download failed thumb. dispatch download result.
          params.onResult(result.value);
        } else {
          params.onResult([]);
        }
      }
    });
  }
  setRecallMessageTimeout(recallTimeout) {
    if (recallTimeout) {
      this._recallTimeout = recallTimeout;
    }
  }
}
//# sourceMappingURL=messageManager.js.map