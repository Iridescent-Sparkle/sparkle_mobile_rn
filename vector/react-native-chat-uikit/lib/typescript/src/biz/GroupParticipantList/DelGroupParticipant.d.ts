/// <reference types="react" />
import { ResultCallback } from '../../chat';
import type { GroupParticipantListProps } from './types';
/**
 * Delete Group Participant Component properties.
 */
export type DelGroupParticipantProps = Pick<GroupParticipantListProps, 'groupId' | 'containerStyle' | 'onBack' | 'onClickedItem' | 'onError' | 'testMode'> & {
    /**
     * Delete group participant result callback.
     */
    onDelResult?: ResultCallback<void>;
};
/**
 * Delete Group Participant Component.
 */
export declare function DelGroupParticipant(props: DelGroupParticipantProps): JSX.Element;
//# sourceMappingURL=DelGroupParticipant.d.ts.map