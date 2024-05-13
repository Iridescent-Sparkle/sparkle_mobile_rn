/// <reference types="react" />
import { ChatMessage } from 'react-native-chat-sdk';
/**
 * Message Input Quote View Component properties.
 */
export type MessageInputQuoteViewProps = {
    showQuote: boolean;
    onDel: () => void;
    msg?: ChatMessage;
};
/**
 * Message Input Quote View Component.
 */
export declare const MessageInputQuoteView: (props: MessageInputQuoteViewProps) => JSX.Element | null;
//# sourceMappingURL=MessageInputQuoteView.d.ts.map