import * as React from 'react';
import type { ReportItemModel } from './types';
export type MessageReportItemProps = {
    data: ReportItemModel;
    onChecked?: (current: boolean) => void;
};
export declare function MessageReportItem(props: MessageReportItemProps): JSX.Element;
export declare const MessageReportItemMemo: React.MemoExoticComponent<typeof MessageReportItem>;
//# sourceMappingURL=MessageReport.item.d.ts.map