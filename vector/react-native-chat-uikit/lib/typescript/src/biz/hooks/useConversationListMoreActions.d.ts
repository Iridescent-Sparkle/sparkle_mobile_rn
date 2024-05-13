import type { BasicActionsProps } from './types';
export type UseConversationListMoreActionsProps = BasicActionsProps & {
    /**
     * callback notification of new conversation.
     *
     * Routing operations are usually required.
     */
    onClickedNewConversation?: () => void;
    /**
     * callback notification of new group.
     *
     * Routing operations are usually required.
     */
    onClickedNewGroup?: () => void;
    /**
     * callback notification of new contact.
     *
     * Routing operations are usually required.
     */
    onClickedNewContact?: () => void;
    /**
     * Add contact callback.
     */
    onAddContact: (userId: string) => void;
};
export declare function useConversationListMoreActions(props: UseConversationListMoreActionsProps): {
    onShowConversationListMoreActions: () => void;
};
//# sourceMappingURL=useConversationListMoreActions.d.ts.map