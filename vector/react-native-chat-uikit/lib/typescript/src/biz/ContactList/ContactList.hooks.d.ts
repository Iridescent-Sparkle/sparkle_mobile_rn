import * as React from 'react';
import { SectionListData } from 'react-native';
import { ContactModel } from '../../chat';
import type { AlertRef } from '../../ui/Alert';
import type { SectionListRef } from '../../ui/SectionList';
import type { BottomSheetNameMenuRef } from '../BottomSheetMenu';
import type { IndexModel, ListIndexProps } from '../ListIndex';
import type { ListStateType } from '../types';
import type { ContactListItemComponentType, ContactListItemHeaderComponentType, ContactListItemProps, ContactListProps } from './types';
/**
 * Contact list hook.
 */
export declare function useContactList(props: ContactListProps): {
    sectionListProps: Omit<import("../../ui/SectionList").SectionListProps<ContactListItemProps, IndexModel>, "ref" | "data" | "renderItem"> | undefined;
    propsSectionListProps: Omit<import("../../ui/SectionList").SectionListProps<ContactListItemProps, IndexModel>, "ref" | "data" | "renderItem"> | undefined;
    onIndexSelected: (index: number) => void;
    onRequestCloseMenu: (onFinished?: (() => void) | undefined) => void;
    onClickedNewContact: () => void;
    menuRef: React.RefObject<BottomSheetNameMenuRef>;
    alertRef: React.RefObject<AlertRef>;
    onClicked: (data?: ContactModel | undefined) => void;
    onLongPressed: (data?: ContactModel | undefined) => void;
    onCheckClicked: (data?: ContactModel) => void;
    selectedCount: number;
    onClickedCreateGroup: () => void;
    selectedMemberCount: number;
    onClickedAddGroupParticipant: () => void;
    requestCount: number;
    groupCount: number;
    avatarUrl: string | undefined;
    tr: (key: string, ...args: any[]) => string;
    ListItemRender: ContactListItemComponentType;
    ListItemHeaderRender: ContactListItemHeaderComponentType;
    contactItems: ({ requestCount }: {
        requestCount: number;
        groupCount: number;
    }) => JSX.Element[] | null;
    ListHeaderComponent: () => JSX.Element;
    sectionsRef: React.MutableRefObject<SectionListData<ContactListItemProps, IndexModel>[]>;
    sections: readonly SectionListData<ContactListItemProps, IndexModel>[];
    setSection: React.Dispatch<React.SetStateAction<readonly SectionListData<ContactListItemProps, IndexModel>[]>>;
    indexTitles: string[];
    setIndexTitles: React.Dispatch<React.SetStateAction<string[]>>;
    AlphabeticIndex: React.FC<ListIndexProps>;
    ref: React.MutableRefObject<SectionListRef<ContactListItemProps, IndexModel>>;
    listState: ListStateType;
    setListState: React.Dispatch<React.SetStateAction<ListStateType>>;
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
    viewabilityConfig: import("react-native").ViewabilityConfig | undefined;
    onViewableItemsChanged: ((info: {
        viewableItems: import("react-native").ViewToken[];
        changed: import("react-native").ViewToken[];
    }) => void) | undefined;
    deferSearch: (keyword: string) => void;
    setOnSearch: (onSearch: (keyword: string) => void) => void;
};
//# sourceMappingURL=ContactList.hooks.d.ts.map