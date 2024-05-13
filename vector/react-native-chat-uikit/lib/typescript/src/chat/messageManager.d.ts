import { ChatConversationType, ChatGroupMessageAck, ChatMessage } from 'react-native-chat-sdk';
import type { MessageCacheManager, MessageManagerListener } from './messageManager.types';
import type { ChatService, ChatServiceListener } from './types';
import type { ConversationModel } from './types.ui';
/**
 * Message Cache Manager Implementation.
 */
export declare class MessageCacheManagerImpl implements MessageCacheManager {
    _client: ChatService;
    _listener?: ChatServiceListener;
    _userListener: Map<string, MessageManagerListener>;
    _sendList: Map<string, {
        msg: ChatMessage;
    }>;
    _downloadList: Map<string, {
        msg: ChatMessage;
    }>;
    _recallTimeout: number;
    constructor(client: ChatService);
    init(): void;
    unInit(): void;
    reset(): void;
    addListener(key: string, listener: MessageManagerListener): void;
    removeListener(key: string): void;
    emitSendMessageChanged(msg: ChatMessage): void;
    emitSendMessageProgressChanged(msg: ChatMessage): void;
    emitSendMessageBefore(msg: ChatMessage): void;
    emitRecallMessageBefore(msg: ChatMessage): void;
    emitRecallMessageChanged(params: {
        isOk: boolean;
        orgMsg?: ChatMessage;
        tipMsg?: ChatMessage;
    }): void;
    emitRecvMessageStateChanged(msg: ChatMessage): void;
    emitAttachmentChanged(msg: ChatMessage): void;
    emitAttachmentProgressChanged(msg: ChatMessage): void;
    emitConversationUnreadCountChanged(): void;
    bindOnMessagesReceived(messages: Array<ChatMessage>): void;
    bindOnMessagesRead(messages: Array<ChatMessage>): void;
    bindOnGroupMessageRead(_groupMessageAcks: Array<ChatGroupMessageAck>): void;
    bindOnMessagesDelivered(messages: Array<ChatMessage>): void;
    bindOnMessagesRecalled(messages: Array<ChatMessage>): void;
    bindOnMessageContentChanged(message: ChatMessage, lastModifyOperatorId: string, _lastModifyTime: number): void;
    setCurrentConv(conv?: ConversationModel): void;
    getCurrentConv(): ConversationModel | undefined;
    sendMessageReadAck(params: {
        message: ChatMessage;
    }): void;
    setMessageRead(params: {
        convId: string;
        convType: ChatConversationType;
        message: ChatMessage;
    }): void;
    sendMessage(msg: ChatMessage): Promise<void>;
    resendMessage(msg: ChatMessage): Promise<void>;
    createRecallMessageTip(msg: ChatMessage): ChatMessage;
    recallMessage(msg: ChatMessage): Promise<void>;
    downloadAttachment(msg: ChatMessage): Promise<void>;
    loadHistoryMessage(params: {
        convId: string;
        convType: ChatConversationType;
        startMsgId: string;
        loadCount: number;
        onResult: (msgs: ChatMessage[]) => void;
    }): void;
    setRecallMessageTimeout(recallTimeout?: number): void;
}
//# sourceMappingURL=messageManager.d.ts.map