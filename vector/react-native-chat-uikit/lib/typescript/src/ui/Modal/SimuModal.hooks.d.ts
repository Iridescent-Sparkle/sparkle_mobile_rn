import * as React from 'react';
import { Animated, GestureResponderEvent, PanResponderGestureState, PanResponderInstance } from 'react-native';
import type { ModalAnimationType } from './types';
export declare const useSimulativeModalAnimation: (type: ModalAnimationType) => {
    translateY: Animated.Value;
    backgroundOpacity: Animated.Value;
    startShow: (callback?: Animated.EndCallback | undefined) => void;
    startHide: (callback?: Animated.EndCallback | undefined) => void;
};
export declare const useSimulativeModalPanResponder: (params: {
    type: ModalAnimationType;
    translateY: Animated.Value;
    startShow: (callback?: Animated.EndCallback | undefined) => void;
    startHide: (callback?: Animated.EndCallback | undefined) => void;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onStartShouldSetPanResponder?: ((e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean) | undefined;
}) => PanResponderInstance;
//# sourceMappingURL=SimuModal.hooks.d.ts.map