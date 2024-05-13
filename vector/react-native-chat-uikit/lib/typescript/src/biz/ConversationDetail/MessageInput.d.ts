import * as React from 'react';
import type { MessageInputRef } from './types';
/**
 * Message Input Component.
 *
 * This component can send text, send emoticons, send files, send pictures, send voice, send files, etc. You can customize the sending menu and add a UI for sending custom messages. Usually this component is used in conjunction with the `MessageList` component.
 */
export declare const MessageInput: React.ForwardRefExoticComponent<import("../types").PropsWithError & import("../types").PropsWithTest & {
    convId: string;
    convType: import("react-native-chat-sdk").ChatConversationType;
    top?: number | undefined;
    bottom?: number | undefined;
    numberOfLines?: number | undefined;
    onClickedSend?: ((value: import("./types").SendFileProps | import("./types").SendVoiceProps | import("./types").SendImageProps | import("./types").SendVideoProps | import("./types").SendTextProps | import("./types").SendCardProps) => void) | undefined;
    closeAfterSend?: boolean | undefined;
    onHeightChange?: ((height: number) => void) | undefined;
    onEditMessageFinished?: ((model: import("./types").MessageModel) => void) | undefined;
    onInputMention?: ((groupId: string) => void) | undefined;
    onClickedCardMenu?: (() => void) | undefined;
    onInitMenu?: ((initItems: import("../BottomSheetMenu").InitMenuItemsType[]) => import("../BottomSheetMenu").InitMenuItemsType[]) | undefined;
    emojiList?: string[] | undefined;
} & React.RefAttributes<MessageInputRef>>;
export type MessageInputComponent = typeof MessageInput;
//# sourceMappingURL=MessageInput.d.ts.map