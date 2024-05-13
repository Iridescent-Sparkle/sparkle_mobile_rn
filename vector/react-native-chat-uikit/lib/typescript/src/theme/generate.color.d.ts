import type { Colors } from './types';
export type HSLA = {
    h: number;
    s: string;
    l: string;
    a: string;
};
/**
 * Generate the hsla format color group based on hue color.
 *
 * @param hue [0 - 360].
 * @returns color array.
 */
export declare function generatePrimaryColor(hue: number): Colors;
/**
 * Generate the hsla format color group based on hue color.
 *
 * @param hue [0 - 360].
 * @returns color array.
 */
export declare function generateNeutralColor(hue: number): Colors;
/**
 * Generate the hsla format color group based on hue color.
 *
 * @param hue [0 - 360].
 * @returns color array.
 */
export declare function generateNeutralSpecialColor(hue: number): Colors;
/**
 * Generate hsla format barrage color group.
 *
 * @returns color array.
 */
export declare function generateBarrageColor(type: 'light' | 'dark'): Colors;
//# sourceMappingURL=generate.color.d.ts.map