import * as React from 'react';
import { StyleProp, TextInput as RNTextInput, TextInputProps as RNTextInputProps, TextStyle, ViewStyle } from 'react-native';
export type TextInputProps = RNTextInputProps & {
    unitHeight?: number;
    /**
     * Style of the container. This property can mainly change the display or hiding, position, size, background color, style, etc.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Enable clear button.
     *
     * Default is `false`.
     */
    enableClearButton?: boolean;
    /**
     * Clear button style.
     */
    clearButtonStyle?: ViewStyle;
    /**
     * Callback notification when clear button is pressed.
     */
    onClear?: () => void;
    /**
     * Statistics settings for the text input component.
     */
    statistics?: {
        /**
         * Current word count.
         */
        count: number;
        /**
         * Callback notification when word count changes.
         */
        onCountChange?: (count: number) => void;
        /**
         * The maximum number of characters that can be entered.
         */
        maxCount: number;
        /**
         * Style of the text.
         */
        textStyles?: StyleProp<TextStyle>;
    };
};
/**
 * Mainly solves the multi-line problem of the native `RNTextInput` android platform.
 */
export declare const TextInput: React.ForwardRefExoticComponent<RNTextInputProps & {
    unitHeight?: number | undefined;
    /**
     * Style of the container. This property can mainly change the display or hiding, position, size, background color, style, etc.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Enable clear button.
     *
     * Default is `false`.
     */
    enableClearButton?: boolean | undefined;
    /**
     * Clear button style.
     */
    clearButtonStyle?: ViewStyle | undefined;
    /**
     * Callback notification when clear button is pressed.
     */
    onClear?: (() => void) | undefined;
    /**
     * Statistics settings for the text input component.
     */
    statistics?: {
        /**
         * Current word count.
         */
        count: number;
        /**
         * Callback notification when word count changes.
         */
        onCountChange?: ((count: number) => void) | undefined;
        /**
         * The maximum number of characters that can be entered.
         */
        maxCount: number;
        /**
         * Style of the text.
         */
        textStyles?: StyleProp<TextStyle>;
    } | undefined;
} & React.RefAttributes<RNTextInput>>;
//# sourceMappingURL=TextInput.d.ts.map