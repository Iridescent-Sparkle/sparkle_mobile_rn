/**
 * ref: 0.71.11 react-native KeyboardAvoidingView.js
 *
 * This component is modified based on `KeyboardAvoidingView.js` and adds android animation support.
 */
import * as React from 'react';
import type { KeyboardAvoidingViewProps, LayoutRectangle } from 'react-native';
import { EventSubscription, KeyboardEvent, KeyboardMetrics, LayoutChangeEvent, View } from 'react-native';
type ViewLayout = LayoutRectangle;
type State = {
    bottom: number;
};
/**
 * Mainly trying to solve the problem of native component `KeyboardAvoidingView` android keyboard animation. It has not been effectively solved yet. Subsequent optimization.
 */
export declare class KeyboardAvoidingView extends React.Component<KeyboardAvoidingViewProps, State> {
    _frame: ViewLayout | null;
    _keyboardEvent: KeyboardEvent | null;
    _subscriptions: Array<EventSubscription>;
    viewRef: React.RefObject<View>;
    _initialFrameHeight: number;
    constructor(props: KeyboardAvoidingViewProps);
    _relativeKeyboardHeight(keyboardFrame: KeyboardMetrics): Promise<number>;
    _onKeyboardChange: (event: KeyboardEvent | null) => void;
    _onLayout: (event: LayoutChangeEvent) => Promise<void>;
    _updateBottomIfNecessary: () => Promise<void>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=KeyboardAvoidingView.d.ts.map