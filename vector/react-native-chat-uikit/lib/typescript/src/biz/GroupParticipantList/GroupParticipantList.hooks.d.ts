import * as React from 'react';
import { GroupParticipantModel } from '../../chat';
import type { AlertRef } from '../../ui/Alert';
import type { BottomSheetNameMenuRef } from '../BottomSheetMenu';
import type { GroupParticipantListItemComponentType, GroupParticipantListItemProps, GroupParticipantListProps } from './types';
export declare function useGroupParticipantList(props: GroupParticipantListProps): {
    onClicked: (data?: GroupParticipantModel | undefined) => void;
    onLongPressed: (data?: GroupParticipantModel | undefined) => void;
    onCheckClicked: (data?: GroupParticipantModel) => void;
    participantCount: number;
    onClickedAddParticipant: () => void;
    onClickedDelParticipant: () => void;
    deleteCount: number;
    onDelParticipant: () => void;
    alertRef: React.MutableRefObject<AlertRef>;
    menuRef: React.MutableRefObject<BottomSheetNameMenuRef>;
    onRequestCloseMenu: (onFinished?: (() => void) | undefined) => void;
    ListItemRender: GroupParticipantListItemComponentType;
    groupId: string;
    ownerId: string | undefined;
    dataRef: React.MutableRefObject<GroupParticipantListItemProps[]>;
    data: readonly GroupParticipantListItemProps[];
    setData: React.Dispatch<React.SetStateAction<readonly GroupParticipantListItemProps[]>>;
    ListItem: React.FunctionComponent<GroupParticipantListItemProps>;
    ref: React.MutableRefObject<import("../..").FlatListRef<GroupParticipantListItemProps>>;
    listState: import("../types").ListStateType;
    setListState: React.Dispatch<React.SetStateAction<import("../types").ListStateType>>;
    listType: "FlatList" | "SectionList";
    onRefresh: (() => void) | undefined;
    onMore: (() => void) | undefined;
    isAutoLoad: boolean;
    isSort: boolean;
    isLoadAll: boolean;
    isShowAfterLoaded: boolean;
    loadType: "multiple" | "once";
    isVisibleUpdate: boolean;
    isAutoUpdate: boolean;
    isEventUpdate: boolean;
    refreshing: boolean | undefined;
    viewabilityConfig: import("react-native/types").ViewabilityConfig | undefined;
    onViewableItemsChanged: ((info: {
        viewableItems: import("react-native/types").ViewToken[];
        changed: import("react-native/types").ViewToken[];
    }) => void) | undefined;
    deferSearch: (keyword: string) => void;
    setOnSearch: (onSearch: (keyword: string) => void) => void;
};
//# sourceMappingURL=GroupParticipantList.hooks.d.ts.map