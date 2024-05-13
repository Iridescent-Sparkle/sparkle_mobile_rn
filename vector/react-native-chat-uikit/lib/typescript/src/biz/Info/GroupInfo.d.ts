import * as React from 'react';
import type { GroupInfoRef } from './types';
/**
 * Group Info Component.
 *
 * If you are a group administrator, you have more operating rights. If you are an ordinary member, you have no group management rights.
 */
export declare const GroupInfo: React.ForwardRefExoticComponent<import("../types").PropsWithBack<any> & import("../types").PropsWithNavigationBar & {
    onClickedNavigationBarButton?: (() => void) | undefined;
    hasSendMessage?: boolean | undefined;
    hasAudioCall?: boolean | undefined;
    hasVideoCall?: boolean | undefined;
    onClearChat?: (() => void) | undefined;
    doNotDisturb?: boolean | undefined;
    onDoNotDisturb?: ((isDisturb: boolean) => void) | undefined;
    containerStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    onSendMessage?: ((id: string) => void) | undefined;
    onAudioCall?: ((id: string) => void) | undefined;
    onVideoCall?: ((id: string) => void) | undefined;
    onCopyId?: ((id: string) => void) | undefined;
    onInitMenu?: ((initItems: import("../BottomSheetMenu").InitMenuItemsType[]) => import("../BottomSheetMenu").InitMenuItemsType[]) | undefined;
    onInitButton?: ((initButtons: React.ReactElement<import("../..").BlockButtonProps, string | React.JSXElementConstructor<any>>[]) => React.ReactElement<import("../..").BlockButtonProps, string | React.JSXElementConstructor<any>>[]) | undefined;
} & {
    groupId: string;
    ownerId?: string | undefined;
    groupName?: string | undefined;
    groupAvatar?: string | undefined;
    groupDescription?: string | undefined;
    groupMyRemark?: string | undefined;
    onParticipant?: ((groupId: string) => void) | undefined;
    onGroupMyRemark?: ((groupId: string, remark?: string | undefined) => void) | undefined;
    onGroupName?: ((groupId: string, groupName?: string | undefined) => void) | undefined;
    onGroupDescription?: ((groupId: string, desc?: string | undefined) => void) | undefined;
    onGroupAvatar?: ((groupId: string, avatar?: string | undefined) => void) | undefined;
    onClickedChangeGroupOwner?: ((groupId: string, ownerId: string) => void) | undefined;
    onGroupDestroy?: ((groupId: string) => void) | undefined;
    onGroupQuit?: ((groupId: string) => void) | undefined;
    onGroupKicked?: ((groupId: string) => void) | undefined;
} & React.RefAttributes<GroupInfoRef>>;
//# sourceMappingURL=GroupInfo.d.ts.map