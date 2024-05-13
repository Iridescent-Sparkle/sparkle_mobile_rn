import { Animated } from 'react-native';
export declare function useSwitchAnimation(params: {
    value: boolean;
    width: number;
    height: number;
    falseColor: string;
    trueColor: string;
    animationDuration: number;
}): {
    translateX: Animated.Value;
    toRight: (callback?: Animated.EndCallback | undefined) => void;
    toLeft: (callback?: Animated.EndCallback | undefined) => void;
    trackColor: Animated.AnimatedInterpolation<string | number>;
};
//# sourceMappingURL=Switch.hooks.d.ts.map