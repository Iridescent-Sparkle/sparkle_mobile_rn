import type { ColorValue } from 'react-native';
import { ThemeType } from '../theme';
import type { KV } from '../types';
export type StyleColorParams = KV<string, KV<ThemeType, ColorValue | ColorValue[] | undefined>>;
/**
 * Simplify the use of theme colors.
 *
 * @example
 *
 * ```tsx
 * const { colors } = usePaletteContext();
 * const { getColor } = useColors({
 *   bg: {
 *     light: colors.neutral[98],
 *     dark: colors.neutral[1],
 *   },
 * });
 * // ...
 * <View
 *   style={{
 *     backgroundColor: getColor('bg'),
 *   }}
 * />
 * ```
 */
export declare function useColors(pairs?: StyleColorParams): {
    initColor: (pairs: StyleColorParams) => void;
    getColor: (key: string) => ColorValue | undefined;
    getColors: (key: string) => ColorValue[] | undefined;
};
//# sourceMappingURL=useColors.d.ts.map