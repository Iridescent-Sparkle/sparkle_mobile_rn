import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SlideModalRef } from '../../ui/Modal';
import type { PropsWithError, PropsWithTest } from '../types';
import type { ReportItemModel } from './types';
/**
 * Referencing value of the `MessageReport` component.
 */
export type BottomSheetMessageReportRef = SlideModalRef & {};
/**
 * Properties of the `MessageReport` component.
 */
export type BottomSheetMessageReportProps = {
    /**
     * Data model.
     */
    data: ReportItemModel[];
    /**
     * Style of the container. This property can mainly change the display or hiding, position, size, background color, style, etc.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Callback notification when the report is completed.
     */
    onReport: (result?: ReportItemModel) => void;
} & PropsWithTest & PropsWithError;
/**
 * Component for reporting messages.
 *
 * It is composed of `SlideModal` and `MessageReport`.
 */
export declare const BottomSheetMessageReport: React.ForwardRefExoticComponent<{
    /**
     * Data model.
     */
    data: ReportItemModel[];
    /**
     * Style of the container. This property can mainly change the display or hiding, position, size, background color, style, etc.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Callback notification when the report is completed.
     */
    onReport: (result?: ReportItemModel) => void;
} & PropsWithTest & PropsWithError & React.RefAttributes<import("../../ui/Modal").ModalRef>>;
//# sourceMappingURL=BottomSheetMessageReport.d.ts.map