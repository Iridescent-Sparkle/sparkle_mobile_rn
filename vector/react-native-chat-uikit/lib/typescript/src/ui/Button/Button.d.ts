/// <reference types="react" />
import { ImageStyle, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { IconNameType } from '../../assets';
import type { ButtonSizesType, ButtonStyleType, CornerRadiusPaletteType } from '../../theme';
export type ButtonProps = Omit<PressableProps, 'style'> & {
    style?: StyleProp<ViewStyle> | undefined;
    buttonStyle: ButtonStyleType;
    sizesType: ButtonSizesType;
    radiusType: CornerRadiusPaletteType;
    contentType: 'only-text' | 'only-icon' | 'icon-text' | 'text-icon' | 'loading';
    text?: string;
    textStyle?: StyleProp<TextStyle>;
    icon?: IconNameType;
    iconStyle?: StyleProp<ImageStyle>;
    preventHighFrequencyClicks?: boolean;
    frequencyInterval?: number;
};
/**
 * The native component `Button` is not easy to use. Here we use `Pressable` to simulate the button effect and support button status and theme.
 */
export declare function Button(props: ButtonProps): JSX.Element;
//# sourceMappingURL=Button.d.ts.map