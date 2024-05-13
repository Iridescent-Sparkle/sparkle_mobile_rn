import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * List Item Component properties.
 */
type ListItemProps<LeftNameProps, RightTextProps, RightIconProps> = {
    /**
     * Header element.
     */
    header?: React.ReactElement;
    /**
     * Left element.
     */
    tail?: React.ReactElement;
    /**
     * Left element.
     */
    LeftName?: React.ReactElement<LeftNameProps>;
    /**
     * Left element properties.
     */
    LeftNameProps?: LeftNameProps;
    /**
     * Right element.
     */
    RightText?: React.ReactElement<RightTextProps>;
    /**
     * Right element properties.
     */
    RightTextProps?: RightTextProps;
    /**
     * Right element.
     */
    RightIcon?: React.ReactElement<RightIconProps> | React.ComponentType<RightIconProps>;
    /**
     * Right element properties.
     */
    RightIconProps?: RightIconProps;
    /**
     * Container style for the list item component.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Callback notification when the list item is clicked.
     */
    onClicked?: () => void;
    /**
     * Whether to display the divider.
     */
    enableDivider?: boolean;
};
/**
 * Common list Item Component.
 *
 * The component is laid out left, center and right.
 *
 */
export declare function ListItem<LeftNameProps = any, RightTextProps = any, RightIconProps = any>(props: ListItemProps<LeftNameProps, RightTextProps, RightIconProps>): JSX.Element;
export {};
//# sourceMappingURL=ListItem.d.ts.map