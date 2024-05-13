/**
 * Convert text into emoji text.
 *
 * @param text Text with original symbols.
 * @returns Text with emoji symbols.
 *
 * @example
 *
 * input: U+1F644U+1F910U+1F644U+1F62DU+1F610U+1F610U+1F62DU+1F610U+1F62DU+1F610U+1F62DU+1F641U+1F641U+1F62DU+1F641U+1F62DU+1F62DU+1F610iknbbvvjbff
 *
 * output: 🙄🤐🙄😭😐😐😭😐😭😐😭🙁🙁😭🙁😭😭😐iknbbvvjbff
 */
declare function toCodePointText(text: string): string;
/**
 * Convert emoji text into text. Just the opposite of `toCodePointText`.
 * @param text Text with emoji symbols.
 * @returns Text with original symbols.
 *
 * @example
 *
 * input: 🙄🤐🙄😭😐😐😭😐😭😐😭🙁🙁😭🙁😭😭😐iknbbvvjbff
 *
 * output: U+1F644U+1F910U+1F644U+1F62DU+1F610U+1F610U+1F62DU+1F610U+1F62DU+1F610U+1F62DU+1F641U+1F641U+1F62DU+1F641U+1F62DU+1F62DU+1F610iknbbvvjbff
 */
declare function fromCodePointText(text: string): string;
/**
 * If you want to use a custom emoticon, calling this method will replace the built-in default emoticon list.
 *
 * @param list The list of emoji expressions. {@link FACE_ASSETS}
 */
declare function setEmojiList(list: string[]): void;
export declare const emoji: {
    toCodePointText: typeof toCodePointText;
    fromCodePointText: typeof fromCodePointText;
    setEmojiList: typeof setEmojiList;
};
export {};
//# sourceMappingURL=emojiConvert.d.ts.map