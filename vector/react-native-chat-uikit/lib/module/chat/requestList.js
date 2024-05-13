import { ChatMessage, ChatMessageType, ChatMultiDeviceEvent, ChatSearchDirection } from 'react-native-chat-sdk';
import { timeoutTask } from '../utils';
import { gNewRequestConversationId, gNewRequestConversationMsgEventType, gNewRequestConversationState, gNewRequestConversationTip, gNewRequestConversationUserAvatar, gNewRequestConversationUserId, gNewRequestConversationUserName } from './const';
import { getNewRequest } from './utils';
let gListener;

/**
 * Request List Implementation.
 */
export class RequestListImpl {
  _newRequestList = [];
  constructor(client) {
    this._client = client;
    this._userList = new Map();
  }
  init() {
    this.unInit();
    gListener = {
      onContactInvited: this.bindOnContactInvited.bind(this),
      onFriendRequestAccepted: this.bindOnFriendRequestAccepted.bind(this),
      onFriendRequestDeclined: this.bindOnFriendRequestDeclined.bind(this),
      onConversationEvent: this.bindOnConversationEvent.bind(this),
      onContactEvent: this.bindOnContactEvent.bind(this)
    };
    this._client.addListener(gListener);
  }
  unInit() {
    this.reset();
    if (gListener) {
      this._client.removeListener(gListener);
      gListener = undefined;
    }
  }
  reset() {
    this._newRequestList = [];
    this._userList.clear();
  }
  addListener(key, listener) {
    this._userList.set(key, listener);
  }
  removeListener(key) {
    this._userList.delete(key);
  }
  emitNewRequestListChanged() {
    for (const listener of this._userList.values()) {
      timeoutTask(0, () => listener.onNewRequestListChanged([...this._newRequestList]));
    }
  }
  bindOnContactInvited(userId) {
    const isExisted = this._newRequestList.findIndex(v => {
      var _v$msg;
      const t2 = ((_v$msg = v.msg) === null || _v$msg === void 0 ? void 0 : _v$msg.body.type) === ChatMessageType.CUSTOM;
      if (t2 === true) {
        var _v$msg2, _v$msg3;
        const body = (_v$msg2 = v.msg) === null || _v$msg2 === void 0 ? void 0 : _v$msg2.body;
        const t3 = body.event === gNewRequestConversationMsgEventType;
        const t1 = ((_v$msg3 = v.msg) === null || _v$msg3 === void 0 ? void 0 : _v$msg3.attributes[gNewRequestConversationUserId]) === userId;
        return t1 === true && t3 === true;
      }
      return false;
    });
    if (isExisted !== -1) {
      return;
    }
    const newMsg = ChatMessage.createCustomMessage(gNewRequestConversationId, gNewRequestConversationMsgEventType);
    newMsg.attributes[gNewRequestConversationUserId] = userId;
    newMsg.attributes[gNewRequestConversationUserName] = userId;
    newMsg.attributes[gNewRequestConversationUserAvatar] = '';
    newMsg.attributes[gNewRequestConversationState] = 'pending';
    newMsg.attributes[gNewRequestConversationTip] = '_uikit_new_quest_list_item_tip';
    const item = getNewRequest(newMsg);
    if (item) {
      this._newRequestList.unshift(item);
    }
    this._client.insertMessage({
      message: newMsg,
      onResult: () => {
        this.emitNewRequestListChanged();
      }
    });
  }
  bindOnFriendRequestAccepted(userId) {
    for (const request of this._newRequestList) {
      if (request.requestId === userId) {
        request.state = 'accepted';
        this.updateRequest(request);
        break;
      }
    }
  }
  bindOnFriendRequestDeclined(userId) {
    for (const request of this._newRequestList) {
      if (request.requestId === userId) {
        request.state = 'declined';
        this.updateRequest(request);
        break;
      }
    }
  }
  bindOnConversationEvent(event, convId, _convType) {
    if (event === ChatMultiDeviceEvent.CONTACT_ACCEPT) {
      for (const request of this._newRequestList) {
        if (request.requestId === convId) {
          this.removeRequest(request);
          break;
        }
      }
    } else if (event === ChatMultiDeviceEvent.CONTACT_DECLINE) {
      for (const request of this._newRequestList) {
        if (request.requestId === convId) {
          this.removeRequest(request);
          break;
        }
      }
    }
  }
  bindOnContactEvent(event, target, _ext) {
    if (event === ChatMultiDeviceEvent.CONTACT_ACCEPT) {
      for (const request of this._newRequestList) {
        if (request.requestId === target) {
          this.removeRequest(request);
          break;
        }
      }
    }
  }
  getRequestList(params) {
    if (this._newRequestList.length > 0) {
      params.onResult({
        isOk: true,
        value: this._newRequestList
      });
      return;
    }
    // this._client.removeConversation({ convId: gNewRequestConversationId });
    this._client.getNewRequestList({
      convId: gNewRequestConversationId,
      convType: 0,
      pageSize: 200,
      direction: ChatSearchDirection.UP,
      onResult: result => {
        if (result.isOk) {
          if (result.value) {
            const list = result.value.map(v => {
              return getNewRequest(v);
            }).filter(v => {
              return v !== undefined;
            });
            const uniqueList = list.filter((item, index, self) => index === self.findIndex(t => t.requestId === item.requestId));
            this._newRequestList = uniqueList;
            params.onResult({
              isOk: true,
              value: this._newRequestList
            });
          } else {
            params.onResult({
              isOk: true,
              value: []
            });
          }
        }
      }
    });
  }
  updateRequest(request) {
    if (request.msg === undefined) {
      return;
    }

    // !!! why is isFrozen, see `Object.isFrozen()`
    request.msg = {
      ...request.msg
    };
    request.msg.attributes = {
      [gNewRequestConversationUserId]: request.requestId,
      [gNewRequestConversationUserName]: request.name,
      [gNewRequestConversationUserAvatar]: request.avatar,
      [gNewRequestConversationState]: request.state,
      [gNewRequestConversationTip]: request.tip
    };
    for (let index = 0; index < this._newRequestList.length; index++) {
      const localRequest = this._newRequestList[index];
      if ((localRequest === null || localRequest === void 0 ? void 0 : localRequest.requestId) === request.requestId && localRequest.state !== 'accepted' && (localRequest === null || localRequest === void 0 ? void 0 : localRequest.state) !== 'declined') {
        this._newRequestList[index] = request;
      }
    }
    this._client.updateMessage({
      message: request.msg,
      onResult: () => {
        this.emitNewRequestListChanged();
      }
    });
  }
  removeRequest(request) {
    if (request.msg === undefined) {
      return;
    }
    let isExisted = false;
    for (let index = 0; index < this._newRequestList.length; index++) {
      const localRequest = this._newRequestList[index];
      if ((localRequest === null || localRequest === void 0 ? void 0 : localRequest.requestId) === request.requestId) {
        this._newRequestList.splice(index, 1);
        isExisted = true;
        break;
      }
    }
    if (isExisted === true) {
      this._client.removeMessage({
        message: request.msg,
        onResult: () => {
          this.emitNewRequestListChanged();
        }
      });
    }
  }
}
//# sourceMappingURL=requestList.js.map