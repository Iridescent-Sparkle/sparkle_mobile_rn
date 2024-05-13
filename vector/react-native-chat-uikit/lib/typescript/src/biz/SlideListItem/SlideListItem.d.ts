import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * @description The props of SlideListItem.
 */
export type SlideListItemProps<DataT> = React.PropsWithChildren<{
    /**
     * The data of the component.
     */
    data: DataT;
    /**
     * The height of the component.
     */
    height: number;
    /**
     * The width of the slidable area on the left. If not set, it cannot be slid to the left.
     */
    leftExtraWidth?: number;
    /**
     * The width of the slidable area on the right. If not set, it cannot be slid to the right.
     */
    rightExtraWidth?: number;
    /**
     * The width of the component. If not set, the screen width is used.
     */
    width?: number;
    /**
     * The style of the container.
     */
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: (data: DataT) => void;
    onLongPress?: (data: DataT) => void;
}>;
/**
 * @description The component of SlideListItem.
 * @param props {@link SlideListItemProps}
 */
export declare function SlideListItem<DataT = any>(props: SlideListItemProps<DataT>): JSX.Element;
//# sourceMappingURL=SlideListItem.d.ts.map