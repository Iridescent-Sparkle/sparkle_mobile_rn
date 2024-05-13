import * as React from 'react';
import { AlertButton } from 'react-native';
import type { AlertProps } from './types';
export declare function useAlert(props: AlertProps): {
    getButton: (buttons: AlertButton[] | undefined, onRequestModalClose: () => void) => JSX.Element[];
    onUpdate: (props: AlertProps) => void;
    props: AlertProps;
    value: string;
    onChangeText: (v: string) => void;
    textCount: number;
    setTextCount: React.Dispatch<React.SetStateAction<number>>;
};
//# sourceMappingURL=Alert.hooks.d.ts.map