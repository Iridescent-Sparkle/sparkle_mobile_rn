/// <reference types="react" />
import type { ContactListNavigationBarProps } from './types';
type _ContactListNavigationBarProps = ContactListNavigationBarProps & {
    selectedCount?: number;
    selectedMemberCount?: number;
    avatarUrl?: string;
    onClickedAddGroupParticipant?: () => void;
    onClickedCreateGroup?: () => void;
};
export declare const ContactListNavigationBar: (props: _ContactListNavigationBarProps) => JSX.Element | null;
export {};
//# sourceMappingURL=ContactList.navi.d.ts.map