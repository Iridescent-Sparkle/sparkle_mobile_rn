import { ChatMessage, ChatMessageType } from 'react-native-chat-sdk';
import type { IconNameType } from '../../assets';
import type { MessageStateType } from './types';
export declare function isSupportMessage(msg: ChatMessage): boolean;
export declare function getMessageState(msg: ChatMessage): MessageStateType;
export declare function getStateIcon(state: MessageStateType): IconNameType;
export declare function getStateIconColor(state: MessageStateType): string;
export declare function getImageThumbUrl(msg: ChatMessage): Promise<string>;
export declare function getVideoThumbUrl(msg: ChatMessage): Promise<string>;
export declare function getImageShowSize(msg: ChatMessage, maxW?: number): {
    width: number;
    height: number;
};
export declare function getImageSizeFromUrl(url: string, onFinished: (result: {
    isOk: boolean;
    width?: number;
    height?: number;
}) => void): void;
export declare function getFileSize(size: number): string;
export declare function getMessageBubblePadding(msg: ChatMessage): {
    paddingHorizontal: undefined;
    paddingVertical: undefined;
} | {
    paddingHorizontal: number;
    paddingVertical: number;
};
export declare function isQuoteMessage(msg: ChatMessage, _msgQuote?: ChatMessage): boolean;
export declare function getQuoteAttribute(msg: ChatMessage, _msgQuote?: ChatMessage): {
    msgID: string;
    msgPreview: string;
    msgSender: string;
    msgType: ChatMessageType;
} | undefined;
export declare function getSystemTip(msg: ChatMessage, tr: (key: string, ...args: any[]) => string): string;
//# sourceMappingURL=MessageListItem.hooks.d.ts.map