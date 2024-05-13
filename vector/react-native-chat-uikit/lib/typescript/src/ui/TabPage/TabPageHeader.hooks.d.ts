import { Animated } from 'react-native';
export declare const calculateLeft: (params: {
    width: number;
    count: number;
    index: number;
    indicatorWidth: number;
}) => {
    left: number;
    unitWidth: number;
};
/**
 *
 * **Note** On the Android platform, fast and complex operations may cause the indicator position to be incorrect.
 */
export declare const useTabPageHeaderAnimation: (params: {
    unitWidth: number;
    initLeft: number;
}) => {
    left: Animated.Value;
    toNext: (type: 'r' | 'l', count?: number) => (callback?: Animated.EndCallback | undefined) => void;
};
export declare const useTabPageHeaderAnimation2: (params: {
    width: number;
    count: number;
    index?: number;
    indicatorWidth: number;
}) => {
    left: Animated.Value;
    unitWidth: number;
    toNext: (params: {
        width: number;
        count: number;
        index: number;
        indicatorWidth: number;
    }) => (callback?: Animated.EndCallback | undefined) => void;
};
//# sourceMappingURL=TabPageHeader.hooks.d.ts.map