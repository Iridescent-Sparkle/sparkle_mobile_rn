import * as React from 'react';
import type { IconNameType } from '../../assets';
import { BottomSheetMenuRef } from './BottomSheetMenu';
export type InitMenuItemsType = {
    /**
     * The text to be displayed.
     */
    name: string;
    /**
     * Whether the text is highlighted.
     */
    isHigh: boolean;
    /**
     * The icon to be displayed.
     */
    icon?: IconNameType;
    /**
     * The callback function when the text is clicked.
     *
     * @param name The text to be displayed.
     * @param others Other parameters. You can pass in the parameters you need. For example, you can pass in the user ID.
     */
    onClicked?: (name: string, others?: any) => void;
};
export type BottomSheetNameMenuRef = Omit<BottomSheetMenuRef, 'startShowWithInit'> & {
    startShowWithInit: (initItems: InitMenuItemsType[], others?: any) => void;
    startShowWithProps: (props: BottomSheetNameMenuProps) => void;
};
export type BottomSheetNameMenuProps = {
    /**
     * To request to close the component, you usually need to call the `startHide` method here.
     */
    onRequestModalClose: () => void;
    /**
     * If no title is specified, it will not be displayed.
     */
    title?: string;
    /**
     * The maximum number should not exceed 6.
     */
    initItems?: InitMenuItemsType[];
    /**
     * The layout type of the component.
     */
    layoutType?: 'left' | 'center';
    /**
     * Whether to display the cancel button.
     */
    hasCancel?: boolean;
};
/**
 * The BottomSheetNameMenu component provides menu functionality.
 *
 * Compared with `BottomSheetMenu`, it is simpler to use, you only need to enter a text array.
 *
 * @test {@link https://github.com/AsteriskZuo/react-native-chat-room/blob/57b8f2ea9b24cd0e4fb8606dc3b246b3fd91d52f/src/biz/ParticipantList/ParticipantContextMenu.tsx}
 *
 * @test {@link https://github.com/AsteriskZuo/react-native-chat-room/blob/57b8f2ea9b24cd0e4fb8606dc3b246b3fd91d52f/src/biz/MessageList/MessageList.tsx}
 *
 * @example
 * ```tsx
 * const menuRef = React.useRef<BottomSheetNameMenuRef>({} as any);
 * // ...
 * <BottomSheetNameMenu
 *   ref={menuRef}
 *   initItems={[]}
 *   onRequestModalClose={() => {
 *     menuRef?.current?.startHide?.();
 *   }}
 * />
 * // ...
 * menuRef?.current?.startShowWithInit([
 *   {
 *     name: 'Mute',
 *     isHigh: false,
 *     onClicked: () => {
 *       if (userId !== im.userId) {
 *         muteMember(userId, true);
 *       }
 *       menuRef?.current?.startHide?.();
 *     },
 *   },
 *   {
 *     name: 'Remove',
 *     isHigh: true,
 *     onClicked: () => {
 *       if (userId !== im.userId) {
 *         removeMember(userId);
 *       }
 *       menuRef?.current?.startHide?.();
 *     },
 *   },
 * ]);
 * ```
 */
export declare const BottomSheetNameMenu: React.ForwardRefExoticComponent<BottomSheetNameMenuProps & React.RefAttributes<BottomSheetNameMenuRef>>;
//# sourceMappingURL=BottomSheetNameMenu.d.ts.map