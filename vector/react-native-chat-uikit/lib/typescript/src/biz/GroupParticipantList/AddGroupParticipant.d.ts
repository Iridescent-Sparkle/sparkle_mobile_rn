/// <reference types="react" />
import { ResultCallback } from '../../chat';
import { ContactListProps } from '../ContactList';
/**
 * Add Group Participant Component properties.
 */
export type AddGroupParticipantProps = Pick<ContactListProps, 'containerStyle' | 'onClickedItem' | 'onClickedSearch' | 'selectedData' | 'onBack'> & {
    /**
     * Add group participant result callback.
     */
    onAddedResult?: ResultCallback<void>;
    /**
     * Group ID.
     */
    groupId: string;
};
/**
 * Add Group Participant Component.
 */
export declare function AddGroupParticipant(props: AddGroupParticipantProps): JSX.Element;
//# sourceMappingURL=AddGroupParticipant.d.ts.map