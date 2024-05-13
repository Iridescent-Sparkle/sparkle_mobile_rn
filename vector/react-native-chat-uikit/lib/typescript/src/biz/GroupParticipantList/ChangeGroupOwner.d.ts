/// <reference types="react" />
import { ResultCallback } from '../../chat';
import type { GroupParticipantListProps } from './types';
/**
 * Change Group Owner Component properties.
 */
export type ChangeGroupOwnerProps = Pick<GroupParticipantListProps, 'groupId' | 'containerStyle' | 'onBack' | 'onClickedItem' | 'onError' | 'testMode'> & {
    /**
     * Change group owner result callback.
     */
    onChangeResult?: ResultCallback<string>;
};
/**
 * Change Group Owner Component.
 */
export declare function ChangeGroupOwner(props: ChangeGroupOwnerProps): JSX.Element;
//# sourceMappingURL=ChangeGroupOwner.d.ts.map