import * as React from 'react';
import { SlideProps } from './DefaultSlide';
import type { ModalProps, ModalRef } from './Modal';
/**
 * Why not use properties to show and hide components? The method of using attributes has been tried, but this method requires more renderings (the function needs to be executed multiple times internally).
 *
 * ref: example/src/__dev__/test_modal_prototype.tsx
 */
export type SlideModalRef = ModalRef;
export type SlideModalProps = ModalProps & {
    Slide?: React.ComponentType<SlideProps>;
};
/**
 * Mainly solves the effect problem of native modal component `RNModal` display mask.
 */
export declare function SlideModal(props: SlideModalProps): JSX.Element;
//# sourceMappingURL=SlideModal.d.ts.map