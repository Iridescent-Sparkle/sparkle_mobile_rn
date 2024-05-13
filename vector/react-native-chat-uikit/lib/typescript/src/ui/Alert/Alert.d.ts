import * as React from 'react';
import type { AlertProps } from './types';
export type AlertRef = {
    alert: () => void;
    alertWithInit: (props: AlertProps) => void;
    close: (onFinished?: () => void) => void;
};
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<AlertRef>>;
//# sourceMappingURL=Alert.d.ts.map