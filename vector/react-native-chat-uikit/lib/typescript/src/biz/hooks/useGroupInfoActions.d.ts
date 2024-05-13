/// <reference types="react" />
import type { BasicActionsProps } from './types';
export type useGroupInfoActionsProps = BasicActionsProps & {
    /**
     * callback notification of quit group.
     */
    onQuitGroup?: (groupId: string) => void;
    onClickedChangeGroupOwner?: (groupId: string, ownerId: string) => void;
    onDestroyGroup?: (groupId: string) => void;
};
export declare function useGroupInfoActions(props: useGroupInfoActionsProps): {
    onShowGroupInfoActions: (userId: string, ownerId: string, groupId: string) => void;
    menuRef: import("react").RefObject<import("../BottomSheetMenu").BottomSheetNameMenuRef>;
    alertRef: import("react").RefObject<import("../..").AlertRef>;
};
//# sourceMappingURL=useGroupInfoActions.d.ts.map