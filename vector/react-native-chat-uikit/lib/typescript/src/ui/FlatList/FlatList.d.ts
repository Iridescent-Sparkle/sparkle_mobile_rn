import * as React from 'react';
import { FlatList as RNFlatList, FlatListProps as RNFlatListProps } from 'react-native';
export type FlatListRef<ItemT> = RNFlatList<ItemT>;
export type FlatListProps<ItemT> = RNFlatListProps<ItemT> & {
    /**
     * Rendered when the list is error. Can be a React Component Class, a render function, or
     * a rendered element.
     */
    ListErrorComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
    /**
     * Rendered when the list is loading. Can be a React Component Class, a render function, or
     * a rendered element.
     */
    ListLoadingComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
};
export declare const _FlatList: <ItemT>(props: FlatListProps<ItemT>, ref?: React.ForwardedRef<FlatListRef<ItemT>> | undefined) => JSX.Element;
/**
 * @example
 *
 * export const FlatList = FlatListFactory<{ id: string }>();
 * export function FlatList() {}
 * @returns
 */
export declare function FlatListFactory<ItemT = any>(): React.ForwardRefExoticComponent<RNFlatListProps<ItemT> & {
    /**
     * Rendered when the list is error. Can be a React Component Class, a render function, or
     * a rendered element.
     */
    ListErrorComponent?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined;
    /**
     * Rendered when the list is loading. Can be a React Component Class, a render function, or
     * a rendered element.
     */
    ListLoadingComponent?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined;
} & React.RefAttributes<FlatListRef<ItemT>>>;
export type FlatListFactoryReturn<ItemT> = ReturnType<typeof FlatListFactory<ItemT>>;
//# sourceMappingURL=FlatList.d.ts.map