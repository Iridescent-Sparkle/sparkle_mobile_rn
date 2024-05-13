import * as React from 'react';
import { ColorValue, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import type { IconNameType } from '../../assets';
export interface SwitchProps {
    height?: number | undefined;
    width?: number | undefined;
    /**
     * Color of the foreground switch grip.
     */
    thumbColor?: ColorValue | undefined;
    /**
     * Color of the background switch grip.
     */
    thumbBackgroundColor?: ColorValue | undefined;
    /**
     * Custom colors for the switch track
     *
     * Color when false and color when true
     *
     * **Note** Must be an interpolable color value. The color name `red` is not supported. `rgba(1,1,2,1)` is supported.
     */
    trackColor?: {
        false?: ColorValue | null | undefined;
        true?: ColorValue | null | undefined;
    } | undefined;
    /**
     * Custom Icons for the switch track
     */
    trackIcon?: {
        false?: IconNameType | null | undefined;
        true?: IconNameType | null | undefined;
    } | undefined;
    /**
     * If true the user won't be able to toggle the switch.
     * Default value is false.
     */
    disabled?: boolean | undefined;
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: ((value: boolean) => Promise<void> | void) | null | undefined;
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string | undefined;
    /**
     * The value of the switch. If true the switch will be turned on.
     * Default value is false.
     */
    value?: boolean | undefined;
    /**
     * Set styles, but not size, background color, rounded corners, etc.
     */
    style?: StyleProp<ViewStyle> | undefined;
    /**
     * Set styles for the icon
     */
    iconStyle?: StyleProp<ImageStyle> | undefined;
    /**
     * Set background view
     */
    backgroundView?: React.ReactNode | undefined;
    /**
     * Set animation duration
     */
    animationDuration?: number | undefined;
}
export declare function Switch(props: SwitchProps): JSX.Element;
//# sourceMappingURL=Switch.d.ts.map