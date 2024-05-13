import { ChatClient, ChatContact, ChatConversation, ChatConversationType, ChatGroup, ChatMessage, ChatMessageStatusCallback, ChatSearchDirection, ChatUserInfo } from 'react-native-chat-sdk';
import { ConversationStorage } from '../db/storage';
import { UIKitError } from '../error';
import { ChatServiceListenerImpl } from './chat.listener';
import type { MessageCacheManager } from './messageManager.types';
import type { RequestList } from './requestList.types';
import type { ChatEventType, ChatOptionsType, ChatService, ChatServiceListener, ConversationServices, DataModel, DataModelType, ResultCallback, UserData, UserFrom } from './types';
import { ContactModel, ConversationModel, GroupModel, GroupParticipantModel, StateModel, UIListener, UIListenerType } from './types.ui';
export declare class ChatServiceImpl extends ChatServiceListenerImpl implements ChatService, ConversationServices {
    _user?: UserData;
    _dataList: Map<string, DataModel>;
    _userList: Map<string, UserData>;
    _convStorage?: ConversationStorage;
    _convList: Map<string, ConversationModel>;
    _contactList: Map<string, ContactModel>;
    _groupList: Map<string, GroupModel>;
    _groupMemberList: Map<string, Map<string, GroupParticipantModel>>;
    _request: RequestList;
    _messageManager: MessageCacheManager;
    _modelState: Map<string, Map<string, StateModel>>;
    _currentConversation?: ConversationModel;
    _silentModeList: Map<string, {
        convId: string;
        doNotDisturb?: boolean;
    }>;
    _convDataRequestCallback?: (params: {
        ids: Map<DataModelType, string[]>;
        result: (data?: Map<DataModelType, DataModel[]> | undefined, error?: UIKitError) => void | Promise<void>;
    }) => void;
    _contactDataRequestCallback: ((params: {
        ids: string[];
        result: (data?: DataModel[], error?: UIKitError) => void;
    }) => void | Promise<void>) | undefined;
    _groupDataRequestCallback: ((params: {
        ids: string[];
        result: (data?: DataModel[], error?: UIKitError) => void;
    }) => void | Promise<void>) | undefined;
    _groupParticipantDataRequestCallback: ((params: {
        groupId: string;
        ids: string[];
        result: (data?: DataModel[], error?: UIKitError) => void;
    }) => void | Promise<void>) | undefined;
    _basicDataRequestCallback?: ((params: {
        ids: Map<DataModelType, string[]>;
        result: (data?: Map<DataModelType, DataModel[]>, error?: UIKitError) => void;
    }) => void) | ((params: {
        ids: Map<DataModelType, string[]>;
        result: (data?: Map<DataModelType, DataModel[]>, error?: UIKitError) => void;
    }) => Promise<void>);
    _groupNameOnCreateGroupCallback?: (params: {
        selected: ContactModel[];
    }) => string;
    constructor();
    reset(): void;
    init(params: {
        options: ChatOptionsType;
        result?: (params: {
            isOk: boolean;
            error?: UIKitError;
        }) => void;
    }): Promise<void>;
    addListener(listener: ChatServiceListener): void;
    removeListener(listener: ChatServiceListener): void;
    clearListener(): void;
    addUIListener<DataModel>(listener: UIListener<DataModel>): void;
    removeUIListener<DataModel>(listener: UIListener<DataModel>): void;
    clearUIListener(): void;
    sendUIEvent<DataModel>(type: UIListenerType, event: keyof UIListener<DataModel>, data?: DataModel | string, ...args: DataModel[]): void;
    _fromChatError(error: any): string | undefined;
    _createUserDir(): Promise<void>;
    get client(): ChatClient;
    login(params: {
        userId: string;
        userToken: string;
        userName: string;
        userAvatarURL?: string | undefined;
        usePassword?: boolean;
        result: (params: {
            isOk: boolean;
            error?: UIKitError;
        }) => void;
    }): Promise<void>;
    logout(params: {
        unbindDeviceToken?: boolean;
        result?: (params: {
            isOk: boolean;
            error?: UIKitError;
        }) => void;
    }): Promise<void>;
    autoLogin(params: {
        userId: string;
        userToken: string;
        userName?: string;
        userAvatarURL?: string;
        result: (params: {
            isOk: boolean;
            error?: UIKitError;
        }) => void;
    }): Promise<void>;
    loginState(): Promise<'logged' | 'noLogged'>;
    refreshToken(params: {
        token: string;
        result?: (params: {
            isOk: boolean;
            error?: UIKitError;
        }) => void;
    }): Promise<void>;
    get userId(): string | undefined;
    user(userId?: string): UserData | undefined;
    setUser(params: {
        users: UserData[];
    }): void;
    sendError(params: {
        error: UIKitError;
        from?: string;
        extra?: any;
    }): void;
    sendFinished(params: {
        event: ChatEventType;
        extra?: any;
    }): void;
    sendBefore(params: {
        event: ChatEventType;
        extra?: any;
    }): void;
    get requestList(): RequestList;
    get messageManager(): MessageCacheManager;
    tryCatch<T>(params: {
        promise: Promise<T>;
        event: string;
        onFinished?: ((value: T) => Promise<void | boolean> | void | boolean) | undefined;
        onError?: ((e: UIKitError) => void | boolean) | undefined;
    }): void;
    tryCatchSync<T>(params: {
        promise: Promise<T>;
        event: string;
    }): Promise<T>;
    toUserData(user: ChatUserInfo, from?: {
        type: UserFrom;
        groupId?: string;
    }): UserData;
    _getAvatarFromCache(id: string): string | undefined;
    _getNameFromCache(id: string): string | undefined;
    _getDoNotDisturbFromCache(convId: string): boolean | undefined;
    toUIConversation(conv: ChatConversation): Promise<ConversationModel>;
    toUIContact(contact: ChatContact): ContactModel;
    toUIGroup(group: ChatGroup): GroupModel;
    setContactOnRequestData<DataT extends DataModel = DataModel>(callback?: (params: {
        ids: string[];
        result: (data?: DataT[], error?: UIKitError) => void;
    }) => void): void;
    setGroupOnRequestData<DataT extends DataModel = DataModel>(callback?: (params: {
        ids: string[];
        result: (data?: DataT[], error?: UIKitError) => void;
    }) => void): void;
    setGroupParticipantOnRequestData<DataT extends DataModel = DataModel>(callback?: (params: {
        groupId: string;
        ids: string[];
        result: (data?: DataT[], error?: UIKitError) => void;
    }) => void | Promise<void>): void;
    updateGroupParticipantOnRequestData(params: {
        groupId: string;
        data: Map<DataModelType, DataModel[]>;
    }): void;
    setOnRequestMultiData<DataT extends DataModel = DataModel>(callback?: (params: {
        ids: Map<DataModelType, string[]>;
        result: (data?: Map<DataModelType, DataT[]>, error?: UIKitError) => void;
    }) => void): void;
    setGroupNameOnCreateGroup(callback: (params: {
        selected: ContactModel[];
    }) => string): void;
    getCreateGroupCustomNameCallback(): ((params: {
        selected: ContactModel[];
    }) => string) | undefined;
    setOnRequestData(callback?: ((params: {
        ids: Map<DataModelType, string[]>;
        result: (data?: Map<DataModelType, DataModel[]>, error?: UIKitError) => void;
    }) => void) | ((params: {
        ids: Map<DataModelType, string[]>;
        result: (data?: Map<DataModelType, DataModel[]>, error?: UIKitError) => void;
    }) => Promise<void>)): void;
    updateRequestData(params: {
        data: Map<DataModelType, DataModel[]>;
    }): void;
    getRequestData(id: string): DataModel | undefined;
    _requestConvData(list: ChatConversation[]): Promise<void>;
    _requestData(list: string[], type?: DataModelType): Promise<void>;
    _requestGroupMemberData(groupId: string, list: GroupParticipantModel[]): Promise<void>;
    setCurrentConversation(params: {
        conv?: ConversationModel;
    }): void;
    getCurrentConversation(): ConversationModel | undefined;
    /**
     * @description Get the current user all conversation list.
     * @params params
     * - onResult: The callback function of the result.
     */
    getAllConversations(params: {
        onResult: ResultCallback<ConversationModel[]>;
    }): Promise<void>;
    getConversation(params: {
        convId: string;
        convType: ChatConversationType;
        createIfNotExist?: boolean;
        fromNative?: boolean;
    }): Promise<ConversationModel | undefined>;
    removeConversationAllMessages(params: {
        convId: string;
        convType: ChatConversationType;
    }): Promise<void>;
    removeConversation(params: {
        convId: string;
        removeMessage?: boolean;
    }): Promise<void>;
    clearAllConversations(): Promise<void>;
    setConversationPin(params: {
        convId: string;
        convType: ChatConversationType;
        isPin: boolean;
    }): Promise<void>;
    setConversationSilentMode(params: {
        convId: string;
        convType: ChatConversationType;
        doNotDisturb: boolean;
    }): Promise<void>;
    setConversationRead(params: {
        convId: string;
        convType: ChatConversationType;
    }): Promise<void>;
    setConversationExt(params: {
        convId: string;
        convType: ChatConversationType;
        ext: Record<string, string | number | boolean>;
    }): Promise<void>;
    getConversationMessageCount(convId: string, convType: ChatConversationType): Promise<number>;
    getConversationLatestMessage(convId: string, convType: ChatConversationType): Promise<ChatMessage | undefined>;
    getDoNotDisturb(convId: string, convType: ChatConversationType): Promise<boolean>;
    isContact(params: {
        userId: string;
    }): boolean;
    getAllContacts(params: {
        onResult: ResultCallback<ContactModel[]>;
    }): void;
    getContact(params: {
        userId: string;
        useUserData?: boolean;
        onResult: ResultCallback<ContactModel | undefined>;
    }): void;
    addNewContact(params: {
        userId: string;
        reason?: string;
        onResult?: ResultCallback<void>;
    }): void;
    removeContact(params: {
        userId: string;
        onResult?: ResultCallback<void>;
    }): void;
    setContactRemark(params: {
        userId: string;
        remark: string;
        onResult?: ResultCallback<void>;
    }): void;
    acceptInvitation(params: {
        userId: string;
        onResult: ResultCallback<void>;
    }): void;
    declineInvitation(params: {
        userId: string;
        onResult: ResultCallback<void>;
    }): void;
    setModelState(params: {
        tag: string;
        id: string;
        state: StateModel;
    }): void;
    getModelState(params: {
        tag: string;
        id: string;
    }): StateModel | undefined;
    clearModelState(params: {
        tag: string;
    }): void;
    getJoinedGroups(params: {
        onResult: ResultCallback<GroupModel[]>;
    }): void;
    getPageGroups(params: {
        pageSize: number;
        pageNum: number;
        onResult: ResultCallback<GroupModel[]>;
    }): void;
    getGroupAllMembers(params: {
        groupId: string;
        isReset?: boolean;
        owner?: GroupParticipantModel;
        onResult: ResultCallback<GroupParticipantModel[]>;
    }): void;
    getGroupOwner(params: {
        groupId: string;
    }): Promise<GroupParticipantModel | undefined>;
    getGroupMember(params: {
        groupId: string;
        userId: string;
    }): GroupParticipantModel | undefined;
    fetchJoinedGroupCount(params: {
        onResult: ResultCallback<number>;
    }): void;
    getGroupInfoFromServer(params: {
        groupId: string;
        onResult: ResultCallback<GroupModel>;
    }): void;
    getGroupInfo(params: {
        groupId: string;
        onResult: ResultCallback<GroupModel>;
    }): void;
    createGroup(params: {
        groupName: string;
        groupDescription?: string;
        inviteMembers: string[];
        onResult?: ResultCallback<GroupModel>;
    }): void;
    quitGroup(params: {
        groupId: string;
        onResult?: ResultCallback<void>;
    }): void;
    destroyGroup(params: {
        groupId: string;
        onResult?: ResultCallback<void>;
    }): void;
    setGroupName(params: {
        groupId: string;
        groupNewName: string;
        onResult?: ResultCallback<void>;
    }): void;
    setGroupDescription(params: {
        groupId: string;
        groupDescription: string;
        onResult?: ResultCallback<void>;
    }): void;
    setGroupMyRemark(params: {
        groupId: string;
        memberId: string;
        groupMyRemark: string;
        ext?: Record<string, string>;
        onResult?: ResultCallback<void>;
    }): void;
    getGroupMyRemark(params: {
        groupId: string;
        memberId: string;
        onResult: ResultCallback<string | undefined>;
    }): void;
    addGroupMembers(params: {
        groupId: string;
        members: GroupParticipantModel[];
        welcomeMessage?: string;
        onResult: ResultCallback<void>;
    }): void;
    removeGroupMembers(params: {
        groupId: string;
        members: string[];
        onResult: ResultCallback<void>;
    }): void;
    changeGroupOwner(params: {
        groupId: string;
        newOwnerId: string;
        onResult?: ResultCallback<void>;
    }): void;
    getUserInfo(params: {
        userId: string;
        onResult: ResultCallback<UserData | undefined>;
    }): void;
    getUsersInfo(params: {
        userIds: string[];
        onResult: ResultCallback<UserData[]>;
    }): void;
    updateSelfInfo(params: {
        self: UserData;
        onResult: ResultCallback<void>;
    }): void;
    getMessage(params: {
        messageId: string;
    }): Promise<ChatMessage | undefined>;
    resendMessage(params: {
        message: ChatMessage;
        callback: ChatMessageStatusCallback;
    }): void;
    recallMessage(params: {
        message: ChatMessage;
        onResult: ResultCallback<void>;
    }): void;
    insertMessage(params: {
        message: ChatMessage;
        onResult: ResultCallback<void>;
    }): void;
    updateMessage(params: {
        message: ChatMessage;
        onResult: ResultCallback<void>;
    }): void;
    removeMessage(params: {
        message: ChatMessage;
        onResult: ResultCallback<void>;
    }): void;
    editMessage(params: {
        message: ChatMessage;
        onResult: ResultCallback<ChatMessage>;
    }): void;
    getNewRequestList(params: {
        convId: string;
        convType: ChatConversationType;
        timestamp?: number;
        pageSize?: number;
        direction?: ChatSearchDirection;
        onResult: ResultCallback<ChatMessage[]>;
    }): void;
    sendMessage(params: {
        message: ChatMessage;
        callback?: ChatMessageStatusCallback;
    }): void;
    downloadMessageAttachment(params: {
        message: ChatMessage;
        callback?: ChatMessageStatusCallback;
    }): void;
    getHistoryMessage(params: {
        convId: string;
        convType: ChatConversationType;
        startMsgId: string;
        direction: ChatSearchDirection;
        loadCount: number;
        onResult: ResultCallback<ChatMessage[]>;
    }): void;
    userInfoFromMessage(msg?: ChatMessage): UserData | undefined;
    setUserInfoToMessage(params: {
        msg: ChatMessage;
        user?: UserData;
    }): void;
    setMessageRead(params: {
        convId: string;
        convType: ChatConversationType;
        msgId: string;
        onResult: ResultCallback<void>;
    }): void;
    sendMessageReadAck(params: {
        message: ChatMessage;
        onResult: ResultCallback<void>;
    }): void;
    reportMessage(params: {
        messageId: string;
        tag: string;
        reason: string;
        onResult: ResultCallback<void>;
    }): void;
    subPresence(params: {
        userIds: string[];
        onResult: ResultCallback<void>;
    }): void;
    unSubPresence(params: {
        userIds: string[];
        onResult: ResultCallback<void>;
    }): void;
    publishPresence(params: {
        status: string;
        onResult: ResultCallback<void>;
    }): void;
    fetchPresence(params: {
        userIds: string[];
        onResult: ResultCallback<string[]>;
    }): void;
}
export declare function getChatServiceImpl(): ChatService;
//# sourceMappingURL=chat.impl.d.ts.map