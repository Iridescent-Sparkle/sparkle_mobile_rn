import * as React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { ChatMessage } from 'react-native-chat-sdk';
import { SlideModalRef } from '../../ui/Modal';
/**
 * Referencing Values of the `MessageInputEditMessage` component.
 */
export type MessageInputEditMessageRef = SlideModalRef & {
    /**
     * While displaying the component, the menu items will also be dynamically changed.
     */
    startShowWithInit: (msg: ChatMessage) => void;
};
/**
 * Properties of the `MessageInputEditMessage` component.
 */
export type MessageInputEditMessageProps = {
    /**
     * To request to close the component, you usually need to call the `startHide` method here.
     */
    onRequestModalClose: () => void;
    /**
     * The callback function when the send button is clicked.
     */
    onEditMessageFinished?: (msgId: string, text: string) => void;
    /**
     * Must be a text message.
     */
    initMsg?: ChatMessage;
    /**
     * Keyboard offset setting required. If safe area is used.
     */
    top?: number;
    bottom?: number;
    /**
     * The maximum number of lines in the input box.
     */
    numberOfLines?: number;
};
/**
 * The MessageInputEditMessage component provides menu functionality.
 *
 * @test {@link https://github.com/AsteriskZuo/react-native-chat-room/blob/192a6e98cf2f168dd3a5e0e5a306a6762cf5e0d6/example/src/__dev__/test_bottom_sheet_menu.tsx}
 *
 * @example
 *
 * ```tsx
 * const ref = React.useRef<MessageInputEditMessageRef>({} as any);
 * // ...
 *  <MessageInputEditMessage
 *   ref={ref}
 *   onRequestModalClose={() => {
 *     ref.current.startHide();
 *   }}
 *   initMsg={msg}
 * />
 * ```
 */
export declare const MessageInputEditMessage: React.ForwardRefExoticComponent<MessageInputEditMessageProps & React.RefAttributes<MessageInputEditMessageRef>>;
export declare function useMessageInputEditMessage({ msg, onEditMessageFinished, }: {
    msg: ChatMessage;
    onEditMessageFinished?: (msgId: string, text: string) => void;
}): {
    msg: ChatMessage;
    updateMsg: (msg: ChatMessage) => void;
    value: string;
    setValue: (t: string) => void;
    inputRef: React.RefObject<RNTextInput>;
    onFocus: () => void;
    onBlur: () => void;
    disable: boolean;
    onEdited: () => void;
};
//# sourceMappingURL=MessageInputEditMessage.d.ts.map