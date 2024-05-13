import { ChatMessage } from 'react-native-chat-sdk';
import type { MessageModel, SystemMessageModel, TimeMessageModel } from '../ConversationDetail';
import type { BasicActionsProps } from './types';
export type UseMessageLongPressActionsProps = BasicActionsProps & {
    /**
     * Callback notification of copy completion.
     */
    onCopyFinished?: (content: string) => void;
    /**
     * Callback notification of quote message for input.
     */
    onQuoteMessageForInput?: (model: MessageModel) => void;
    /**
     * Callback notification of edit message for input.
     */
    onEditMessageForInput?: (model: MessageModel) => void;
    /**
     * Callback notification of show report message.
     */
    showReportMessage?: (model: MessageModel) => void;
    /**
     * Callback notification of delete message.
     */
    onDeleteMessage?: (msg: ChatMessage) => void;
    /**
     * Callback notification of recall message.
     */
    onRecallMessage?: (msg: ChatMessage, fromType: 'send' | 'recv') => void;
    /**
     * Callback notification of translate message.
     */
    onTranslateMessage?: (model: MessageModel) => void;
};
export declare function useMessageLongPressActions(props: UseMessageLongPressActionsProps): {
    onShowMessageLongPressActions: (_id: string, model: SystemMessageModel | TimeMessageModel | MessageModel) => void;
};
//# sourceMappingURL=useMessageLongPressActions.d.ts.map