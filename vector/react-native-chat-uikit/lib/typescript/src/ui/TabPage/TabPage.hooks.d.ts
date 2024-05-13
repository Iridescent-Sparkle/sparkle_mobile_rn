import * as React from 'react';
import type { TabPageProps, TabPageRef } from './TabPage';
import type { TabPageBodyRef, TabPageHeaderRef } from './types';
export declare const calculateIndex: (params: {
    width: number;
    contentOffsetX: number;
}) => number;
export declare const useHeaderStartScrolling: (count: number, headerRef?: React.RefObject<TabPageHeaderRef>, initIndex?: number) => {
    headerStartScrolling: (width: number, x: number) => void;
};
export declare function useTabPageAPI(props: TabPageProps, ref?: React.ForwardedRef<TabPageRef>): {
    headerRef: React.MutableRefObject<TabPageHeaderRef>;
    bodyRef: React.MutableRefObject<TabPageBodyRef>;
    headerStartScrolling: (width: number, x: number) => void;
};
//# sourceMappingURL=TabPage.hooks.d.ts.map