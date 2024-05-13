import { FontStyles, IconStyles } from '../../theme';
import { ButtonColors, ButtonSize, ButtonStateColor } from '../../theme';
import type { ButtonProps } from './Button';
export declare const useGetButtonSizeStyle: (props: ButtonProps) => {
    button: ButtonSize;
    text: FontStyles;
    icon: IconStyles;
};
export declare const useGetButtonStyle: (props: ButtonProps) => {
    state: ButtonStateColor;
};
export declare const useGetButtonStateStyle: (props: ButtonProps) => ButtonColors;
export declare const useGetButtonRadiusStyle: (props: ButtonProps) => number | undefined;
//# sourceMappingURL=Button.hooks.d.ts.map