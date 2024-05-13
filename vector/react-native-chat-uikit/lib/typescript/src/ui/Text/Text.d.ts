/// <reference types="react" />
import { TextProps as RNTextProps } from 'react-native';
import { FontsPaletteType, FontsType } from '../../theme';
export type TextProps = RNTextProps & {
    textType?: FontsType;
    paletteType?: FontsPaletteType;
};
/**
 * Added theme support based on the native component `Text`.
 */
export declare function Text(props: TextProps): JSX.Element;
//# sourceMappingURL=Text.d.ts.map