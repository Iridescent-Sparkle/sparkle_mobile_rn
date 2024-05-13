import * as React from 'react';
import type { MessageReportItemProps } from './MessageReport.item';
import type { ReportItemModel } from './types';
export declare function useMessageReportApi(itemData: ReportItemModel[]): {
    data: MessageReportItemProps[];
    onUpdate: (clickedItem: MessageReportItemProps) => void;
};
export declare function useScrollGesture(
/**
 * Callback function when the gesture is used.
 * When used together with `Modal` or `SimuModal`, the pull-down gesture conflicts with the scrolling gift list gesture and cannot be resolved using bubbling events. Resolved by manually controlling usage rights.
 */
requestUseScrollGesture?: (finished: boolean) => void): {
    isScrollingRef: React.MutableRefObject<boolean>;
    handles: import("react-native").GestureResponderHandlers;
};
//# sourceMappingURL=MessageReport.hooks.d.ts.map