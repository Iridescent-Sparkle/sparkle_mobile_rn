/// <reference types="react" />
import { TextProps } from './Text';
export type PresetCalcTextWidthProps = {
    content: string;
    textProps: Omit<TextProps, 'children'>;
    onWidth: (width: number) => void;
};
/**
 * This component is used to calculate the width of the displayed string. No ellipses will be generated due to width. The component is not visible. But it is also recommended to put it at the bottom.
 *
 * **Note**: The string does not wrap, it is only displayed on one line, and the test calculation is performed without displaying the ellipsis.
 */
export declare function PresetCalcTextWidth(props: PresetCalcTextWidthProps): JSX.Element;
//# sourceMappingURL=PresetCalcTextWidth.d.ts.map