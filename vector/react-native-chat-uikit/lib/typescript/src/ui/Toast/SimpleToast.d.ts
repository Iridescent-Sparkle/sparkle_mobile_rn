import * as React from 'react';
export type SimpleToastTask = {
    message: string;
    timeout?: number;
};
export type SimpleToastRef = {
    show: (task: SimpleToastTask) => void;
};
export type SimpleToastProps = {
    propsRef: React.RefObject<SimpleToastRef>;
    timeout?: number;
};
export declare function SimpleToast(props: SimpleToastProps): JSX.Element;
//# sourceMappingURL=SimpleToast.d.ts.map