import type { ListItemActions, UseFlatListReturn } from '../types';
import type { DefaultComponentModel, ListSearchItemProps, UseListSearchProps } from './types';
export declare function useListSearch<ComponentModel extends DefaultComponentModel = DefaultComponentModel>(props: UseListSearchProps<ComponentModel>): UseFlatListReturn<ListSearchItemProps<ComponentModel>> & Omit<ListItemActions<ComponentModel>, 'onToRightSlide' | 'onToLeftSlide' | 'onLongPressed'>;
//# sourceMappingURL=ListSearch.hooks.d.ts.map