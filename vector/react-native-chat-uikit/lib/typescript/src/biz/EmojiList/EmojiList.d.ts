import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * Emoji List Component properties.
 */
export type EmojiListProps = {
    /**
     * Callback function when an emoji is selected.
     */
    onFace: (id: string) => void;
    /**
     * Callback function when the delete button is clicked.
     */
    onDel: () => void;
    /**
     * Callback function when the send button is clicked.
     */
    onSend: () => void;
    /**
     * The style of the container.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The number of emojis per row.
     */
    countPerRow?: number;
    /**
     * The list of emoji expressions.
     *
     * The format needs to be followed. For example: `U+1F641` {@link FACE_ASSETS}. It will replace the built-in emoji  list.
     */
    emojiList?: string[];
};
/**
 * List of emoji expressions.
 *
 * @param props {@link EmojiListProps}
 * @returns JSX.Element
 */
export declare function EmojiList(props: EmojiListProps): JSX.Element;
export declare const EmojiListMemo: React.MemoExoticComponent<typeof EmojiList>;
//# sourceMappingURL=EmojiList.d.ts.map