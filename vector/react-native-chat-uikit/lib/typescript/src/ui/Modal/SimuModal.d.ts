import * as React from 'react';
import { ColorValue, GestureResponderEvent, PanResponderGestureState, StyleProp, ViewProps, ViewStyle } from 'react-native';
import { SlideProps } from './DefaultSlide';
import type { ModalAnimationType } from './types';
/**
 * Why not use properties to show and hide components? The method of using attributes has been tried, but this method requires more renderings (the function needs to be executed multiple times internally).
 *
 * ref: example/src/__dev__/test_modal_prototype.tsx
 */
export type SimulativeModalRef = {
    startShow: () => void;
    /**
     * Hiding a component is not destroying it.
     */
    startHide: (onFinished?: () => void) => void;
};
export type SimulativeModalProps = Omit<ViewProps, 'style'> & {
    modalAnimationType?: ModalAnimationType;
    modalStyle?: StyleProp<ViewStyle> | undefined;
    backgroundColor?: ColorValue | undefined;
    backgroundTransparent?: boolean | undefined;
    disableBackgroundClose?: boolean | undefined;
    propsRef: React.RefObject<SimulativeModalRef>;
    onStartShouldSetPanResponder?: ((e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean) | undefined;
    onFinished?: () => void;
    maskStyle?: StyleProp<ViewStyle> | undefined;
    Slide?: React.ComponentType<SlideProps>;
};
/**
 * Simulate a modal window.
 */
export declare function SimulativeModal(props: SimulativeModalProps): JSX.Element;
//# sourceMappingURL=SimuModal.d.ts.map