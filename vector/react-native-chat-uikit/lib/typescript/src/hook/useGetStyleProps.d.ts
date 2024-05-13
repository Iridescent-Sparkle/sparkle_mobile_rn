import type { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import type { CornerRadiusPalette, CornerRadiusPaletteType } from '../theme';
type SizeType = {
    height?: number | string | undefined;
    width?: number | string | undefined;
};
/**
 * Parse the size in the component properties.
 * @example
 *
 * ```tsx
 * const { getStyleSize } = useGetStyleProps();
 * const { width: propsWidth } = getStyleSize(containerStyle);
 * const { checkType } = useCheckType();
 * if (propsWidth) {
 *   checkType(propsWidth, 'number');
 * }
 * const getUnitSize = () => {
 *   if (propsWidth) {
 *     return (propsWidth as number) / countPerRow - 1;
 *   }
 *   return winWidth / countPerRow - 1;
 * };
 * ```
 */
export declare function useGetStyleProps(): {
    getStyleProp: (prop: string, style?: StyleProp<ViewStyle>) => any;
    getStyleSize: (style?: StyleProp<ViewStyle>) => SizeType;
    getBorderRadius: (params: {
        height: number;
        crt: CornerRadiusPaletteType;
        cr: CornerRadiusPalette;
        style?: StyleProp<ViewStyle | ImageStyle>;
    }) => any;
};
export declare function getPropValueFromStyleT<Style = ViewStyle>(style: StyleProp<Style>, propKey: string): any | undefined;
export {};
//# sourceMappingURL=useGetStyleProps.d.ts.map