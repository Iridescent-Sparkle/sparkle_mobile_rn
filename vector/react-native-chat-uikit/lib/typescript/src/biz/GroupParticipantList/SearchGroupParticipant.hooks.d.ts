/// <reference types="react" />
import type { GroupParticipantSearchModel, SearchGroupParticipantProps } from './types';
export declare function UseSearchGroupParticipant(props: SearchGroupParticipantProps): {
    onClicked: ((data?: import("../../chat").GroupParticipantModel | undefined) => void) | undefined;
    dataRef: import("react").MutableRefObject<GroupParticipantSearchModel[]>;
    data: readonly GroupParticipantSearchModel[];
    setData: import("react").Dispatch<import("react").SetStateAction<readonly GroupParticipantSearchModel[]>>;
    ListItem: import("react").FunctionComponent<GroupParticipantSearchModel>;
    ref: import("react").MutableRefObject<import("../..").FlatListRef<GroupParticipantSearchModel>>;
    listState: import("../types").ListStateType;
    setListState: import("react").Dispatch<import("react").SetStateAction<import("../types").ListStateType>>;
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
//# sourceMappingURL=SearchGroupParticipant.hooks.d.ts.map