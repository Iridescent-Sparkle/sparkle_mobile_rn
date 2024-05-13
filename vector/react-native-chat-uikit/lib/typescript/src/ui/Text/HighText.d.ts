/// <reference types="react" />
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { TextProps } from './Text';
export type HighTextProps = Omit<TextProps, 'children'> & {
    keyword: string;
    content: string;
    highColors?: ColorValue[];
    textColors?: ColorValue[];
    containerStyle?: StyleProp<ViewStyle>;
};
/**
 * Highlight keywords.
 *
 * **Note** Exceeding the width is not considered.
 */
export declare function HighText(props: HighTextProps): JSX.Element;
export declare function useHighText(props: HighTextProps): {
    getContent: () => (JSX.Element | null)[];
};
//# sourceMappingURL=HighText.d.ts.map