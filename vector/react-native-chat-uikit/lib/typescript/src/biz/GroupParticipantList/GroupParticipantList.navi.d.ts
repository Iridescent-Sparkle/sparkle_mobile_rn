/// <reference types="react" />
import type { GroupParticipantListNavigationBarProps } from './types';
type _GroupParticipantListNavigationBarProps = GroupParticipantListNavigationBarProps & {
    groupId: string;
    ownerId?: string;
    onDelParticipant?: () => void;
    deleteCount?: number;
    participantCount?: number;
};
export declare const GroupParticipantListNavigationBar: (props: _GroupParticipantListNavigationBarProps) => JSX.Element;
export {};
//# sourceMappingURL=GroupParticipantList.navi.d.ts.map