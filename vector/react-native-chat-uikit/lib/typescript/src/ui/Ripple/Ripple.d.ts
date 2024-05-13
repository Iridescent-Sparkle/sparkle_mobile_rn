import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type RippleProps = {
    children?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    childrenStyle: {
        height: number;
        width: number;
        borderRadius: number;
    };
    rippleStyle?: {
        height: number;
        width: number;
        backgroundColor: string;
    };
    rippleDuration?: number;
    /**
     * @default 0.5 [0, 1]
     */
    rippleStartOpacity?: number;
    /**
     * Whether to play animation.
     */
    playAnimated: boolean;
};
export declare function Ripple(props: RippleProps): JSX.Element;
//# sourceMappingURL=Ripple.d.ts.map