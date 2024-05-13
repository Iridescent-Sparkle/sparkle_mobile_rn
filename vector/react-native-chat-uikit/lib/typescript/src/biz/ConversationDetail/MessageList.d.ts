import * as React from 'react';
import type { MessageListRef } from './types';
/**
 * Message List Component.
 *
 * This component can display sent and received messages, display historical messages, play language messages, preview pictures, video messages, download files, and customize behaviors and styles such as previewing pictures, previewing videos, and downloading documents. Custom messages can be added and more. Usually used in conjunction with the `MessageInput` component.
 */
export declare const MessageList: React.ForwardRefExoticComponent<import("../types").PropsWithError & import("../types").PropsWithTest & {
    convId: string;
    convType: import("react-native-chat-sdk").ChatConversationType;
    onClicked?: (() => void) | undefined;
    onClickedItem?: ((id: string, model: import("./types").MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
    onLongPressItem?: ((id: string, model: import("./types").MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
    onClickedItemAvatar?: ((id: string, model: import("./types").MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
    onClickedItemQuote?: ((id: string, model: import("./types").MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
    onQuoteMessageForInput?: ((model: import("./types").MessageModel) => void) | undefined;
    onEditMessageForInput?: ((model: import("./types").MessageModel) => void) | undefined;
    containerStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    reportMessageCustomList?: {
        key: string;
        value: string;
    }[] | undefined;
    listItemRenderProps?: (import("./types").MessageListItemRenders & {
        ListItemRender?: import("./types").MessageListItemComponentType | undefined;
    }) | undefined;
    recvMessageAutoScroll?: boolean | undefined;
    messageLayoutType?: import("./types").MessageLayoutType | undefined;
    onInitMenu?: ((initItems: import("../BottomSheetMenu").InitMenuItemsType[]) => import("../BottomSheetMenu").InitMenuItemsType[]) | undefined;
    onCopyFinished?: ((content: string) => void) | undefined;
    onNoMoreMessage?: (() => void) | undefined;
} & React.RefAttributes<MessageListRef>>;
export declare const MessageListMemo: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("../types").PropsWithError & import("../types").PropsWithTest & {
    convId: string;
    convType: import("react-native-chat-sdk").ChatConversationType;
    onClicked?: (() => void) | undefined;
    onClickedItem?: ((id: string, model: import("./types").MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
    onLongPressItem?: ((id: string, model: import("./types").MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
    onClickedItemAvatar?: ((id: string, model: import("./types").MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
    onClickedItemQuote?: ((id: string, model: import("./types").MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
    onQuoteMessageForInput?: ((model: import("./types").MessageModel) => void) | undefined;
    onEditMessageForInput?: ((model: import("./types").MessageModel) => void) | undefined;
    containerStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    reportMessageCustomList?: {
        key: string;
        value: string;
    }[] | undefined;
    listItemRenderProps?: (import("./types").MessageListItemRenders & {
        ListItemRender?: import("./types").MessageListItemComponentType | undefined;
    }) | undefined;
    recvMessageAutoScroll?: boolean | undefined;
    messageLayoutType?: import("./types").MessageLayoutType | undefined;
    onInitMenu?: ((initItems: import("../BottomSheetMenu").InitMenuItemsType[]) => import("../BottomSheetMenu").InitMenuItemsType[]) | undefined;
    onCopyFinished?: ((content: string) => void) | undefined;
    onNoMoreMessage?: (() => void) | undefined;
} & React.RefAttributes<MessageListRef>>>;
//# sourceMappingURL=MessageList.d.ts.map