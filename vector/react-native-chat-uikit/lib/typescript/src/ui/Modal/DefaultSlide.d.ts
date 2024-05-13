/// <reference types="react" />
import type { GestureResponderHandlers, ViewProps } from 'react-native';
export type ModalType = 'simu-modal' | 'modal';
export type SlideProps = ViewProps & GestureResponderHandlers & {
    modalType: ModalType;
};
export declare const DefaultSlide: (props: SlideProps) => JSX.Element;
//# sourceMappingURL=DefaultSlide.d.ts.map