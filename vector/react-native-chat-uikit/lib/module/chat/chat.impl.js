import { ChatConversationType, ChatGroupOptions, ChatGroupStyle, ChatMessageType, ChatOptions, ChatPresence, ChatPushRemindType, ChatSilentModeParamType } from 'react-native-chat-sdk';
import { ConversationStorage } from '../db/storage';
import { ErrorCode, UIKitError } from '../error';
import { Services } from '../services';
import { asyncTask, getCurTs, mergeObjects } from '../utils';
import { ChatServiceListenerImpl } from './chat.listener';
import { gGroupMemberMyRemark } from './const';
import { MessageCacheManagerImpl } from './messageManager';
import { RequestListImpl } from './requestList';
import { UIListenerType } from './types.ui';
import { setUserInfoToMessage, userInfoFromMessage } from './utils';
export class ChatServiceImpl extends ChatServiceListenerImpl {
  constructor() {
    console.log('dev:chat:constructor:');
    super();
    this._dataList = new Map();
    this._userList = new Map();
    this._convList = new Map();
    this._contactList = new Map();
    this._groupList = new Map();
    this._groupMemberList = new Map();
    this._modelState = new Map();
    this._silentModeList = new Map();
    this._request = new RequestListImpl(this);
    this._messageManager = new MessageCacheManagerImpl(this);
  }

  // !!! warning: no need
  // destructor() {
  // }

  reset() {
    console.log('dev:chat:reset:');
    // this.clearListener(); // !!! warn: no clear.
    this._dataList.clear();
    this._userList.clear();
    this._convList.clear();
    this._contactList.clear();
    this._groupList.clear();
    this._groupMemberList.clear();
    this._modelState.clear();
    this._silentModeList.clear();
  }
  async init(params) {
    console.log('dev:chat:init');
    const {
      options
    } = params;
    const {
      appKey
    } = options;
    try {
      var _params$result;
      await this.client.init(new ChatOptions({
        ...options
      }));
      console.log('dev:chat:opt:', this.client.options);
      this._convStorage = new ConversationStorage({
        appKey: appKey
      });
      // !!! hot-reload no pass, into catch codes
      // this._request = new RequestListImpl(this);
      // this._messageManager = new MessageCacheManagerImpl(this);
      this._initListener();
      this._request.init();
      this._messageManager.init();
      (_params$result = params.result) === null || _params$result === void 0 ? void 0 : _params$result.call(params, {
        isOk: true
      });
    } catch (error) {
      var _params$result2;
      (_params$result2 = params.result) === null || _params$result2 === void 0 ? void 0 : _params$result2.call(params, {
        isOk: false,
        error: new UIKitError({
          code: ErrorCode.init_error,
          desc: this._fromChatError(error)
        })
      });
    }
  }
  addListener(listener) {
    super.addListener(listener);
  }
  removeListener(listener) {
    super.removeListener(listener);
  }
  clearListener() {
    super.clearListener();
  }
  addUIListener(listener) {
    super.addUIListener(listener);
  }
  removeUIListener(listener) {
    super.removeUIListener(listener);
  }
  clearUIListener() {
    super.clearUIListener();
  }
  sendUIEvent(type, event, data) {
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }
    super.sendUIEvent(type, event, data, ...args);
  }
  _fromChatError(error) {
    let e;
    try {
      e = JSON.stringify(error);
    } catch (ee) {
      if (typeof error === 'string') {
        e = error;
      } else {
        var _ee$toString;
        e = ee === null || ee === void 0 ? void 0 : (_ee$toString = ee.toString) === null || _ee$toString === void 0 ? void 0 : _ee$toString.call(ee);
      }
    }
    return e;
  }
  async _createUserDir() {
    try {
      const isExisted = await Services.dcs.isExistedUserDir();
      if (isExisted !== true) {
        await Services.dcs.createUserDir();
      }
    } catch (e) {
      console.warn('createUserDir:', e);
      this.sendError({
        error: new UIKitError({
          code: ErrorCode.chat_uikit,
          desc: 'createUserDir failed.'
        })
      });
    }
  }
  get client() {
    return super.client;
  }
  async login(params) {
    const {
      userId,
      userToken,
      userName,
      userAvatarURL,
      result,
      usePassword
    } = params;
    try {
      var _this$_convStorage;
      console.log('dev:chat:login:', params);
      this.reset();
      const version = require('react-native-chat-sdk/src/version');
      const list = version.default.split('.');
      const major = parseInt(list[0], 10);
      const minor = parseInt(list[1], 10);
      if (major <= 1 && minor < 3) {
        if (userToken.startsWith('00')) {
          await this.client.loginWithAgoraToken(userId, userToken);
        } else {
          await this.client.login(userId, userToken, usePassword ?? false);
        }
      } else {
        await this.client.login(userId, userToken, usePassword ?? false);
      }
      (_this$_convStorage = this._convStorage) === null || _this$_convStorage === void 0 ? void 0 : _this$_convStorage.setCurrentId(userId);

      // !!! hot-reload no pass, into catch codes
      this._user = {
        userName: userName,
        remark: userName,
        avatarURL: userAvatarURL,
        userId: userId
      };
      Services.dcs.init(`${this.client.options.appKey.replace('#', '-')}/${userId}`);
      await this._createUserDir();
      this.client.getCurrentUsername();
      // this.updateSelfInfo({ self: this._user, onResult: () => {} });

      console.log('dev:login:finish:1', params);
      result === null || result === void 0 ? void 0 : result({
        isOk: true
      });
    } catch (error) {
      if ((error === null || error === void 0 ? void 0 : error.code) === 200) {
        var _this$_convStorage2;
        (_this$_convStorage2 = this._convStorage) === null || _this$_convStorage2 === void 0 ? void 0 : _this$_convStorage2.setCurrentId(userId);
        // !!! for dev hot-reload
        this._user = {
          userName: userName,
          remark: userName,
          avatarURL: userAvatarURL,
          userId: userId
        };
        Services.dcs.init(`${this.client.options.appKey.replace('#', '-')}/${userId}`);
        await this._createUserDir();
        this.client.getCurrentUsername();
        // this.updateSelfInfo({ self: this._user, onResult: () => {} });
      }

      console.log('dev:login:finish:2', params, error);
      result === null || result === void 0 ? void 0 : result({
        isOk: false,
        error: new UIKitError({
          code: ErrorCode.login_error,
          desc: this._fromChatError(error)
        })
      });
    }
  }
  async logout(params) {
    try {
      var _params$result3;
      console.log('dev:chat:logout:');
      await this.client.logout(params.unbindDeviceToken);
      (_params$result3 = params.result) === null || _params$result3 === void 0 ? void 0 : _params$result3.call(params, {
        isOk: true
      });
      this._user = undefined;
      this.reset();
    } catch (error) {
      var _params$result4;
      (_params$result4 = params.result) === null || _params$result4 === void 0 ? void 0 : _params$result4.call(params, {
        isOk: false,
        error: new UIKitError({
          code: ErrorCode.logout_error,
          desc: this._fromChatError(error)
        })
      });
    }
  }
  async autoLogin(params) {
    var _this$client$options;
    if (((_this$client$options = this.client.options) === null || _this$client$options === void 0 ? void 0 : _this$client$options.autoLogin) !== true) {
      var _params$result5;
      (_params$result5 = params.result) === null || _params$result5 === void 0 ? void 0 : _params$result5.call(params, {
        isOk: false
      });
      return;
    }
    this.tryCatch({
      promise: this.client.isLoginBefore(),
      event: 'autoLogin',
      onFinished: async value => {
        if (value === true) {
          var _this$_convStorage3, _params$result6;
          const userId = await this.client.getCurrentUsername();
          (_this$_convStorage3 = this._convStorage) === null || _this$_convStorage3 === void 0 ? void 0 : _this$_convStorage3.setCurrentId(userId);
          this._user = {
            userName: params.userId,
            remark: params.userName,
            avatarURL: params.userAvatarURL,
            userId: userId
          };
          Services.dcs.init(`${this.client.options.appKey.replace('#', '-')}/${userId}`);
          await this._createUserDir();
          this.client.getCurrentUsername();
          (_params$result6 = params.result) === null || _params$result6 === void 0 ? void 0 : _params$result6.call(params, {
            isOk: true
          });
        } else {
          var _params$result7;
          (_params$result7 = params.result) === null || _params$result7 === void 0 ? void 0 : _params$result7.call(params, {
            isOk: false
          });
        }
      }
    });
  }
  async loginState() {
    const r = await this.client.isLoginBefore();
    return r === true ? 'logged' : 'noLogged';
  }
  async refreshToken(params) {
    this.tryCatch({
      promise: this.client.renewAgoraToken(params.token),
      event: 'refreshToken',
      onFinished: () => {
        var _params$result8;
        params === null || params === void 0 ? void 0 : (_params$result8 = params.result) === null || _params$result8 === void 0 ? void 0 : _params$result8.call(params, {
          isOk: true
        });
      },
      onError: error => {
        var _params$result9;
        (_params$result9 = params.result) === null || _params$result9 === void 0 ? void 0 : _params$result9.call(params, {
          isOk: false,
          error: new UIKitError({
            code: ErrorCode.refresh_token_error,
            desc: this._fromChatError(error)
          })
        });
      }
    });
  }
  get userId() {
    return this.client.currentUserName;
  }
  user(userId) {
    var _this$_user;
    if (((_this$_user = this._user) === null || _this$_user === void 0 ? void 0 : _this$_user.userId) === userId) {
      return this._user;
    } else if (userId) {
      return this._userList.get(userId);
    }
    return undefined;
  }
  setUser(params) {
    params.users.forEach(v => {
      var _this$_user2;
      if (v.userId === ((_this$_user2 = this._user) === null || _this$_user2 === void 0 ? void 0 : _this$_user2.userId) && v.userId) {
        this._user = {
          ...this._user,
          ...v
        };
      } else {
        this._userList.set(v.userId, v);
      }
    });
  }
  sendError(params) {
    this.listeners.forEach(v => {
      asyncTask(() => {
        var _v$onError;
        return (_v$onError = v.onError) === null || _v$onError === void 0 ? void 0 : _v$onError.call(v, params);
      });
    });
  }
  sendFinished(params) {
    this.listeners.forEach(v => {
      asyncTask(() => {
        var _v$onFinished;
        return (_v$onFinished = v.onFinished) === null || _v$onFinished === void 0 ? void 0 : _v$onFinished.call(v, params);
      });
    });
  }
  sendBefore(params) {
    this.listeners.forEach(v => {
      asyncTask(() => {
        var _v$onBefore;
        return (_v$onBefore = v.onBefore) === null || _v$onBefore === void 0 ? void 0 : _v$onBefore.call(v, params);
      });
    });
  }
  get requestList() {
    return this._request;
  }
  get messageManager() {
    return this._messageManager;
  }
  tryCatch(params) {
    const {
      promise,
      event,
      onFinished,
      onError
    } = params;
    this.sendBefore({
      event: event
    });
    promise.then(async value => {
      const ret = await (onFinished === null || onFinished === void 0 ? void 0 : onFinished(value));
      if (ret !== false) {
        this.sendFinished({
          event: event
        });
      }
    }).catch(e => {
      const _e = new UIKitError({
        code: ErrorCode.chat_uikit,
        tag: event,
        desc: this._fromChatError(e)
      });
      const ret = onError === null || onError === void 0 ? void 0 : onError(_e);
      if (ret !== false) {
        this.sendError({
          error: _e,
          from: event
        });
      }
    });
  }
  async tryCatchSync(params) {
    const {
      promise,
      event
    } = params;
    try {
      return await promise;
    } catch (error) {
      throw new UIKitError({
        code: ErrorCode.chat_uikit,
        tag: event,
        desc: this._fromChatError(error)
      });
    }
  }
  toUserData(user, from) {
    return {
      userId: user.userId,
      userName: user.nickName,
      remark: user.nickName,
      avatarURL: user.avatarUrl,
      from: from
    };
  }
  _getAvatarFromCache(id) {
    var _this$_dataList$get;
    return (_this$_dataList$get = this._dataList.get(id)) === null || _this$_dataList$get === void 0 ? void 0 : _this$_dataList$get.avatar;
  }
  _getNameFromCache(id) {
    const data = this._dataList.get(id);
    if (data) {
      return data.remark ?? data.name;
    }
    return undefined;
  }
  _getDoNotDisturbFromCache(convId) {
    var _this$_silentModeList;
    return (_this$_silentModeList = this._silentModeList.get(convId)) === null || _this$_silentModeList === void 0 ? void 0 : _this$_silentModeList.doNotDisturb;
  }
  async toUIConversation(conv) {
    return {
      convId: conv.convId,
      convType: conv.convType,
      isChatThread: conv.isChatThread,
      ext: conv.ext,
      isPinned: conv.isPinned,
      pinnedTime: conv.pinnedTime,
      unreadMessageCount: await this.getConversationMessageCount(conv.convId, conv.convType),
      lastMessage: await this.getConversationLatestMessage(conv.convId, conv.convType),
      doNotDisturb: this._getDoNotDisturbFromCache(conv.convId),
      convName: this._getNameFromCache(conv.convId),
      convAvatar: this._getAvatarFromCache(conv.convId)
    };
  }
  toUIContact(contact) {
    const others = this._contactList.get(contact.userId);
    return {
      ...others,
      userId: contact.userId,
      remark: contact.remark,
      userAvatar: this._getAvatarFromCache(contact.userId),
      userName: this._getNameFromCache(contact.userId)
    };
  }
  toUIGroup(group) {
    const others = this._groupList.get(group.groupId);
    return {
      ...others,
      ...group,
      groupAvatar: this._getAvatarFromCache(group.groupId)
    };
  }
  setContactOnRequestData(callback) {
    this._contactDataRequestCallback = callback;
  }
  setGroupOnRequestData(callback) {
    this._groupDataRequestCallback = callback;
  }
  setGroupParticipantOnRequestData(callback) {
    this._groupParticipantDataRequestCallback = callback;
  }
  updateGroupParticipantOnRequestData(params) {
    const {
      groupId,
      data
    } = params;
    const list = this._groupMemberList.get(groupId);
    if (list) {
      data.forEach(values => {
        values.map(value => {
          const conv = list.get(value.id);
          if (conv) {
            conv.memberName = value.name;
            conv.memberAvatar = value.avatar;
          }
        });
      });
      this.sendUIEvent(UIListenerType.Group, 'onRequestReloadEvent', groupId);
    }
  }
  setOnRequestMultiData(callback) {
    this._convDataRequestCallback = callback;
  }
  setGroupNameOnCreateGroup(callback) {
    this._groupNameOnCreateGroupCallback = callback;
  }
  getCreateGroupCustomNameCallback() {
    return this._groupNameOnCreateGroupCallback;
  }
  setOnRequestData(callback) {
    this._basicDataRequestCallback = callback;
  }
  updateRequestData(params) {
    const {
      data
    } = params;
    data.forEach(values => {
      values.forEach(value => {
        const old = this._dataList.get(value.id);
        if (old) {
          this._dataList.set(value.id, {
            ...old,
            name: value.name ?? old.name,
            avatar: value.avatar ?? old.avatar
          });
        } else {
          // !!! Values that do not exist will not be updated.
        }
      });
    });
    this.sendUIEvent(UIListenerType.Contact, 'onRequestReloadEvent');
    this.sendUIEvent(UIListenerType.Conversation, 'onRequestReloadEvent');
  }
  getRequestData(id) {
    return this._dataList.get(id);
  }
  async _requestConvData(list) {
    const ret = new Promise((resolve, reject) => {
      if (this._basicDataRequestCallback) {
        const needRequest = new Set();
        Array.from(list.values()).forEach(v => {
          const old = this._dataList.get(v.convId);
          if (old === undefined || old.name === undefined || old.avatar === undefined) {
            needRequest.add({
              id: v.convId,
              type: v.convType === ChatConversationType.GroupChat ? 'group' : 'user',
              name: undefined,
              avatar: undefined
            });
            this._dataList.set(v.convId, {
              ...old,
              id: v.convId,
              type: v.convType === ChatConversationType.GroupChat ? 'group' : 'user'
            });
          }
        });
        if (needRequest.size === 0) {
          resolve();
          return;
        }
        this._basicDataRequestCallback({
          ids: new Map([['user', Array.from(needRequest.values()).filter(v => (v === null || v === void 0 ? void 0 : v.type) === 'user' && (v.id === (v === null || v === void 0 ? void 0 : v.name) || (v === null || v === void 0 ? void 0 : v.name) === undefined || v.name === null || v.name.length === 0) || (v === null || v === void 0 ? void 0 : v.type) === 'user' && (v === null || v === void 0 ? void 0 : v.avatar) === undefined).map(v => v.id)], ['group', Array.from(needRequest.values()).filter(v => (v === null || v === void 0 ? void 0 : v.type) === 'group' && (v.id === (v === null || v === void 0 ? void 0 : v.name) || (v === null || v === void 0 ? void 0 : v.name) === undefined || v.name === null || v.name.length === 0) || (v === null || v === void 0 ? void 0 : v.type) === 'group' && (v === null || v === void 0 ? void 0 : v.avatar) === undefined).map(v => v.id)]]),
          result: (data, error) => {
            if (data) {
              data.forEach(values => {
                values.map(value => {
                  const conv = this._dataList.get(value.id);
                  if (conv) {
                    conv.name = conv.name ?? value.name;
                    conv.avatar = conv.avatar ?? value.avatar;
                  }
                });
              });
              resolve();
            } else {
              reject(error);
            }
          }
        });
      } else {
        resolve();
      }
    });
    return ret;
  }
  _requestData(list) {
    let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'user';
    const ret = new Promise((resolve, reject) => {
      if (this._basicDataRequestCallback) {
        const needRequest = new Set();
        Array.from(list.values()).forEach(v => {
          const old = this._dataList.get(v);
          if (old === undefined || old.name === undefined || old.avatar === undefined) {
            needRequest.add({
              id: v,
              type: type,
              name: undefined,
              avatar: undefined
            });
            this._dataList.set(v, {
              ...old,
              id: v,
              type: type
            });
          }
        });
        if (needRequest.size === 0) {
          resolve();
          return;
        }
        this._basicDataRequestCallback({
          ids: new Map([[type, Array.from(needRequest.values()).filter(v => (v === null || v === void 0 ? void 0 : v.type) === type && (v.id === (v === null || v === void 0 ? void 0 : v.name) || (v === null || v === void 0 ? void 0 : v.name) === undefined || v.name === null || v.name.length === 0) || (v === null || v === void 0 ? void 0 : v.type) === type && (v === null || v === void 0 ? void 0 : v.avatar) === undefined).map(v => v.id)]]),
          result: (data, error) => {
            if (data) {
              data.forEach(values => {
                values.map(value => {
                  const conv = this._dataList.get(value.id);
                  if (conv) {
                    conv.name = conv.name ?? value.name;
                    conv.avatar = conv.avatar ?? value.avatar;
                  }
                });
              });
              resolve();
            } else {
              reject(error);
            }
          }
        });
      } else {
        resolve();
      }
    });
    return ret;
  }
  _requestGroupMemberData(groupId, list) {
    const ret = new Promise((resolve, reject) => {
      if (this._groupParticipantDataRequestCallback) {
        const needRequest = new Set();
        let groupMember = this._groupMemberList.get(groupId);
        if (groupMember === undefined) {
          this._groupMemberList.set(groupId, new Map());
        }
        groupMember = this._groupMemberList.get(groupId);
        Array.from(list.values()).forEach(v => {
          if (v === undefined || v.memberName === undefined || v.memberAvatar === undefined) {
            needRequest.add({
              id: v.memberId,
              type: 'user',
              name: undefined,
              avatar: undefined,
              groupId: groupId
            });
          }
        });
        if (needRequest.size === 0) {
          resolve();
          return;
        }
        this._groupParticipantDataRequestCallback({
          groupId: groupId,
          ids: Array.from(needRequest.values()).filter(v => (v === null || v === void 0 ? void 0 : v.type) === 'user' && (v.id === (v === null || v === void 0 ? void 0 : v.name) || (v === null || v === void 0 ? void 0 : v.name) === undefined || v.name === null || v.name.length === 0) || (v === null || v === void 0 ? void 0 : v.type) === 'user' && (v === null || v === void 0 ? void 0 : v.avatar) === undefined).map(v => v.id),
          result: (data, error) => {
            if (data) {
              data.forEach(value => {
                var _groupMember;
                const conv = (_groupMember = groupMember) === null || _groupMember === void 0 ? void 0 : _groupMember.get(value.id);
                if (conv) {
                  conv.memberName = value.name;
                  conv.memberAvatar = value.avatar;
                }
              });
              resolve();
            } else {
              reject(error);
            }
          }
        });
      } else {
        resolve();
      }
    });
    return ret;
  }
  setCurrentConversation(params) {
    if (params.conv && params.conv.convId) {
      const conv = this._convList.get(params.conv.convId);
      if (conv) {
        this._currentConversation = conv;
      } else {
        this._currentConversation = params.conv;
      }
    } else {
      this._currentConversation = params.conv;
    }
  }
  getCurrentConversation() {
    return this._currentConversation;
  }

  /**
   * @description Get the current user all conversation list.
   * @params params
   * - onResult: The callback function of the result.
   */
  async getAllConversations(params) {
    const {
      onResult
    } = params;
    try {
      var _this$_convStorage4;
      const map = new Map();
      const isFinished = await ((_this$_convStorage4 = this._convStorage) === null || _this$_convStorage4 === void 0 ? void 0 : _this$_convStorage4.isFinishedForFetchList());
      if (isFinished === true) {
        var _this$_convStorage5;
        const list = await this.client.chatManager.getAllConversations();
        const list2 = await ((_this$_convStorage5 = this._convStorage) === null || _this$_convStorage5 === void 0 ? void 0 : _this$_convStorage5.getAllConversation());
        if (list2 && (list2 === null || list2 === void 0 ? void 0 : list2.length) > 0) {
          list2 === null || list2 === void 0 ? void 0 : list2.forEach(v => {
            this._silentModeList.set(v.convId, {
              convId: v.convId,
              doNotDisturb: v.doNotDisturb
            });
          });
        }
        await this._requestConvData(list);
        this._convList.clear();
        const ret = list.map(async v => {
          this._convList.set(v.convId, await this.toUIConversation(v));
        });
        await Promise.all(ret);
      } else {
        var _pinList$list, _this$_convStorage7;
        let cursor = '';
        const pageSize = 50;
        const pinList = await this.client.chatManager.fetchPinnedConversationsFromServerWithCursor(cursor, pageSize);
        (_pinList$list = pinList.list) === null || _pinList$list === void 0 ? void 0 : _pinList$list.forEach(v => {
          map.set(v.convId, {
            ...v
          });
        });
        cursor = '';
        for (;;) {
          var _list$list, _list$list2;
          const list = await this.client.chatManager.fetchConversationsFromServerWithCursor(cursor, pageSize);
          (_list$list = list.list) === null || _list$list === void 0 ? void 0 : _list$list.forEach(v => {
            map.set(v.convId, {
              ...v
            });
          });
          if (list.cursor.length === 0 || list.list && ((_list$list2 = list.list) === null || _list$list2 === void 0 ? void 0 : _list$list2.length) < pageSize || list.list === undefined) {
            break;
          }
        }
        if (map.size > 0) {
          const silentList = await this.client.pushManager.fetchSilentModeForConversations(Array.from(map.values()).map(v => {
            return {
              convId: v.convId,
              convType: v.convType
            };
          }));
          silentList.forEach(v => {
            this._silentModeList.set(v.conversationId, {
              convId: v.conversationId,
              doNotDisturb: v.remindType === ChatPushRemindType.MENTION_ONLY || v.remindType === ChatPushRemindType.NONE
            });
          });
          if (this._silentModeList.size > 0) {
            var _this$_convStorage6;
            await ((_this$_convStorage6 = this._convStorage) === null || _this$_convStorage6 === void 0 ? void 0 : _this$_convStorage6.setAllConversation(Array.from(this._silentModeList.values()).map(item => {
              return {
                convId: item.convId,
                doNotDisturb: item.doNotDisturb
              };
            })));
          }
        }
        await ((_this$_convStorage7 = this._convStorage) === null || _this$_convStorage7 === void 0 ? void 0 : _this$_convStorage7.setFinishedForFetchList(true));
        await this._requestConvData(Array.from(map.values()));
        const ret = Array.from(map.values()).map(async v => {
          const conv = await this.toUIConversation(v);
          this._convList.set(conv.convId, conv);
          return conv;
        });
        await Promise.all(ret);
      }
      onResult({
        isOk: true,
        value: Array.from(this._convList.values())
      });
    } catch (e) {
      onResult({
        isOk: false,
        error: new UIKitError({
          code: ErrorCode.get_all_conversations_error,
          desc: this._fromChatError(e)
        })
      });
    }
  }
  async getConversation(params) {
    const {
      fromNative = false
    } = params;
    if (fromNative === true) {
      const ret = await this.tryCatchSync({
        promise: this.client.chatManager.getConversation(params.convId, params.convType, params.createIfNotExist ?? true),
        event: 'getConversation'
      });
      if (ret) {
        await this._requestConvData([{
          convId: params.convId,
          convType: params.convType
        }]);
        const c1 = await this.toUIConversation(ret);
        const c2 = this._convList.get(params.convId);
        if (c2) {
          const conv = mergeObjects(c1, c2);
          this._convList.set(conv.convId, conv);
          return conv;
        } else {
          this._convList.set(c1.convId, c1);
          this.sendUIEvent(UIListenerType.Conversation, 'onAddedEvent', c1);
        }
        return c1;
      }
    } else {
      const conv = this._convList.get(params.convId);
      return conv;
    }
    return undefined;
  }
  async removeConversationAllMessages(params) {
    const ret = this.tryCatchSync({
      promise: this.client.chatManager.deleteConversationAllMessages(params.convId, params.convType),
      event: 'removeConversationAllMessages'
    });
    const conv = this._convList.get(params.convId);
    if (conv) {
      this.sendUIEvent(UIListenerType.Conversation, 'onRequestReloadEvent', conv.convId);
    }
    Services.dcs.deleteConversationDir(params.convId).then().catch(e => {
      console.warn('dev:remove:', e);
    });
    return ret;
  }
  async removeConversation(params) {
    const {
      convId,
      removeMessage = true
    } = params;
    const ret = await this.tryCatchSync({
      promise: this.client.chatManager.deleteConversation(convId, removeMessage ?? true),
      event: 'removeConversation'
    });
    const conv = this._convList.get(convId);
    if (conv) {
      this._convList.delete(convId);
      this.sendUIEvent(UIListenerType.Conversation, 'onDeletedEvent', conv);
      if (removeMessage === true) {
        Services.dcs.deleteConversationDir(params.convId).then().catch(e => {
          console.warn('dev:remove:', e);
        });
      }
    }
    return ret;
  }
  async clearAllConversations() {
    const ret = Array.from(this._convList.values()).map(async v => {
      await this.tryCatchSync({
        promise: this.client.chatManager.deleteConversation(v.convId, true),
        event: 'clearAllConversations'
      });
      this.sendUIEvent(UIListenerType.Conversation, 'onDeletedEvent', v);
    });
    await Promise.all(ret);
    this._convList.clear();
  }
  async setConversationPin(params) {
    const ret = await this.tryCatchSync({
      promise: this.client.chatManager.pinConversation(params.convId, params.isPin),
      event: 'setConversationPin'
    });
    // const conv = this._convList.get(params.convId);
    const conv = await this.getConversation({
      convId: params.convId,
      convType: params.convType,
      fromNative: true
    });
    if (conv) {
      conv.isPinned = params.isPin;
      this.sendUIEvent(UIListenerType.Conversation, 'onUpdatedEvent', conv);
    }
    return ret;
  }
  async setConversationSilentMode(params) {
    const ret = await this.tryCatchSync({
      promise: this.client.pushManager.setSilentModeForConversation({
        convId: params.convId,
        convType: params.convType,
        option: {
          remindType: params.doNotDisturb === true ? ChatPushRemindType.NONE : ChatPushRemindType.ALL,
          paramType: ChatSilentModeParamType.REMIND_TYPE
        }
      }),
      event: 'setConversationSilentMode'
    });
    // const conv = this._convList.get(params.convId);
    const conv = await this.getConversation({
      convId: params.convId,
      convType: params.convType,
      fromNative: true
    });
    if (conv) {
      var _this$_convStorage8;
      conv.doNotDisturb = params.doNotDisturb;
      this._silentModeList.set(conv.convId, {
        convId: conv.convId,
        doNotDisturb: params.doNotDisturb
      });
      await ((_this$_convStorage8 = this._convStorage) === null || _this$_convStorage8 === void 0 ? void 0 : _this$_convStorage8.setAllConversation(Array.from(this._silentModeList.values()).map(item => {
        return {
          convId: item.convId,
          doNotDisturb: item.doNotDisturb
        };
      })));
      this.sendUIEvent(UIListenerType.Conversation, 'onUpdatedEvent', conv);
    }
    return ret;
  }
  async setConversationRead(params) {
    const ret = await this.tryCatchSync({
      promise: this.client.chatManager.markAllMessagesAsRead(params.convId, params.convType),
      event: 'setConversationRead'
    });
    // const conv = this._convList.get(params.convId);
    const conv = await this.getConversation({
      convId: params.convId,
      convType: params.convType,
      fromNative: true
    });
    if (conv) {
      conv.unreadMessageCount = 0;
      this.messageManager.emitConversationUnreadCountChanged();
      this.sendUIEvent(UIListenerType.Conversation, 'onUpdatedEvent', conv);
    }
    return ret;
  }
  async setConversationExt(params) {
    const ret = await this.tryCatchSync({
      promise: this.client.chatManager.setConversationExtension(params.convId, params.convType, params.ext),
      event: 'setConversationExt'
    });
    // const conv = this._convList.get(params.convId);
    const conv = await this.getConversation({
      convId: params.convId,
      convType: params.convType,
      fromNative: true
    });
    if (conv) {
      conv.ext = params.ext;
      this.sendUIEvent(UIListenerType.Conversation, 'onUpdatedEvent', conv);
    }
    return ret;
  }
  getConversationMessageCount(convId, convType) {
    return this.tryCatchSync({
      promise: this.client.chatManager.getConversationUnreadCount(convId, convType),
      event: 'getConversationMessageCount'
    });
  }
  getConversationLatestMessage(convId, convType) {
    return this.tryCatchSync({
      promise: this.client.chatManager.getLatestMessage(convId, convType),
      event: 'getConversationLatestMessage'
    });
  }
  async getDoNotDisturb(convId, convType) {
    const ret = await this.tryCatchSync({
      promise: this.client.pushManager.fetchSilentModeForConversation({
        convId,
        convType
      }),
      event: 'getDoNotDisturb'
    });
    if (ret) {
      return (ret === null || ret === void 0 ? void 0 : ret.remindType) === ChatPushRemindType.MENTION_ONLY || (ret === null || ret === void 0 ? void 0 : ret.remindType) === ChatPushRemindType.NONE;
    }
    return false;
  }
  isContact(params) {
    return this._contactList.has(params.userId) && this.userId !== params.userId;
  }
  getAllContacts(params) {
    if (this._contactList.size > 0) {
      this.tryCatch({
        promise: this.client.contactManager.getAllContacts(),
        event: 'getAllContacts',
        onFinished: async value => {
          const list = new Map();
          value.forEach(async v => {
            const conv = this._contactList.get(v.userId);
            if (conv) {
              list.set(v.userId, mergeObjects(v, conv));
            } else {
              list.set(v.userId, {
                ...v
              });
            }
          });
          await this._requestData(Array.from(list.values()).map(v => v.userId));
          list.forEach(v => {
            const item = this._dataList.get(v.userId);
            if (item && item.avatar) {
              v.userAvatar = item.avatar;
            }
            if (item && item.name) {
              v.userName = item.name;
            }
          });
          this._contactList = list;
          params.onResult({
            isOk: true,
            value: Array.from(this._contactList.values()).map(v => v)
          });
        },
        onError: e => {
          params.onResult({
            isOk: false,
            error: e
          });
        }
      });
      return;
    }
    this.tryCatch({
      promise: this.client.contactManager.fetchAllContacts(),
      event: 'fetchAllContacts',
      onFinished: async value => {
        value.forEach(async v => {
          this._contactList.set(v.userId, {
            userId: v.userId
          });
        });
        await this._requestData(Array.from(this._contactList.values()).map(v => v.userId));
        this._contactList.forEach(v => {
          const item = this._dataList.get(v.userId);
          if (item && item.avatar) {
            v.userAvatar = item.avatar;
          }
          if (item && item.name) {
            v.userName = item.name;
          }
        });
        params.onResult({
          isOk: true,
          value: Array.from(this._contactList.values()).map(v => v)
        });
      },
      onError: e => {
        params.onResult({
          isOk: false,
          error: e
        });
      }
    });
  }
  getContact(params) {
    this.tryCatch({
      promise: this.client.contactManager.getContact(params.userId),
      event: 'getContact',
      onFinished: async value => {
        if (value) {
          await this._requestData([params.userId]);
          const contact = await this.toUIContact(value);
          // if (this._contactDataRequestCallback && params.useUserData) {
          //   this._contactDataRequestCallback({
          //     ids: [params.userId],
          //     result: async (data?: DataModel[], error?: UIKitError) => {
          //       if (data) {
          //         data.forEach((value) => {
          //           const contact = this._contactList.get(value.id);
          //           if (contact) {
          //             contact.nickName = value.name;
          //             contact.avatar = value.avatar;
          //           }
          //         });
          //       }

          //       params.onResult({
          //         isOk: true,
          //         value: contact,
          //         error,
          //       });
          //     },
          //   });
          // } else {
          //   params.onResult({
          //     isOk: true,
          //     value: contact,
          //   });
          // }

          params.onResult({
            isOk: true,
            value: contact
          });
        } else {
          params.onResult({
            isOk: true,
            value: undefined
          });
        }
        return false;
      }
    });
  }
  addNewContact(params) {
    this.tryCatch({
      promise: this.client.contactManager.addContact(params.userId, params.reason),
      event: 'addNewContact',
      onFinished: async () => {
        var _params$onResult;
        await this._requestData([params.userId]);
        const contact = this._contactList.get(params.userId);
        this.sendUIEvent(UIListenerType.Contact, 'onAddedEvent', contact);
        (_params$onResult = params.onResult) === null || _params$onResult === void 0 ? void 0 : _params$onResult.call(params, {
          isOk: true
        });
      }
    });
  }
  removeContact(params) {
    this.tryCatch({
      promise: this.client.contactManager.deleteContact(params.userId),
      event: 'removeContact',
      onFinished: async () => {
        var _params$onResult2;
        const contact = this._contactList.get(params.userId);
        this._contactList.delete(params.userId);
        this.sendUIEvent(UIListenerType.Contact, 'onDeletedEvent', contact);
        (_params$onResult2 = params.onResult) === null || _params$onResult2 === void 0 ? void 0 : _params$onResult2.call(params, {
          isOk: true
        });
      }
    });
  }
  setContactRemark(params) {
    this.tryCatch({
      promise: this.client.contactManager.setContactRemark({
        userId: params.userId,
        remark: params.remark
      }),
      event: 'setContactRemark',
      onFinished: () => {
        var _params$onResult3;
        const contact = this._contactList.get(params.userId);
        if (contact) {
          contact.remark = params.remark;
          this.sendUIEvent(UIListenerType.Contact, 'onUpdatedEvent', contact);
        }
        (_params$onResult3 = params.onResult) === null || _params$onResult3 === void 0 ? void 0 : _params$onResult3.call(params, {
          isOk: true
        });
      }
    });
  }
  acceptInvitation(params) {
    this.tryCatch({
      promise: this.client.contactManager.acceptInvitation(params.userId),
      event: 'acceptInvitation',
      onFinished: async () => {
        params.onResult({
          isOk: true
        });
      }
    });
  }
  declineInvitation(params) {
    this.tryCatch({
      promise: this.client.contactManager.declineInvitation(params.userId),
      event: 'declineInvitation',
      onFinished: async () => {
        params.onResult({
          isOk: true
        });
      }
    });
  }
  setModelState(params) {
    const list = this._modelState.get(params.tag);
    if (list) {
      list.set(params.id, params.state);
    } else {
      this._modelState.set(params.tag, new Map([[params.id, params.state]]));
    }
  }
  getModelState(params) {
    const list = this._modelState.get(params.tag);
    return list === null || list === void 0 ? void 0 : list.get(params.id);
  }
  clearModelState(params) {
    this._modelState.delete(params.tag);
  }
  getJoinedGroups(params) {
    this.tryCatch({
      promise: this.client.groupManager.getJoinedGroups(),
      event: 'getJoinedGroups',
      onFinished: async groups => {
        await this._requestData(groups.map(v => v.groupId), 'group');
        let list = [];
        for (const group of groups) {
          list.push(this.toUIGroup(group));
        }
        params.onResult({
          isOk: true,
          value: list
        });
        return false;
      }
    });
  }
  getPageGroups(params) {
    // this.client.groupManager.getJoinedGroups();
    this.tryCatch({
      promise: this.client.groupManager.fetchJoinedGroupsFromServer(params.pageSize, params.pageNum),
      event: 'getPageGroups',
      onFinished: async value => {
        await this._requestData(value.map(v => v.groupId), 'group');
        value.forEach(async v => {
          this._groupList.set(v.groupId, this.toUIGroup(v));
        });
        params.onResult({
          isOk: true,
          value: Array.from(value).map(v => this.toUIGroup(v))
        });
      },
      onError: e => {
        params.onResult({
          isOk: false,
          error: e
        });
      }
    });
  }
  getGroupAllMembers(params) {
    const {
      isReset = false,
      owner
    } = params;
    const memberList = this._groupMemberList.get(params.groupId);
    if (memberList && memberList.size > 1 && isReset === false) {
      params.onResult({
        isOk: true,
        value: Array.from(memberList.values())
      });
      return;
    }
    let cursor = '';
    const pageSize = 200;
    this.tryCatch({
      promise: this.client.groupManager.fetchMemberListFromServer(params.groupId, pageSize, cursor),
      event: 'getGroupAllMembers',
      onFinished: async value => {
        var _value$list;
        const memberList = new Map();
        (_value$list = value.list) === null || _value$list === void 0 ? void 0 : _value$list.forEach(async v => {
          memberList.set(v, {
            memberId: v
          });
        });
        cursor = value.cursor;
        if (cursor.length === 0 || value.list && value.list.length < pageSize || value.list === undefined) {} else {
          for (;;) {
            var _list$list3;
            const list = await this.client.groupManager.fetchMemberListFromServer(params.groupId, pageSize, cursor);
            (_list$list3 = list.list) === null || _list$list3 === void 0 ? void 0 : _list$list3.forEach(v => {
              memberList.set(v, {
                memberId: v
              });
            });
            cursor = value.cursor;
            if (cursor.length === 0 || value.list && value.list.length < pageSize || value.list === undefined) {
              break;
            }
          }
        }
        if (owner) {
          memberList.set(owner.memberId, owner);
        }
        await this._requestData(Array.from(memberList.keys()));
        memberList.forEach(v => {
          const item = this._dataList.get(v.memberId);
          if (item && item.avatar) {
            v.memberAvatar = item.avatar;
          }
          if (item && item.name) {
            v.memberName = item.name;
          }
        });
        this._groupMemberList.set(params.groupId, memberList);
        // await this._requestGroupMemberData(
        //   params.groupId,
        //   Array.from(memberList.values())
        // );

        params.onResult({
          isOk: true,
          value: Array.from(memberList.values())
        });
      },
      onError: e => {
        params.onResult({
          isOk: false,
          error: e
        });
      }
    });
  }
  async getGroupOwner(params) {
    const ret = await this.tryCatchSync({
      promise: this.client.groupManager.getGroupWithId(params.groupId),
      event: 'getGroupOwner'
    });
    if (ret) {
      var _this$_groupMemberLis;
      let groupMember = this._groupMemberList.get(params.groupId);
      if (groupMember) {
        const member = groupMember.get(ret.owner);
        if (member && member.memberName && member.memberAvatar) {
          return member;
        }
        await this._requestData([ret.owner]);
        groupMember.set(ret.owner, {
          memberId: ret.owner,
          ...member,
          memberAvatar: this._getAvatarFromCache(ret.owner),
          memberName: this._getNameFromCache(ret.owner)
        });
      } else {
        groupMember = new Map([[ret.owner, {
          memberId: ret.owner
        }]]);
        await this._requestData([ret.owner]);
        groupMember.set(ret.owner, {
          memberId: ret.owner,
          memberAvatar: this._getAvatarFromCache(ret.owner),
          memberName: this._getNameFromCache(ret.owner)
        });
        this._groupMemberList.set(params.groupId, groupMember);
      }

      // await this._requestGroupMemberData(
      //   params.groupId,
      //   Array.from(groupMember.values())
      // );
      return (_this$_groupMemberLis = this._groupMemberList.get(params.groupId)) === null || _this$_groupMemberLis === void 0 ? void 0 : _this$_groupMemberLis.get(ret.owner);
    }
    return undefined;
  }
  getGroupMember(params) {
    const memberList = this._groupMemberList.get(params.groupId);
    if (memberList) {
      return memberList.get(params.userId);
    }
    return undefined;
  }
  fetchJoinedGroupCount(params) {
    this.tryCatch({
      promise: this.client.groupManager.fetchJoinedGroupCount(),
      event: 'fetchJoinedGroupCount',
      onFinished: async value => {
        params.onResult({
          isOk: true,
          value: value
        });
        return false;
      }
    });
  }
  getGroupInfoFromServer(params) {
    this.tryCatch({
      promise: this.client.groupManager.fetchGroupInfoFromServer(params.groupId),
      event: 'getGroupInfoFromServer',
      onFinished: value => {
        if (value) {
          const localGroup = this._groupList.get(params.groupId);
          const group = this.toUIGroup(value);
          if (localGroup) {
            this._groupList.set(group.groupId, mergeObjects(group, localGroup));
          } else {
            this._groupList.set(group.groupId, group);
          }
          params.onResult({
            isOk: true,
            value: group
          });
        } else {
          params.onResult({
            isOk: false
          });
        }
      }
    });
  }
  getGroupInfo(params) {
    this.tryCatch({
      promise: this.client.groupManager.getGroupWithId(params.groupId),
      event: 'getGroupInfo',
      onFinished: async value => {
        if (value === undefined || value.groupId.length === 0) {
          this.tryCatch({
            promise: this.client.groupManager.fetchGroupInfoFromServer(params.groupId),
            event: 'getGroupInfo',
            onFinished: value => {
              if (value) {
                const group = this.toUIGroup(value);
                params.onResult({
                  isOk: true,
                  value: group
                });
              } else {
                params.onResult({
                  isOk: true,
                  value: undefined
                });
              }
            }
          });
        } else {
          params.onResult({
            isOk: true,
            value: value
          });
        }
      }
    });
  }
  createGroup(params) {
    this.tryCatch({
      promise: this.client.groupManager.createGroup(new ChatGroupOptions({
        style: ChatGroupStyle.PrivateMemberCanInvite,
        maxCount: 1000,
        inviteNeedConfirm: false
      }), params.groupName, params.groupDescription, params.inviteMembers),
      event: 'createGroup',
      onFinished: async value => {
        var _params$onResult4;
        // if (value && value.groupId.length > 0) {
        //   this._groupList.set(value.groupId, { ...value } as GroupModel);
        //   if (this._groupDataRequestCallback) {
        //     this._groupDataRequestCallback({
        //       ids: [value.groupId],
        //       result: (data) => {
        //         if (data) {
        //           data.forEach((item) => {
        //             const group = this._groupList.get(item.id);
        //             if (group) {
        //               group.groupName = item.name;
        //               group.groupAvatar = item.avatar;
        //             }
        //           });
        //         }
        //         params.onResult({
        //           isOk: true,
        //           value: this.toUIGroup(value),
        //         });
        //       },
        //     });
        //   } else {
        //     params.onResult({
        //       isOk: true,
        //       value: this.toUIGroup(value),
        //     });
        //   }
        //   return;
        // }
        const group = this.toUIGroup(value);
        this._groupList.set(group.groupId, group);
        const s = this._dataList.get(group.groupId);
        if (s === undefined) {
          this._dataList.set(group.groupId, {
            id: group.groupId,
            name: params.groupName,
            type: 'group'
          });
        }
        this.sendUIEvent(UIListenerType.Group, 'onAddedEvent', group);
        (_params$onResult4 = params.onResult) === null || _params$onResult4 === void 0 ? void 0 : _params$onResult4.call(params, {
          isOk: true,
          value: value
        });
      },
      onError: e => {
        var _params$onResult5;
        (_params$onResult5 = params.onResult) === null || _params$onResult5 === void 0 ? void 0 : _params$onResult5.call(params, {
          isOk: false,
          error: e
        });
      }
    });
  }
  quitGroup(params) {
    this.tryCatch({
      promise: this.client.groupManager.leaveGroup(params.groupId),
      event: 'quitGroup',
      onFinished: async () => {
        var _params$onResult6;
        const group = this._groupList.get(params.groupId);
        if (group) {
          this._groupList.delete(params.groupId);
          this.sendUIEvent(UIListenerType.Group, 'onDeletedEvent', group);
        }
        (_params$onResult6 = params.onResult) === null || _params$onResult6 === void 0 ? void 0 : _params$onResult6.call(params, {
          isOk: true
        });
      }
    });
  }
  destroyGroup(params) {
    this.tryCatch({
      promise: this.client.groupManager.destroyGroup(params.groupId),
      event: 'destroyGroup',
      onFinished: async () => {
        var _params$onResult7;
        const group = this._groupList.get(params.groupId);
        if (group) {
          this._groupList.delete(params.groupId);
          this.sendUIEvent(UIListenerType.Group, 'onDeletedEvent', group);
        }
        (_params$onResult7 = params.onResult) === null || _params$onResult7 === void 0 ? void 0 : _params$onResult7.call(params, {
          isOk: true
        });
      }
    });
  }
  setGroupName(params) {
    this.tryCatch({
      promise: this.client.groupManager.changeGroupName(params.groupId, params.groupNewName),
      event: 'setGroupName',
      onFinished: async () => {
        var _params$onResult8;
        const group = this._groupList.get(params.groupId);
        if (group) {
          group.groupName = params.groupNewName;
          const g = this._dataList.get(group.groupId);
          if (g) {
            g.name = group.groupName;
          }
          this.sendUIEvent(UIListenerType.Group, 'onUpdatedEvent', group);
        }
        (_params$onResult8 = params.onResult) === null || _params$onResult8 === void 0 ? void 0 : _params$onResult8.call(params, {
          isOk: true
        });
      }
    });
  }
  setGroupDescription(params) {
    this.tryCatch({
      promise: this.client.groupManager.changeGroupDescription(params.groupId, params.groupDescription),
      event: 'setGroupDescription',
      onFinished: async () => {
        var _params$onResult9;
        const group = this._groupList.get(params.groupId);
        if (group) {
          group.description = params.groupDescription;
          this.sendUIEvent(UIListenerType.Group, 'onUpdatedEvent', group);
        }
        (_params$onResult9 = params.onResult) === null || _params$onResult9 === void 0 ? void 0 : _params$onResult9.call(params, {
          isOk: true
        });
      }
    });
  }
  setGroupMyRemark(params) {
    this.tryCatch({
      promise: this.client.groupManager.setMemberAttribute(params.groupId, params.memberId, {
        [gGroupMemberMyRemark]: params.groupMyRemark
      }),
      event: 'setGroupMyRemark',
      onFinished: async () => {
        var _params$onResult10;
        const group = this._groupList.get(params.groupId);
        if (group) {
          group.myRemark = params.groupMyRemark;
          this.sendUIEvent(UIListenerType.Group, 'onUpdatedEvent', group);
        }
        (_params$onResult10 = params.onResult) === null || _params$onResult10 === void 0 ? void 0 : _params$onResult10.call(params, {
          isOk: true
        });
      }
    });
  }
  getGroupMyRemark(params) {
    this.tryCatch({
      promise: this.client.groupManager.fetchMemberAttributes(params.groupId, params.memberId),
      event: 'getGroupMyRemark',
      onFinished: result => {
        const group = this._groupList.get(params.groupId);
        if (group) {
          group.myRemark = result === null || result === void 0 ? void 0 : result[gGroupMemberMyRemark];
        }
        params.onResult({
          isOk: true,
          value: result === null || result === void 0 ? void 0 : result[gGroupMemberMyRemark]
        });
      }
    });
  }
  addGroupMembers(params) {
    this.tryCatch({
      promise: this.client.groupManager.addMembers(params.groupId, params.members.map(item => item.memberId), params.welcomeMessage),
      event: 'addGroupMembers',
      onFinished: async () => {
        const groupMembers = this._groupMemberList.get(params.groupId);
        if (groupMembers) {
          // await this._requestGroupMemberData(
          //   params.groupId,
          //   Array.from(groupMembers.values())
          // );
          await this._requestData(params.members.map(item => item.memberId));
          for (const member of params.members) {
            groupMembers.set(member.memberId, {
              ...member,
              memberName: this._getNameFromCache(member.memberId),
              memberAvatar: this._getAvatarFromCache(member.memberId)
            });
          }
          for (const member of params.members) {
            this.sendUIEvent(UIListenerType.GroupParticipant, 'onAddedEvent', member);
          }
          params.onResult({
            isOk: true
          });
        } else {
          params.onResult({
            isOk: false
          });
        }
      }
    });
  }
  removeGroupMembers(params) {
    this.tryCatch({
      promise: this.client.groupManager.removeMembers(params.groupId, params.members),
      event: 'removeGroupMembers',
      onFinished: async () => {
        for (const memberId of params.members) {
          const groupMember = this._groupMemberList.get(params.groupId);
          if (groupMember) {
            const member = groupMember.get(memberId);
            if (member) {
              groupMember.delete(memberId);
              this.sendUIEvent(UIListenerType.GroupParticipant, 'onDeletedEvent', member);
            }
          }
        }
        params.onResult({
          isOk: true
        });
      }
    });
  }
  changeGroupOwner(params) {
    this.tryCatch({
      promise: this.client.groupManager.changeOwner(params.groupId, params.newOwnerId),
      event: 'changeGroupOwner',
      onFinished: () => {
        var _params$onResult11;
        const group = this._groupList.get(params.groupId);
        if (group) {
          group.owner = params.newOwnerId;
          this.sendUIEvent(UIListenerType.Group, 'onUpdatedEvent', group);
        }
        (_params$onResult11 = params.onResult) === null || _params$onResult11 === void 0 ? void 0 : _params$onResult11.call(params, {
          isOk: true
        });
      }
    });
  }
  getUserInfo(params) {
    if (this._userList.has(params.userId)) {
      params.onResult({
        isOk: true,
        value: this._userList.get(params.userId)
      });
      return;
    }
    this.tryCatch({
      promise: this.client.userManager.fetchUserInfoById([params.userId]),
      event: 'getUserInfo',
      onFinished: async value => {
        if (value) {
          Array.from(value.values()).forEach(async v => {
            const user = this.toUserData(v);
            const localUser = this._userList.get(v.userId);
            if (localUser) {
              this._userList.set(user.userId, mergeObjects(user, localUser));
            } else {
              this._userList.set(user.userId, user);
            }
          });
          if (this._userList.has(params.userId)) {
            params.onResult({
              isOk: true,
              value: this._userList.get(params.userId)
            });
          } else {
            params.onResult({
              isOk: true
            });
          }
        } else {
          params.onResult({
            isOk: true
          });
        }
      }
    });
  }
  getUsersInfo(params) {
    this.tryCatch({
      promise: this.client.userManager.fetchUserInfoById(params.userIds),
      event: 'getUsersInfo',
      onFinished: async value => {
        if (value) {
          Array.from(value.values()).forEach(async v => {
            const user = this.toUserData(v);
            const localUser = this._userList.get(v.userId);
            this._userList.set(user.userId, mergeObjects(user, localUser ?? {}));
          });
          params.onResult({
            isOk: true,
            value: params.userIds.map(v => this._userList.get(v)).filter(v => v !== undefined)
          });
        } else {
          params.onResult({
            isOk: true,
            value: []
          });
        }
      }
    });
  }
  updateSelfInfo(params) {
    const {
      self
    } = params;
    const p = {
      userId: self.userId,
      nickName: self.userName,
      avatarUrl: self.avatarURL
    };
    this.tryCatch({
      promise: this.client.userManager.updateOwnUserInfo(p),
      event: 'updateSelfInfo'
    });
  }
  getMessage(params) {
    return this.tryCatchSync({
      promise: this.client.chatManager.getMessage(params.messageId),
      event: 'getMessage'
    });
  }
  resendMessage(params) {
    this.tryCatch({
      promise: this.client.chatManager.resendMessage(params.message, params.callback),
      event: 'resendMessage'
    });
  }
  recallMessage(params) {
    this.tryCatch({
      promise: this.client.chatManager.recallMessage(params.message.msgId),
      event: 'recallMessage',
      onFinished: async () => {
        params.onResult({
          isOk: true
        });
      },
      onError: e => {
        params.onResult({
          isOk: false,
          error: new UIKitError({
            code: ErrorCode.common,
            desc: this._fromChatError(e)
          })
        });
      }
    });
  }
  insertMessage(params) {
    this.tryCatch({
      promise: this.client.chatManager.insertMessage(params.message),
      event: 'insertMessage',
      onFinished: async () => {
        params.onResult({
          isOk: true
        });
      }
    });
  }
  updateMessage(params) {
    this.tryCatch({
      promise: this.client.chatManager.updateMessage(params.message),
      event: 'updateMessage',
      onFinished: async () => {
        params.onResult({
          isOk: true
        });
      }
    });
  }
  removeMessage(params) {
    this.tryCatch({
      promise: this.client.chatManager.deleteMessage(params.message.conversationId, params.message.chatType, params.message.msgId),
      event: 'removeMessage',
      onFinished: async () => {
        params.onResult({
          isOk: true
        });
      }
    });
  }
  editMessage(params) {
    this.tryCatch({
      promise: this.client.chatManager.modifyMessageBody(params.message.msgId, params.message.body),
      event: 'editMessage',
      onFinished: async msg => {
        params.onResult({
          isOk: true,
          value: msg
        });
      },
      onError: e => {
        params.onResult({
          isOk: false,
          error: e
        });
      }
    });
  }
  getNewRequestList(params) {
    this.tryCatch({
      promise: this.client.chatManager.getMessagesWithMsgType(params.convId, params.convType, ChatMessageType.CUSTOM, params.direction, params.timestamp, params.pageSize),
      event: 'getNewRequestList',
      onFinished: async value => {
        params.onResult({
          isOk: true,
          value: value
        });
        return false;
      }
    });
  }
  sendMessage(params) {
    const {
      message,
      callback
    } = params;
    this.setUserInfoToMessage({
      msg: message,
      user: this._user
    });
    this.tryCatch({
      promise: this.client.chatManager.sendMessage(message, callback),
      event: 'sendMessage'
    });
  }
  downloadMessageAttachment(params) {
    this.tryCatchSync({
      promise: this.client.chatManager.downloadAttachment(params.message, params.callback),
      event: 'downloadMessageAttachment'
    });
  }
  getHistoryMessage(params) {
    const {
      convId,
      convType,
      startMsgId,
      direction,
      loadCount
    } = params;
    this.tryCatch({
      promise: this.client.chatManager.getMessages(convId, convType, startMsgId, direction, loadCount),
      event: 'getHistoryMessage',
      onFinished: value => {
        params.onResult({
          isOk: true,
          value: value
        });
        return false;
      }
    });
  }
  userInfoFromMessage(msg) {
    return userInfoFromMessage(msg);
  }
  setUserInfoToMessage(params) {
    return setUserInfoToMessage(params);
  }
  setMessageRead(params) {
    this.tryCatch({
      promise: this.client.chatManager.markMessageAsRead(params.convId, params.convType, params.msgId),
      event: 'setMessageRead',
      onFinished: () => {
        params.onResult({
          isOk: true
        });
        return false;
      }
    });
  }
  sendMessageReadAck(params) {
    this.tryCatch({
      promise: this.client.chatManager.sendMessageReadAck(params.message),
      event: 'sendMessageReadAck',
      onFinished: async () => {
        params.onResult({
          isOk: true
        });
        return false;
      }
    });
  }
  reportMessage(params) {
    const {
      messageId,
      tag,
      reason
    } = params;
    this.tryCatch({
      promise: this.client.chatManager.reportMessage(messageId, tag, reason),
      event: 'reportMessage',
      onFinished: async () => {
        var _params$onResult12;
        (_params$onResult12 = params.onResult) === null || _params$onResult12 === void 0 ? void 0 : _params$onResult12.call(params, {
          isOk: true
        });
      },
      onError: () => {
        var _params$onResult13;
        (_params$onResult13 = params.onResult) === null || _params$onResult13 === void 0 ? void 0 : _params$onResult13.call(params, {
          isOk: false
        });
      }
    });
  }
  subPresence(params) {
    this.tryCatch({
      promise: this.client.presenceManager.subscribe(params.userIds, 60 * 60 * 24 * 3),
      event: 'subPresence'
    });
  }
  unSubPresence(params) {
    this.tryCatch({
      promise: this.client.presenceManager.unsubscribe(params.userIds),
      event: 'unSubPresence'
    });
  }
  publishPresence(params) {
    this.tryCatch({
      promise: this.client.presenceManager.publishPresence(params.status),
      event: 'publishPresence',
      onFinished: () => {
        var _params$onResult14;
        const userId = this.userId;
        const status = params.status;
        if (userId) {
          this.listeners.forEach(v => {
            var _v$onPresenceStatusCh;
            (_v$onPresenceStatusCh = v.onPresenceStatusChanged) === null || _v$onPresenceStatusCh === void 0 ? void 0 : _v$onPresenceStatusCh.call(v, [new ChatPresence({
              publisher: userId,
              statusDescription: status,
              lastTime: getCurTs('s').toString(),
              expiryTime: (60 * 60 * 24 * 3).toString(),
              statusDetails: new Map()
            })]);
          });
        }
        (_params$onResult14 = params.onResult) === null || _params$onResult14 === void 0 ? void 0 : _params$onResult14.call(params, {
          isOk: true
        });
      }
    });
  }
  fetchPresence(params) {
    this.tryCatch({
      promise: this.client.presenceManager.fetchPresenceStatus(params.userIds),
      event: 'fetchPresence',
      onFinished: result => {
        var _params$onResult15;
        (_params$onResult15 = params.onResult) === null || _params$onResult15 === void 0 ? void 0 : _params$onResult15.call(params, {
          isOk: true,
          value: result.map(v => {
            return v.statusDescription;
          }) ?? []
        });
      },
      onError: () => {
        var _params$onResult16;
        (_params$onResult16 = params.onResult) === null || _params$onResult16 === void 0 ? void 0 : _params$onResult16.call(params, {
          isOk: false
        });
      }
    });
  }
}
let gIMService;
export function getChatServiceImpl() {
  if (gIMService === undefined) {
    gIMService = new ChatServiceImpl();
  }
  return gIMService;
}
//# sourceMappingURL=chat.impl.js.map