import * as React from 'react';
import { TabPageBody } from './TabPageBody';
import { TabPageBodyLIST } from './TabPageBody.LIST';
import { TabPageBodyT } from './TabPageBody.T';
import { TabPageHeader } from './TabPageHeader';
import type { TabPageBodyLISTProps, TabPageBodyProps, TabPageBodyTProps, TabPageHeaderProps } from './types';
export type OmitTabPageHeaderProps = Omit<TabPageHeaderProps, 'propRef' | 'onClicked' | 'width' | 'initIndex'>;
type OmitTabPageBodyProps = Omit<TabPageBodyProps, 'propsRef' | 'height' | 'width' | 'initIndex' | 'onCurrentIndex'>;
type OmitTabPageBodyTProps = Omit<TabPageBodyTProps, 'propsRef' | 'height' | 'width' | 'childrenCount' | 'initIndex' | 'onCurrentIndex'>;
type OmitTabPageBodyLISTProps = Omit<TabPageBodyLISTProps, 'propsRef' | 'height' | 'width' | 'childrenCount' | 'initIndex' | 'onCurrentIndex'>;
export type TabPageRef = {
    changeIndex: (index: number, animated?: boolean) => void;
};
export type TabPageProps = {
    header: {
        Header?: typeof TabPageHeader;
        HeaderProps: OmitTabPageHeaderProps;
    };
    body: {
        type: 'TabPageBody';
        Body?: typeof TabPageBody;
        BodyProps: OmitTabPageBodyProps;
    } | {
        type: 'TabPageBodyT';
        Body?: typeof TabPageBodyT;
        BodyProps: OmitTabPageBodyTProps;
    } | {
        type: 'TabPageBodyLIST';
        Body?: typeof TabPageBodyLIST;
        BodyProps: OmitTabPageBodyLISTProps;
    };
    height?: number;
    width?: number;
    headerPosition?: 'up' | 'down';
    initIndex?: number;
    onCurrentIndex?: (currentIndex: number) => void;
};
interface TabPageComponent extends React.ForwardRefExoticComponent<TabPageProps & React.RefAttributes<TabPageRef>> {
    DefaultHeader: typeof TabPageHeader;
    DefaultBody: typeof TabPageBody;
}
export declare const TabPage: TabPageComponent;
export {};
//# sourceMappingURL=TabPage.d.ts.map