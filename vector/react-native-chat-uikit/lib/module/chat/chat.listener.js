import { ChatClient } from 'react-native-chat-sdk';
import { DisconnectReasonType } from './types';
import { UIListenerType } from './types.ui';
let gConnectListener;
let gMessageListener;
let gGroupListener;
let gMultiDeviceListener;
let gCustomListener;
let gContactListener;
let gPresenceListener;
let gExceptListener;
export class ChatServiceListenerImpl {
  constructor() {
    this._listeners = new Set();
    this._uiListeners = new Map([[UIListenerType.Conversation, new Set()], [UIListenerType.Contact, new Set()], [UIListenerType.Group, new Set()], [UIListenerType.GroupParticipant, new Set()], [UIListenerType.NewRequest, new Set()]]);
  }
  get client() {
    return ChatClient.getInstance();
  }
  get listeners() {
    return this._listeners;
  }
  uiListener(type) {
    return this._uiListeners.get(type);
  }
  addListener(listener) {
    this._listeners.add(listener);
  }
  removeListener(listener) {
    this._listeners.delete(listener);
  }
  clearListener() {
    this._listeners.clear();
  }
  addUIListener(listener) {
    var _this$_uiListeners$ge;
    (_this$_uiListeners$ge = this._uiListeners.get(listener.type)) === null || _this$_uiListeners$ge === void 0 ? void 0 : _this$_uiListeners$ge.add(listener);
  }
  removeUIListener(listener) {
    var _this$_uiListeners$ge2;
    (_this$_uiListeners$ge2 = this._uiListeners.get(listener.type)) === null || _this$_uiListeners$ge2 === void 0 ? void 0 : _this$_uiListeners$ge2.delete(listener);
  }
  clearUIListener() {
    this._uiListeners.forEach(v => {
      v.clear();
    });
  }
  sendUIEvent(type, event, data) {
    var _this$_uiListeners$ge3;
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }
    (_this$_uiListeners$ge3 = this._uiListeners.get(type)) === null || _this$_uiListeners$ge3 === void 0 ? void 0 : _this$_uiListeners$ge3.forEach(v => {
      if (typeof v[event] === 'function') {
        const f = v[event];
        f(data, ...args);
      }
    });
  }
  _initListener() {
    this._unInitListener();
    console.log('dev:chat:initListener');
    this._initConnectListener();
    this._initMessageListener();
    this._initGroupListener();
    this._initMultiDeviceListener();
    this._initCustomListener();
    this._initContactListener();
    this._initPresenceListener();
    this._initExtraListener();
    this._initExceptListener();
  }
  _unInitListener() {
    console.log('dev:chat:unInitListener');
    this.client.removeConnectionListener(gConnectListener);
    this.client.chatManager.removeMessageListener(gMessageListener);
    this.client.groupManager.removeGroupListener(gGroupListener);
    this.client.removeMultiDeviceListener(gMultiDeviceListener);
    this.client.removeCustomListener(gCustomListener);
    this.client.contactManager.removeContactListener(gContactListener);
    this.client.presenceManager.removePresenceListener(gPresenceListener);
    this.client.removeExceptListener(gExceptListener);
  }
  _clearListener() {
    console.log('dev:chat:clearListener');
    this.client.removeAllConnectionListener();
    this.client.chatManager.removeAllMessageListener();
    this.client.groupManager.removeAllGroupListener();
    this.client.removeAllMultiDeviceListener();
    this.client.removeAllCustomListener();
    this.client.contactManager.removeAllContactListener();
    this.client.presenceManager.removeAllPresenceListener();
    this.client.removeAllExceptListener();
  }
  onConnected() {
    this._listeners.forEach(v => {
      var _v$onConnected;
      (_v$onConnected = v.onConnected) === null || _v$onConnected === void 0 ? void 0 : _v$onConnected.call(v);
    });
  }
  onDisconnected() {
    this._listeners.forEach(v => {
      var _v$onDisconnected;
      (_v$onDisconnected = v.onDisconnected) === null || _v$onDisconnected === void 0 ? void 0 : _v$onDisconnected.call(v, DisconnectReasonType.others);
    });
  }
  onTokenWillExpire() {
    this._listeners.forEach(v => {
      var _v$onDisconnected2;
      (_v$onDisconnected2 = v.onDisconnected) === null || _v$onDisconnected2 === void 0 ? void 0 : _v$onDisconnected2.call(v, DisconnectReasonType.token_will_expire);
    });
  }
  onTokenDidExpire() {
    this._listeners.forEach(v => {
      var _v$onDisconnected3;
      (_v$onDisconnected3 = v.onDisconnected) === null || _v$onDisconnected3 === void 0 ? void 0 : _v$onDisconnected3.call(v, DisconnectReasonType.token_did_expire);
    });
  }
  onAppActiveNumberReachLimit() {
    this._listeners.forEach(v => {
      var _v$onDisconnected4;
      (_v$onDisconnected4 = v.onDisconnected) === null || _v$onDisconnected4 === void 0 ? void 0 : _v$onDisconnected4.call(v, DisconnectReasonType.app_active_number_reach_limit);
    });
  }
  onUserDidLoginFromOtherDevice() {
    this._listeners.forEach(v => {
      var _v$onDisconnected5;
      (_v$onDisconnected5 = v.onDisconnected) === null || _v$onDisconnected5 === void 0 ? void 0 : _v$onDisconnected5.call(v, DisconnectReasonType.user_did_login_from_other_device);
    });
  }
  onUserDidRemoveFromServer() {
    this._listeners.forEach(v => {
      var _v$onDisconnected6;
      (_v$onDisconnected6 = v.onDisconnected) === null || _v$onDisconnected6 === void 0 ? void 0 : _v$onDisconnected6.call(v, DisconnectReasonType.user_did_remove_from_server);
    });
  }
  onUserDidForbidByServer() {
    this._listeners.forEach(v => {
      var _v$onDisconnected7;
      (_v$onDisconnected7 = v.onDisconnected) === null || _v$onDisconnected7 === void 0 ? void 0 : _v$onDisconnected7.call(v, DisconnectReasonType.user_did_forbid_by_server);
    });
  }
  onUserDidChangePassword() {
    this._listeners.forEach(v => {
      var _v$onDisconnected8;
      (_v$onDisconnected8 = v.onDisconnected) === null || _v$onDisconnected8 === void 0 ? void 0 : _v$onDisconnected8.call(v, DisconnectReasonType.user_did_change_password);
    });
  }
  onUserDidLoginTooManyDevice() {
    this._listeners.forEach(v => {
      var _v$onDisconnected9;
      (_v$onDisconnected9 = v.onDisconnected) === null || _v$onDisconnected9 === void 0 ? void 0 : _v$onDisconnected9.call(v, DisconnectReasonType.user_did_login_too_many_device);
    });
  }
  onUserKickedByOtherDevice() {
    this._listeners.forEach(v => {
      var _v$onDisconnected10;
      (_v$onDisconnected10 = v.onDisconnected) === null || _v$onDisconnected10 === void 0 ? void 0 : _v$onDisconnected10.call(v, DisconnectReasonType.user_kicked_by_other_device);
    });
  }
  onUserAuthenticationFailed() {
    this._listeners.forEach(v => {
      var _v$onDisconnected11;
      (_v$onDisconnected11 = v.onDisconnected) === null || _v$onDisconnected11 === void 0 ? void 0 : _v$onDisconnected11.call(v, DisconnectReasonType.user_authentication_failed);
    });
  }
  _initConnectListener() {
    gConnectListener = {
      onConnected: this.onConnected.bind(this),
      onDisconnected: this.onDisconnected.bind(this),
      onTokenWillExpire: this.onTokenWillExpire.bind(this),
      onTokenDidExpire: this.onTokenDidExpire.bind(this),
      onAppActiveNumberReachLimit: this.onAppActiveNumberReachLimit.bind(this),
      onUserDidLoginFromOtherDevice: this.onUserDidLoginFromOtherDevice.bind(this),
      onUserDidRemoveFromServer: this.onUserDidRemoveFromServer.bind(this),
      onUserDidForbidByServer: this.onUserDidForbidByServer.bind(this),
      onUserDidChangePassword: this.onUserDidChangePassword.bind(this),
      onUserDidLoginTooManyDevice: this.onUserDidLoginTooManyDevice.bind(this),
      onUserKickedByOtherDevice: this.onUserKickedByOtherDevice.bind(this),
      onUserAuthenticationFailed: this.onUserAuthenticationFailed.bind(this)
    };
    this.client.addConnectionListener(gConnectListener);
  }
  onMessagesReceived(messages) {
    var _this$_listeners;
    console.log('dev:chat:onMessagesReceived:', messages.length, (_this$_listeners = this._listeners) === null || _this$_listeners === void 0 ? void 0 : _this$_listeners.size);
    this._listeners.forEach(v => {
      var _v$onMessagesReceived;
      (_v$onMessagesReceived = v.onMessagesReceived) === null || _v$onMessagesReceived === void 0 ? void 0 : _v$onMessagesReceived.call(v, messages);
    });
  }
  onCmdMessagesReceived(messages) {
    this._listeners.forEach(v => {
      var _v$onCmdMessagesRecei;
      (_v$onCmdMessagesRecei = v.onCmdMessagesReceived) === null || _v$onCmdMessagesRecei === void 0 ? void 0 : _v$onCmdMessagesRecei.call(v, messages);
    });
  }
  onMessagesRead(messages) {
    this._listeners.forEach(v => {
      var _v$onMessagesRead;
      (_v$onMessagesRead = v.onMessagesRead) === null || _v$onMessagesRead === void 0 ? void 0 : _v$onMessagesRead.call(v, messages);
    });
  }
  onGroupMessageRead(groupMessageAcks) {
    this._listeners.forEach(v => {
      var _v$onGroupMessageRead;
      (_v$onGroupMessageRead = v.onGroupMessageRead) === null || _v$onGroupMessageRead === void 0 ? void 0 : _v$onGroupMessageRead.call(v, groupMessageAcks);
    });
  }
  onMessagesDelivered(messages) {
    this._listeners.forEach(v => {
      var _v$onMessagesDelivere;
      (_v$onMessagesDelivere = v.onMessagesDelivered) === null || _v$onMessagesDelivere === void 0 ? void 0 : _v$onMessagesDelivere.call(v, messages);
    });
  }
  onMessagesRecalled(messages) {
    this._listeners.forEach(v => {
      var _v$onMessagesRecalled;
      (_v$onMessagesRecalled = v.onMessagesRecalled) === null || _v$onMessagesRecalled === void 0 ? void 0 : _v$onMessagesRecalled.call(v, messages);
    });
  }
  onConversationsUpdate() {
    this._listeners.forEach(v => {
      var _v$onConversationsUpd;
      (_v$onConversationsUpd = v.onConversationsUpdate) === null || _v$onConversationsUpd === void 0 ? void 0 : _v$onConversationsUpd.call(v);
    });
  }
  onConversationRead(from, to) {
    this._listeners.forEach(v => {
      var _v$onConversationRead;
      (_v$onConversationRead = v.onConversationRead) === null || _v$onConversationRead === void 0 ? void 0 : _v$onConversationRead.call(v, from, to);
    });
  }
  onMessageReactionDidChange(list) {
    this._listeners.forEach(v => {
      var _v$onMessageReactionD;
      (_v$onMessageReactionD = v.onMessageReactionDidChange) === null || _v$onMessageReactionD === void 0 ? void 0 : _v$onMessageReactionD.call(v, list);
    });
  }
  onChatMessageThreadCreated(event) {
    this._listeners.forEach(v => {
      var _v$onChatMessageThrea;
      (_v$onChatMessageThrea = v.onChatMessageThreadCreated) === null || _v$onChatMessageThrea === void 0 ? void 0 : _v$onChatMessageThrea.call(v, event);
    });
  }
  onChatMessageThreadUpdated(event) {
    this._listeners.forEach(v => {
      var _v$onChatMessageThrea2;
      (_v$onChatMessageThrea2 = v.onChatMessageThreadUpdated) === null || _v$onChatMessageThrea2 === void 0 ? void 0 : _v$onChatMessageThrea2.call(v, event);
    });
  }
  onChatMessageThreadDestroyed(event) {
    this._listeners.forEach(v => {
      var _v$onChatMessageThrea3;
      (_v$onChatMessageThrea3 = v.onChatMessageThreadDestroyed) === null || _v$onChatMessageThrea3 === void 0 ? void 0 : _v$onChatMessageThrea3.call(v, event);
    });
  }
  onChatMessageThreadUserRemoved(event) {
    this._listeners.forEach(v => {
      var _v$onChatMessageThrea4;
      (_v$onChatMessageThrea4 = v.onChatMessageThreadUserRemoved) === null || _v$onChatMessageThrea4 === void 0 ? void 0 : _v$onChatMessageThrea4.call(v, event);
    });
  }
  onMessageContentChanged(message, lastModifyOperatorId, lastModifyTime) {
    this._listeners.forEach(v => {
      var _v$onMessageContentCh;
      (_v$onMessageContentCh = v.onMessageContentChanged) === null || _v$onMessageContentCh === void 0 ? void 0 : _v$onMessageContentCh.call(v, message, lastModifyOperatorId, lastModifyTime);
    });
  }
  _initMessageListener() {
    gMessageListener = {
      onMessagesReceived: this.onMessagesReceived.bind(this),
      onCmdMessagesReceived: this.onCmdMessagesReceived.bind(this),
      onMessagesRead: this.onMessagesRead.bind(this),
      onGroupMessageRead: this.onGroupMessageRead.bind(this),
      onMessagesDelivered: this.onMessagesDelivered.bind(this),
      onMessagesRecalled: this.onMessagesRecalled.bind(this),
      onConversationsUpdate: this.onConversationsUpdate.bind(this),
      onConversationRead: this.onConversationRead.bind(this),
      onMessageReactionDidChange: this.onMessageReactionDidChange.bind(this),
      onChatMessageThreadCreated: this.onChatMessageThreadCreated.bind(this),
      onChatMessageThreadUpdated: this.onChatMessageThreadUpdated.bind(this),
      onChatMessageThreadDestroyed: this.onChatMessageThreadDestroyed.bind(this),
      onChatMessageThreadUserRemoved: this.onChatMessageThreadUserRemoved.bind(this),
      onMessageContentChanged: this.onMessageContentChanged.bind(this)
    };
    this.client.chatManager.addMessageListener(gMessageListener);
  }
  onInvitationReceived(params) {
    this._listeners.forEach(v => {
      var _v$onInvitationReceiv;
      (_v$onInvitationReceiv = v.onInvitationReceived) === null || _v$onInvitationReceiv === void 0 ? void 0 : _v$onInvitationReceiv.call(v, params);
    });
  }
  onRequestToJoinReceived(params) {
    this._listeners.forEach(v => {
      var _v$onRequestToJoinRec;
      (_v$onRequestToJoinRec = v.onRequestToJoinReceived) === null || _v$onRequestToJoinRec === void 0 ? void 0 : _v$onRequestToJoinRec.call(v, params);
    });
  }
  onRequestToJoinAccepted(params) {
    this._listeners.forEach(v => {
      var _v$onRequestToJoinAcc;
      (_v$onRequestToJoinAcc = v.onRequestToJoinAccepted) === null || _v$onRequestToJoinAcc === void 0 ? void 0 : _v$onRequestToJoinAcc.call(v, params);
    });
  }
  onRequestToJoinDeclined(params) {
    this._listeners.forEach(v => {
      var _v$onRequestToJoinDec;
      (_v$onRequestToJoinDec = v.onRequestToJoinDeclined) === null || _v$onRequestToJoinDec === void 0 ? void 0 : _v$onRequestToJoinDec.call(v, params);
    });
  }
  onInvitationAccepted(params) {
    this._listeners.forEach(v => {
      var _v$onInvitationAccept;
      (_v$onInvitationAccept = v.onInvitationAccepted) === null || _v$onInvitationAccept === void 0 ? void 0 : _v$onInvitationAccept.call(v, params);
    });
  }
  onInvitationDeclined(params) {
    this._listeners.forEach(v => {
      var _v$onInvitationDeclin;
      (_v$onInvitationDeclin = v.onInvitationDeclined) === null || _v$onInvitationDeclin === void 0 ? void 0 : _v$onInvitationDeclin.call(v, params);
    });
  }
  onMemberRemoved(params) {
    this._listeners.forEach(v => {
      var _v$onMemberRemoved;
      (_v$onMemberRemoved = v.onMemberRemoved) === null || _v$onMemberRemoved === void 0 ? void 0 : _v$onMemberRemoved.call(v, params);
    });
  }
  onDestroyed(params) {
    this._listeners.forEach(v => {
      var _v$onDestroyed;
      (_v$onDestroyed = v.onDestroyed) === null || _v$onDestroyed === void 0 ? void 0 : _v$onDestroyed.call(v, params);
    });
  }
  onAutoAcceptInvitation(params) {
    this._listeners.forEach(v => {
      var _v$onAutoAcceptInvita;
      (_v$onAutoAcceptInvita = v.onAutoAcceptInvitation) === null || _v$onAutoAcceptInvita === void 0 ? void 0 : _v$onAutoAcceptInvita.call(v, params);
    });
  }
  onMuteListAdded(params) {
    this._listeners.forEach(v => {
      var _v$onMuteListAdded;
      (_v$onMuteListAdded = v.onMuteListAdded) === null || _v$onMuteListAdded === void 0 ? void 0 : _v$onMuteListAdded.call(v, params);
    });
  }
  onMuteListRemoved(params) {
    this._listeners.forEach(v => {
      var _v$onMuteListRemoved;
      (_v$onMuteListRemoved = v.onMuteListRemoved) === null || _v$onMuteListRemoved === void 0 ? void 0 : _v$onMuteListRemoved.call(v, params);
    });
  }
  onAdminAdded(params) {
    this._listeners.forEach(v => {
      var _v$onAdminAdded;
      (_v$onAdminAdded = v.onAdminAdded) === null || _v$onAdminAdded === void 0 ? void 0 : _v$onAdminAdded.call(v, params);
    });
  }
  onAdminRemoved(params) {
    this._listeners.forEach(v => {
      var _v$onAdminRemoved;
      (_v$onAdminRemoved = v.onAdminRemoved) === null || _v$onAdminRemoved === void 0 ? void 0 : _v$onAdminRemoved.call(v, params);
    });
  }
  onOwnerChanged(params) {
    this._listeners.forEach(v => {
      var _v$onOwnerChanged;
      (_v$onOwnerChanged = v.onOwnerChanged) === null || _v$onOwnerChanged === void 0 ? void 0 : _v$onOwnerChanged.call(v, params);
    });
  }
  onMemberJoined(params) {
    this._listeners.forEach(v => {
      var _v$onMemberJoined;
      (_v$onMemberJoined = v.onMemberJoined) === null || _v$onMemberJoined === void 0 ? void 0 : _v$onMemberJoined.call(v, params);
    });
  }
  onMemberExited(params) {
    this._listeners.forEach(v => {
      var _v$onMemberExited;
      (_v$onMemberExited = v.onMemberExited) === null || _v$onMemberExited === void 0 ? void 0 : _v$onMemberExited.call(v, params);
    });
  }
  onAnnouncementChanged(params) {
    this._listeners.forEach(v => {
      var _v$onAnnouncementChan;
      (_v$onAnnouncementChan = v.onAnnouncementChanged) === null || _v$onAnnouncementChan === void 0 ? void 0 : _v$onAnnouncementChan.call(v, params);
    });
  }
  onSharedFileAdded(params) {
    this._listeners.forEach(v => {
      var _v$onSharedFileAdded;
      (_v$onSharedFileAdded = v.onSharedFileAdded) === null || _v$onSharedFileAdded === void 0 ? void 0 : _v$onSharedFileAdded.call(v, params);
    });
  }
  onSharedFileDeleted(params) {
    this._listeners.forEach(v => {
      var _v$onSharedFileDelete;
      (_v$onSharedFileDelete = v.onSharedFileDeleted) === null || _v$onSharedFileDelete === void 0 ? void 0 : _v$onSharedFileDelete.call(v, params);
    });
  }
  onAllowListAdded(params) {
    this._listeners.forEach(v => {
      var _v$onAllowListAdded;
      (_v$onAllowListAdded = v.onAllowListAdded) === null || _v$onAllowListAdded === void 0 ? void 0 : _v$onAllowListAdded.call(v, params);
    });
  }
  onAllowListRemoved(params) {
    this._listeners.forEach(v => {
      var _v$onAllowListRemoved;
      (_v$onAllowListRemoved = v.onAllowListRemoved) === null || _v$onAllowListRemoved === void 0 ? void 0 : _v$onAllowListRemoved.call(v, params);
    });
  }
  onAllGroupMemberMuteStateChanged(params) {
    this._listeners.forEach(v => {
      var _v$onAllGroupMemberMu;
      (_v$onAllGroupMemberMu = v.onAllGroupMemberMuteStateChanged) === null || _v$onAllGroupMemberMu === void 0 ? void 0 : _v$onAllGroupMemberMu.call(v, params);
    });
  }
  onDetailChanged(group) {
    this._listeners.forEach(v => {
      var _v$onDetailChanged;
      (_v$onDetailChanged = v.onDetailChanged) === null || _v$onDetailChanged === void 0 ? void 0 : _v$onDetailChanged.call(v, group);
    });
  }
  onStateChanged(group) {
    this._listeners.forEach(v => {
      var _v$onStateChanged;
      (_v$onStateChanged = v.onStateChanged) === null || _v$onStateChanged === void 0 ? void 0 : _v$onStateChanged.call(v, group);
    });
  }
  onMemberAttributesChanged(params) {
    this._listeners.forEach(v => {
      var _v$onMemberAttributes;
      (_v$onMemberAttributes = v.onMemberAttributesChanged) === null || _v$onMemberAttributes === void 0 ? void 0 : _v$onMemberAttributes.call(v, params);
    });
  }
  _initGroupListener() {
    gGroupListener = {
      onInvitationReceived: this.onInvitationReceived.bind(this),
      onRequestToJoinReceived: this.onRequestToJoinReceived.bind(this),
      onRequestToJoinAccepted: this.onRequestToJoinAccepted.bind(this),
      onRequestToJoinDeclined: this.onRequestToJoinDeclined.bind(this),
      onInvitationAccepted: this.onInvitationAccepted.bind(this),
      onInvitationDeclined: this.onInvitationDeclined.bind(this),
      onMemberRemoved: this.onMemberRemoved.bind(this),
      onDestroyed: this.onDestroyed.bind(this),
      onAutoAcceptInvitation: this.onAutoAcceptInvitation.bind(this),
      onMuteListAdded: this.onMuteListAdded.bind(this),
      onMuteListRemoved: this.onMuteListRemoved.bind(this),
      onAdminAdded: this.onAdminAdded.bind(this),
      onAdminRemoved: this.onAdminRemoved.bind(this),
      onOwnerChanged: this.onOwnerChanged.bind(this),
      onMemberJoined: this.onMemberJoined.bind(this),
      onMemberExited: this.onMemberExited.bind(this),
      onAnnouncementChanged: this.onAnnouncementChanged.bind(this),
      onSharedFileAdded: this.onSharedFileAdded.bind(this),
      onSharedFileDeleted: this.onSharedFileDeleted.bind(this),
      onAllowListAdded: this.onAllowListAdded.bind(this),
      onAllowListRemoved: this.onAllowListRemoved.bind(this),
      onAllGroupMemberMuteStateChanged: this.onAllGroupMemberMuteStateChanged.bind(this),
      onDetailChanged: this.onDetailChanged.bind(this),
      onStateChanged: this.onStateChanged.bind(this),
      onMemberAttributesChanged: this.onMemberAttributesChanged.bind(this)
    };
    this.client.groupManager.addGroupListener(gGroupListener);
  }
  onContactEvent(event, target, ext) {
    this._listeners.forEach(v => {
      var _v$onContactEvent;
      (_v$onContactEvent = v.onContactEvent) === null || _v$onContactEvent === void 0 ? void 0 : _v$onContactEvent.call(v, event, target, ext);
    });
  }
  onGroupEvent(event, target, usernames) {
    this._listeners.forEach(v => {
      var _v$onGroupEvent;
      (_v$onGroupEvent = v.onGroupEvent) === null || _v$onGroupEvent === void 0 ? void 0 : _v$onGroupEvent.call(v, event, target, usernames);
    });
  }
  onThreadEvent(event, target, usernames) {
    this._listeners.forEach(v => {
      var _v$onThreadEvent;
      (_v$onThreadEvent = v.onThreadEvent) === null || _v$onThreadEvent === void 0 ? void 0 : _v$onThreadEvent.call(v, event, target, usernames);
    });
  }
  onMessageRemoved(convId, deviceId) {
    this._listeners.forEach(v => {
      var _v$onMessageRemoved;
      (_v$onMessageRemoved = v.onMessageRemoved) === null || _v$onMessageRemoved === void 0 ? void 0 : _v$onMessageRemoved.call(v, convId, deviceId);
    });
  }
  onConversationEvent(event, convId, convType) {
    this._listeners.forEach(v => {
      var _v$onConversationEven;
      (_v$onConversationEven = v.onConversationEvent) === null || _v$onConversationEven === void 0 ? void 0 : _v$onConversationEven.call(v, event, convId, convType);
    });
  }
  _initMultiDeviceListener() {
    gMultiDeviceListener = {
      onContactEvent: this.onContactEvent.bind(this),
      onGroupEvent: this.onGroupEvent.bind(this),
      onThreadEvent: this.onThreadEvent.bind(this),
      onMessageRemoved: this.onMessageRemoved.bind(this),
      onConversationEvent: this.onConversationEvent.bind(this)
    };
    this.client.addMultiDeviceListener(gMultiDeviceListener);
  }
  _initCustomListener() {
    gCustomListener = {
      onDataReceived: params => {
        this._listeners.forEach(v => {
          var _v$onDataReceived;
          (_v$onDataReceived = v.onDataReceived) === null || _v$onDataReceived === void 0 ? void 0 : _v$onDataReceived.call(v, params);
        });
      }
    };
    this.client.addCustomListener(gCustomListener);
  }
  onContactAdded(userName) {
    this._listeners.forEach(v => {
      var _v$onContactAdded;
      (_v$onContactAdded = v.onContactAdded) === null || _v$onContactAdded === void 0 ? void 0 : _v$onContactAdded.call(v, userName);
    });
  }
  onContactDeleted(userName) {
    this._listeners.forEach(v => {
      var _v$onContactDeleted;
      (_v$onContactDeleted = v.onContactDeleted) === null || _v$onContactDeleted === void 0 ? void 0 : _v$onContactDeleted.call(v, userName);
    });
  }
  onContactInvited(userName, reason) {
    this._listeners.forEach(v => {
      var _v$onContactInvited;
      (_v$onContactInvited = v.onContactInvited) === null || _v$onContactInvited === void 0 ? void 0 : _v$onContactInvited.call(v, userName, reason);
    });
  }
  onFriendRequestAccepted(userName) {
    this._listeners.forEach(v => {
      var _v$onFriendRequestAcc;
      (_v$onFriendRequestAcc = v.onFriendRequestAccepted) === null || _v$onFriendRequestAcc === void 0 ? void 0 : _v$onFriendRequestAcc.call(v, userName);
    });
  }
  onFriendRequestDeclined(userName) {
    this._listeners.forEach(v => {
      var _v$onFriendRequestDec;
      (_v$onFriendRequestDec = v.onFriendRequestDeclined) === null || _v$onFriendRequestDec === void 0 ? void 0 : _v$onFriendRequestDec.call(v, userName);
    });
  }
  _initContactListener() {
    gContactListener = {
      onContactAdded: this.onContactAdded.bind(this),
      onContactDeleted: this.onContactDeleted.bind(this),
      onContactInvited: this.onContactInvited.bind(this),
      onFriendRequestAccepted: this.onFriendRequestAccepted.bind(this),
      onFriendRequestDeclined: this.onFriendRequestDeclined.bind(this)
    };
    this.client.contactManager.addContactListener(gContactListener);
  }
  _initPresenceListener() {
    gPresenceListener = {
      onPresenceStatusChanged: list => {
        this._listeners.forEach(v => {
          var _v$onPresenceStatusCh;
          (_v$onPresenceStatusCh = v.onPresenceStatusChanged) === null || _v$onPresenceStatusCh === void 0 ? void 0 : _v$onPresenceStatusCh.call(v, list);
        });
      }
    };
    this.client.presenceManager.addPresenceListener(gPresenceListener);
  }
  _initExtraListener() {}
  bindOnExcept(params) {
    console.error('dev:chat:except', params);
  }
  _initExceptListener() {
    gExceptListener = {
      onExcept: this.bindOnExcept.bind(this)
    };
    this.client.addExceptListener(gExceptListener);
  }
}
//# sourceMappingURL=chat.listener.js.map