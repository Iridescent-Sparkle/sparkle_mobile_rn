import type { ConversationModel } from '../../chat';
import type { BasicActionsProps } from './types';
export type ConversationLongPressActionsProps = BasicActionsProps & {
    /**
     * callback notification of disturb
     */
    onDisturb: (conv: ConversationModel) => Promise<void>;
    /**
     * callback notification of pin.
     */
    onPin: (conv: ConversationModel) => Promise<void>;
    /**
     * callback notification of read.
     */
    onRead: (conv: ConversationModel) => void;
    /**
     * callback notification of remove.
     */
    onRemove: (conv: ConversationModel) => Promise<void>;
};
export declare function useConversationLongPressActions(props: ConversationLongPressActionsProps): {
    onShowConversationLongPressActions: (conv: ConversationModel) => void;
};
//# sourceMappingURL=useConversationLongPressActions.d.ts.map