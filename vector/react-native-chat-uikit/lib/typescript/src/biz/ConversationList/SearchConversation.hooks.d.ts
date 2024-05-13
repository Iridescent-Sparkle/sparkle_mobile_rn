/// <reference types="react" />
import type { ConversationSearchModel, SearchConversationProps } from './types';
export declare function useSearchConversation(props: SearchConversationProps): {
    onClicked: ((data?: import("../../chat").ConversationModel | undefined) => void) | undefined;
    dataRef: import("react").MutableRefObject<ConversationSearchModel[]>;
    data: readonly ConversationSearchModel[];
    setData: import("react").Dispatch<import("react").SetStateAction<readonly ConversationSearchModel[]>>;
    ListItem: import("react").FunctionComponent<ConversationSearchModel>;
    ref: import("react").MutableRefObject<import("../..").FlatListRef<ConversationSearchModel>>;
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
//# sourceMappingURL=SearchConversation.hooks.d.ts.map