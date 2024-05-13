import * as React from 'react';
import type { AlertRef } from '../../ui/Alert';
export type UseCloseAlertProps = {
    alertRef: React.RefObject<AlertRef>;
};
/**
 * use close alert
 */
export declare function useCloseAlert(props: UseCloseAlertProps): {
    closeAlert: (onFinished?: () => void) => void;
};
//# sourceMappingURL=useCloseAlert.d.ts.map