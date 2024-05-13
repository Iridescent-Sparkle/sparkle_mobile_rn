import * as React from 'react';
import { DefaultSectionT, SectionList as RNSectionList, SectionListProps as RNSectionListProps } from 'react-native';
export type SectionListRef<ItemT, SectionT> = RNSectionList<ItemT, SectionT>;
export type SectionListProps<ItemT, SectionT> = RNSectionListProps<ItemT, SectionT> & {
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
export declare const _SectionList: <ItemT, SectionT>(props: SectionListProps<ItemT, SectionT>, ref?: React.ForwardedRef<SectionListRef<ItemT, SectionT>> | undefined) => JSX.Element;
/**
 * @example
 *
 * export const SectionList = SectionListFactory<{ id: string }>();
 * export function SectionList() {}
 */
export declare function SectionListFactory<ItemT = any, SectionT extends DefaultSectionT = DefaultSectionT>(): React.ForwardRefExoticComponent<RNSectionListProps<ItemT, SectionT> & {
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
} & React.RefAttributes<SectionListRef<ItemT, SectionT>>>;
export type SectionListFactoryReturn<ItemT, SectionT extends DefaultSectionT = DefaultSectionT> = ReturnType<typeof SectionListFactory<ItemT, SectionT>>;
//# sourceMappingURL=SectionList.d.ts.map