import type { BasicActionsProps } from './types';
export type UseContactInfoActionsProps = BasicActionsProps & {
    /**
     * Remove contact callback.
     */
    onRemoveContact?: (userId: string) => void;
};
/**
 * use contact info actions.
 *
 * Normally the default menu is displayed.
 */
export declare function useContactInfoActions(props: UseContactInfoActionsProps): {
    onShowContactInfoActions: (userId: string, userName?: string) => void;
};
//# sourceMappingURL=useContactInfoActions.d.ts.map