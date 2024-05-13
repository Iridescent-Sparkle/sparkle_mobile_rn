/// <reference types="react" />
import type { ReportItemModel } from './types';
/**
 * Properties of the `MessageReport` component.
 */
export type MessageReportProps = {
    /**
     * Callback function when the gesture is used.
     * When used together with `Modal` or `SimuModal`, the pull-down gesture conflicts with the scrolling gift list gesture and cannot be resolved using bubbling events. Resolved by manually controlling usage rights.
     */
    requestUseScrollGesture?: (finished: boolean) => void;
    /**
     * Callback function when cancel button is clicked.
     */
    onCancel: () => void;
    /**
     * Callback function when report button is clicked.
     */
    onReport: (result?: ReportItemModel) => void;
    /**
     * data source. {@link ReportItemModel}
     */
    data: ReportItemModel[];
    /**
     * The height of the component.
     */
    height?: number;
};
/**
 * Component for reporting messages.
 *
 * This component is mainly used for reporting illegal messages.
 *
 * @param props {@link MessageReportProps}
 * @returns JSX.Element
 *
 */
export declare function MessageReport(props: MessageReportProps): JSX.Element;
//# sourceMappingURL=MessageReport.d.ts.map