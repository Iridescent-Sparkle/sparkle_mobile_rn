import * as React from 'react';
import { ColorValue, GestureResponderEvent, ModalProps as RNModalProps, PanResponderGestureState, StyleProp, ViewStyle } from 'react-native';
import type { ModalAnimationType } from './types';
/**
 * Why not use properties to show and hide components? The method of using attributes has been tried, but this method requires more renderings (the function needs to be executed multiple times internally).
 *
 * ref: example/src/__dev__/test_modal_prototype.tsx
 */
export type ModalRef = {
    startShow: (onFinished?: () => void, timeout?: number) => void;
    /**
     * Hiding a component is not destroying it.
     */
    startHide: (onFinished?: () => void, timeout?: number) => void;
};
export type ModalProps = Omit<RNModalProps, 'animated' | 'animationType' | 'transparent' | 'visible' | 'style' | 'onRequestClose'> & {
    propsRef: React.RefObject<ModalRef>;
    onRequestModalClose: () => void;
    modalAnimationType?: ModalAnimationType;
    modalStyle?: StyleProp<ViewStyle> | undefined;
    backgroundColor?: ColorValue | undefined;
    backgroundTransparent?: boolean | undefined;
    disableBackgroundClose?: boolean | undefined;
    onMoveShouldSetPanResponder?: ((e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean) | undefined;
    onFinished?: () => void;
    keyboardVerticalOffset?: number | undefined;
    enableSlideComponent?: boolean | undefined;
    enabledKeyboardAdjust?: boolean | undefined;
};
/**
 * @deprecated 2023-11-28 Please use `SlideModal` instead.
 *
 * Mainly solves the effect problem of native modal component `RNModal` display mask.
 */
export declare function Modal(props: ModalProps): JSX.Element;
//# sourceMappingURL=Modal.d.ts.map