import * as React from 'react';
import { TextProps } from './Text';
export type TimerTextRef = {
    start: () => void;
    stop: () => void;
    reset: () => void;
};
export type TimerTextProps = {
    /**
     * Does the number increase or decrease.
     */
    isIncrease: boolean;
    /**
     * The start value of the timer.
     */
    startValue: number;
    /**
     * The stop value of the timer.
     */
    stopValue: number;
    /**
     * The ref of the timer.
     */
    propsRef: React.RefObject<TimerTextRef>;
    /**
     * The style of the text.
     */
    textStyle?: TextProps;
    /**
     * Callback notification when the value changes.
     */
    onChanged?: (value: number) => void;
};
export declare function TimerText(props: TimerTextProps): JSX.Element;
//# sourceMappingURL=TimerText.d.ts.map