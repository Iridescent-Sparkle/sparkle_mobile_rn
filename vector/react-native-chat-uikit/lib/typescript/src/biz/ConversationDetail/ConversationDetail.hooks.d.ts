import * as React from 'react';
import { ChatConversationType } from 'react-native-chat-sdk';
import type { ConversationDetailProps, MessageInputRef, MessageListRef, MessageModel, SendCardProps, SendCustomProps, SendFileProps, SendImageProps, SendTextProps, SendVideoProps, SendVoiceProps } from './types';
export declare function useConversationDetail(props: ConversationDetailProps): {
    onClickedSend: (value: SendTextProps | SendFileProps | SendImageProps | SendVideoProps | SendVoiceProps | SendCardProps | SendCustomProps) => void;
    _messageInputRef: React.RefObject<MessageInputRef>;
    _MessageInput: React.ForwardRefExoticComponent<import("../types").PropsWithError & import("../types").PropsWithTest & {
        convId: string;
        convType: ChatConversationType;
        top?: number | undefined;
        bottom?: number | undefined;
        numberOfLines?: number | undefined;
        onClickedSend?: ((value: SendFileProps | SendVoiceProps | SendImageProps | SendVideoProps | SendTextProps | SendCardProps) => void) | undefined;
        closeAfterSend?: boolean | undefined;
        onHeightChange?: ((height: number) => void) | undefined;
        onEditMessageFinished?: ((model: MessageModel) => void) | undefined;
        onInputMention?: ((groupId: string) => void) | undefined;
        onClickedCardMenu?: (() => void) | undefined;
        onInitMenu?: ((initItems: import("../BottomSheetMenu").InitMenuItemsType[]) => import("../BottomSheetMenu").InitMenuItemsType[]) | undefined;
        emojiList?: string[] | undefined;
    } & React.RefAttributes<MessageInputRef>>;
    messageInputProps: {
        convId: string;
        convType: ChatConversationType;
        testMode: "only-ui" | undefined;
        bottom?: number | undefined;
        top?: number | undefined;
        onError?: ((error: import("../..").UIKitError) => void) | undefined;
        numberOfLines?: number | undefined;
        emojiList?: string[] | undefined;
        onClickedSend?: ((value: SendFileProps | SendVoiceProps | SendImageProps | SendVideoProps | SendTextProps | SendCardProps) => void) | undefined;
        closeAfterSend?: boolean | undefined;
        onHeightChange?: ((height: number) => void) | undefined;
        onEditMessageFinished?: ((model: MessageModel) => void) | undefined;
        onInputMention?: ((groupId: string) => void) | undefined;
        onClickedCardMenu?: (() => void) | undefined;
        onInitMenu?: ((initItems: import("../BottomSheetMenu").InitMenuItemsType[]) => import("../BottomSheetMenu").InitMenuItemsType[]) | undefined;
    };
    _messageListRef: React.RefObject<MessageListRef>;
    _MessageList: React.ForwardRefExoticComponent<import("../types").PropsWithError & import("../types").PropsWithTest & {
        convId: string;
        convType: ChatConversationType;
        onClicked?: (() => void) | undefined;
        onClickedItem?: ((id: string, model: MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
        onLongPressItem?: ((id: string, model: MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
        onClickedItemAvatar?: ((id: string, model: MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
        onClickedItemQuote?: ((id: string, model: MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
        onQuoteMessageForInput?: ((model: MessageModel) => void) | undefined;
        onEditMessageForInput?: ((model: MessageModel) => void) | undefined;
        containerStyle?: import("react-native/types").StyleProp<import("react-native/types").ViewStyle>;
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
    messageListProps: {
        convId: string;
        convType: ChatConversationType;
        testMode: "only-ui" | undefined;
        onError?: ((error: import("../..").UIKitError) => void) | undefined;
        containerStyle?: import("react-native/types").StyleProp<import("react-native/types").ViewStyle>;
        onClicked?: (() => void) | undefined;
        onClickedItem?: ((id: string, model: MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
        onInitMenu?: ((initItems: import("../BottomSheetMenu").InitMenuItemsType[]) => import("../BottomSheetMenu").InitMenuItemsType[]) | undefined;
        onLongPressItem?: ((id: string, model: MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
        onClickedItemAvatar?: ((id: string, model: MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
        onClickedItemQuote?: ((id: string, model: MessageModel | import("./types").SystemMessageModel | import("./types").TimeMessageModel) => boolean | void | undefined) | undefined;
        onQuoteMessageForInput?: ((model: MessageModel) => void) | undefined;
        onEditMessageForInput?: ((model: MessageModel) => void) | undefined;
        reportMessageCustomList?: {
            key: string;
            value: string;
        }[] | undefined;
        listItemRenderProps?: (import("./types").MessageListItemRenders & {
            ListItemRender?: import("./types").MessageListItemComponentType | undefined;
        }) | undefined;
        recvMessageAutoScroll?: boolean | undefined;
        messageLayoutType?: import("./types").MessageLayoutType | undefined;
        onCopyFinished?: ((content: string) => void) | undefined;
        onNoMoreMessage?: (() => void) | undefined;
    };
    onQuoteMessageForInput: (model: MessageModel) => void;
    onEditMessageForInput: (model: MessageModel) => void;
    onEditMessageFinished: (model: MessageModel) => void;
    convName: string | undefined;
    convAvatar: string | undefined;
    onClickedAvatar: () => void;
    doNotDisturb: boolean | undefined;
};
//# sourceMappingURL=ConversationDetail.hooks.d.ts.map