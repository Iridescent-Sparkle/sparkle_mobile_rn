import * as React from 'react';
import type { ContactSearchModel, SearchContactProps } from './types';
/**
 * Search Contacts component.
 */
export declare function useSearchContact(props: SearchContactProps): {
    onClicked: ((data?: import("../../chat").ContactModel | undefined) => void) | undefined;
    onCancel: () => void;
    dataRef: React.MutableRefObject<ContactSearchModel[]>;
    data: readonly ContactSearchModel[];
    setData: React.Dispatch<React.SetStateAction<readonly ContactSearchModel[]>>;
    ListItem: React.FunctionComponent<ContactSearchModel>;
    ref: React.MutableRefObject<import("../..").FlatListRef<ContactSearchModel>>;
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
//# sourceMappingURL=SearchContact.hooks.d.ts.map