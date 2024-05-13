import * as React from 'react';
import { SlideModalRef } from '../../ui/Modal';
/**
 * Referencing Values of the `BottomSheetMenu` component.
 */
export type BottomSheetMenuRef = SlideModalRef & {
    /**
     * While displaying the component, the menu items will also be dynamically changed.
     */
    startShowWithInit: (initItems: React.ReactElement[], others?: any) => void;
    /**
     * Get the data of the component.
     */
    getData: () => any;
};
/**
 * Properties of the `BottomSheetMenu` component.
 */
export type BottomSheetMenuProps = {
    /**
     * To request to close the component, you usually need to call the `startHide` method here.
     */
    onRequestModalClose: () => void;
    /**
     * If no title is specified, it will not be displayed.
     */
    title?: string;
    /**
     * The maximum number should not exceed 6.
     * If it is not set here, it can be set dynamically when calling `startShowWithInit`.
     */
    initItems?: React.ReactElement[];
    /**
     * The maximum height of the component.
     *
     * @default half of the entire screen.
     */
    maxHeight?: number;
};
/**
 * The BottomSheetMenu component provides menu functionality.
 *
 * @test {@link https://github.com/AsteriskZuo/react-native-chat-room/blob/192a6e98cf2f168dd3a5e0e5a306a6762cf5e0d6/example/src/__dev__/test_bottom_sheet_menu.tsx}
 *
 * @example
 *
 * ```tsx
 * const ref = React.useRef<BottomSheetMenuRef>({} as any);
 * // ...
 *  <BottomSheetMenu
 *   ref={ref}
 *   onRequestModalClose={() => {
 *     ref.current.startHide();
 *   }}
 *   title={
 *     'Nickname: Sei la cosa più bella che mia sia mai capitato non so stare senza te.'
 *   }
 *   initItems={data}
 * />
 * ```
 */
export declare const BottomSheetMenu: React.ForwardRefExoticComponent<BottomSheetMenuProps & React.RefAttributes<BottomSheetMenuRef>>;
//# sourceMappingURL=BottomSheetMenu.d.ts.map