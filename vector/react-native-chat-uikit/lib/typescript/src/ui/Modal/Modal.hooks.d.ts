import { Animated, GestureResponderEvent, PanResponderGestureState, PanResponderInstance } from 'react-native';
import type { ModalAnimationType } from './types';
export declare const useModalAnimation: (type: ModalAnimationType) => {
    translateY: Animated.Value;
    backgroundOpacity: Animated.Value;
    startShow: (callback?: Animated.EndCallback | undefined) => void;
    startHide: (callback?: Animated.EndCallback | undefined) => void;
};
export declare const useModalPanResponder: (params: {
    type: ModalAnimationType;
    translateY: Animated.Value;
    startShow: (callback?: Animated.EndCallback | undefined) => void;
    onRequestModalClose: () => void;
    onMoveShouldSetPanResponder?: ((e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean) | undefined;
}) => PanResponderInstance;
//# sourceMappingURL=Modal.hooks.d.ts.map