/// <reference types="react" />
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export declare const gMaxCount = 99;
export type BadgesProps = {
    /**
     * @description unread count.
     * - `undefined` means is disturb.
     * - `0` means no unread count.
     * - `others` means unread count.
     */
    count?: number;
    /**
     * Set the maximum value. Default value is 99.
     */
    maxCount?: number;
    /**
     * Text style properties.
     */
    textStyle?: StyleProp<TextStyle>;
    /**
     * Component container style properties.
     */
    containerStyle?: StyleProp<ViewStyle>;
};
/**
 * Unread components.
 */
export declare function Badges(props: BadgesProps): JSX.Element;
//# sourceMappingURL=Badges.d.ts.map