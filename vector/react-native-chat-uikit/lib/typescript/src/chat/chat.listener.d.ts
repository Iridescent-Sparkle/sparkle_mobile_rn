import { ChatClient, ChatConversationType, ChatGroup, ChatGroupMessageAck, ChatMessage, ChatMessageReactionEvent, ChatMessageThreadEvent, ChatMultiDeviceEvent } from 'react-native-chat-sdk';
import type { ChatException } from 'react-native-chat-sdk/lib/typescript/common/ChatError';
import { ChatServiceListener } from './types';
import { UIListener, UIListenerType } from './types.ui';
export declare class ChatServiceListenerImpl {
    _listeners: Set<ChatServiceListener>;
    _uiListeners: Map<UIListenerType, Set<UIListener<any>>>;
    constructor();
    get client(): ChatClient;
    get listeners(): Set<ChatServiceListener>;
    uiListener<DataModel>(type: UIListenerType): Set<UIListener<DataModel>>;
    addListener(listener: ChatServiceListener): void;
    removeListener(listener: ChatServiceListener): void;
    clearListener(): void;
    addUIListener<DataModel>(listener: UIListener<DataModel>): void;
    removeUIListener<DataModel>(listener: UIListener<DataModel>): void;
    clearUIListener(): void;
    sendUIEvent<DataModel>(type: UIListenerType, event: keyof UIListener<DataModel>, data?: DataModel | string, ...args: any[]): void;
    _initListener(): void;
    _unInitListener(): void;
    _clearListener(): void;
    onConnected(): void;
    onDisconnected(): void;
    onTokenWillExpire(): void;
    onTokenDidExpire(): void;
    onAppActiveNumberReachLimit(): void;
    onUserDidLoginFromOtherDevice(): void;
    onUserDidRemoveFromServer(): void;
    onUserDidForbidByServer(): void;
    onUserDidChangePassword(): void;
    onUserDidLoginTooManyDevice(): void;
    onUserKickedByOtherDevice(): void;
    onUserAuthenticationFailed(): void;
    _initConnectListener(): void;
    onMessagesReceived(messages: Array<ChatMessage>): void;
    onCmdMessagesReceived(messages: Array<ChatMessage>): void;
    onMessagesRead(messages: Array<ChatMessage>): void;
    onGroupMessageRead(groupMessageAcks: Array<ChatGroupMessageAck>): void;
    onMessagesDelivered(messages: Array<ChatMessage>): void;
    onMessagesRecalled(messages: Array<ChatMessage>): void;
    onConversationsUpdate(): void;
    onConversationRead(from: string, to?: string): void;
    onMessageReactionDidChange(list: Array<ChatMessageReactionEvent>): void;
    onChatMessageThreadCreated(event: ChatMessageThreadEvent): void;
    onChatMessageThreadUpdated(event: ChatMessageThreadEvent): void;
    onChatMessageThreadDestroyed(event: ChatMessageThreadEvent): void;
    onChatMessageThreadUserRemoved(event: ChatMessageThreadEvent): void;
    onMessageContentChanged(message: ChatMessage, lastModifyOperatorId: string, lastModifyTime: number): void;
    _initMessageListener(): void;
    onInvitationReceived(params: {
        groupId: string;
        inviter: string;
        groupName: string;
        reason?: string;
    }): void;
    onRequestToJoinReceived(params: {
        groupId: string;
        applicant: string;
        groupName?: string;
        reason?: string;
    }): void;
    onRequestToJoinAccepted(params: {
        groupId: string;
        accepter: string;
        groupName?: string;
    }): void;
    onRequestToJoinDeclined(params: {
        groupId: string;
        decliner: string;
        groupName?: string;
        applicant?: string;
        reason?: string;
    }): void;
    onInvitationAccepted(params: {
        groupId: string;
        invitee: string;
        reason?: string;
    }): void;
    onInvitationDeclined(params: {
        groupId: string;
        invitee: string;
        reason?: string;
    }): void;
    onMemberRemoved(params: {
        groupId: string;
        groupName?: string;
    }): void;
    onDestroyed(params: {
        groupId: string;
        groupName?: string;
    }): void;
    onAutoAcceptInvitation(params: {
        groupId: string;
        inviter: string;
        inviteMessage?: string;
    }): void;
    onMuteListAdded(params: {
        groupId: string;
        mutes: Array<string>;
        muteExpire?: number;
    }): void;
    onMuteListRemoved(params: {
        groupId: string;
        mutes: Array<string>;
    }): void;
    onAdminAdded(params: {
        groupId: string;
        admin: string;
    }): void;
    onAdminRemoved(params: {
        groupId: string;
        admin: string;
    }): void;
    onOwnerChanged(params: {
        groupId: string;
        newOwner: string;
        oldOwner: string;
    }): void;
    onMemberJoined(params: {
        groupId: string;
        member: string;
    }): void;
    onMemberExited(params: {
        groupId: string;
        member: string;
    }): void;
    onAnnouncementChanged(params: {
        groupId: string;
        announcement: string;
    }): void;
    onSharedFileAdded(params: {
        groupId: string;
        sharedFile: string;
    }): void;
    onSharedFileDeleted(params: {
        groupId: string;
        fileId: string;
    }): void;
    onAllowListAdded(params: {
        groupId: string;
        members: Array<string>;
    }): void;
    onAllowListRemoved(params: {
        groupId: string;
        members: Array<string>;
    }): void;
    onAllGroupMemberMuteStateChanged(params: {
        groupId: string;
        isAllMuted: boolean;
    }): void;
    onDetailChanged(group: ChatGroup): void;
    onStateChanged(group: ChatGroup): void;
    onMemberAttributesChanged(params: {
        groupId: string;
        member: string;
        attributes: any;
        operator: string;
    }): void;
    _initGroupListener(): void;
    onContactEvent(event?: ChatMultiDeviceEvent, target?: string, ext?: string): void;
    onGroupEvent(event?: ChatMultiDeviceEvent, target?: string, usernames?: Array<string>): void;
    onThreadEvent(event?: ChatMultiDeviceEvent, target?: string, usernames?: Array<string>): void;
    onMessageRemoved(convId?: string, deviceId?: string): void;
    onConversationEvent(event?: ChatMultiDeviceEvent, convId?: string, convType?: ChatConversationType): void;
    _initMultiDeviceListener(): void;
    _initCustomListener(): void;
    onContactAdded(userName: string): void;
    onContactDeleted(userName: string): void;
    onContactInvited(userName: string, reason?: string): void;
    onFriendRequestAccepted(userName: string): void;
    onFriendRequestDeclined(userName: string): void;
    _initContactListener(): void;
    _initPresenceListener(): void;
    _initExtraListener(): void;
    bindOnExcept(params: {
        except: ChatException;
        from?: string | undefined;
        extra?: Record<string, string> | undefined;
    }): void;
    _initExceptListener(): void;
}
//# sourceMappingURL=chat.listener.d.ts.map