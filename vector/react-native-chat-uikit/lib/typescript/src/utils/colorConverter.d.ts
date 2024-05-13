export declare function RGBAToHexACore(rgba: string[]): {
    r: string;
    g: string;
    b: string;
    a?: undefined;
} | {
    r: string;
    g: string;
    b: string;
    a: string;
};
export declare function RGBToHex(rgb: string, isUpper?: boolean): string;
export declare function RGBAToHexA(rgba: string, isUpper?: boolean): string;
export declare function hexAToRGBACore(hex: string, isPct?: boolean): {
    r: number;
    g: number;
    b: number;
    a?: undefined;
} | {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare function hexToRGB(h: string, isPct?: boolean): string;
export declare function hexAToRGBA(h: string, isPct?: boolean): string;
export declare function RGBAToHSLACore(rgba: string[]): {
    h: number;
    s: number;
    l: number;
    a?: undefined;
} | {
    h: number;
    s: number;
    l: number;
    a: number;
};
export declare function RGBToHSL(rgb: string): string;
export declare function RGBAToHSLA(rgba: string): string;
export declare function HSLAToRGBACore(hsla: string[], isPct?: boolean): {
    r: number;
    g: number;
    b: number;
    a?: undefined;
} | {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare function HSLToRGB(hsl: string, isPct?: boolean): string;
export declare function HSLAToRGBA(hsla: string, isPct?: boolean): string;
export declare function hexAToHSLACore(hex: string): {
    h: number;
    s: number;
    l: number;
    a?: undefined;
} | {
    h: number;
    s: number;
    l: number;
    a: number;
};
export declare function hexToHSL(hex: string): string;
export declare function hexAToHSLA(hex: string): string;
export declare function HSLAToHexACore(hsla: string[]): {
    r: string;
    g: string;
    b: string;
    a?: undefined;
} | {
    r: string;
    g: string;
    b: string;
    a: string;
};
export declare function HSLToHex(hsl: string, isUpper?: boolean): string;
export declare function HSLAToHexA(hsla: string, isUpper?: boolean): string;
export declare function getOpacityFromRGBA(rgba: string): number;
export declare function getOpacityFromHSLA(hsla: string): number;
export declare function getOpacityFromHexA(hex: string): number;
export declare function getOpacity(color: string): number | undefined;
export declare function changeOpacityFromRGBA(rgba: string, opacity: number): string;
export declare function changeOpacityFromHexA(hex: string, opacity: number): string;
export declare function changeOpacityFromHSLA(hsla: string, opacity: number): string;
/**
 *
 * @param color the color. For example: #ffffffff, rgba(255, 255, 255, 1), hsla(0, 0%, 100%, 1)
 * @param opacity [0, 1]
 * @returns the changed opacity color. If failed, return the original color.
 */
export declare function changeOpacity(color: string, opacity: number): string;
//# sourceMappingURL=colorConverter.d.ts.map